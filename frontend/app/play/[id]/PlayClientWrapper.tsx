'use client'

import { useEffect, useState } from 'react'
import { useModal } from '@/app/hooks/useModal'
import PlayClient from '../PlayClient'
import SkinMenu from '../SkinMenu/SkinMenu'

type Props = {
  mapData: any
  username: string
  access_token: string
  realmId: string
  uid: string
  shareId: string
  initialSkin: string
  name: string
}

export default function PlayClientWrapper({
  mapData,
  username,
  access_token,
  realmId,
  uid,
  shareId,
  initialSkin,
  name,
}: Props) {
  const { setModal } = useModal()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Giả lập loading, bạn có thể thay bằng logic thực tế nếu cần
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!initialSkin || initialSkin === 'default') {
      setModal('Skin')
    }
  }, [initialSkin, setModal])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400 border-opacity-60"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-4 w-full max-w-5xl min-h-[70vh] flex items-center justify-center">
        <PlayClient
          mapData={mapData}
          username={username}
          access_token={access_token}
          realmId={realmId}
          uid={uid}
          shareId={shareId}
          initialSkin={initialSkin}
          name={name}
        />
        <SkinMenu />
      </div>
    </div>
  )
}
