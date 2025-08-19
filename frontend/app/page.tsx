'use client'
import AnimatedCharacter from './play/SkinMenu/AnimatedCharacter'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import { Code } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export default function Index() {
  return (
    <div className='relative w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 p-6 flex flex-col justify-center items-center overflow-hidden'>

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse absolute w-2 h-2 bg-white/40 rounded-full top-1/4 left-1/3 blur-sm"></div>
        <div className="animate-ping absolute w-3 h-3 bg-indigo-400/50 rounded-full top-2/3 left-2/3"></div>
        <div className="animate-pulse absolute w-2 h-2 bg-purple-300/40 rounded-full top-1/2 left-1/5"></div>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 max-w-5xl gap-10 items-center z-10'>
        
        {/* Left: Text content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className='flex flex-col items-start backdrop-blur-sm bg-white/5 p-6 rounded-2xl shadow-lg'
        >
          <h1 className='font-extrabold text-4xl sm:text-5xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-400 drop-shadow-lg'>
            Chào mừng đến với Gather
          </h1>

          <p className='mt-6 text-lg text-white/90 leading-relaxed'>
            Đây là dự án fork và phát triển lại từ <span className='font-semibold text-indigo-200'>Gather Clone</span>, 
            phục vụ cho môn học <b>Phát triển mã nguồn mở</b>.<br/>
            Gather là một không gian ảo giúp bạn giao lưu, học tập và làm việc nhóm hiệu quả.
          </p>

          <div className='mt-8 flex flex-col sm:flex-row gap-4'>
            <Link href='/app'>
              <motion.div whileHover={{ scale: 1.05 }}>
                <BasicButton className="rounded-full shadow-lg hover:shadow-indigo-500/50 transition">
                  Bắt đầu trải nghiệm
                </BasicButton>
              </motion.div>
            </Link>
            <a href="https://www.youtube.com/watch?v=AnhsC7Fmt20" target="_blank" rel="noopener noreferrer" className='underline text-white/80 text-sm self-center hover:text-white transition'>
              Xem video demo
            </a>
          </div>

          <div className='flex flex-row items-center gap-6 mt-8'>
            <p className='text-sm text-white/80'>
              Phát triển bởi <span className='font-bold underline text-white'>Persinus</span>
            </p>
            <div className='inline-flex flex-row items-center gap-2'>
              <a href='https://github.com/Persinus/open-source-development-Gather' target="_blank" rel="noopener noreferrer" className='text-sm underline font-bold text-white hover:text-indigo-300'>
                Xem mã nguồn
              </a>
              <Code className='w-4 h-4 text-white'/>
            </div>
          </div>
        </motion.div>

        {/* Right: Character preview */}
<motion.div 
  initial={{ opacity: 0, x: 50 }} 
  animate={{ opacity: 1, x: 0 }} 
  transition={{ duration: 0.8, delay: 0.2 }}
  className='flex flex-col gap-6 items-center'
>
  

  {/* Grid nhân vật */}
  <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center'>
    <AnimatedCharacter src='/sprites/characters/Character_001.png' />
    <AnimatedCharacter src='/sprites/characters/Character_002.png' />
    <AnimatedCharacter src='/sprites/characters/Character_003.png' />
    <AnimatedCharacter src='/sprites/characters/Character_004.png' />
    <AnimatedCharacter src='/sprites/characters/Character_005.png' />
    <AnimatedCharacter src='/sprites/characters/Character_006.png' />
    <AnimatedCharacter src='/sprites/characters/Character_007.png' />
    <AnimatedCharacter src='/sprites/characters/Character_008.png' />

  </div>
  {/* Thumbnail game */}
  <motion.img
    src="/thumbnail1.png"
    alt="Game Thumbnail"
    className="w-full max-w-md rounded-xl shadow-lg border border-white/20"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
  />
</motion.div>


      </div>
    </div>
  )
}
