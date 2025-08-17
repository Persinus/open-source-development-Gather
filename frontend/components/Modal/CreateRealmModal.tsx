'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'
import BasicButton from '../BasicButton'
import BasicInput from '../BasicInput'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation' 
import revalidate from '@/utils/revalidate'
import { removeExtraSpaces } from '@/utils/removeExtraSpaces'
import defaultMap from '@/utils/defaultmap.json'

const CreateRealmModal:React.FC = () => {
    const { modal, setModal } = useModal()
    const [realmName, setRealmName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [useDefaultMap, setUseDefaultMap] = useState<boolean>(true)
    const router = useRouter()

    async function createRealm() {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const uid = user.id
        setLoading(true)
        const realmData: any = {
            owner_id: uid,
            name: realmName,
        }
        if (useDefaultMap) {
            realmData.map_data = defaultMap
        }
        const { data, error } = await supabase.from('realms').insert(realmData).select()
        if (error) {
            toast.error(error?.message)
        } 
        if (data) {
            setRealmName('')
            revalidate('/app')
            setModal('None')
            toast.success('Không gian mới đã được tạo!')
            router.push(`/editor/${data[0].id}`)
        }
        setLoading(false)
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = removeExtraSpaces(e.target.value)
        setRealmName(value)
    }

    return (
        <Modal open={modal === 'Create Realm'} closeOnOutsideClick>
            <div className="flex flex-col items-center p-6 w-[380px] gap-5 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-200">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 mb-1">
                    Tạo không gian mới
                </h1>
                <p className="text-indigo-200 text-center text-sm mb-2">
                    Đặt tên cho không gian của bạn và chọn bản đồ khởi đầu.
                </p>
                <BasicInput
                    className="w-[260px]"
                    value={realmName}
                    onChange={onChange}
                    maxLength={32}
                />
                <div className="flex items-center gap-2 w-[260px]">
                    <input
                        type="checkbox"
                        id="useDefaultMap"
                        checked={useDefaultMap}
                        onChange={(e) => setUseDefaultMap(e.target.checked)}
                        className="accent-indigo-600 w-4 h-4"
                    />
                    <label
                        htmlFor="useDefaultMap"
                        className="text-indigo-700 font-semibold select-none cursor-pointer drop-shadow"
                    >
                        Sử dụng bản đồ mẫu mặc định
                    </label>
                </div>
                <BasicButton
                    disabled={realmName.length <= 0 || loading}
                    onClick={createRealm}
                    className="text-lg w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white font-bold rounded-xl py-2 shadow hover:scale-105 transition-all"
                >
                    {loading ? 'Đang tạo...' : 'Tạo không gian'}
                </BasicButton>
            </div>
        </Modal>
    )
}

export default CreateRealmModal