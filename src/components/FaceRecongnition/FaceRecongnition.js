import React from 'react'
import './FaceRecongnition.css'



const FaceRecongnition=({urlImage, box})=>{
    return(
        <div className='center'>
           <div className='absolute mt2'>
            <img id='inputImage' alt={''} src={urlImage} with='500px' height='auto'/>
            <div className='bounding-box' style={{left:box.leftCol, top:box.heightRow, right:box.rightCol , bottom:box.bottomRow}}></div>
           </div>
        </div>
     )
}
export default FaceRecongnition
