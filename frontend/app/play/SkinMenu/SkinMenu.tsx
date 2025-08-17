import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal/Modal'
import { useModal } from '@/app/hooks/useModal'
import AnimatedCharacter from './AnimatedCharacter'
import { ArrowFatLeft, ArrowFatRight } from '@phosphor-icons/react'
import BasicLoadingButton from '@/components/BasicLoadingButton'
import { skins, defaultSkin } from '@/utils/pixi/Player/skins'
import signal from '@/utils/signal'
import { createClient } from '@/utils/supabase/client'
import revalidate from '@/utils/revalidate'
import { toast } from 'react-toastify'

const SkinMenu: React.FC = () => {
    const { modal, setModal } = useModal()
    const [skinIndex, setSkinIndex] = useState<number>(skins.indexOf(defaultSkin))
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    function decrement() {
        setSkinIndex((prevIndex) => (prevIndex - 1 + skins.length) % skins.length)
    }

    function increment() {
        setSkinIndex((prevIndex) => (prevIndex + 1) % skins.length)
    }

    useEffect(() => {
        const onGotSkin = (skin: string) => {
            const idx = skins.indexOf(skin)
            setSkinIndex(idx !== -1 ? idx : 0)
        }
        signal.on('skin', onGotSkin)
        return () => {
            signal.off('skin', onGotSkin)
        }
    }, [])

    // Khởi tạo index an toàn
    useEffect(() => {
        const idx = skins.indexOf(defaultSkin)
        setSkinIndex(idx !== -1 ? idx : 0)
    }, [])

    async function switchSkins() {
        const newSkin = skins[skinIndex]
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase
            .from('profiles')
            .update({ skin: newSkin })
            .eq('id', user.id)

        if (error) {
            toast.error(error.message)
            return
        }

        revalidate('/play/[id]')
        // Đừng đóng modal ở đây, chỉ emit để cập nhật skin
        signal.emit('switchSkin', newSkin)
        // Đóng modal chỉ khi gọi từ handleSwitchSkinsClick
    }

    async function handleSwitchSkinsClick() {
        setLoading(true)
        await switchSkins()
        setLoading(false)
        setModal('None') // Đóng modal ở đây, chỉ khi bấm nút "Chọn"
    }

    return (
        <Modal open={modal === 'Skin'} closeOnOutsideClick>
            <div className="w-96 h-96 flex flex-col items-center justify-between pt-6
                bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-200">
                <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 mb-2">
                    Chọn nhân vật
                </h2>
                <p className="text-indigo-200 font-semibold mb-2">{skinIndex + 1} / {skins.length}</p>
                <AnimatedCharacter src={`/sprites/characters/Character_${skins[skinIndex]}.png`} className="w-48 drop-shadow-lg" />
                <div className="flex flex-row items-center justify-center gap-4 mb-10">
                    <button
                        className="hover:bg-indigo-200/30 transition-colors aspect-square grid place-items-center rounded-lg p-1 outline-none"
                        onClick={decrement}
                    >
                        <ArrowFatLeft className="h-12 w-12 text-indigo-400" />
                    </button>
                    <BasicLoadingButton
                        onClick={handleSwitchSkinsClick}
                        loading={loading}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white font-bold px-6 py-2 rounded-xl shadow hover:scale-105 transition-all"
                    >
                        Chọn
                    </BasicLoadingButton>
                    <button
                        className="hover:bg-indigo-200/30 transition-colors aspect-square grid place-items-center rounded-lg p-1 outline-none"
                        onClick={increment}
                    >
                        <ArrowFatRight className="h-12 w-12 text-indigo-400" />
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default SkinMenu