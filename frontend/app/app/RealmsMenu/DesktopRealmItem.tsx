import { DotsThreeVertical, Link as LinkIcon, SignIn } from '@phosphor-icons/react'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useModal } from '@/app/hooks/useModal'
import Link from 'next/link'
import { toast } from 'react-toastify'

type DesktopRealmItemProps = {
    name: string,
    id: string,
    shareId: string,
    shared?: boolean,
    playerCount?: number
}

const DesktopRealmItem:React.FC<DesktopRealmItemProps> = ({ name, id, shareId, shared, playerCount }) => {
    
    const [showMenu, setShowMenu] = useState<boolean>(false)  
    const router = useRouter()
    const menuRef = useRef<HTMLDivElement>(null)
    const dotsRef = useRef<HTMLDivElement>(null)
    const { setRealmToDelete, setModal } = useModal()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && dotsRef.current && !dotsRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleDotsClick() {
        setShowMenu(!showMenu)
    }

    function handleDelete() {
        setRealmToDelete({ name, id })
        setModal('Delete Realm')
    }

    function getLink() {
        if (shared) {
            return `/play/${id}?shareId=${shareId}`
        } else {
            return `/play/${id}`
        }
    }

    function copyShareLink() {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/play/${id}?shareId=${shareId}`)
        toast.success('Đã sao chép liên kết!')
    }

    return (
        <div className="relative select-none">
            <Link href={getLink()}>
                <div className="
                    w-full aspect-video relative rounded-3xl 
                    border-2 border-white/20 
                    bg-white/10 backdrop-blur-md shadow-xl 
                    overflow-hidden transition-all duration-300
                    hover:scale-[1.03] hover:border-indigo-300 hover:shadow-2xl
                    group
                ">
                    {/* Background pulse animation */}
                    <div className="animate-pulse bg-gradient-to-br from-indigo-800 via-purple-700 to-indigo-900 absolute inset-0 opacity-60" />

                    {/* Thumbnail image */}
                    <img
                        src="/thumbnail.png"
                        className="absolute z-10 w-full h-full object-cover object-center opacity-80"
                        style={{ imageRendering: 'pixelated' }}
                        alt="Realm thumbnail"
                    />

                    {/* Hover effect and sign-in icon */}
                    <div className="absolute inset-0 grid place-items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="rounded-full bg-black bg-opacity-70 grid place-items-center absolute p-2 shadow-lg">
                            <SignIn className="w-8 h-8 text-indigo-200" />
                        </div>
                    </div>

                    {/* Player count indicator */}
                    {playerCount != null && (
                        <div className="pointer-events-none absolute top-2 left-2 rounded-full px-2 py-1 flex items-center gap-2 bg-black bg-opacity-70 max-w-max z-30 shadow">
                            <div className="bg-green-400 w-3 h-3 rounded-full" />
                            <p className="text-sm font-semibold text-white">{playerCount} người chơi</p>
                        </div>
                    )}
                </div>
            </Link>
            <div className="mt-3 flex flex-row justify-between items-center">
                <p className="text-base font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-400 bg-clip-text text-transparent drop-shadow">
                    {name}
                </p>
                {!shared && (
                    <div className="flex flex-row gap-1">
                        <LinkIcon
                            className="h-7 w-7 cursor-pointer hover:bg-indigo-200/40 hover:text-indigo-500 rounded-md p-1 transition-colors duration-200"
                            onClick={copyShareLink}
                        />
                        <div ref={dotsRef}>
                            <DotsThreeVertical
                                weight="bold"
                                className="h-7 w-7 cursor-pointer hover:bg-indigo-200/40 hover:text-indigo-500 rounded-md p-1 transition-colors duration-200"
                                onClick={handleDotsClick}
                            />
                        </div>
                    </div>
                )}
            </div>
            {showMenu && (
                <div
                    className="absolute w-44 rounded-xl bg-white/95 shadow-2xl right-0 flex flex-col z-30 text-black overflow-hidden border border-indigo-100 animate-fade-in"
                    ref={menuRef}
                >
                    <button
                        className="grow w-full hover:bg-indigo-100 font-medium py-2 px-4 text-left transition-colors"
                        onClick={() => router.push(`/editor/${id}`)}
                    >
                        Chỉnh sửa bản đồ
                    </button>
                    <button
                        className="grow w-full hover:bg-indigo-100 font-medium py-2 px-4 text-left transition-colors"
                        onClick={() => router.push(`/manage/${id}`)}
                    >
                        Quản lý
                    </button>
                    <button
                        className="grow w-full hover:bg-red-500 hover:text-white font-medium py-2 px-4 text-left transition-colors"
                        onClick={handleDelete}
                    >
                        Xóa
                    </button>
                </div>
            )}
        </div>
    )
}

export default DesktopRealmItem