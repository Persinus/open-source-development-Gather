'use client'
import React, { useState, useEffect } from 'react'
import { TShirt } from '@phosphor-icons/react'
import AnimatedCharacter from './SkinMenu/AnimatedCharacter'
import BasicButton from '@/components/BasicButton'
import { useVideoChat } from '../hooks/useVideoChat'
import MicAndCameraButtons from '@/components/VideoChat/MicAndCameraButtons'
import signal from '@/utils/signal'

type IntroScreenProps = {
    realmName: string
    skin: string
    username: string
    setShowIntroScreen: (show: boolean) => void
}

// SkinMenu component
type SkinMenuProps = {
    currentSkin: string
    onSelectSkin: (skin: string) => void
    onClose: () => void
}

const SkinMenu: React.FC<SkinMenuProps> = ({ currentSkin, onSelectSkin, onClose }) => {
    const skins = ['default', 'red', 'blue', 'green'] // danh sách skin
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4">
                <h2 className="text-lg font-semibold">Chọn nhân vật</h2>
                <div className="flex gap-4 flex-wrap">
                    {skins.map((skin) => (
                        <button
                            key={skin}
                            className={`p-2 border rounded-lg ${skin === currentSkin ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => onSelectSkin(skin)}
                        >
                            <img
                                src={`/sprites/characters/Character_${skin}.png`}
                                alt={skin}
                                className="w-12 h-12"
                            />
                        </button>
                    ))}
                </div>
                <button className="mt-4 py-2 px-4 bg-gray-200 rounded-lg" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    )
}

const IntroScreen: React.FC<IntroScreenProps> = ({ realmName, skin, username, setShowIntroScreen }) => {
    const { isCameraMuted } = useVideoChat()
    const [currentSkin, setCurrentSkin] = useState(skin)
    const [showSkinMenu, setShowSkinMenu] = useState(false)

    // Mở SkinMenu khi nhận signal
    useEffect(() => {
        const handler = () => setShowSkinMenu(true)
        signal.on('requestSkin', handler)
        return () => { signal.off('requestSkin', handler) }
    }, [])

    function handleSelectSkin(skin: string) {
        setCurrentSkin(skin)
        setShowSkinMenu(false)
    }

    function handleCloseSkinMenu() {
        setShowSkinMenu(false)
    }

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center px-2 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950">
            <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
                Chào mừng đến với <span className="text-[#CAD8FF]">{realmName}</span>
            </h1>

            <section className="
                flex flex-col-reverse sm:flex-row items-center gap-8 sm:gap-16
                bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-10
                max-w-3xl w-full
            ">
                {/* Video + mic/cam */}
                <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                    <div className="aspect-video w-full sm:w-[300px] h-[180px] bg-black rounded-xl border-2 border-[#3F4776] overflow-hidden">
                        <LocalVideo />
                    </div>
                    <MicAndCameraButtons />
                </div>

                {/* Avatar + username + join + chọn skin */}
                <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                    <div className="flex flex-row items-center gap-4">
                        <AnimatedCharacter src={`/sprites/characters/Character_${currentSkin}.png`} noAnimation />
                        <p className="relative top-4 ml-2">{username}</p>
                    </div>

                    <BasicButton
                        className="py-2 px-10 w-full sm:w-[180px]"
                        onClick={() => setShowIntroScreen(false)}
                    >
                        Vào phòng
                    </BasicButton>

                    {/* Nút chọn nhân vật giống PlayNavbar */}
                    <button
                        title="Change Skin"
                        className="mt-2 aspect-square grid place-items-center rounded-lg p-2 outline-none bg-secondary hover:bg-light-secondary animate-colors"
                        onClick={() => setShowSkinMenu(true)}
                    >
                        <TShirt className="h-8 w-8 text-black" />
                    </button>
                </div>
            </section>

            {/* SkinMenu popup */}
            {showSkinMenu && (
                <SkinMenu
                    currentSkin={currentSkin}
                    onSelectSkin={handleSelectSkin}
                    onClose={handleCloseSkinMenu}
                />
            )}
        </main>
    )
}

export default IntroScreen

function LocalVideo() {
    const { isCameraMuted, isMicMuted } = useVideoChat()

    return (
        <div className="w-full h-full bg-[#111111] grid place-items-center relative">
            <div id="local-video" className="w-full h-full"></div>
            <div className="absolute select-none text-sm text-white items-center flex flex-col gap-1">
                {isMicMuted && isCameraMuted && <p>Bạn đã tắt micro và camera</p>}
                {isCameraMuted && !isMicMuted && <p>Bạn đã tắt camera</p>}
            </div>
            {isMicMuted && !isCameraMuted && (
                <p className="absolute bottom-2 right-3 select-none text-sm text-white bg-black bg-opacity-50 p-1 px-2 rounded-full">
                    Bạn đã tắt micro
                </p>
            )}
        </div>
    )
}
