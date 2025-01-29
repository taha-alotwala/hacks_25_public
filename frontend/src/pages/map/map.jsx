import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import './map.css';

const containerStyle = { width: '100%', height: '90vh' };
const libraries = ['places', 'geometry'];

const MapComponent = () => {
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markersRef = useRef([]);
    const currentLocationRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [vendors, setVendors] = useState([]);
    const [distance, setDistance] = useState(2);
    const [location, setLocation] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);

    // Get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => alert('Geolocation failed. Using default location.'),
                { enableHighAccuracy: true }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }, []);

    // Fetch nearby vendors
    useEffect(() => {
        if (!isLoaded || !location || !window.google || !mapRef.current) return;

        const service = new window.google.maps.places.PlacesService(mapRef.current);
        
        if (!service) {
            console.error("Google Places Service failed to initialize.");
            return;
        }

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        const request = {
            location,
            radius: distance * 1000,
            type: ['grocery_or_supermarket'],
            keyword: 'vegetable market'
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const formattedVendors = results.map(place => ({
                    id: place.place_id,
                    name: place.name,
                    location: place.geometry.location,
                    address: place.vicinity,
                    rating: place.rating || 'N/A',
                }));
                setVendors(formattedVendors);

                // Add markers for each vendor
                formattedVendors.forEach(vendor => {
                    const marker = new window.google.maps.Marker({
                        position: vendor.location,
                        map: mapRef.current,
                        title: vendor.name,
                        icon: selectedVendor?.id === vendor.id 
                            ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                            : undefined
                    });

                    marker.addListener("click", () => setSelectedVendor(vendor));
                    markersRef.current.push(marker);
                });
            } else {
                console.error('Nearby search failed:', status);
            }
        });
    }, [distance, location, isLoaded, selectedVendor]);

    if (!isLoaded || !location) return <div>Loading map...</div>;

    return (
        <div className="map-page">
            <div className="distance-filter">
                <label>Search radius: {distance} km</label>
                <input 
                    type="range" 
                    min="0.5" 
                    max="5" 
                    step="0.5"
                    value={distance} 
                    onChange={(e) => setDistance(Number(e.target.value))} 
                />
            </div>

            <div className="map-wrapper">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location}
                    zoom={15}
                    onLoad={map => {
                        mapRef.current = map;
                        googleMapRef.current = map;
                    }}
                >
                    <Circle
                        center={location}
                        radius={distance * 1000}
                        options={{
                            fillColor: "#4CAF50",
                            fillOpacity: 0.1,
                            strokeColor: "#4CAF50",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                        }}
                    />

                    <Marker
                        position={location}
                        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    />

                    {selectedVendor && (
                        <InfoWindow
                            position={selectedVendor.location}
                            onCloseClick={() => setSelectedVendor(null)}
                        >
                            <div className="vendor-info">
                                <h3 className="font-bold">{selectedVendor.name}</h3>
                                <p>{selectedVendor.address}</p>
                                <p>Rating: {'⭐'.repeat(Math.round(selectedVendor.rating))}</p>
                                <a 
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedVendor.location.lat()},${selectedVendor.location.lng()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="directions-btn"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default MapComponent;