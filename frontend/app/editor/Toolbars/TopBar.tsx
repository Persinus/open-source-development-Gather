'use client'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BasicButton from '@/components/BasicButton'
import signal from '@/utils/signal'
import { useModal } from '@/app/hooks/useModal'
import { RealmData } from '@/utils/pixi/types'
import { createClient } from '@/utils/supabase/client'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import revalidate from '@/utils/revalidate'
import { FloppyDisk } from '@phosphor-icons/react'
import { saveRealm } from '@/utils/supabase/saveRealm'

type TopBarProps = {}

const TopBar: React.FC<TopBarProps> = () => {
  const { setLoadingText, setModal } = useModal()
  const { id } = useParams()
  const [barWidth, setBarWidth] = useState<number>(0)

  const supabase = createClient()

  function beginSave() {
    signal.emit('beginSave')
    setModal('Loading')
    setLoadingText('Đang lưu dữ liệu...')
  }

  useEffect(() => {
    const save = async (realmData: RealmData) => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) return

      const { error } = await saveRealm(
        session.access_token,
        realmData,
        id as string
      )

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('💾 Lưu thành công!')
      }

      revalidate('/editor/[id]')
      revalidate('/play/[id]')
      setModal('None')
      signal.emit('saved')
    }

    const onBarWidth = (width: number) => {
      setBarWidth(width)
    }

    signal.on('save', save)
    signal.on('barWidth', onBarWidth)

    return () => {
      signal.off('save', save)
      signal.off('barWidth', onBarWidth)
    }
  }, [])

  function getBgColor() {
    if (barWidth < 0.7) {
      return 'bg-green-500'
    } else if (barWidth < 0.9) {
      return 'bg-yellow-400'
    } else {
      return 'bg-red-500'
    }
  }

  return (
    <div className="w-full h-[52px] bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 flex flex-row items-center p-2 border-b border-white/20 gap-3 relative shadow-md">
      {/* Quay lại */}
      <div className="hover:bg-white/10 transition rounded-lg p-1">
        <Link href={'/app'}>
          <ArrowLeftEndOnRectangleIcon className="h-7 w-7 text-white" />
        </Link>
      </div>

      {/* Nút lưu */}
      <BasicButton
        onClick={beginSave}
        className="flex flex-row gap-2 items-center px-3 py-1 h-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
      >
        <FloppyDisk className="h-5 w-5" />
        Lưu bản đồ
      </BasicButton>

      {/* Cảnh báo */}
      <p className="text-xs italic text-white/80 hidden sm:block">
        ⚠️Lưu sẽ ngắt kết nối người chơi online.
      </p>

      {/* Thanh dung lượng */}
      <div className="absolute right-6 xl:right-[475px] hidden lg:flex flex-row gap-2 items-center">
        {barWidth > 0.9 && (
          <p className="text-xs italic text-red-400 font-semibold">
            {barWidth >= 1
              ? '❌ Hết dung lượng!'
              : '⚠️ Sắp hết dung lượng!'}
          </p>
        )}
        <div className="w-80 h-[12px] rounded-full border border-white/30 bg-white/10 overflow-hidden shadow-inner">
          <div
            className={`${getBgColor()} h-full transition-all duration-500`}
            style={{
              width: barWidth * 100 + '%',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TopBar
