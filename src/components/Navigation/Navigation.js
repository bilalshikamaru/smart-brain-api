import React from 'react'

const Navigation=({onRouteChange, isSignedIn=false})=>{
        if(isSignedIn){
            return(
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                     <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('signout')}>sign out</p>
                </nav>
            )        
        }else{
            return(
                <div>
                    <nav style={{display:'flex',justifyContent:'flex-end'}}>
                        <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('signin')}>sign in</p>
                        <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('register')}>register</p>
                   </nav>
                </div>
            )
 
        }
}

export default Navigation