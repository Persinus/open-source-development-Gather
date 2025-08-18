'use client'
import React, { useState } from 'react'
import BasicButton from '@/components/BasicButton'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import revalidate from '@/utils/revalidate'
import { useModal } from '../hooks/useModal'
import { Copy } from '@phosphor-icons/react'
import { v4 as uuidv4 } from 'uuid'
import BasicInput from '@/components/BasicInput'
import { removeExtraSpaces } from '@/utils/removeExtraSpaces'

type ManageChildProps = {
    realmId: string
    startingShareId: string
    startingOnlyOwner: boolean
    startingName: string
}

const ManageChild: React.FC<ManageChildProps> = ({ realmId, startingShareId, startingOnlyOwner, startingName }) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [shareId, setShareId] = useState(startingShareId)
    const [onlyOwner, setOnlyOwner] = useState(startingOnlyOwner)
    const [name, setName] = useState(startingName)
    const { setModal, setLoadingText } = useModal()
    const supabase = createClient()

    async function save() {
        if (name.trim() === '') {
            toast.error('Tên không được để trống!')
            return
        }

        setModal('Loading')
        setLoadingText('Đang lưu...')

        const { error } = await supabase
            .from('realms')
            .update({ only_owner: onlyOwner, name })
            .eq('id', realmId)

        if (error) toast.error(error.message)
        else toast.success('Đã lưu!')

        revalidate('/manage/[id]')
        setModal('None')
    }

    function copyLink() {
        const link = process.env.NEXT_PUBLIC_BASE_URL + '/play/' + realmId + '?shareId=' + shareId
        navigator.clipboard.writeText(link)
        toast.success('Đã sao chép liên kết!')
    }

    async function generateNewLink() {
        setModal('Loading')
        setLoadingText('Đang tạo liên kết mới...')

        const newShareId = uuidv4()
        const { error } = await supabase
            .from('realms')
            .update({ share_id: newShareId })
            .eq('id', realmId)

        if (error) toast.error(error.message)
        else {
            setShareId(newShareId)
            const link = process.env.NEXT_PUBLIC_BASE_URL + '/play/' + realmId + '?shareId=' + newShareId
            navigator.clipboard.writeText(link)
            toast.success('Đã sao chép liên kết mới!')
        }

        revalidate('/manage/[id]')
        setModal('None')
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(removeExtraSpaces(e.target.value))
    }

    return (
<div className="flex flex-col items-center pt-8 bg-darkblue min-h-screen">
            <div className="bg-indigo-950/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col sm:flex-row gap-8 w-full max-w-2xl">
                {/* Tabs */}
                <div className="flex flex-col min-h-[220px] w-[180px] pr-6 gap-2">
                    <button
                        className={`py-3 px-4 rounded-xl font-semibold text-lg transition-all
                            ${selectedTab === 0
                                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white shadow-lg'
                                : 'bg-indigo-900/50 text-indigo-200 hover:bg-indigo-900/70'}
                        `}
                        onClick={() => setSelectedTab(0)}
                    >
                        Thông tin chung
                    </button>
                    <button
                        className={`py-3 px-4 rounded-xl font-semibold text-lg transition-all
                            ${selectedTab === 1
                                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white shadow-lg'
                                : 'bg-indigo-900/50 text-indigo-200 hover:bg-indigo-900/70'}
                        `}
                        onClick={() => setSelectedTab(1)}
                    >
                        Chia sẻ & liên kết
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex flex-col w-full gap-6">
                    {selectedTab === 0 && (
                        <div className="flex flex-col gap-3">
                            <label className="font-semibold text-white">Tên không gian</label>
                            <BasicInput
                                value={name}
                                onChange={onNameChange}
                                maxLength={32}
                                className="bg-white/10 text-white border border-indigo-300 rounded-lg px-3 py-2 placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    )}
                    {selectedTab === 1 && (
                        <div className="flex flex-col gap-4">
                            <BasicButton
                                className="flex flex-row items-center gap-2 text-sm max-w-max bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 shadow-lg"
                                onClick={copyLink}
                            >
                                Sao chép liên kết <Copy />
                            </BasicButton>
                            <BasicButton
                                className="flex flex-row items-center gap-2 text-sm max-w-max bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 shadow-lg"
                                onClick={generateNewLink}
                            >
                                Tạo liên kết mới <Copy />
                            </BasicButton>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="w-full max-w-2xl flex justify-end mt-6">
                <BasicButton
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
                    onClick={save}
                >
                    Lưu thay đổi
                </BasicButton>
            </div>
        </div>
    )
}

export default ManageChild
