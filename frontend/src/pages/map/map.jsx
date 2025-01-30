import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { useAuthContext } from '../../contexts/authContext';

const containerStyle = { width: '100%', height: '90vh' };
const libraries = ['places', 'geometry'];

const MapComponent = () => {
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markersRef = useRef([]);
    const currentLocationRef = useRef(null);
    const { token } = useAuthContext();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [vendors, setVendors] = useState([]);
    const [backendVendors, setBackendVendors] = useState([]);
    const [distance, setDistance] = useState(2);
    const [location, setLocation] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch backend vendors
    useEffect(() => {
        const fetchBackendVendors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/product-listings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Transform products to include vendor info and isBackendVendor flag
                const vendorsWithProducts = response.data.products.map(product => ({
                    id: product.vendor._id,
                    name: product.vendor.name,
                    location: {
                        lat: parseFloat(product.vendor.location.split(',')[0]) || 19.0760, // Default Mumbai lat
                        lng: parseFloat(product.vendor.location.split(',')[1]) || 72.8777  // Default Mumbai lng
                    },
                    address: product.vendor.location, // City name
                    rating: product.vendor.rating,
                    email: product.vendor.email,
                    isBackendVendor: true,
                    product: {
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        organic: product.organic,
                        image: product.image,
                        harvest_date: new Date(product.harvest_date).toLocaleDateString()
                    }
                }));
                
                setBackendVendors(vendorsWithProducts);
                setError(null);
            } catch (error) {
                console.error('Error fetching vendors:', error);
                setError('Failed to load vendors');
            } finally {
                setLoading(false);
            }
        };
        fetchBackendVendors();
    }, [token]);

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

    // Fetch Google vendors and update map
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
                const googleVendors = results.map(place => ({
                    id: place.place_id,
                    name: place.name,
                    location: place.geometry.location,
                    address: place.vicinity,
                    rating: place.rating || 'N/A',
                    isGoogleVendor: true
                }));
                setVendors(googleVendors);

                // Add markers for both Google and backend vendors
                [...googleVendors, ...backendVendors].forEach(vendor => {
                    const position = vendor.isGoogleVendor ? 
                        vendor.location : 
                        new window.google.maps.LatLng(vendor.location.lat, vendor.location.lng);

                    const marker = new window.google.maps.Marker({
                        position,
                        map: mapRef.current,
                        title: vendor.name,
                        icon: getMarkerIcon(vendor.isBackendVendor)
                    });

                    marker.addListener("click", () => setSelectedVendor(vendor));
                    markersRef.current.push(marker);
                });
            }
        });
    }, [distance, location, isLoaded, backendVendors]);

    const getMarkerIcon = (isBackendVendor) => ({
        path: window.google?.maps?.SymbolPath?.CIRCLE,
        fillColor: isBackendVendor ? '#22c55e' : '#f87171',  // Green for backend, Red for Google
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
                        ref={googleMapRef}
                        mapContainerStyle={containerStyle}
                        center={location}
                        zoom={14}
                        options={{
                            styles: [
                                {
                                    featureType: "poi",
                                    elementType: "labels",
                                    stylers: [{ visibility: "off" }]
                                }
                            ],
                            disableDefaultUI: true,
                            zoomControl: true,
                            mapTypeControl: true,
                            streetViewControl: true,
                        }}
                        onLoad={map => {
                            mapRef.current = map;
                        }}
                    >
                        {/* Search Radius Circle */}
                        <Circle
                            center={location}
                            radius={distance * 1000}
                            options={{
                                fillColor: '#22c55e',
                                fillOpacity: 0.1,
                                strokeColor: '#22c55e',
                                strokeOpacity: 0.3,
                                strokeWeight: 2,
                            }}
                        />

                        {/* Info Window */}
                        {selectedVendor && (
                            <InfoWindow
                                position={selectedVendor.isGoogleVendor ? 
                                    selectedVendor.location : 
                                    { lat: selectedVendor.location.lat, lng: selectedVendor.location.lng }
                                }
                                onCloseClick={() => setSelectedVendor(null)}
                            >
                                <div className="p-3 min-w-[250px]">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">{selectedVendor.name}</h3>
                                        {selectedVendor.rating && (
                                            <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-medium text-green-800">{selectedVendor.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-3">{selectedVendor.address}</p>
                                    
                                    {selectedVendor.isBackendVendor && selectedVendor.product && (
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <div className="flex items-start gap-3">
                                                <img 
                                                    src={`http://localhost:3000/${selectedVendor.product.image}`}
                                                    alt={selectedVendor.product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-green-800 mb-1">
                                                        {selectedVendor.product.name}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-lg font-semibold text-green-600">
                                                            ₹{selectedVendor.product.price}
                                                        </span>
                                                        {selectedVendor.product.organic && (
                                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                                Organic
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Harvest Date: {selectedVendor.product.harvest_date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-green-100">
                                                <a 
                                                    href={`mailto:${selectedVendor.email}`}
                                                    className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    Contact Vendor
                                                </a>
                                            </div>
                                        </div>
                                    )}
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