import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export type PropertyDetails = {
  total: number;
  availble: number;
  area: number;
  price: number;
};

export type Property = {
  id: number;
  title: string;
  developer: string;
  address: string;
  tags: string[];
  image: string[];
  videpPresentation: string;
  locality: string;
  projectAt: string;
  constructionStage: string;
  ammenties: string[];
  propertyDetails: { key: string; value: string }[];
  amountPerFlat: number; 
};

const PropertyDetails = () => {
  const { id } = useParams();
  const propertyId = id ? Number.parseInt(id) : 0;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProperty(res.data.data);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-blue-700 font-medium text-lg">Loading...</div>
      </div>
    );
  }

  if (notFound || !property) {
    return <div className="mt-8 text-center text-xl">Property not found</div>;
  }

  return (
    <div className="mt-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">{property.title}</h1>
        <p className="text-gray-600 mt-2">{property.address}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {property.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="col-span-1 md:col-span-2">
          <img
            src={property.image[0] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
        {property.image.slice(1).map((img, index) => (
          <img
            key={index}
            src={img || "/placeholder.svg"}
            alt={`${property.title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              About the Property
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">Developer</p>
                <p className="font-medium">{property.developer}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Construction Stage</p>
                <p className="font-medium">{property.constructionStage}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Locality</p>
                <p className="font-medium">{property.locality}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Project At</p>
                <p className="font-medium">{property.projectAt}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {property.ammenties.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <p>{amenity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Property Details
            </h2>
            {property.propertyDetails.map((detail, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatPrice(detail.price)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Area</p>
                  <p className="font-medium">{detail.area} sq.ft.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Total Units</p>
                    <p className="font-medium">{detail.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Available Units</p>
                    <p className="font-medium">{detail.availble}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-900 p-6 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">Interested?</h2>
            <p className="mb-4">
              Contact our sales team for more information about this property.
            </p>
            <button className="w-full bg-white text-blue-900 py-3 rounded-md font-semibold hover:bg-blue-100 transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Video Presentation */}
      {property.videpPresentation && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Video Presentation
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
            <iframe
              width="560"
              height="315"
              src={property.videpPresentation}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-96 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
