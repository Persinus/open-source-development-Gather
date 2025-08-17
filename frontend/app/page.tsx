'use client'
import AnimatedCharacter from './play/SkinMenu/AnimatedCharacter'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import { Code } from '@phosphor-icons/react'

export default function Index() {
  return (
    <div className='w-full grid place-items-center h-screen gradient p-4 relative'>
      <div className='max-w-[600px] flex flex-col items-center'>
        <div>
          <h1 className='font-semibold text-3xl'>Chào mừng đến với Persinus!</h1>   
          <p className='w-full text-xl my-6'>
            Đây là dự án fork và phát triển lại từ Gather Clone, phục vụ cho môn học <b>Phát triển mã nguồn mở</b>. 
            Persinus là một không gian ảo giúp bạn giao lưu, học tập và làm việc nhóm hiệu quả.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Link href='/app' >
            <BasicButton>
              Bắt đầu trải nghiệm
            </BasicButton>
          </Link>
          <span className='mt-4 text-sm'>
            hoặc xem video demo 
            <a href="https://www.youtube.com/watch?v=AnhsC7Fmt20" target="_blank" rel="noopener noreferrer" className='underline ml-1'>tại đây</a>
          </span>
        </div>
        <div className='flex flex-row items-center justify-center mt-6 gap-8'>
          <p className='text-sm'>
            Phát triển bởi <span className='font-bold underline'>[Tên của bạn]</span>
          </p>
          <div className='inline-flex flex-row items-center justify-center gap-2'>
            <a href='https://github.com/[tên-github-của-bạn]/gather-clone' target="_blank" rel="noopener noreferrer" className='text-sm underline font-bold'>Xem mã nguồn</a>
            <Code className='w-4 h-4'/>
          </div>
        </div>
        <AnimatedCharacter src='/sprites/characters/Character_009.png'/>
      </div>
    </div>
  )
}
