import React, { useState, useEffect, useRef, useMemo } from 'react'

export const defaultMapProperties = [
  {
    id: 'prop-1',
    name: 'Sunrise PG for Girls',
    type: 'PGs',
    tag: 'Girls PG',
    price: 7000,
    rating: 4.8,
    reviews: 128,
    matchScore: 9.2,
    safetyScore: 9.6,
    location: 'Niti Khand 1, Indirapuram, Ghaziabad',
    area: 'Indirapuram',
    lat: 28.6415,
    lng: 77.3662,
    amenities: ['With Food', 'Wi-Fi', 'AC', 'Attached Bath', '24x7 Security'],
    photoIndex: 0,
    verified: true,
    distance: '0.4 km from center'
  },
  {
    id: 'prop-2',
    name: 'Comfort Stay PG & Co-Living',
    type: 'PGs',
    tag: 'Co-Living',
    price: 6500,
    rating: 4.6,
    reviews: 95,
    matchScore: 8.8,
    safetyScore: 9.3,
    location: 'Shakti Khand 2, Indirapuram, Ghaziabad',
    area: 'Indirapuram',
    lat: 28.6360,
    lng: 77.3735,
    amenities: ['With Food', 'Wi-Fi', 'RO Water', 'CCTV', 'Power Backup'],
    photoIndex: 1,
    verified: true,
    distance: '0.8 km from center'
  },
  {
    id: 'prop-3',
    name: 'Urban Nest 2 BHK Luxury Flat',
    type: 'Flats',
    tag: '2 BHK Flat',
    price: 18000,
    rating: 4.9,
    reviews: 142,
    matchScore: 8.5,
    safetyScore: 9.8,
    location: 'Sector 4, Vaishali, Ghaziabad (Near Metro)',
    area: 'Vaishali',
    lat: 28.6480,
    lng: 77.3420,
    amenities: ['Furnished', 'Near Metro', 'Lift', 'Covered Parking', 'Gated Society'],
    photoIndex: 2,
    verified: true,
    distance: '1.8 km from center'
  },
  {
    id: 'prop-4',
    name: 'The Scholar’s Nest Boys PG',
    type: 'PGs',
    tag: 'Boys PG',
    price: 8000,
    rating: 4.7,
    reviews: 76,
    matchScore: 8.9,
    safetyScore: 9.1,
    location: 'Ahinsa Khand 2, Indirapuram, Ghaziabad',
    area: 'Indirapuram',
    lat: 28.6322,
    lng: 77.3680,
    amenities: ['With Food', 'Wi-Fi', 'Study Room', 'Gym', 'Laundry'],
    photoIndex: 3,
    verified: true,
    distance: '1.1 km from center'
  },
  {
    id: 'prop-5',
    name: 'Skyline Modern 1 BHK Flat',
    type: 'Flats',
    tag: '1 BHK Flat',
    price: 12000,
    rating: 4.6,
    reviews: 64,
    matchScore: 8.4,
    safetyScore: 9.4,
    location: 'Shipra Suncity, Indirapuram, Ghaziabad',
    area: 'Indirapuram',
    lat: 28.6345,
    lng: 77.3610,
    amenities: ['Semi-Furnished', 'Balcony', 'Modular Kitchen', 'Park Facing'],
    photoIndex: 4,
    verified: true,
    distance: '1.2 km from center'
  },
  {
    id: 'prop-6',
    name: 'Cozy Sunlit Private Room',
    type: 'Rooms',
    tag: 'Private Room',
    price: 5500,
    rating: 4.8,
    reviews: 88,
    matchScore: 9.0,
    safetyScore: 9.5,
    location: 'Raj Nagar, Ghaziabad',
    area: 'Raj Nagar',
    lat: 28.6780,
    lng: 77.4380,
    amenities: ['Wi-Fi', 'AC', 'Single Bed', 'Attached Washroom'],
    photoIndex: 5,
    verified: true,
    distance: '3.5 km from center'
  }
]

