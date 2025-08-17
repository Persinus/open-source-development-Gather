import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar/Navbar'
import RealmsMenu from './RealmsMenu/RealmsMenu'
import { getVisitedRealms } from '@/utils/supabase/getVisitedRealms'

export default async function App() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  if (!user || !session) {
    return redirect('/signin')
  }

  const realms: any = []

  // Realms do user sở hữu
  const { data: ownedRealms, error } = await supabase
    .from('realms')
    .select('id, name, share_id')
    .eq('owner_id', user.id)
  if (ownedRealms) realms.push(...ownedRealms)

  // Realms đã từng tham gia (shared)
  if (session) {
    let { data: visitedRealms } = await getVisitedRealms(session.access_token)
    if (visitedRealms) {
      visitedRealms = visitedRealms.map((realm) => ({ ...realm, shared: true }))
      realms.push(...visitedRealms)
    }
  }

  const errorMessage = error?.message || ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        <h1 className="text-4xl font-extrabold mb-2">Không gian của bạn</h1>
        <p className="text-lg text-indigo-200 mb-6">Danh sách các map bạn sở hữu hoặc đã tham gia</p>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-600 rounded-md shadow-md">
            {errorMessage}
          </div>
        )}

        {/* Sử dụng component RealmsMenu */}
        <RealmsMenu realms={realms} errorMessage={errorMessage} />
      </div>
    </div>
  )
}
