import React from 'react'
import icon from '../assets/icon.png'
function Logo() {
  return (
    <div className='justify-self-center items-center sm:justify-self-start sm:ml-2'>
       <img src={icon}  className='shadow w-16 h-16 '/>
      <div className='flex'> <span className='font-serif text-sky-700 font-bold'>Book </span><span className='font-serif text-amber-600 font-bold' >Bazar </span></div>
      <div className='text'></div> 
       </div>
  )
}

export default Logo