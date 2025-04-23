import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import Card from '@/components/Card';
import propertyAtom from '@/store/propertyAtom';

const Dashboard = () => {
  const [properties, setProperties] = useAtom(propertyAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming JWT token stored in localStorage
          },
        });
        setProperties(res.data.data);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [setProperties]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8 mt-8">
      {properties.map((property) => (
        <Card
          key={property.id}
          id={property.id}
          image={property.image[0]}
          text={property.title}
          address={property.address}
        />
      ))}
    </div>
  );
};

export default Dashboard;
