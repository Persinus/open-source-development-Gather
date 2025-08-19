'use client'
import React from 'react'
import Modal from '@/components/Modal/Modal'
import { useModal } from '@/app/hooks/useModal'
import { motion } from 'framer-motion'
import AnimatedCharacter from './SkinMenu/AnimatedCharacter'
import { MousePointerClick, X } from 'lucide-react'

const keyStyle =
  "w-12 h-12 flex items-center justify-center bg-white/20 border border-white/40 rounded-xl shadow-md text-lg font-bold text-white backdrop-blur-sm hover:bg-white/30 transition"

const MovementGuideModal: React.FC = () => {
  const { modal, setModal } = useModal()
  const open = modal === 'Movement Guide'

  return (
    <Modal open={open} closeOnOutsideClick>
      <div className="relative flex w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* ❌ Nút đóng góc trên phải */}
        <button
          onClick={() => setModal('None')}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 transition shadow-md"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* 30% Trái: Nhân vật */}
        <div className="w-[30%] flex flex-col items-center justify-center gap-4 border-r border-white/20 p-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Hướng dẫn</h2>
          <AnimatedCharacter
            src={`/sprites/characters/Character_001.png`}
            className="w-40"
          />
        </div>

        {/* 70% Phải: Hướng dẫn phím + chuột */}
        <div className="w-[70%] flex flex-col items-center justify-center gap-10 p-6">
          
          {/* WASD keys */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                W
              </motion.div>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                A
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                S
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                D
              </motion.div>
            </div>
            <p className="text-sm text-indigo-100 font-medium">Di chuyển nhân vật</p>
          </div>

          {/* Arrow keys */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                ↑
              </motion.div>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                ←
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                ↓
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className={keyStyle}>
                →
              </motion.div>
            </div>
            <p className="text-sm text-indigo-100 font-medium">Di chuyển thay thế</p>
          </div>

          {/* Mouse Right Click */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-44 h-12 flex items-center justify-center gap-2 bg-white/20 border border-white/40 rounded-xl shadow-md text-base font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition"
            >
              <MousePointerClick className="w-5 h-5" />
              Chuột phải
            </motion.div>
            <p className="text-sm text-center text-indigo-100 font-medium">
              Nhấn chuột phải vào vị trí để di chuyển đến đó
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default MovementGuideModal
