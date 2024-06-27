import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements ,Route, RouterProvider} from 'react-router-dom'
import Bookprofile from './components/Bookprofile.jsx'
import Books from './components/Books.jsx'
import Home from './components/Home.jsx'

const router =createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Home/>} />
    <Route path="/books" element={<Books/>} />
    <Route path="/books/:id" element={<Bookprofile/>}/>
   </>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)
