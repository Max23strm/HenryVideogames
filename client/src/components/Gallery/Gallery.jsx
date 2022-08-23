import React, { useState } from 'react'
import SmallerSpinner from '../UI/SmallerSpinner'
import '../Gallery/Gallery.css'

function Gallery({arr}) {
    const [showing,setShowing]=useState(arr[0])
    const [mostrar, setMostrar]=useState(false)
    console.log(arr)

    const handleGalleryClick=()=>{
        if(arr[1]){
            showing===arr[1]?setShowing(arr[0]):setShowing(arr[1])
            handleLoad()
        }
    }
    const handleLoad=()=>{
        setMostrar(!mostrar)
    }

    return (
        <div className='gallery'>
            <button disabled={arr[1]?false:true} onClick={handleGalleryClick} className='galleryB'>
                &#8249;
            </button>
                <div className={`${!mostrar ? "show": "hidden"}`}>
                    <SmallerSpinner />
                </div>
                <img onLoad={handleLoad} src={showing} className={`${!mostrar ? "hidden": "show"}`} alt="" />
            <button disabled={arr[1]?false:true} onClick={handleGalleryClick} className='galleryB'>
                &#8250;
            </button>
        </div>
    )
}

export default Gallery