import React, { useEffect, useRef, useState } from 'react'
import signal from '@/utils/signal'
import { useModal } from '../hooks/useModal'
import { Trash } from '@phosphor-icons/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { removeExtraSpaces, formatForComparison } from '@/utils/removeExtraSpaces'

type RoomItemProps = {
  rooms: string[]
  selectedRoomIndex: number
  roomIndex: number
  roomName: string
  setRooms: (rooms: string[]) => void
}

const RoomItem: React.FC<RoomItemProps> = ({
  rooms,
  selectedRoomIndex,
  roomIndex,
  roomName,
  setRooms,
}) => {
  const { setModal, setRoomToDelete } = useModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputDisabled, setInputDisabled] = useState<boolean>(true)
  const previousRoomName = useRef<string>(roomName)

  const onRoomClick = () => {
    if (selectedRoomIndex === roomIndex) return
    signal.emit('changeRoom', roomIndex)
  }

  const onTrashClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    setModal('Delete Room')
    setRoomToDelete({
      name: roomName,
      index: roomIndex,
    })
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value
    newValue = removeExtraSpaces(newValue)
    signal.emit('changeRoomName', { index: roomIndex, newName: newValue })
  }

  const onPencilClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    setInputDisabled(false)
    inputRef.current?.focus()
    inputRef.current?.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    )

    if (inputRef.current?.value) {
      previousRoomName.current = inputRef.current.value
    }
  }

  function roomNameAlreadyExists(newName: string) {
    newName = formatForComparison(newName)
    let count = 0
    rooms.forEach((room) => {
      const roomName = formatForComparison(room)
      if (roomName === newName) count++
    })
    return count > 1
  }

  function revertRoomName() {
    const newRooms = [...rooms]
    newRooms[roomIndex] = previousRoomName.current
    setRooms(newRooms)
    signal.emit('changeRoomName', {
      index: roomIndex,
      newName: previousRoomName.current,
    })
  }

  function fixRoomNameErrors() {
    if (roomNameAlreadyExists(rooms[roomIndex])) {
      revertRoomName()
      toast.error('Tên phòng phải là duy nhất.')
      return
    } else if (rooms[roomIndex].trim() === '') {
      revertRoomName()
      toast.error('Tên phòng không được để trống.')
      return
    }
  }

  useEffect(() => {
    const onBlur = () => {
      setInputDisabled(true)
      fixRoomNameErrors()
    }

    inputRef.current?.addEventListener('blur', onBlur)
    return () => {
      inputRef.current?.removeEventListener('blur', onBlur)
    }
  }, [rooms, roomIndex])

  return (
    <div
      onClick={onRoomClick}
      className={`w-full p-2 px-3 rounded-lg flex flex-row items-center justify-between transition-colors duration-200 ${
        selectedRoomIndex === roomIndex
          ? 'bg-indigo-800 border border-white/40 shadow-md'
          : 'bg-gradient-to-r from-indigo-950 to-purple-950 hover:bg-indigo-800/60 cursor-pointer'
      }`}
    >
      <input
        type="text"
        value={rooms[roomIndex]}
        ref={inputRef}
        maxLength={32}
        onChange={onInputChange}
        className={`grow bg-transparent outline-none text-white font-medium ${
          inputDisabled ? 'pointer-events-none cursor-default' : 'ring-1 ring-indigo-400 px-1 rounded-sm'
        }`}
      />
      <div className="flex flex-row items-center gap-2">
        <PencilSquareIcon
          className="h-5 w-5 cursor-pointer text-gray-300 hover:text-indigo-400 transition-colors"
          onClick={onPencilClick}
        />
        <Trash
          className={`h-5 w-5 cursor-pointer text-gray-300 hover:text-red-400 transition-colors ${
            rooms.length <= 1 ? 'hidden' : ''
          }`}
          onClick={onTrashClick}
        />
      </div>
    </div>
  )
}

export default RoomItem
