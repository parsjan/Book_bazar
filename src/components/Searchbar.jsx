import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
function Searchbar() {
    const [input,setinput]=useState('')
    const [title,settitle]=useState([])
    const [suggestions,setsuggestions]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get("https://softwium.com/api/books");
              response.data.forEach(obj=>{
                settitle(prevItems => [...prevItems, obj.title])
              })
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
        
          fetchData()
    },[])
    const onchangehandler= (e)=>{
              var value=e.target.value
           setinput(e.target.value)
           if (value.trim() === '') {
            setsuggestions(false);
            return;
          }
           if(title){
           const filteredsuggestions = title.filter(keyword =>
            keyword.toLowerCase().includes(value.toLowerCase())
          );
          setsuggestions(filteredsuggestions);
        }
    }
    const  findIndexOfItem=(arr, item)=>{
      return arr.indexOf(item);
    }
    const handleclicksuggestion=(sugges)=>{
             const id = findIndexOfItem(title, sugges) + 1
             navigate(`/books/${id}`)
    }
  return (
    <div className='justify-self-center items-center sm:justify-self-start relative'>
    <input type="text" placeholder="Seach your books" value={input} onChange={onchangehandler} className='w-3/4 sm:h-8 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-black focus:ring-indigo-500 sm:text-sm sm:w-11/12 sm:mx-16 sm:mt-4 '/>
   {suggestions!=false && (
    <ul className=' absolute z-10 top-full left-0 overflow-y-scroll w-3/4 h-56 rounded-lg px-3 py-2 sm:w-4/5 sm:mx-16 bg-slate-100 '>
    {suggestions.map((suggestion, index) => (
      <li key={index} className='border-b p-2 rounded-lg border-gray-400' onClick={() => handleclicksuggestion(suggestion)}>
        {suggestion}
      </li>
    ))}
  </ul>
   )}
    
   </div>
 )
}

export default Searchbar