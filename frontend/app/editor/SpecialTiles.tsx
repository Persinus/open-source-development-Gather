import React from 'react'
import SpecialTileItem from './SpecialTileItem'
import { SpecialTile } from '@/utils/pixi/types'
import { Placeholder, FlyingSaucer, Tree, Desk } from '@phosphor-icons/react'

type SpecialTilesProps = {
    specialTile: SpecialTile
    selectSpecialTile: (specialTile: SpecialTile) => void
}

const SpecialTiles:React.FC<SpecialTilesProps> = ({ specialTile, selectSpecialTile }) => {
    return (
        <div className='w-full flex flex-col items-center gap-3 p-3 text-white'>
            <SpecialTileItem 
                iconColor='yellow' 
                title='Khu vực riêng tư' 
                description='Tạo khu vực để người chơi nói chuyện riêng.' 
                selected={specialTile === 'Private Area'} 
                onClick={() => selectSpecialTile('Private Area')}>
                <Desk className='w-12 h-12'/>
            </SpecialTileItem>

            <SpecialTileItem 
                iconColor='red' 
                title='Không thể đi qua' 
                description='Đánh dấu các ô mà người chơi không thể bước vào.' 
                selected={specialTile === 'Impassable'} 
                onClick={() => selectSpecialTile('Impassable')}>
                <Placeholder className='w-12 h-12'/>
            </SpecialTileItem>

            <SpecialTileItem 
                iconColor='blue' 
                title='Dịch chuyển' 
                description='Tạo điểm dịch chuyển một chiều giữa các ô.' 
                selected={specialTile === 'Teleport'} 
                onClick={() => selectSpecialTile('Teleport')}>
                <FlyingSaucer className='w-12 h-12'/>
            </SpecialTileItem>

            <SpecialTileItem 
                iconColor='green' 
                title='Điểm xuất hiện' 
                description='Xác định nơi người chơi xuất hiện trong thế giới.' 
                selected={specialTile === 'Spawn'} 
                onClick={() => selectSpecialTile('Spawn')}>
                <Tree className='w-12 h-12'/>
            </SpecialTileItem>
        </div>
    )
}

export default SpecialTiles
