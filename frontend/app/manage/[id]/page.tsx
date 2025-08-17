import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ManageChild from '../ManageChild'
import NotFound from '../../not-found'
import { request } from '@/utils/backend/requests'

export default async function Manage({ params }: { params: { id: string } }) {

    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    const { data: { session } } = await supabase.auth.getSession()

    if (!user || !session) {
        return redirect('/signin')
    }

    const { data, error } = await supabase.from('realms').select('id, name, owner_id, map_data, share_id, only_owner').eq('id', params.id).single()
    // Show not found page if no data is returned
    if (!data) {
        return <NotFound />
    }
    const realm = data

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 flex items-center justify-center py-12 px-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
                <ManageChild 
                    realmId={realm.id} 
                    startingShareId={realm.share_id} 
                    startingOnlyOwner={realm.only_owner} 
                    startingName={realm.name}
                />
            </div>
        </div>
    )
}