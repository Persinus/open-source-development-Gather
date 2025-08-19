'use client'
import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import revalidate from '@/utils/revalidate'
import BasicInput from '../BasicInput'
import { removeExtraSpaces } from '@/utils/removeExtraSpaces'

const DeleteRealmModal: React.FC = () => {
    const { modal, realmToDelete } = useModal()
    const [loading, setLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const onClickDelete = async () => {
        const supabase = createClient()
        setLoading(true)

        const { error } = await supabase.from('realms').delete().eq('id', realmToDelete.id) 

        if (error) {
            setLoading(false)
            toast.error(error.message)
        } else {
            revalidate('/app')
            window.location.reload()
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = removeExtraSpaces(e.target.value)
        setInput(value)
    }

    function getDisabled() {
        return input.trim() !== realmToDelete.name.trim()
    }

    useEffect(() => {
        setInput('')
    }, [modal])

    return (
        <Modal open={modal === 'Delete Realm'} closeOnOutsideClick>
            <div className="p-6 flex flex-col items-center gap-4 
                            bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl 
                            border border-red-500 min-w-[340px]">
                <h1 className="text-xl font-bold text-red-400 text-center mb-1">
                    Xóa không gian <span className="select-none">{realmToDelete.name}</span>?
                </h1>
                <p className="text-center text-gray-200 font-medium">
                    Hành động này không thể hoàn tác! Tất cả dữ liệu sẽ bị xóa vĩnh viễn.
                </p>
                <label className="text-sm text-gray-300 font-semibold mb-1 text-center">
                    Nhập <span className="text-red-400">{realmToDelete.name}</span> để xác nhận:
                </label>
                <BasicInput
                    className="h-10 p-2 bg-black/40 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 w-full"
                    onChange={onChange}
                    value={input}
                />
                <button
                    className={`
                        w-full py-2 rounded-xl font-bold text-lg
                        ${loading ? 'pointer-events-none opacity-70' : ''}
                        ${getDisabled()
                            ? 'bg-red-500/40 opacity-60 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'}
                        text-white shadow-lg transition-all
                    `}
                    disabled={getDisabled() || loading}
                    onClick={onClickDelete}
                >
                    {loading ? 'Đang xóa...' : 'Xóa không gian'}
                </button>
            </div>
        </Modal>
    )
}

export default DeleteRealmModal
