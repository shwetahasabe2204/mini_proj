import { ReactNode } from "react"
import Topbar from "./Topbar"
import Navbar from "./Navbar"

type LayoutProps ={
    children:ReactNode
}

const Layout = ({children}:LayoutProps) => {
  return (
        <div className='lg:mx-32'>
            <Topbar />
            <Navbar />
            {children}
        </div>
    
  )
}

export default Layout