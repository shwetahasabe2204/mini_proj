
const Contacts = () =>{
    return(
        <div className="flex">
            <img alt="insta" />
            <img alt="facebook" />
            <img alt="youtube" />
        </div>
    )
}


const Topbar = () => {
  return (
    <div className="w-full flex justify-between p-8">
        <div>
            <img
               src="logo"
               alt="logo" 
            />

        </div>
        <div className="">
            <Contacts />
        </div>
    </div>
  )
}

export default Topbar