// Safe student zones for overlay
const safetyZones = [
  {
    center: { lat: 28.6392, lng: 28.6392 ? 77.3687 : 77.3687 },
    radius: 950,
    name: 'Indirapuram Verified Hub',
    safetyScore: '9.6/10',
    color: '#4f46e5'
  },
  {
    center: { lat: 28.6480, lng: 77.3420 },
    radius: 750,
    name: 'Vaishali Metro Safety Corridor',
    safetyScore: '9.8/10',
    color: '#10b981'
  }
]

// Clean map styling
const customMapStyles = [
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5f3e9' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#edf2ff' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#cde4ff' }] },
  { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#fed7aa' }] },
  { featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.local', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] }
]

export default function AIMapExplorer({ selectedLocation = 'Indirapuram, Ghaziabad', propertyType = 'PG', onSelectProperty, onBookVisit }) {
  const mapContainerRef = useRef(null)
  const searchInputRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const circlesRef = useRef([])
  const infoWindowRef = useRef(null)

  const [activeFilter, setActiveFilter] = useState('All')
  const [showSafetyZones, setShowSafetyZones] = useState(true)
  const [activePropertyId, setActivePropertyId] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mapType, setMapType] = useState('roadmap')

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_PLACES_API_KEY || ''

  // Filter properties
  const filteredProperties = useMemo(() => {
    return defaultMapProperties.filter((item) => {
      if (activeFilter === 'All') return true
      if (activeFilter === 'PGs') return item.type === 'PGs'
      if (activeFilter === 'Flats') return item.type === 'Flats'
      if (activeFilter === 'Rooms') return item.type === 'Rooms'
      if (activeFilter === 'With Food') return item.amenities.includes('With Food')
      if (activeFilter === 'Near Metro') return item.amenities.includes('Near Metro') || item.location.includes('Metro')
      return true
    })
  }, [activeFilter])

  // Load Google Maps Script
  useEffect(() => {
    let isMounted = true

    if (window.google && window.google.maps) {
      setMapLoaded(true)
      return
    }

    const scriptId = 'google-maps-js-sdk'
    const existingScript = document.getElementById(scriptId)

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (isMounted) setMapLoaded(true)
      })
      existingScript.addEventListener('error', () => {
        if (isMounted) setMapError('Google Maps failed to load')
      })
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
    script.async = true
    script.defer = true

    script.onload = () => {
      if (isMounted) setMapLoaded(true)
    }

    script.onerror = () => {
      if (isMounted) {
        setMapError('Failed to load Google Maps SDK. Showing interactive overview.')
      }
    }

    document.head.appendChild(script)

    return () => {
      isMounted = false
    }
  }, [apiKey])

  // Initialize Map
  useEffect(() => {
    if (!mapLoaded || !window.google || !window.google.maps || !mapContainerRef.current) return

    try {
      const defaultCenter = { lat: 28.6392, lng: 77.3687 } // Indirapuram center

      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 13,
        mapTypeId: mapType,
        styles: customMapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      })

      mapInstanceRef.current = map
      infoWindowRef.current = new window.google.maps.InfoWindow()

      // Autocomplete if Places library is available
      if (window.google.maps.places && searchInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
          types: ['geocode', 'establishment'],
          componentRestrictions: { country: 'in' }
        })

        autocomplete.bindTo('bounds', map)
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          if (!place.geometry || !place.geometry.location) return

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport)
          } else {
            map.setCenter(place.geometry.location)
            map.setZoom(14)
          }
        })
      }
    } catch (err) {
      console.warn('Map initialization note:', err)
      setMapError(err.message)
    }
  }, [mapLoaded])

  // Update Map Type
  useEffect(() => {
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.setMapTypeId(mapType)
    }
  }, [mapType])

  // Render Safety Zones Overlay
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return

    // Clear existing circles
    circlesRef.current.forEach((c) => c.setMap(null))
    circlesRef.current = []

    if (!showSafetyZones) return

    safetyZones.forEach((zone) => {
      const circle = new window.google.maps.Circle({
        strokeColor: zone.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: zone.color,
        fillOpacity: 0.12,
        map: mapInstanceRef.current,
        center: zone.center,
        radius: zone.radius
      })
      circlesRef.current.push(circle)
    })
  }, [showSafetyZones, mapLoaded])

  // Render Property Markers on Google Maps
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return

    // Clear previous markers
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    const bounds = new window.google.maps.LatLngBounds()

    filteredProperties.forEach((prop) => {
      const isSelected = activePropertyId === prop.id
      const pos = { lat: prop.lat, lng: prop.lng }
      bounds.extend(pos)

      // Create custom SVG marker icon
      const badgeBg = isSelected ? '#3730a3' : prop.type === 'Flats' ? '#047857' : prop.type === 'Rooms' ? '#7c3aed' : '#4f46e5'
      const priceText = `₹${(prop.price / 1000).toFixed(1)}k`

      const svgMarker = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="78" height="38" viewBox="0 0 78 38" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
              </filter>
            </defs>
            <path d="M12 4 H66 A14 14 0 0 1 78 18 A14 14 0 0 1 66 32 H44 L39 37 L34 32 H12 A14 14 0 0 1 0 18 A14 14 0 0 1 12 4 Z" fill="${badgeBg}" filter="url(#shadow)"/>
            <text x="38" y="22" fill="#ffffff" font-size="12" font-weight="bold" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">${priceText}</text>
          </svg>
        `)}`,
        scaledSize: new window.google.maps.Size(78, 38),
        anchor: new window.google.maps.Point(39, 37)
      }

      const marker = new window.google.maps.Marker({
        position: pos,
        map: mapInstanceRef.current,
        title: prop.name,
        icon: svgMarker,
        animation: isSelected ? window.google.maps.Animation.BOUNCE : null
      })

      marker.addListener('click', () => {
        setActivePropertyId(prop.id)
        openInfoWindow(prop, marker)
      })

      markersRef.current.push({ id: prop.id, marker, property: prop })
    })

    if (filteredProperties.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 })
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
        if (mapInstanceRef.current.getZoom() > 15) {
          mapInstanceRef.current.setZoom(14)
        }
        window.google.maps.event.removeListener(listener)
      })
    }
  }, [filteredProperties, activePropertyId, mapLoaded])

  const openInfoWindow = (prop, marker) => {
    if (!infoWindowRef.current || !mapInstanceRef.current) return

    const contentHtml = `
      <div style="max-width: 270px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; padding: 4px; color: #0c1c4f;">
        <div style="height: 110px; border-radius: 8px; background: url('/student-hero.png') center/cover; position: relative; margin-bottom: 8px;">
          <span style="position: absolute; top: 6px; left: 6px; background: #dcfce7; color: #166534; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 12px;">✓ Verified</span>
          <span style="position: absolute; top: 6px; right: 6px; background: #e0e7ff; color: #3730a3; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 12px;">★ ${prop.rating}</span>
        </div>
        <h4 style="margin: 0 0 3px 0; font-size: 13px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${prop.name}</h4>
        <p style="margin: 0 0 6px 0; font-size: 10px; color: #64748b;">📍 ${prop.location}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 15px; font-weight: 800; color: #4338ca;">₹${prop.price.toLocaleString()}<small style="font-size: 10px; font-weight: 500; color: #64748b;"> / mo</small></span>
          <span style="background: #fef3c7; color: #92400e; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px;">🛡️ ${prop.safetyScore} Safety</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <button id="map-info-details-${prop.id}" style="padding: 7px 4px; border: 1px solid #c7d2fe; border-radius: 6px; background: #ffffff; color: #4338ca; font-size: 11px; font-weight: 700; cursor: pointer;">View Details</button>
          <button id="map-info-book-${prop.id}" style="padding: 7px 4px; border: 0; border-radius: 6px; background: #4f46e5; color: #ffffff; font-size: 11px; font-weight: 700; cursor: pointer;">Book Visit</button>
        </div>
      </div>
    `

    infoWindowRef.current.setContent(contentHtml)
    infoWindowRef.current.open(mapInstanceRef.current, marker)

    // Attach listeners once domready
    window.google.maps.event.addListenerOnce(infoWindowRef.current, 'domready', () => {
      const detailsBtn = document.getElementById(`map-info-details-${prop.id}`)
      const bookBtn = document.getElementById(`map-info-book-${prop.id}`)

      if (detailsBtn) {
        detailsBtn.onclick = () => {
          onSelectProperty?.(prop)
        }
      }
      if (bookBtn) {
        bookBtn.onclick = () => {
          onBookVisit?.(prop)
        }
      }
    })
  }

  const handleCardClick = (prop) => {
    setActivePropertyId(prop.id)
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.panTo({ lat: prop.lat, lng: prop.lng })
      mapInstanceRef.current.setZoom(15)

      const target = markersRef.current.find((m) => m.id === prop.id)
      if (target) {
        openInfoWindow(prop, target.marker)
      }
    }
  }

  const handleRecenter = () => {
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.panTo({ lat: 28.6392, lng: 77.3687 })
      mapInstanceRef.current.setZoom(14)
    }
  }

  return (
    <section className="ai-map-section">
      <div className="ai-map-card">
        {/* Header toolbar */}
        <div className="ai-map-header">
          <div className="ai-map-title-wrap">
            <div className="ai-map-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
            </div>
            <div>
              <h3>Interactive Map &amp; Safety Explorer</h3>
              <p>Explore AI-recommended properties around <b>{selectedLocation}</b> with real-time safety scores and neighborhood DNA.</p>
            </div>
          </div>

          <div className="ai-map-search-bar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search area, metro or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="recenter-btn" onClick={handleRecenter} title="Center on selected locality">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
              </svg>
              My Locality
            </button>
          </div>
        </div>

        {/* Filter controls row */}
        <div className="ai-map-filters">
          <div className="filter-pill-group">
            {['All', 'PGs', 'Flats', 'Rooms', 'With Food', 'Near Metro'].map((f) => (
              <button
                key={f}
                type="button"
                className={`map-filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'All' ? '🌟 All Recommendations' : f === 'PGs' ? '🏠 PGs' : f === 'Flats' ? '🏢 Flats' : f === 'Rooms' ? '🔑 Rooms' : f === 'With Food' ? '🍲 With Food' : '🚇 Near Metro'}
              </button>
            ))}
          </div>

          <div className="map-view-actions">
            <button
              type="button"
              className={`safety-toggle-btn ${showSafetyZones ? 'active' : ''}`}
              onClick={() => setShowSafetyZones(!showSafetyZones)}
              title="Toggle AI Safety DNA Zones"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              {showSafetyZones ? 'Safety Zones: ON' : 'Safety Zones: OFF'}
            </button>

            <div className="map-layer-selector">
              <button
                type="button"
                className={`layer-btn ${mapType === 'roadmap' ? 'active' : ''}`}
                onClick={() => setMapType('roadmap')}
              >
                Map
              </button>
              <button
                type="button"
                className={`layer-btn ${mapType === 'satellite' ? 'active' : ''}`}
                onClick={() => setMapType('satellite')}
              >
                Satellite
              </button>
              <button
                type="button"
                className={`layer-btn ${mapType === 'terrain' ? 'active' : ''}`}
                onClick={() => setMapType('terrain')}
              >
                Terrain
              </button>
            </div>
          </div>
        </div>

        {/* Map Canvas and Fallback */}
        <div className="map-canvas-wrapper">
          <div ref={mapContainerRef} className="google-map-canvas" />

          {!mapLoaded && !mapError && (
            <div className="map-loading-overlay">
              <div className="map-spinner" />
              <p>Connecting to Google Maps JavaScript API...</p>
            </div>
          )}

          {mapError && (
            <div className="map-fallback-view">
              <div className="fallback-header-alert">
                <span>⚡ Interactive Visual Map Active</span>
                <small>Showing verified coordinates around {selectedLocation}</small>
              </div>
              <div className="fallback-interactive-grid">
                {filteredProperties.map((p) => (
                  <div
                    key={p.id}
                    className={`fallback-pin-card ${activePropertyId === p.id ? 'active' : ''}`}
                    onClick={() => handleCardClick(p)}
                  >
                    <span className="fallback-pin-badge">₹{p.price.toLocaleString()}</span>
                    <strong>{p.name}</strong>
                    <p>📍 {p.location}</p>
                    <small>🛡️ {p.safetyScore} Safety · {p.matchScore} AI Match</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>


      </div>
    </section>
  )
}
