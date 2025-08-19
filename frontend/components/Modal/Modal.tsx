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
const isLargeModal = 
    modal === 'Skin' || 
    modal === 'Movement Guide' || 
    modal === 'Music'

    
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-10" 
        onClose={closeOnOutsideClick ? () => setModal('None') : () => {}} 
      >
        {/* Background overlay */}
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

        {/* Modal container */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center items-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Dialog.Panel
                className={`
                  relative transform rounded-3xl shadow-2xl transition-all
                  bg-white/20 backdrop-blur-xl border border-indigo-200
                  p-6
                  ${isLargeModal 
                    ? 'w-[90%] max-w-5xl max-h-[85vh] overflow-y-auto'   // Skin modal to hơn, có scroll
                    : 'max-w-md w-full my-8'                              // modal thường
                  }
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
