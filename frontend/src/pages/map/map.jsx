import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '90vh' };
const defaultCenter = { lat: 19.0760, lng: 72.8777 };
const libraries = ['places'];

const MapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [map, setMap] = useState(null);
    const [location, setLocation] = useState(defaultCenter);
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => console.log('Using default location')
            );
        }
    }, []);

    useEffect(() => {
        if (!map || !location || !window.google) return;

        try {
            const placesService = new window.google.maps.places.PlacesService(map);
            
            placesService.textSearch({
                location: location,
                radius: 2000,
                query: 'vegetable market'
            }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const formattedVendors = results.map(place => ({
                        id: place.place_id,
                        name: place.name,
                        location: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        },
                        address: place.formatted_address,
                        rating: place.rating || 'N/A'
                    }));
                    setVendors(formattedVendors);
                }
            });
        } catch (error) {
            console.error('Places service error:', error);
        }
    }, [map, location]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
            <div className="max-w-7xl mx-auto">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location}
                    zoom={14}
                    onLoad={setMap}
                >
                    <Marker 
                        position={location}
                        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    />

                    {vendors.map(vendor => (
                        <Marker
                            key={vendor.id}
                            position={vendor.location}
                            onClick={() => setSelectedVendor(vendor)}
                            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        />
                    ))}

                    {selectedVendor && (
                        <InfoWindow
                            position={selectedVendor.location}
                            onCloseClick={() => setSelectedVendor(null)}
                        >
                            <div className="p-4">
                                <h3 className="font-bold">{selectedVendor.name}</h3>
                                <p>{selectedVendor.address}</p>
                                <p>Rating: {selectedVendor.rating} ⭐</p>
                                <button 
                                    onClick={() => window.open(
                                        `https://www.google.com/maps/dir/?api=1&destination=${selectedVendor.location.lat},${selectedVendor.location.lng}`,
                                        '_blank'
                                    )}
                                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                                >
                                    Get Directions
                                </button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default MapComponent;