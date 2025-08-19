'use client'
import React, { useState, useEffect } from 'react'
import ToolButton from './ToolButton'
import { HandRaisedIcon } from '@heroicons/react/24/outline'
import { Tool, TileMode, SpecialTile, Layer } from '@/utils/pixi/types'
import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/solid'
import { Eraser, ArrowUUpLeft, ArrowUUpRight } from '@phosphor-icons/react'
import { GridFour, Square, Eye, EyeSlash, Wall, FlowerTulip, Couch, Atom } from '@phosphor-icons/react'
import signal from '@/utils/signal'

type LeftBarProps = {
  tool: Tool
  tileMode: TileMode
  selectTool: (tool: Tool) => void
  selectTileMode: (mode: TileMode) => void
  specialTile: SpecialTile
  selectEraserLayer: (layer: Layer | 'gizmo') => void
  eraserLayer: Layer | 'gizmo'
}

const LeftBar: React.FC<LeftBarProps> = ({
  tool,
  tileMode,
  selectTool,
  selectTileMode,
  specialTile,
  selectEraserLayer,
  eraserLayer,
}) => {
  const [showGizmos, setShowGizmos] = useState<boolean>(false)
  const [undoEnabled, setUndoEnabled] = useState<boolean>(false)
  const [redoEnabled, setRedoEnabled] = useState<boolean>(false)

  function toggleShowGizmos() {
    const show = !showGizmos
    setShowGizmos(show)
    signal.emit('showGizmos', show)
  }

  function undo() {
    signal.emit('undo')
  }

  function redo() {
    signal.emit('redo')
  }

  useEffect(() => {
    const onShowGizmos = () => {
      setShowGizmos(true)
    }

    const onUndoEnabled = (enabled: boolean) => {
      setUndoEnabled(enabled)
    }

    const onRedoEnabled = (enabled: boolean) => {
      setRedoEnabled(enabled)
    }

    signal.on('gizmosVisible', onShowGizmos)
    signal.on('undoEnabled', onUndoEnabled)
    signal.on('redoEnabled', onRedoEnabled)

    return () => {
      signal.off('gizmosVisible', onShowGizmos)
      signal.off('undoEnabled', onUndoEnabled)
      signal.off('redoEnabled', onRedoEnabled)
    }
  }, [])

  return (
    <div className="w-[52px] bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 flex flex-col items-center py-2 gap-3 border-r border-white/20 shadow-md">
      {/* Công cụ chính */}
      <ToolButton
        selected={tool === 'Hand'}
        label={'Di chuyển'}
        onClick={() => selectTool('Hand')}
      >
        <HandRaisedIcon className="h-7 w-7 text-white" />
      </ToolButton>

      <ToolButton
        selected={tool === 'ZoomIn'}
        label={'Phóng to'}
        onClick={() => selectTool('ZoomIn')}
      >
        <MagnifyingGlassPlusIcon className="h-7 w-7 text-white" />
      </ToolButton>

      <ToolButton
        selected={tool === 'ZoomOut'}
        label={'Thu nhỏ'}
        onClick={() => selectTool('ZoomOut')}
      >
        <MagnifyingGlassMinusIcon className="h-7 w-7 text-white" />
      </ToolButton>

      <ToolButton
        selected={tool === 'Eraser'}
        label={'Tẩy'}
        onClick={() => selectTool('Eraser')}
      >
        <Eraser className="h-7 w-7 text-white" />
      </ToolButton>

      <div className="w-8 h-[1px] bg-white/20" />

      {/* Chế độ vẽ */}
      <ToolButton
        selected={tileMode === 'Single'}
        label={'1 ô'}
        onClick={() => selectTileMode('Single')}
      >
        <Square className="h-7 w-7 text-white" />
      </ToolButton>

      <ToolButton
        selected={tileMode === 'Rectangle'}
        label={'Khối ô'}
        onClick={() => selectTileMode('Rectangle')}
      >
        <GridFour className="h-7 w-7 text-white" />
      </ToolButton>

      <div className="w-8 h-[1px] bg-white/20" />

      {/* Gizmos */}
      <ToolButton
        selected={false}
        onClick={toggleShowGizmos}
        label={'Ẩn/Hiện tile đặc biệt'}
        className={specialTile !== 'None' ? 'pointer-events-none text-gray-500' : ''}
      >
        {showGizmos ? (
          <EyeSlash className="h-7 w-7 text-white" />
        ) : (
          <Eye className="h-7 w-7 text-white" />
        )}
      </ToolButton>

      <div className="w-8 h-[1px] bg-white/20" />

      {/* Undo Redo */}
      <ToolButton
        selected={false}
        label={'Hoàn tác'}
        onClick={undo}
        disabled={!undoEnabled}
      >
        <ArrowUUpLeft className="h-7 w-7 text-white" />
      </ToolButton>

      <ToolButton
        selected={false}
        label={'Làm lại'}
        onClick={redo}
        disabled={!redoEnabled}
      >
        <ArrowUUpRight className="h-7 w-7 text-white" />
      </ToolButton>

      <div className="w-8 h-[1px] bg-white/20" />

      {/* Công cụ tẩy chi tiết */}
      {tool === 'Eraser' && (
        <div className="flex flex-col gap-2">
          <ToolButton
            selected={eraserLayer === 'floor'}
            label={'Xóa sàn'}
            onClick={() => selectEraserLayer('floor')}
          >
            <Wall className="h-7 w-7 text-white" />
          </ToolButton>
          <ToolButton
            selected={eraserLayer === 'above_floor'}
            label={'Xóa vật trên sàn'}
            onClick={() => selectEraserLayer('above_floor')}
          >
            <FlowerTulip className="h-7 w-7 text-white" />
          </ToolButton>
          <ToolButton
            selected={eraserLayer === 'object'}
            label={'Xóa đồ vật'}
            onClick={() => selectEraserLayer('object')}
          >
            <Couch className="h-7 w-7 text-white" />
          </ToolButton>
          <ToolButton
            selected={eraserLayer === 'gizmo'}
            label={'Xóa tile đặc biệt'}
            onClick={() => selectEraserLayer('gizmo')}
          >
            <Atom className="h-7 w-7 text-white" />
          </ToolButton>
        </div>
      )}
    </div>
  )
}

export default LeftBar
