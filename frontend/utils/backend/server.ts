// utils/server.ts
import { createClient as createClientBrowser } from '@supabase/supabase-js'
import { request } from './requests'
import io, { Socket } from 'socket.io-client'

// ------------------------------
// Supabase client
// ------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const createClient = () => createClientBrowser(SUPABASE_URL, SUPABASE_ANON_KEY)

// ------------------------------
// Server class (socket + API requests)
// ------------------------------
type ConnectionResponse = {
  success: boolean
  errorMessage: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string

export class Server {
  public socket: Socket = {} as Socket
  private connected = false

  // Socket chỉ chạy client-side
  public async connect(realmId: string, uid: string, shareId: string, access_token: string) {
    if (typeof window === 'undefined') {
      console.warn('Socket cannot be used server-side')
      return { success: false, errorMessage: 'Socket only available on client' }
    }

    this.socket = io(BACKEND_URL, {
      reconnection: true,
      autoConnect: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      },
      query: { uid },
    })

    return new Promise<ConnectionResponse>((resolve) => {
      this.socket.connect()

      this.socket.on('connect', () => {
        this.connected = true
        this.socket.emit('joinRealm', { realmId, shareId })
      })

      this.socket.on('joinedRealm', () => resolve({ success: true, errorMessage: '' }))
      this.socket.on('failedToJoinRoom', (reason: string) =>
        resolve({ success: false, errorMessage: reason })
      )
      this.socket.on('connect_error', (err: any) =>
        resolve({ success: false, errorMessage: err.message })
      )
    })
  }

  public disconnect() {
    if (this.connected) {
      this.connected = false
      this.socket.disconnect()
    }
  }

  // Lấy người chơi trong room (server-side hoặc client-side)
  public async getPlayersInRoom(roomIndex: number, access_token?: string) {
    if (!access_token) {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return { data: null, error: { message: 'No session provided' } }
      access_token = session.access_token
    }

    return request('/getPlayersInRoom', { roomIndex }, access_token)
  }
}

export const server = new Server()
