'use client'
import React, { useState, useEffect } from 'react'
import TopBar from './Toolbars/TopBar'
import LeftBar from './Toolbars/LeftBar'
import RightSection from './Toolbars/RightSection'
import PixiEditor from './PixiEditor'
import Coords from './Toolbars/Coords'
import { RealmData, Tool, TileMode, SpecialTile, Layer } from '@/utils/pixi/types'
import signal from '@/utils/signal'
import { useModal } from '../hooks/useModal'
import { SheetName } from '@/utils/pixi/spritesheet/spritesheet'

type EditorProps = {
    realmData: RealmData
}

export type TileWithPalette = {
    name: string
    palette: SheetName}

const palettes: SheetName[] = ['ground', 'grasslands', 'village']

const Editor:React.FC<EditorProps> = ({ realmData }) => {
    
    const [tool, setTool] = useState<Tool>('None')
    const [tileMode, setTileMode] = useState<TileMode>('Single')
    const [selectedTile, setSelectedTile] = useState<TileWithPalette>({ name: '', palette: 'ground' })
    const [gameLoaded, setGameLoaded] = useState<boolean>(false)
    const [specialTile, setSpecialTile] = useState<SpecialTile>('None')
    const [eraserLayer, setEraserLayer] = useState<Layer | 'gizmo'>('floor')
    const { setModal, setRoomList } = useModal()
    const [rooms, setRooms] = useState<string[]>(realmData.rooms.map(room => room.name))
    const [roomIndex, setRoomIndex] = useState<number>(0)
    const [selectedPalette, setSelectedPalette] = useState<SheetName>(palettes[0])

    function selectTool(tool:Tool) {
        if (gameLoaded === false) return

        setTool(tool)
        setSelectedTile({ name: '', palette: 'ground' })
        signal.emit('selectTool', tool)
    }

    function selectTileMode(mode: TileMode) {
        if (gameLoaded === false) return

        setTileMode(mode)
        signal.emit('selectTileMode', mode)
    }

    function selectSpecialTile(specialTile: SpecialTile) {
        if (gameLoaded === false) return

        setSpecialTile(specialTile)
        setSelectedTile({ name: '', palette: selectedPalette })
        setTool('Tile')
        signal.emit('selectSpecialTile', specialTile)
    }

    function selectTile(tile: TileWithPalette) {
        if (gameLoaded === false) return

        setSelectedTile(tile)
        signal.emit('selectPalette', tile.palette)
        signal.emit('tileSelected', tile.name)
    }

    function selectEraserLayer(layer: Layer | 'gizmo') {
        if (gameLoaded === false) return

        setEraserLayer(layer)
        signal.emit('selectEraserLayer', layer)
    }

    function onPlaceTeleporter(newRoomList: string[]) {
        if (gameLoaded === false) return

        setModal('Teleport')
        setRoomList(newRoomList)
    }

    function onResetSpecialTileMode() {
        setSpecialTile('None')
    }

    function onTileSelected() {
        setTool('Tile')
    }

    useEffect(() => {

        signal.on('tileSelected', onTileSelected)
        signal.on('resetSpecialTileMode', onResetSpecialTileMode)
        signal.on('placeTeleporter', onPlaceTeleporter)

        return () => {
            signal.off('resetSpecialTileMode', onResetSpecialTileMode)
            signal.off('resetSpecialTileMode', onResetSpecialTileMode)
            signal.off('placeTeleporter', onPlaceTeleporter)
        }
    }, [gameLoaded])

    return (
        <div className='relative w-full h-screen flex flex-col  from-indigo-900 via-purple-900 to-indigo-950'>
            <TopBar />
            <div className='w-full grow flex flex-row'>
                <LeftBar tool={tool} tileMode={tileMode} selectTool={selectTool} selectTileMode={selectTileMode} specialTile={specialTile} eraserLayer={eraserLayer} selectEraserLayer={selectEraserLayer}/>
                <PixiEditor className='h-full grow' setGameLoaded={setGameLoaded} realmData={realmData}/>
                <RightSection 
                    selectedTile={selectedTile} 
                    setSelectedTile={selectTile} 
                    specialTile={specialTile} 
                    selectSpecialTile={selectSpecialTile}
                    rooms={rooms}
                    setRooms={setRooms}
                    roomIndex={roomIndex}
                    setRoomIndex={setRoomIndex}
                    palettes={palettes}
                    selectedPalette={selectedPalette}
                    setSelectedPalette={setSelectedPalette}
                />
            </div>
            <Coords />
        </div>
    )
}

export default Editor