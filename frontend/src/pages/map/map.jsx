import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

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

    const getMarkerIcon = (isSelected) => ({
        path: window.google?.maps?.SymbolPath?.CIRCLE,
        fillColor: isSelected ? '#22c55e' : '#3b82f6',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
        scale: 10,
    });

    if (!isLoaded || !location) return <div>Loading map...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Distance Filter */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] border border-green-100 p-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <span className="font-medium text-gray-700">Search Radius</span>
                        </div>
                        <div className="flex-1 flex items-center gap-4">
                            <input 
                                type="range" 
                                min="0.5" 
                                max="5" 
                                step="0.5"
                                value={distance} 
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="flex-1 h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                            <span className="min-w-[80px] text-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                {distance} km
                            </span>
                        </div>
                    </div>
                </div>

                {/* Map Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_0_15px_rgba(0,128,0,0.1)] border border-green-100 overflow-hidden">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location}
                        zoom={15}
                        onLoad={map => {
                            mapRef.current = map;
                            googleMapRef.current = map;
                        }}
                        options={{
                            styles: [
                                {
                                    featureType: "poi",
                                    elementType: "labels",
                                    stylers: [{ visibility: "off" }]
                                }
                            ]
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
                                <div className="min-w-[300px] p-4 bg-white rounded-xl">
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{selectedVendor.name}</h3>
                                                <p className="text-sm text-gray-600">{selectedVendor.address}</p>
                                            </div>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                                <span className="text-sm font-medium text-green-700">
                                                    {selectedVendor.rating}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm">Open Now</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                <span className="text-sm">Local Vendor</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <a 
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedVendor.location.lat()},${selectedVendor.location.lng()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                                Get Directions
                                            </a>
                                            <button 
                                                onClick={() => {/* Add view profile functionality */}}
                                                className="px-4 py-2 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors duration-300"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;