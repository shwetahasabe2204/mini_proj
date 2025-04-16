import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { useSetRecoilState } from "recoil"
import { newPropertySheet } from "@/store/SheetAtom"

type MenuIconProps ={
  title:string,
  path:string,
  navigate:(path:string)=>void
}

const menus = [
  {
    title:'Home',
    path:"/"
  },
  {
    title:'About',
    path:"/about"
  },
  {
    title:'Contacts',
    path:"/contacts"
  }
]

const MenuIcon = ({title,path,navigate}:MenuIconProps)=>{
  return(
    <div 
      className="p-4 px-8 cursor-pointer text-white hover:bg-blue-500"
      onClick={()=>{
        navigate(path)
      }}
    >
      {title}
    </div>
  )
}


const Navbar = () => {
  const setIsOpen = useSetRecoilState(newPropertySheet)
  const navigate = useNavigate()
  //const [searchValue, setSearchValue] = useState("search here");

  return (
    <div className="flex bg-blue-900 justify-between items-center">
      <div className="flex">
        {menus.map((menu)=>(
          <div>
            <MenuIcon 
              title={menu.title}
              path={menu.path}
              navigate={navigate}
            />
          </div>
        ))}
      </div>
      <div >
          
          {/* <input  name="myInput"  placeholder="search bar" defaultValue="" className='text-white' onChange={e =>{setSearchValue(e.target.value)}}/>
           */}

           <Button
              className="text-white cursor-pointer"
              onClick={()=>setIsOpen(true)}
           >
              Add listing
           </Button>
      </div>
    </div>
  )
}

export default Navbar