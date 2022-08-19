import React, { useEffect, useState } from 'react'
import '../Gallery/Gallery.css'

function Gallery({arr}) {
    const [showing,setShowing]=useState("")

    const handleGalleryClick=()=>{
        showing===arr[1]?setShowing(arr[0]):setShowing(arr[1])
    }
    useEffect(()=>{
        setShowing(arr[0])
    },[arr])
    return (
        <div className='gallery'>
            <button onClick={handleGalleryClick} className='galleryB'>
                &#8249;
            </button>
                <img src={showing} alt="" />
            <button onClick={handleGalleryClick} className='galleryB'>
                &#8250;
            </button>
        </div>
    )
}

export default Gallery