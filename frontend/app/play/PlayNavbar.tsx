import React from 'react'
import { TShirt } from '@phosphor-icons/react'
import { useModal } from '../hooks/useModal'
import signal from '@/utils/signal'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import MicAndCameraButtons from '@/components/VideoChat/MicAndCameraButtons'
import { useVideoChat } from '../hooks/useVideoChat'
import AnimatedCharacter from './SkinMenu/AnimatedCharacter'
import { useEffect } from 'react'
import { videoChat } from '@/utils/video-chat/video-chat'

type PlayNavbarProps = {
    username: string
    skin: string
}


const PlayNavbar:React.FC<PlayNavbarProps> = ({ username, skin }) => {

    const { setModal } = useModal()
    const { isCameraMuted } = useVideoChat()
    function onClickSkinButton() {
        setModal('Skin')
        signal.emit('requestSkin')
    }

    useEffect(() => {
        videoChat.playVideoTrackAtElementId('local-video')
    }, [])

    return (
        <div className='bg-white/20 backdrop-blur-lg w-full h-16 absolute bottom-0 flex flex-row items-center p-2 gap-4 select-none shadow-2xl z-40'>
            <Link
                href='/app'
                className='aspect-square grid place-items-center rounded-lg p-1 outline-none bg-secondary hover:bg-light-secondary animate-colors'
                title="Thoát về trang chính"
            >
                <ArrowLeftEndOnRectangleIcon className='h-8 w-8'/>
            </Link>
            <div className='h-full w-[200px] bg-secondary rounded-lg overflow-hidden flex flex-row'>
                <div className='w-[60px] h-full border-r-[1px] border-light-gray relative grid place-items-center'>
                    <AnimatedCharacter src={'/sprites/characters/Character_' + skin + '.png'} noAnimation className='w-8 h-8 absolute bottom-1' />
                    <div id='local-video' className={`w-full h-full absolute ${!isCameraMuted ? 'block' : 'hidden'}`}></div>
                </div>
                <div className='w-full flex flex-col p-1 pl-2'>
                    <p className='text-indigo-100 text-sm font-semibold'>{username}</p>
                    <p className='text-[#BDBDBD] text-xs'>Đang hoạt động</p>
                </div>
            </div>
            <MicAndCameraButtons />
            <button
                className='aspect-square grid place-items-center rounded-lg p-1 outline-none bg-secondary hover:bg-light-secondary ml-auto animate-colors'
                onClick={onClickSkinButton}
                title="Đổi nhân vật"
            >
                <TShirt className='h-8 w-8'/>
            </button>
        </div>
    )
}

export default PlayNavbar