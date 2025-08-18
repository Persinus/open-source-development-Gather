'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useModal } from '@/app/hooks/useModal'
import BasicButton from '../BasicButton'
import { useRouter } from 'next/navigation'

type NavbarChildProps = {
    name: string,
    avatar_url: string
}

export const NavbarChild:React.FC<NavbarChildProps> = ({ name, avatar_url }) => {
    const { setModal } = useModal()
    const router = useRouter()
    const [shareIdInput, setShareIdInput] = useState('')

    function joinRoom() {
    if (!shareIdInput) return

    // Regex kiểm tra UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(shareIdInput.trim())) {
        alert('Vui lòng nhập đúng mã share (UUID)')
        return
    }

    router.push(`/play/[id]?shareId=${shareIdInput.trim()}`)
    setShareIdInput('')
}

    return (
        <div className="h-16">
            <div className="w-full fixed top-0 left-0 bg-white/20 backdrop-blur-md shadow-lg flex flex-row items-center p-2 pl-8 justify-end sm:justify-between z-20 gap-4">
                
                {/* Tạo Không gian mới */}
                <BasicButton
                    onClick={() => setModal('Create Realm')}
                    className="hidden sm:flex flex-row items-center gap-2 py-[10px] px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white font-semibold rounded-xl shadow hover:scale-105 transition-all"
                >
                    Tạo Không gian mới
                    <PlusCircleIcon className="h-5" />
                </BasicButton>

                {/* Nhập share link / join room */}
                <div className="flex flex-row items-center gap-2">
                    <input 
                        type="text"
                        placeholder="Nhập link hoặc mã share"
                        value={shareIdInput}
                        onChange={(e) => setShareIdInput(e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-48"
                    />
                    <BasicButton
                        onClick={joinRoom}
                        className="px-3 py-1 bg-indigo-500 text-black rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        Join
                    </BasicButton>
                </div>

                {/* Avatar + tên */}
                <div
                    className="flex flex-row items-center gap-4 bg-white/10 hover:bg-white/30 transition-colors rounded-full cursor-pointer py-1 px-3 select-none shadow"
                    onClick={() => setModal('Account Dropdown')}
                >
                    <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-400 drop-shadow">
                        {name}
                    </p>
                    <Image
                        alt="avatar"
                        src={avatar_url}
                        width={44}
                        height={44}
                        className="aspect-square rounded-full border-2 border-indigo-200 shadow"
                    />
                </div>
            </div>
        </div> 
    )
}
