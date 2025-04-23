import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import Card from '@/components/Card';
import propertyAtom from '@/store/propertyAtom';
import { filterSheetAtom } from '@/store/sheetAtom';

const Dashboard = () => {
  const [properties, setProperties] = useAtom(propertyAtom);
  const [filter] = useAtom(filterSheetAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const params: Record<string, string | number> = {};

        if (filter.budget > 0) {
          params.budget = filter.budget;
        }

        if (filter.city) {
          params.city = filter.city;
        }

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // optional: can remove if not required
          },
          params,
        });

        setProperties(res.data.data);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filter, setProperties]);

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
