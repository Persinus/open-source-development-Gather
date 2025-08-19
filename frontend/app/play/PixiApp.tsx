'use client'
import React, { useRef } from 'react'
import { PlayApp } from '@/utils/pixi/PlayApp'
import { useEffect } from 'react'
import { RealmData } from '@/utils/pixi/types'
import { useModal } from '../hooks/useModal'
import { server } from '@/utils/backend/server'

type PixiAppProps = {
    className?: string
    mapData: RealmData
    username: string
    access_token: string
    realmId: string
    uid: string
    shareId: string
    initialSkin: string
}

const PixiApp:React.FC<PixiAppProps> = ({ className, mapData, username, access_token, realmId, uid, shareId, initialSkin }) => {

    const appRef = useRef<PlayApp | null>(null)
    const { setModal, setLoadingText, setFailedConnectionMessage, setErrorModal } = useModal()

    useEffect(() => {
        const mount = async () => {
            const app = new PlayApp(uid, realmId, mapData, username, initialSkin)
            appRef.current = app
            setModal('Loading')
            setLoadingText('Đang kết nối tới máy chủ...')
            const { success, errorMessage } = await server.connect(realmId, uid, shareId, access_token)
            if (!success) {
                setErrorModal('Failed To Connect')
                setFailedConnectionMessage(errorMessage)
                return
            }

            setLoadingText('Đang tải trò chơi...')
            await app.init()
            setModal('None')
            const pixiApp = app.getApp()
            
            document.getElementById('app-container')!.appendChild(pixiApp.canvas)
        }

        if (!appRef.current) {
            mount()
        }
        
        return () => {
            if (appRef.current) {
                appRef.current.destroy()
            }
        }
    }, [])

    return (
        <div id='app-container' className={`overflow-hidden ${className}`}>
            
        </div>
    )
}

export default PixiApp
