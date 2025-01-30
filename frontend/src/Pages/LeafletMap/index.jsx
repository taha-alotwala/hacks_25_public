import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { CircularProgress, Typography, Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useAuthContext } from "../../contexts/authContext";
import axios from "axios";

// Custom marker icons with themed colors
const vendorIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LeafletMap = () => {
  const [location, setLocation] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext();

  // Get the user's location using geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setErrorMsg("Error fetching location");
          setLoading(false);
        }
      );
    } else {
      setErrorMsg("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  // Fetch vendors from the backend API
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      fetchVendors(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchVendors = async (latitude, longitude) => {
    try {
      // Replace with your actual API endpoint
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product-listings/vendors/locations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVendors(data.vendors); // Assuming data is an array of vendors
    } catch (error) {
      console.log(error);
      setErrorMsg("Unable to fetch nearby vendors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <Typography className="text-green-600 font-medium">
            Finding nearby vendors...
          </Typography>
        </div>
      </Box>
    );
  }

  if (errorMsg) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)]">
          <Typography className="text-red-500 font-medium">
            {errorMsg}
          </Typography>
        </div>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_0_30px_rgba(0,128,0,0.1)] border border-green-100 overflow-hidden">
          {location && (
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={12}
              style={{ width: "100%", height: "80vh" }}
              className="z-0"
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="grayscale"
              />
              {/* User location marker */}
              <Marker
                position={[location.latitude, location.longitude]}
                icon={userIcon}
              >
                <Popup className="rounded-xl">
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900">Your Location</h3>
                  </div>
                </Popup>
              </Marker>

              {/* Vendor markers */}
              {vendors.map((vendor) => (
                <Marker
                  key={vendor._id}
                  position={[vendor.location.latitude, vendor.location.longitude]}
                  icon={vendorIcon}
                >
                  <Popup className="rounded-xl">
                    <div className="p-3 min-w-[200px]">
                      <h3 className="font-semibold text-gray-900 mb-1">{vendor.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{vendor.rating} / 5</span>
                      </div>
                      <a
                        href={`mailto:${vendor.email}`}
                        className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Vendor
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
