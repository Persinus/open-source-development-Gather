import React, { useEffect, useState } from 'react'
import { TShirt, MusicNote } from '@phosphor-icons/react'
import { useModal } from '../hooks/useModal'
import signal from '@/utils/signal'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import MicAndCameraButtons from '@/components/VideoChat/MicAndCameraButtons'
import { useVideoChat } from '../hooks/useVideoChat'
import AnimatedCharacter from './SkinMenu/AnimatedCharacter'
import { videoChat } from '@/utils/video-chat/video-chat'
import { Smiley } from '@phosphor-icons/react' // thêm import

type PlayNavbarProps = {
    username: string
    skin: string
}

const PlayNavbar: React.FC<PlayNavbarProps> = ({ username, skin }) => {
    const { setModal } = useModal()
    const { isCameraMuted } = useVideoChat()
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [audio] = useState(() => new Audio('/BackgroundGame.mp3'))

    useEffect(() => {
        audio.loop = true
        audio.volume = volume
        videoChat.playVideoTrackAtElementId('local-video')
        return () => audio.pause()
    }, [])

    useEffect(() => {
        audio.volume = volume
    }, [volume])

    function onClickSkinButton() {
        setModal('Skin')
        signal.emit('requestSkin')
    }

    function toggleMusic() {
        if (isPlaying) audio.pause()
        else audio.play()
        setIsPlaying(!isPlaying)
    }
      
    const [showReactions, setShowReactions] = useState(false)

function toggleReactions() {
    setShowReactions(!showReactions)
}

function sendReaction(reaction: string) {
    console.log('Reaction sent:', reaction)
    setShowReactions(false)
}


    return (
        <div className='bg-primary w-full h-14 absolute bottom-0 flex flex-row items-center p-2 gap-2 select-none'>
            {/* Nút trở về */}
            <Link
                href='/app'
                title='Back to App'
                className='aspect-square grid place-items-center rounded-lg p-1 outline-none bg-secondary hover:bg-light-secondary animate-colors'
            >
                <ArrowLeftEndOnRectangleIcon className='h-8 w-8 text-black' />
            </Link>

            {/* Thông tin nhân vật */}
            <div className='h-full w-[200px] bg-secondary rounded-lg overflow-hidden flex flex-row'>
                <div className='w-[60px] h-full border-r-[1px] border-light-gray relative grid place-items-center'>
                    <AnimatedCharacter src={'/sprites/characters/Character_' + skin + '.png'} noAnimation className='w-8 h-8 absolute bottom-1' />
                    <div id='local-video' className={`w-full h-full absolute ${!isCameraMuted ? 'block' : 'hidden'}`}></div>
                </div>
                <div className='w-full flex flex-col p-1 pl-2'>
                    <p className='text-black text-xs'>{username}</p>
                    <p className='text-black-300 text-xs'>Đang Online</p>
                </div>
            </div>

            {/* Mic + Camera Buttons */}
            <MicAndCameraButtons 
            />

            {/* Nút Skin */}
            <button
                title='Change Skin'
                className='aspect-square grid place-items-center rounded-lg p-1 outline-none bg-secondary hover:bg-light-secondary animate-colors'
                onClick={onClickSkinButton}
            >
                <TShirt className='h-8 w-8 text-black' />
            </button>

            {/* Nút nhạc */}
            <button
                title={isPlaying ? 'Pause Music' : 'Play Music'}
                className='aspect-square grid place-items-center rounded-lg p-1 outline-none bg-secondary hover:bg-light-secondary animate-colors'
                onClick={toggleMusic}
            >
                <MusicNote className={`h-8 w-8 ${isPlaying ? 'text-green-400' : 'text-black'}`} />
            </button>
            
            {/* Thanh volume */}
            <input
                type='range'
                min={0} max={1} step={0.01}
                value={volume}
                title={`Volume: ${Math.round(volume * 100)}%`}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className='w-24 h-2 rounded-lg accent-indigo-500 cursor-pointer'
            />

            <div className='relative'>
    <button
        title='Send Reaction'
        className='aspect-square grid place-items-center rounded-lg p-1 outline-none bg-secondary hover:bg-light-secondary animate-colors'
        onClick={toggleReactions}
    >
        <Smiley className='h-8 w-8 text-black'/>
    </button>

    {showReactions && (
        <div className='absolute bottom-12 left-0 bg-white rounded-lg shadow-lg flex flex-row gap-2 p-2 z-50'>
            {['👍', '❤️', '😂', '😮', '😢', '👏'].map((emoji) => (
                <button key={emoji} onClick={() => sendReaction(emoji)} className='text-2xl'>
                    {emoji}
                </button>
            ))}
        </div>
    )}
</div>
        </div>

        
    )
}

export default PlayNavbar
