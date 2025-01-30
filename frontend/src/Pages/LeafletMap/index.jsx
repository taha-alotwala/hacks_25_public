import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CircularProgress, Typography, Box } from "@mui/material";
import "leaflet/dist/leaflet.css";

// Fix missing marker icons in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useAuthContext } from "../../contexts/authContext";
import axios from "axios";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" color="primary" style={{ marginTop: 16 }}>
          Fetching your location...
        </Typography>
      </Box>
    );
  }

  if (errorMsg) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {errorMsg}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={12} // More zoomed-in for better detail
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marker for user location */}
        <Marker
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup>You are here</Popup>
        </Marker>

        {/* Markers for vendors */}
        {vendors.map((vendor) => (
          <Marker
            key={vendor._id} // Use the vendor's unique ID for the key
            position={[vendor.location.latitude, vendor.location.longitude]}
            icon={customIcon}
          >
            <Popup>
              <Typography variant="h6">{vendor.name}</Typography>
              <Typography variant="body2">
                Rating: {vendor.rating} / 5
              </Typography>
              <Typography variant="body2">Email: {vendor.email}</Typography>
              <br />
              <a
                href={`mailto:${vendor.email}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="body2" color="primary">
                  Contact Vendor
                </Typography>
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default LeafletMap;
