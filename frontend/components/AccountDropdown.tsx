'use client'
import React, { Fragment } from 'react'
import { useModal } from '@/app/hooks/useModal'
import { Dialog, Transition } from '@headlessui/react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const AccountDropdown:React.FC = () => {
    const { modal, setModal } = useModal()
    const router = useRouter()

    async function handleSignOut() {
        setModal('None')

        const supabase = createClient()
        await supabase.auth.signOut()

        router.push('/signin')
    }
    
    return (
    <Transition.Root show={modal === 'Account Dropdown'} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setModal('None')}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center p-0 relative">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
            >
              <Dialog.Panel className={`absolute top-[78px] right-[8px] transform overflow-hidden text-left shadow-xl transition-all`}>
                <button className='bg-secondary hover:bg-light-secondary animate-colors rounded-md w-32 text-center p-1 outline-none' onClick={handleSignOut}>Đăng xuất</button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AccountDropdown