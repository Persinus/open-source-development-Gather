import React, { useState } from 'react'
import TileMenu from '../TileMenu'
import { SpecialTile } from '@/utils/pixi/types'
import SpecialTiles from '../SpecialTiles'
import { SheetName } from '@/utils/pixi/spritesheet/spritesheet'
import { TileWithPalette } from '../Editor'

type RightSectionProps = {
  selectedTile: TileWithPalette
  setSelectedTile: (tile: TileWithPalette) => void
  selectSpecialTile: (specialTile: SpecialTile) => void
  specialTile: SpecialTile
  rooms: string[]
  setRooms: (rooms: string[]) => void
  roomIndex: number
  setRoomIndex: (index: number) => void
  palettes: SheetName[]
  selectedPalette: SheetName
  setSelectedPalette: (palette: SheetName) => void
}

type Tab = 'Tile' | 'Special Tiles'

const RightSection: React.FC<RightSectionProps> = ({
  selectedTile,
  setSelectedTile,
  specialTile,
  selectSpecialTile,
  rooms,
  setRooms,
  roomIndex,
  setRoomIndex,
  palettes,
  selectedPalette,
  setSelectedPalette,
}) => {
  const [tab, setTab] = useState<Tab>('Tile')

  return (
    <div className="w-[400px] bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 flex flex-col select-none border-l border-white/20 shadow-lg">
      {/* Tabs */}
      <div className="flex flex-row h-11 px-2">
        <div
          className={`grow grid place-items-center cursor-pointer rounded-t-md px-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
            tab === 'Tile'
              ? 'bg-indigo-800 text-white border-t-2 border-white shadow-inner pointer-events-none'
              : 'text-gray-300 hover:bg-white/10'
          }`}
          onClick={() => setTab('Tile')}
        >
          Gạch
        </div>
        <div
          className={`grow grid place-items-center cursor-pointer rounded-t-md px-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
            tab === 'Special Tiles'
              ? 'bg-indigo-800 text-white border-t-2 border-white shadow-inner pointer-events-none'
              : 'text-gray-300 hover:bg-white/10'
          }`}
          onClick={() => setTab('Special Tiles')}
        >
          Ô đặc biệt
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-white/20" />

      {/* Nội dung */}
      <div className="flex-1 overflow-auto">
        {tab === 'Tile' && (
          <TileMenu
            selectedTile={selectedTile}
            setSelectedTile={setSelectedTile}
            rooms={rooms}
            setRooms={setRooms}
            roomIndex={roomIndex}
            setRoomIndex={setRoomIndex}
            palettes={palettes}
            selectedPalette={selectedPalette}
            setSelectedPalette={setSelectedPalette}
          />
        )}
        {tab === 'Special Tiles' && (
          <SpecialTiles specialTile={specialTile} selectSpecialTile={selectSpecialTile} />
        )}
      </div>
    </div>
  )
}

export default RightSection
