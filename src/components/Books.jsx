import React, { useState } from 'react'
import Logo from './Logo.jsx'
import Searchbar from './Searchbar.jsx'
import { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Books() {
    const [books,setbooks]=useState()
    const navigate=useNavigate()
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("https://softwium.com/api/books");
        setbooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData()
  },[])
  
  const clickhandler=(index)=>{
    console.log("indide click");
     navigate(`/books/${index + 1}`)
  }
  return (
    <>
    <div className='grid sm:grid-cols-2 gap-4 m-2' >
   <Logo/>
   <Searchbar/>
    </div>



<div className='text-2xl  sm:mx-16 grid sm:grid-cols-1'><span className='justify-self-center items-center mt-12 sm:justify-self-start' >All Books</span></div>

<div className='sm:my-4 my-2 grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
  {books && books.map((object,index)=>(
<div key={index} class="md:w-4/5 sm:w-4/5 w-3/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 span-col-1 sm:span-col-1 justify-self-center items-center"> 
<img class="rounded-t-lg md:h-60 sm:h-60 h-52 w-full" src={`https://covers.openlibrary.org/b/isbn/${object.isbn}.jpg` } alt="" />
<div class="p-5">
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{object.title}</h5>
<h4 className='text-xl'>Authors</h4>
<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{object.authors.map((item,ind)=>(<span>{item},</span>))}</p>
<button onClick={()=>clickhandler(index)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Read more
 <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>
</div>
</div>
  ))}
</div>
</>
  )
}

export default Books