import Card from '@/components/Card'
import { properties } from '../constants/Properties'

const Dashboard = () => {
  return ( 
      <div className='grid grid-cols-4 gap-8 mt-8'>
        {properties.map((property)=>(
          <Card
            id={property.id}
            image={property.image[0]}
            text={property.title}
            address={property.address}
          />
        ))}
        
      </div>
    
  )
}

export default Dashboard
