import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal/Modal'
import { useModal } from '@/app/hooks/useModal'
import AnimatedCharacter from './AnimatedCharacter'
import BasicLoadingButton from '@/components/BasicLoadingButton'
import { skins, defaultSkin } from '@/utils/pixi/Player/skins'
import signal from '@/utils/signal'
import { createClient } from '@/utils/supabase/client'
import revalidate from '@/utils/revalidate'
import { toast } from 'react-toastify'

const SkinMenu: React.FC = () => {
  const { modal, setModal } = useModal()
  const [selectedSkin, setSelectedSkin] = useState<string>(defaultSkin)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const onGotSkin = (skin: string) => {
      setSelectedSkin(skin)
    }
    signal.on('skin', onGotSkin)
    return () => {
      signal.off('skin', onGotSkin)
    }
  }, [])

  async function switchSkins() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ skin: selectedSkin })
      .eq('id', user.id)

    if (error) {
      toast.error(error.message)
      return
    }

    revalidate('/play/[id]')
    signal.emit('switchSkin', selectedSkin)
    setModal('None')
  }

  async function handleSwitchSkinsClick() {
    setLoading(true)
    await switchSkins()
    setLoading(false)
  }

  return (
    <Modal open={modal === 'Skin'} closeOnOutsideClick>
      <div className="flex w-full h-[70vh] rounded-2xl shadow-2xl overflow-hidden 
        bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white">
        
        {/* LEFT: Character Preview */}
        <div className="w-1/3 flex flex-col items-center justify-center 
          bg-white/10 backdrop-blur-sm p-6">
          <AnimatedCharacter
            src={`/sprites/characters/Character_${selectedSkin}.png`}
            className="w-40"
          />
          <p className="text-sm mt-2">
            Đang chọn: <b>{selectedSkin}</b>
          </p>
          <div className="mt-6">
            <BasicLoadingButton
              onClick={handleSwitchSkinsClick}
              loading={loading}
            >
              Chọn Trang Phục
            </BasicLoadingButton>
          </div>
        </div>

        {/* RIGHT: Skins Grid */}
        <div className="w-2/3 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-purple-200">
            Danh sách Trang Phục
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {skins.map((skin) => (
              <button
                key={skin}
                onClick={() => setSelectedSkin(skin)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                  ${selectedSkin === skin 
                    ? 'border-purple-500 bg-purple-600/30' 
                    : 'border-purple-200 hover:border-purple-400 hover:bg-purple-800/30'}
                `}
              >
                <AnimatedCharacter
                  src={`/sprites/characters/Character_${skin}.png`}
                  noAnimation
                  className="w-20 h-20"
                />
                <span className="mt-2 text-sm text-purple-100">{skin}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SkinMenu
