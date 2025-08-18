'use client'
import AnimatedCharacter from './play/SkinMenu/AnimatedCharacter'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import { Code } from '@phosphor-icons/react'

export default function Index() {
  return (
    <div className='w-full grid place-items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 p-4 relative'>
      <div className='max-w-[600px] flex flex-col items-center'>
        <div>
          <h1 className='font-semibold text-3xl bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg'>
            Chào mừng đến với Gather
          </h1>   
          <p className='w-full text-xl my-6 text-white/90 drop-shadow'>
            Đây là dự án fork và phát triển lại từ Gather Clone, phục vụ cho môn học <b>Phát triển mã nguồn mở</b>. 
            Gather là một không gian ảo giúp bạn giao lưu, học tập và làm việc nhóm hiệu quả.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Link href='/app' >
            <BasicButton>
              Bắt đầu trải nghiệm
            </BasicButton>
          </Link>
          <span className='mt-4 text-sm text-white/80'>
            hoặc xem video demo 
            <a href="https://www.youtube.com/watch?v=AnhsC7Fmt20" target="_blank" rel="noopener noreferrer" className='underline ml-1'>tại đây</a>
          </span>
        </div>
        <div className='flex flex-row items-center justify-center mt-6 gap-8'>
          <p className='text-sm text-white/80'>
            Phát triển bởi <span className='font-bold underline text-white'>Persinus</span>
          </p>
          <div className='inline-flex flex-row items-center justify-center gap-2'>
            <a href='https://github.com/Persinus/open-source-development-Gather' target="_blank" rel="noopener noreferrer" className='text-sm underline font-bold text-white'>Xem mã nguồn</a>
            <Code className='w-4 h-4 text-white'/>
          </div>
        </div>
        <AnimatedCharacter src='/sprites/characters/Character_009.png'/>
      </div>
    </div>
  )
}
