'use client'
import React, { useState, useEffect } from 'react'
import signal from '@/utils/signal'

type CoordsProps = {
    
}

const Coords:React.FC<CoordsProps> = () => {

    const [coords, setCoords] = useState({x: 0, y: 0})

    useEffect(() => {
        const setCoordinates = (data: any) => {
            setCoords(data)
        }

        signal.on('coordinates', setCoordinates)

        return () => {
            signal.off('coordinates', setCoordinates)
        }
    }, [])
    
    return (
        <div className='absolute bottom-[12px] right-[420px] px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl text-indigo-900 font-bold shadow pointer-events-none select-none'>
            x:{coords.x} y:{coords.y}
        </div>
    )
}

export default Coords