'use client'
import React, { useEffect, useState } from 'react'
import PixiApp from './PixiApp'
import { RealmData } from '@/utils/pixi/types'
import PlayNavbar from './PlayNavbar'
import { useModal } from '../hooks/useModal'
import signal from '@/utils/signal'
import IntroScreen from './IntroScreen'
import VideoBar from '@/components/VideoChat/VideoBar'
import { AgoraVideoChatProvider } from '../hooks/useVideoChat'

type PlayClientProps = {
    mapData: RealmData
    username: string
    access_token: string
    realmId: string
    uid: string
    shareId: string
    initialSkin: string
    name: string
}

const PlayClient:React.FC<PlayClientProps> = ({ mapData, username, access_token, realmId, uid, shareId, initialSkin, name }) => {

    const { setErrorModal, setDisconnectedMessage } = useModal()
    const [showIntroScreen, setShowIntroScreen] = useState(true)
    const [skin, setSkin] = useState(initialSkin)

    useEffect(() => {
        const onShowKickedModal = (message: string) => { 
            setErrorModal('Disconnected')
            setDisconnectedMessage(message)
        }

        const onShowDisconnectModal = () => {
            setErrorModal('Disconnected')
            setDisconnectedMessage('You have been disconnected from the server.')
        }

        const onSwitchSkin = (skin: string) => {
            setSkin(skin)
        }

        signal.on('showKickedModal', onShowKickedModal)
        signal.on('showDisconnectModal', onShowDisconnectModal)
        signal.on('switchSkin', onSwitchSkin)

        return () => {
            signal.off('showKickedModal', onShowKickedModal)
            signal.off('showDisconnectModal', onShowDisconnectModal)
            signal.off('switchSkin', onSwitchSkin)
        }
    }, [])

    return (
        <AgoraVideoChatProvider uid={uid}>
            {!showIntroScreen && (
                <div className="relative w-full h-screen flex flex-col-reverse sm:flex-col bg-white/0">
                    <div className="z-20">
                        <VideoBar />
                    </div>
                    <div className="grow flex items-center justify-center">
                        <PixiApp 
                            mapData={mapData} 
                            className="w-full h-full" 
                            username={username} 
                            access_token={access_token} 
                            realmId={realmId} 
                            uid={uid} 
                            shareId={shareId} 
                            initialSkin={skin} 
                        />
                    </div>
                    <div className="absolute top-0 left-0 w-full z-30">
                        <PlayNavbar username={username} skin={skin}/>
                    </div>
                </div>
            )}
            {showIntroScreen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur">
                    <IntroScreen realmName={name} skin={skin} username={username} setShowIntroScreen={setShowIntroScreen}/>
                </div>
            )}    
        </AgoraVideoChatProvider>
    )
}
export default PlayClient