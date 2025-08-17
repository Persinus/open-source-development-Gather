// app/play/[id]/page.tsx (Play.tsx của bạn)

import NotFound from '@/app/not-found'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getPlayRealmData } from '@/utils/supabase/getPlayRealmData'
import { updateVisitedRealms } from '@/utils/supabase/updateVisitedRealms'
import { formatEmailToName } from '@/utils/formatEmailToName'
import PlayClientWrapper from './PlayClientWrapper'

export default async function Play({ params, searchParams }: {
  params: { id: string }
  searchParams: { shareId: string }
}) {
  const supabase = createClient()
  // Lấy session và user
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (!session || !user) {
    return redirect('/signin')
  }

  // Lấy dữ liệu realm
  let realmData, realmError
  if (!searchParams.shareId) {
    const { data, error } = await supabase
      .from('realms')
      .select('map_data, owner_id, name')
      .eq('id', params.id)
      .maybeSingle()
    realmData = data
    realmError = error
  } else {
    const { data, error } = await getPlayRealmData(session.access_token, searchParams.shareId)
    realmData = data
    realmError = error
  }

  // Lấy profile người dùng
  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('skin')
    .eq('id', user.id)
    .maybeSingle()

  // Nếu chưa có profile thì tạo mới
  if (!profile) {
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, skin: 'default' }])
      .select()
      .single()
    if (insertError) return <NotFound specialMessage={insertError.message} />
    profile = newProfile
  }

  // Nếu lỗi hoặc thiếu dữ liệu
  if (!realmData || !profile) {
    return <NotFound specialMessage={realmError?.message || profileError?.message} />
  }

  // Cập nhật lịch sử truy cập nếu là share link
  if (searchParams.shareId && realmData.owner_id !== user.id) {
    updateVisitedRealms(session.access_token, searchParams.shareId)
  }

  // Render giao diện chơi
  return (
    <div className="min-h-[80dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 flex items-center justify-center pt-8 sm:pt-16">
      <PlayClientWrapper
        mapData={realmData.map_data}
        username={formatEmailToName(user.user_metadata.email)}
        access_token={session.access_token}
        realmId={params.id}
        uid={user.id}
        shareId={searchParams.shareId || ''}
        initialSkin={profile.skin}
        name={realmData.name}
      />
    </div>
  )
}
