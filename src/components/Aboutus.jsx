import React from 'react'
import Lottie,{} from 'lottie-react'
import animationData from "../assets/aboutusanm.json"
function Aboutus() {
  return (
    <div className='bg-gradient-to-br from-blue-200 to-amber-50 grid sm:grid-cols-2 grid-cols-1 bg-opacity-30 h-full mt-28' id='aboutus'>
        <Lottie className=' w-full sm:block hidden ' animationData={animationData} />
        <div className='text-center my-auto'>
            <span className='text-3xl font-serif'>About us</span>
            <p className='text-xl font-serif tracking-wide italic mt-4 mx-2'><span className='text-4xl'>"</span>Welcome to our platform, where every book is a new adventure waiting to be explored! Dive into a world of literature, discover new authors, and find your next great read with us.&nbsp;&nbsp;&nbsp;&nbsp;<span className='text-xl'>"</span></p>
            <p className='text-xl font-serif  tracking-wide text-gray-500 italic mt-4 mx-2'>Imagine a place where every book is a doorway to a new world, a new perspective, a new adventure. That's what our platform offers a curated collection of books waiting to be discovered. </p>
            </div>
    </div>
  )
}

export default Aboutus