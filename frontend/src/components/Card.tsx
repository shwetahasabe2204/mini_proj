import { useNavigate } from "react-router-dom"

type CardProps ={
  id:number,
  image:string,
  text:string,
  address:string
}

const Card = ({id,image,text,address}:CardProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex col-span-1 flex-col justify-between">
        <div className="">
          <img src={image} alt='image' className='w-100 h-50'></img>
          <div className='font-semibold'>{text}</div>
          <div className='flex'>
              <p className='font-light'>{address}</p>
          </div>
        </div>
        <div>
          <button 
            className='bg-blue-500 rounded-md text-white w-20 h-10 mt-5 cursor-pointer hover:opacity-80'
            onClick={()=>{
              navigate(`/property/${id}`)
            }}
          >
            Details
          </button>
        </div>
    </div>
  )
}

export default Card