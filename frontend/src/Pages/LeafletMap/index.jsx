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
  const [users, setUsers] = useState([]);
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

  // Fetch users (or vendors) from the backend API
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      fetchUsers(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchUsers = async (latitude, longitude) => {
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
      // const data = await response.json();
      setUsers(data.locations); // Assuming data is an array of users/vendors
    } catch (error) {
      console.log(error);
      setErrorMsg("Unable to fetch nearby users. Please try again.");
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
        zoom={15} // More zoomed-in for better detail
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

        {/* Markers for users/vendors */}
        {users.map((user, idx) => (
          <Marker
            key={idx} // Use a unique identifier for the key
            position={[user.latitude, user.longitude]}
            icon={customIcon}
          >
            <Popup>
              <b>{user.name}</b>
              <br />
              {/* Display other details about the user */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default LeafletMap;
