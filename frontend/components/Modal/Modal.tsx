'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModal } from '@/app/hooks/useModal'

type ModalProps = {
    children?: React.ReactNode
    className?: string
    open: boolean
    closeOnOutsideClick?: boolean  
}

const Modal: React.FC<ModalProps> = ({ children, className, open, closeOnOutsideClick }) => {

    const { modal, setModal } = useModal()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeOnOutsideClick ? () => setModal('None') : () => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
            >
              <Dialog.Panel
                className={`
                  relative transform overflow-hidden rounded-3xl
                  text-left shadow-2xl transition-all my-8
                  max-w-md w-full
                  bg-white/20 backdrop-blur-xl border border-indigo-200
                  p-6
                  ${className}
                `}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
