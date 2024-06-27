import React, { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import Searchbar from './Searchbar.jsx'
import { useNavigate ,useParams} from 'react-router-dom' 
import axios from 'axios'
import baricon from "../assets/bar-code.png"
import books from "../assets/book.svg"
import category from "../assets/category.svg"

function Bookprofile() {
  const API_KEY=import.meta.env.VITE_GOOGLE_API
  const navigate= useNavigate()
  const {id} = useParams()
  const [book,setbook]=useState(false)
  const [otherinfo,setotherinfo]=useState(false)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`https://softwium.com/api/books/${id}`);
        setbook(response.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData()
  },[])

  useEffect(()=>{
    
      const fetchData = async () => {
        try {
          console.log("inside fetch");
         
         const response2 =await axios.get(`https://www.googleapis.com/auth/books/v1/volumes?q=isbn:${book.isbn}&key=${API_KEY}`)
         console.log(response2.data);
          const data=response2.data.items[0]
          console.log(data);
          const info={
            publisher:data.volumeInfo.publisher,
            publishedDate:data.volumeInfo.publishedDate,
            description:data.volumeInfo.description,
            categories:data.volumeInfo.categories,
            infoLink:data.volumeInfo.infoLink,
  
          }
          
         setotherinfo(info);
          console.log("leaving fetch");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
     if(book){
      fetchData()
     }
  },[])
  return (
    <>
    <div className='grid sm:grid-cols-3 gap-4 m-2' >
    <Logo/>
    <div className='sm:flex  justify-self-center items-center sm:justify-self-start '>
    <button className='ml-4 text-gray-400 hover:text-black 'onClick={()=>{navigate("/books")}}>Explore books</button>
    </div>
    <Searchbar/>
    </div>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 m-16'>
    <img class="rounded-t-lg  h-9/12  border-2 sm:w-full w-4/5 justify-self-center item-center shadow" src={`https://covers.openlibrary.org/b/isbn/${book.isbn}.jpg` } alt="" />
    <div className='justify-self-center item-center sm:justify-self-start'>
    <h1 className='sm:text-4xl text-2xl font-serif border-b-4 border-gray-200p-2'>Title : {book.title}</h1>
    <div className='grid grid-cols-3  gap-2 m-4 border-b-4 border-gray-200' >
      <div className='flex flex-col items-start'>
       <img src={baricon}  className='w-12 h-12 rounded-lg'/>
       <span >Isbn</span>
       <h3 >{book.isbn}</h3>
      </div>
      <div className='flex flex-col items-center '>
       <img src={books}  className='w-12 h-12 rounded-lg'/>
       <span >Page count</span>
       <h3 >{book.pageCount}</h3>
      </div>
      <div className='flex flex-col items-end'>
       <img src={category}  className='w-12 h-12 rounded-lg'/>
       <span >Category</span>
       <h3 >{otherinfo===false? (<h3 className='text-gray-400'>Nil</h3>) :(<h3>{otherinfo.categories}</h3>)}</h3>
      </div>
    </div>
    <h2 className='sm:text-2xl text-xl mt-4 p-2'>Description:</h2>
    {otherinfo===false ?(<h3 className=' sm:text-l text-md p-2 text-gray-400'>No description Available </h3>):(<h3 className='sm:text-l text-md italic font-serif text-blue-700 ml-2 p-2'>{otherinfo.description}</h3>)}
    <div className='flex mt-4 p-2'>
    <h2 className='sm:text-2xl text-xl'>Author:</h2>
    {book && book.authors.map((name,ind)=>(
      <p  className='sm:text-l text-md italic font-serif text-blue-700 m-2'>{name},</p>
    ))}
    </div>
    <div className='flex mt-4 p-2'>
    <h2 className='sm:text-2xl text-xl'>Publisher:</h2>
    {otherinfo===false ?(<h3 className=' sm:text-l text-md p-2 text-gray-400'>Publisher info Unavailable </h3>):(<h3 className='sm:text-l text-md italic font-serif text-blue-700 p-2 ml-2'>{otherinfo.publisher}</h3>)}
    </div>
    <div className='flex mt-4 p-2'>
    <h2 className='sm:text-2xl text-xl'>Published date:</h2>
    {otherinfo===false ?(<h3 className=' sm:text-l text-md p-2 text-gray-400'>Published date info Unavailable </h3>):(<h3 className='sm:text-l text-md italic font-serif text-blue-700 p-2 ml-2'>{otherinfo.publishedDate}</h3>)}
    </div>
    <div className='flex mt-4 p-2'>
    <h2 className='sm:text-2xl text-xl'>Preview link:</h2>
    {otherinfo===false ?(<h3 className=' sm:text-l text-md p-2 text-gray-400'> Unavailable </h3>):(<a href={otherinfo.infoLink} className='sm:text-l text-md italic font-serif text-voilet-700 p-2 ml-2'>Preview</a>)}
    </div>
    </div>
    </div>
    </>
  )
}

export default Bookprofile