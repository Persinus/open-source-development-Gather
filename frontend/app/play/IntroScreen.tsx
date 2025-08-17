'use client'
import React from 'react'
import BasicButton from '@/components/BasicButton'
import AnimatedCharacter from './SkinMenu/AnimatedCharacter'
import { useVideoChat } from '../hooks/useVideoChat'
import MicAndCameraButtons from '@/components/VideoChat/MicAndCameraButtons'

type IntroScreenProps = {
    realmName: string
    skin: string
    username: string
    setShowIntroScreen: (show: boolean) => void
}

const IntroScreen:React.FC<IntroScreenProps> = ({ realmName, skin, username, setShowIntroScreen }) => {

    const src = '/sprites/characters/Character_' + skin + '.png'

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
                        <LocalVideo/>
                    </div>
                    <MicAndCameraButtons/>
                </div>
                {/* Avatar + username + join */}
                <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                    <div className="flex flex-row items-center">
                        <AnimatedCharacter src={src} noAnimation/>
                        <p className="relative top-4 ml-2">{username}</p>
                    </div>
                    <BasicButton
                        className="py-2 px-10 w-full sm:w-[180px]"
                        onClick={() => setShowIntroScreen(false)}
                    >
                        Vào phòng
                    </BasicButton>
                </div>
            </section>
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