import { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Icon = ({ name, size = 24 }) => {
  const paths = {
    home: <><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/><path d="M12 8.5v2.5"/></>,
    shield: <path d="M12 3 20 6v5c0 5-3.45 8.73-8 10-4.55-1.27-8-5-8-10V6l8-3Z"/>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.8 20c.6-4 2.3-6 5.2-6s4.6 2 5.2 6M15 15c2.4.1 4 1.7 4.5 5"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></>,
    leaf: <path d="M20.5 3.5C13 3.7 6.2 7 5 14.3c-.45 2.76.85 5.01 2.5 6.2 1.2-3.2 3.7-6.7 8.5-9.1-3.62 2.75-5.91 5.5-7.15 8.4 1.06.48 2.28.52 3.45.1C19.7 17.2 21.6 9.25 20.5 3.5Z"/>,
    cap: <><path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6 11.1V16c3.8 2.5 8.2 2.5 12 0v-4.9M21.5 9v6"/></>,
    building: <><path d="M4 21h16M6 21V7l6-4 6 4v14M9 10h1M14 10h1M9 14h1M14 14h1M11 21v-4h2v4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/><path d="M3 3 21 21"/></>,
    check: <path d="m5 12 4 4 10-12"/>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    room: <><path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-5h8v5M9 10h.01M15 10h.01"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    settings: <><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/><circle cx="12" cy="12" r="4"/></>,
    heart: <path d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z"/>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
    chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 3-4 3 2 5-7"/></>,
    eyeOpen: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></>,
    camera: <><path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z"/><circle cx="12" cy="13" r="3.5"/></>,
    wallet: <><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"/><path d="M4 8h15M15 13h4"/><circle cx="15" cy="13" r=".5"/></>,
    zap: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.3 1.8c-1.1 1-1.9 1.4-1.9 3M12 17h.01"/></>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Preloader() {
  return <div className="preloader" aria-label="Loading AI SafeRent">
    <div className="loader-mark"><Icon name="shield" size={38}/></div>
    <div className="loader-name">AI <span>SafeRent</span></div>
    <div className="loader-line"><i /></div>
  </div>
}

const navItems = [[<Icon name="home" size={18}/>, 'Home'], [<Icon name="sparkle" size={18}/>, 'AI Recommendations'], [<Icon name="compass" size={18}/>, 'Explore'], [<Icon name="calendar" size={18}/>, 'Book a Visit'], [<Icon name="calendar" size={18}/>, 'My Bookings'], [<Icon name="heart" size={18}/>, 'Saved Properties'], [<Icon name="people" size={18}/>, 'Profile'], [<Icon name="settings" size={18}/>, 'Settings']]
const categories = [[<Icon name="people" size={22}/>, 'PG for Girls'], [<Icon name="people" size={22}/>, 'PG for Boys'], [<Icon name="building" size={22}/>, 'Flats'], [<Icon name="room" size={22}/>, '1 RK / Studio'], [<Icon name="room" size={22}/>, 'Rooms'], [<Icon name="people" size={22}/>, 'Findmates']]
const properties = [
  ['The Blossom House', 'Indirapuram, Ghaziabad', '₹7,500', 'PG for Girls'],
  ['Urban Nest 2BHK', 'Vaishali, Ghaziabad', '₹18,000', '2BHK Flat'],
  ['Cozy Private Room', 'Raj Nagar, Ghaziabad', '₹5,000', 'Private Room'],
]

function StudentSidebar({ active, onNavigate, menu, onClose }) {
  const [exploreOpen, setExploreOpen] = useState(['Explore', 'PGs', 'Flats', 'Rooms'].includes(active))
  const select = (name) => { onNavigate(name); onClose?.() }
  return <aside className={`sidebar student-sidebar ${menu ? 'show' : ''}`}>
    <nav>{navItems.map(([icon, name]) => name === 'Explore' ? <div className="explore-nav" key={name}><button className={['Explore', 'PGs', 'Flats', 'Rooms'].includes(active) ? 'active' : ''} onClick={() => setExploreOpen(!exploreOpen)}><b>{icon}</b><span>Explore</span><i aria-hidden="true">{exploreOpen ? '▴' : '▾'}</i></button>{exploreOpen && <div className="explore-subnav"><button className={active === 'PGs' ? 'selected' : ''} onClick={() => select('PGs')}><Icon name="grid" size={16}/><span>PGs</span></button><button className={active === 'Flats' ? 'selected' : ''} onClick={() => select('Flats')}><Icon name="building" size={16}/><span>Flats</span></button><button className={active === 'Rooms' ? 'selected' : ''} onClick={() => select('Rooms')}><Icon name="room" size={16}/><span>Rooms</span></button></div>}</div> : <button key={name} className={name === active ? 'active' : ''} onClick={() => select(name)}><b>{icon}</b><span>{name}</span></button>)}</nav>
  </aside>
}

function StudentDashboard({ onLogout, onNavigate }) {
  const [menu, setMenu] = useState(false)
  const [liked, setLiked] = useState([])
  const [search, setSearch] = useState('Indirapuram, Ghaziabad')
  const [selectedType, setSelectedType] = useState('PG')
  const [budget, setBudget] = useState('₹ 0 – ₹ 30,000')
  const [preferredFor, setPreferredFor] = useState('Anyone')
  const [amenities, setAmenities] = useState('Wi-Fi, AC, Attached Bath')
    const toggleLike = (name) => setLiked((list) => list.includes(name) ? list.filter((item) => item !== name) : [...list, name])
  const handleSearch = () => {
    onNavigate('AI Recommendations', {
      location: search || 'Indirapuram, Ghaziabad',
      propertyType: selectedType,
      budget,
      preferredFor,
      amenities
    })
  }
  return <div className="dashboard">
    <header className="dash-header"><a className="brand dash-brand" href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><div className="dash-account"><button className="notification" aria-label="Notifications"><Icon name="bell" size={18}/><i /></button><span className="avatar">A</span><span className="account-copy">Hi, Alok<small>Student/Tenant</small></span><span>⌄</span></div></header>
    <StudentSidebar active="Home" onNavigate={onNavigate} menu={menu} onClose={() => setMenu(false)} />
    <main className="dash-main">
      <section className="dash-hero"><div className="dash-hero-copy"><span className="eyebrow">Verified Spaces. Happy Places.</span><h1>Safest places.<br/>Better spaces.<em>Yours to call home.</em></h1><p>PGs, Flats & Rooms for Students<br/>and Working Professionals.</p><div className="trust-row"><span><Icon name="shield" size={14}/> Safe</span><span><Icon name="check" size={14}/> Verified</span><span><Icon name="home" size={14}/> Affordable</span><span><Icon name="settings" size={14}/> Trusted</span></div></div></section>
        <section className="search-panel"><div className="search-tabs"><button type="button" className={selectedType === 'PG' ? 'chosen' : ''} onClick={() => setSelectedType('PG')}><Icon name="grid" size={14}/> PG</button><button type="button" className={selectedType === 'Flat' ? 'chosen' : ''} onClick={() => setSelectedType('Flat')}><Icon name="building" size={14}/> Flat</button><button type="button" className={selectedType === 'Room' ? 'chosen' : ''} onClick={() => setSelectedType('Room')}><Icon name="room" size={14}/> Room</button></div><div className="search-inputs"><label>Where do you want to live?<b>⌖</b><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter locality / city"/></label><label>Budget<select value={budget} onChange={(e) => setBudget(e.target.value)}><option>₹ 0 – ₹ 30,000</option><option>₹ 5,000 – ₹ 15,000</option><option>₹ 15,000 – ₹ 25,000</option><option>₹ 25,000 – ₹ 50,000</option></select></label><label>Preferred for<select value={preferredFor} onChange={(e) => setPreferredFor(e.target.value)}><option>Anyone</option><option>Girls</option><option>Boys</option><option>No Preference</option></select></label><label>Amenities<select value={amenities} onChange={(e) => setAmenities(e.target.value)}><option>Wi-Fi, AC, Attached Bath</option><option>Wi-Fi, AC</option><option>Wi-Fi, Attached Bath</option><option>AC, Parking</option></select></label><button type="button" className="search-button" aria-label="Search" onClick={handleSearch}>⌕</button></div></section>
      <section className="dash-grid"><div className="main-feed"><section className="panel looking"><div className="section-title"><h3>What are you looking for?</h3><a href="#">View all</a></div><div className="categories">{categories.map(([icon, title]) => <button key={title}><b>{icon}</b><span>{title}</span></button>)}</div></section><section className="panel recommendations"><div className="section-title"><h3>Recommended for you</h3><a href="#">View all</a></div><div className="property-row">{properties.map(([name, place, price, tag], index) => <article className="property-card" key={name}><div className={`property-image property-${index}`}><span>{tag}</span><button onClick={() => toggleLike(name)}>{liked.includes(name) ? '♥' : '♡'}</button></div><h4>{name}</h4><p>{place}</p><strong>{price} <small>/ month</small></strong><div className="rating">★ 4.{7 - index} <span>({128 - index * 23})</span></div><div className="tags"><i>Wi-Fi</i><i>Food</i><i>Security</i></div></article>)}</div></section></div><aside className="nearby panel"><div className="section-title"><h3>Explore around you</h3><a href="#">View on map</a></div><div className="map"><i className="pin one">⌖</i><i className="pin two">⌖</i><i className="pin three">⌖</i><b>Sunny PG<small>Indirapuram<br/>₹7,000 / month</small><button>Book Visit</button></b></div><div className="quick-actions"><article><b>▣</b><span><strong>Book a Visit</strong>Schedule a free visit to your favorite place</span></article><article><b>♧</b><span><strong>Find a Findmate</strong>Connect with verified people looking to stay</span></article><article><b>▣</b><span><strong>Pay Rent</strong>Secure online payments with receipts</span></article><article><b>⚒</b><span><strong>Maintenance</strong>Raise a request & get it resolved quickly</span></article></div></aside></section>
      <section className="value-row"><article><b>✿</b><strong>100% Verified</strong><span>Every listing is verified<br/>for your safety</span></article><article><b>✧</b><strong>Smart Recommendations</strong><span>AI-powered suggestions<br/>just for you</span></article><article><b>♢</b><strong>Safe & Secure</strong><span>Safety score, photos<br/>& reviews you can trust</span></article><article><b>▣</b><strong>Easy & Fast</strong><span>Book visits & move in<br/>hassle-free</span></article></section>
      <section className="bottom-row"><article className="score-card panel" id="score"><div><h3>Our Unique<br/>Neighborhood DNA Score</h3><p>We score every property on what<br/>matters most to you.</p><a href="#">Learn more →</a></div><b>8.7<small>/10</small></b></article><article className="testimonial panel"><div><h3>What our community says</h3><p>“AI SafeRent helped me find a PG that feels like home. The safety score and reviews are super helpful!”</p><small>— Ananya, Student</small></div></article></section>
      <footer className="dash-footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Icon name="home" size={28}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><nav><a href="#">About Us</a><a href="#">Careers</a><a href="#">Blog</a><a href="#">Contact Us</a><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a><a href="#">FAQs</a></nav><div className="footer-social"><span>◎</span><span>in</span><span>♥</span><span>▶</span><small>© 2026 AI SafeRent. All rights reserved.</small></div></footer>
    </main>
  </div>
}

const listingNames = {
  PGs: ['Sunrise PG for Girls','Comfort Stay PG','Urban Nest PG','Shree Shyam PG','Elite Stays PG','Haven Co-Living','Maple Women’s PG','Campus Corner PG','Greenview PG','The Scholar’s Nest','Metro Stay PG','Harmony Homes PG'],
  Flats: ['2 BHK Apartment','1 BHK Flat','3 BHK Apartment','1 BHK Builder Floor','3 BHK + Study','Skyline 2 BHK','Park View Flat','Bluebell Residency','The Urban Loft','Serene 1 BHK','Lakeview Apartment','Cityscape 3 BHK'],
  Rooms: ['Private Room in Indirapuram','Furnished Single Room','Cozy Room Near Metro','Sunlit Studio Room','Premium Private Room','Shared Room for Students','Executive Room','Budget Friendly Room','Quiet Study Room','Balcony View Room','Modern Co-Living Room','Comfort Single Room']
}
const places = ['Niti Khand, Indirapuram','Vaishali, Ghaziabad','Shakti Khand, Indirapuram','Raj Nagar, Ghaziabad','Ahinsa Khand, Indirapuram','Shipra Suncity, Indirapuram']
const defaultVisitProperty = { name: 'Sunrise PG for Girls', type: 'PG', index: 0, location: 'Niti Khand, Indirapuram, Ghaziabad', price: 7000 }

function StudentChrome({ active, onNavigate, children }) {
  const [menu, setMenu] = useState(false)
  return <div className="student-pages"><header className="student-header"><button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Open navigation"><Icon name="menu" size={21}/></button><a className="brand dash-brand" onClick={() => onNavigate('Home')} href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><label className="student-search"><Icon name="search" size={17}/><input placeholder="Search by location, property name or landmark..."/></label><div className="student-user"><span><Icon name="bell" size={20}/></span><b>A</b><i>Aman Verma<small>Student</small></i><em>⌄</em></div></header><StudentSidebar active={active} onNavigate={onNavigate} menu={menu} onClose={() => setMenu(false)} /><main className="student-content">{children}</main></div>
}

function ListingCard({ name, type, index, onVisit, onDetails }) {
  const price = type === 'Flats' ? [18000,12000,25000,14500,28000,20000,16500,22000,19500,11000,24000,30000][index] : type === 'Rooms' ? [9000,7500,8500,11000,12000,6000,13500,5500,7000,10000,9500,8000][index] : [7000,6500,8000,5500,9000,7500,8500,6800,7200,6200,7800,8800][index]
  const property = { name, index, location: places[index % places.length], price, type }
  return <article className="listing-card"><div className={`listing-photo photo-${index % 6}`}><span>{index % 3 === 0 ? 'Verified' : index % 3 === 1 ? 'Popular' : 'Near Metro'}</span><button>♡</button></div><div className="listing-body"><h3>{name}</h3><p>⌖ &nbsp;{places[index % places.length]}</p><div className="listing-price">₹{price.toLocaleString()} <small>/ month</small><i>★ 4.{(index + 4) % 10} ({72 + index * 7})</i></div><div className="listing-tags"><span>{type === 'PGs' ? 'With Food' : 'Furnished'}</span><span>Wi-Fi</span><span>{index % 2 ? 'AC' : 'Attached Bath'}</span></div><div className="listing-actions"><button onClick={() => onDetails(property)}>View Details</button><button onClick={() => onVisit(property)}>Book a Visit</button></div></div></article>
}

function BrowsePage({ onNavigate, type, savedNames = [], onToggleSaved }) {
  const [selectedTab, setSelectedTab] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    location: 'Indirapuram, Ghaziabad',
    budget: '₹ 8,000 – ₹ 20,000',
    propertyType: type === 'PGs' ? 'PG' : type === 'Flats' ? 'Flat' : 'Room',
    preferredFor: 'Anyone',
    amenities: 'College / University, Metro / Bus, Restaurants / Cafes'
  })

  const pageHeading = type === 'PGs' ? 'Verified PGs for Rent' : type === 'Flats' ? 'Verified Flats for Rent' : 'Verified Rooms for Rent'

  useEffect(() => {
    const tabs = document.querySelectorAll('.browse-tabs button')
    const handleTabClick = (event) => {
      setSelectedTab(event.currentTarget.textContent.trim())
      tabs.forEach((tab) => tab.classList.toggle('active', tab === event.currentTarget))
    }
    tabs.forEach((tab) => tab.addEventListener('click', handleTabClick))
    return () => tabs.forEach((tab) => tab.removeEventListener('click', handleTabClick))
  }, [type])

  useEffect(() => {
    if (!showFilters) return undefined
    const host = document.createElement('div')
    document.body.appendChild(host)
    const modalRoot = createRoot(host)
    modalRoot.render(<PreferencesModal values={selectedFilters} title={`Filter ${type}`} onClose={() => setShowFilters(false)} onSave={(nextFilters) => { setSelectedFilters((current) => ({ ...current, ...nextFilters })); setShowFilters(false) }} />)
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [showFilters, selectedFilters, type])

  useEffect(() => {
    if (!selectedProperty) return undefined
    const host = document.createElement('div')
    document.body.appendChild(host)
    const modalRoot = createRoot(host)
    modalRoot.render(<PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onBookVisit={() => { setSelectedProperty(null); onNavigate('Book a Visit', undefined, selectedProperty) }} />)
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [selectedProperty, onNavigate])

  return (
    <StudentChrome active={type} onNavigate={onNavigate}>
      <section className="browse-heading">
        <div>
          <h1>{pageHeading}</h1>
          <p>Explore verified {type.toLowerCase()} for rent with real photos, genuine listings and neighborhood insights.</p>
        </div>
        <aside>Safe. Affordable. Verified.<br/><em>A better space for a brighter you ♡</em></aside>
      </section>
      <div className="browse-tabs">
        <button className="active">All {type}</button>
        {type === 'PGs' ? (
          <>
            <button>Girls PG</button>
            <button>Boys PG</button>
            <button>Co-Living</button>
            <button className="category-tab">With Food</button>
          </>
        ) : type === 'Flats' ? (
          <>
            <button>1 BHK</button>
            <button>2 BHK</button>
            <button>3 BHK</button>
            <button className="category-tab">4 BHK+</button>
          </>
        ) : (
          <>
            <button>Private Room</button>
            <button>Shared Room</button>
            <button>With AC</button>
            <button className="category-tab">Near Metro</button>
          </>
        )}
      </div>
      <section className="listing-layout listing-layout-full">
        <div>
          <section className="preferences listing-preferences">
            <h2>
              <span>Your Preferences</span>
              <button type="button" className="edit-preferences-btn" onClick={(event) => { event.preventDefault(); setShowFilters(true) }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                Edit Preferences
              </button>
            </h2>
            <p>We use your preferences to give better recommendations.</p>
            <div>
              <span>⌖<b>{selectedFilters.location}</b></span>
              <span>⌂<b>{selectedFilters.propertyType}</b></span>
              <span>₹<b>Budget<br/>{selectedFilters.budget}</b></span>
              <span>♧<b>Preferred For<br/>{selectedFilters.preferredFor}</b></span>
              <span>▱<b>Amenities<br/>{selectedFilters.amenities}</b></span>
            </div>
          </section>
          <div className="listing-toolbar">
            <strong>Showing 12 {type} in Indirapuram</strong>
            <span>
              <button>Sort by: Relevance　⌄</button>
              <button className="active">▦ Grid</button>
            </span>
          </div>
          <div className={`listing-grid ${type === 'PGs' ? 'pg-listing-grid' : ''}`}>
            {listingNames[type].map((name, index) => (
              <ListingCard 
                key={name} 
                name={name} 
                type={type} 
                index={index} 
                onVisit={(property) => onNavigate('Book a Visit', undefined, property)} 
                onDetails={setSelectedProperty}
              />
            ))}
          </div>
        </div>
      </section>
      <InfoStrip />
    </StudentChrome>
  )
}

const ListingsPage = BrowsePage

function ExplorePage({ onNavigate }) {
  const [selected, setSelected] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState(null)

  useEffect(() => {
    if (!selectedProperty) return undefined
    const host = document.createElement('div')
    document.body.appendChild(host)
    const modalRoot = createRoot(host)
    modalRoot.render(
      <PropertyDetailsModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
        onBookVisit={() => { 
          setSelectedProperty(null)
          onNavigate('Book a Visit', undefined, selectedProperty) 
        }} 
      />
    )
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [selectedProperty, onNavigate])

  const listingsToShow = selected === 'All' 
    ? [...listingNames.PGs.slice(0, 2), ...listingNames.Flats.slice(0, 2), ...listingNames.Rooms.slice(0, 2)]
    : listingNames[selected] || listingNames.PGs

  return (
    <StudentChrome active="Explore" onNavigate={onNavigate}>
      <section className="explore-heading">
        <div>
          <h1>Explore Indirapuram</h1>
          <p>Discover PGs, flats and rooms around you with an interactive map.</p>
        </div>
        <aside>Explore<br/><em>Safe Neighborhoods<br/>Brighter Opportunities ♡</em></aside>
      </section>

      <div className="explore-filters">
        <button className={selected === 'All' ? 'active' : ''} onClick={() => setSelected('All')}>
          <Icon name="grid" size={14}/> All
        </button>
        {['PGs', 'Flats', 'Rooms'].map((type) => (
          <button 
            key={type} 
            className={selected === type ? 'active' : ''} 
            onClick={() => { 
              setSelected(type)
              onNavigate(type)
            }}
          >
            {type === 'PGs' ? <Icon name="home" size={14}/> : type === 'Flats' ? <Icon name="building" size={14}/> : <Icon name="room" size={14}/>} {type}
          </button>
        ))}
        <label>Price Range <b>Any　⌄</b></label>
        <label>Property Type <b>Any　⌄</b></label>
        <button>☷ More Filters</button>
      </div>

      <section className="explore-layout">
        <div className="large-map">
          <input placeholder="⌕  Search this area"/>
          <b className="map-center">⌂<small>Indirapuram<br/>High Safety Score</small></b>
          <i className="map-marker a">⌂</i>
          <i className="map-marker b">⌖</i>
          <i className="map-marker c">⌂</i>
          <i className="map-marker d">⌖</i>
          <div className="map-view">
            Map View<br/>
            <button>▦ Default</button>
            <button>Satellite</button>
          </div>
        </div>

        <aside className="explore-results">
          <h2>
            {selected === 'All' ? '124' : '48'} properties found 
            <button>Sort by: Relevance　⌄</button>
          </h2>
          {listingsToShow.slice(0, 5).map((name, i) => {
            const propType = selected === 'All' ? (i < 2 ? 'PG' : i < 4 ? 'Flat' : 'Room') : selected.replace(/s$/, '')
            const price = [7000, 18000, 6500, 25000, 9000][i] || 8000
            const propertyItem = { name, index: i, location: places[i % places.length], price, type: propType }
            return (
              <article key={name}>
                <div className={`tiny-photo photo-${i % 6}`}/>
                <span>
                  <strong>{name}</strong>
                  <small>
                    ⌖ &nbsp;{places[i % places.length]}<br/>
                    ★ 4.{(i + 4) % 10} ({76 + i * 12})<br/>
                    <b>₹{price.toLocaleString()} </b>/ month
                  </small>
                </span>
                <button type="button" onClick={() => setSelectedProperty(propertyItem)}>View Details</button>
              </article>
            )
          })}
        </aside>
      </section>

      <InfoStrip />
    </StudentChrome>
  )
}

function PreferencesModal({ values, onClose, onSave }) {
  // 1. Location & Surroundings
  const [location, setLocation] = useState(values.location || '')
  const [distance, setDistance] = useState('')
  const [nearby, setNearby] = useState([])
  const [importance, setImportance] = useState(50)

  // 2. Safety Preferences
  const [safetyLevel, setSafetyLevel] = useState('')
  const [safetySurroundings, setSafetySurroundings] = useState([])

  // 3. Utilities Preferences
  const [waterAvailability, setWaterAvailability] = useState('')
  const [waterSource, setWaterSource] = useState('')
  const [electricityAvailability, setElectricityAvailability] = useState('')
  const [backupPreference, setBackupPreference] = useState('')

  // 4. Connectivity Preferences
  const [transport, setTransport] = useState([])
  const [commute, setCommute] = useState(30)

  // 5. Lifestyle Preferences
  const [noiseLevel, setNoiseLevel] = useState('')
  const [areaType, setAreaType] = useState('')
  const [nightlife, setNightlife] = useState('')
  const [foodOptions, setFoodOptions] = useState('')
  const [socialEnv, setSocialEnv] = useState('')
  const [greenSpaces, setGreenSpaces] = useState('')
  const [crowdLevel, setCrowdLevel] = useState('')

  // 6. Property Preferences
  const [propertyType, setPropertyType] = useState(values.propertyType || '')
  const [budgetRange, setBudgetRange] = useState({ min: 5000, max: 25000 })
  const [furnishing, setFurnishing] = useState('')
  const [roomSharing, setRoomSharing] = useState('')
  const [foodPreference, setFoodPreference] = useState('')

  // 7. Environment Preferences
  const [airQuality, setAirQuality] = useState('')
  const [envGreen, setEnvGreen] = useState('')
  const [pollutionTolerance, setPollutionTolerance] = useState('')

  // 8. Additional Preferences
  const [notes, setNotes] = useState(values.notes || '')

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleSave = () => {
    onSave({
      location: location || 'Indirapuram, Ghaziabad',
      propertyType: propertyType ? propertyType.replace(/^🏠\s*/, '') : (values.propertyType || 'PG'),
      budget: `₹ ${budgetRange.min.toLocaleString()} – ₹ ${budgetRange.max.toLocaleString()}`,
      preferredFor: roomSharing || 'Single',
      amenities: [...nearby, ...transport].length > 0 ? [...nearby, ...transport].slice(0, 3).join(', ') : 'Wi-Fi, AC, Attached Bath',
      notes
    })
  }

  const handleReset = () => {
    setLocation('')
    setDistance('')
    setNearby([])
    setImportance(50)
    setSafetyLevel('')
    setSafetySurroundings([])
    setWaterAvailability('')
    setWaterSource('')
    setElectricityAvailability('')
    setBackupPreference('')
    setTransport([])
    setCommute(30)
    setNoiseLevel('')
    setAreaType('')
    setNightlife('')
    setFoodOptions('')
    setSocialEnv('')
    setGreenSpaces('')
    setCrowdLevel('')
    setPropertyType('')
    setBudgetRange({ min: 5000, max: 25000 })
    setFurnishing('')
    setRoomSharing('')
    setFoodPreference('')
    setAirQuality('')
    setEnvGreen('')
    setPollutionTolerance('')
    setNotes('')
  }

  return (
    <div className="pref-modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pref-modal-container" role="dialog" aria-modal="true" aria-labelledby="pref-modal-title">
        {/* Modal Header */}
        <header className="pref-modal-header">
          <div className="pref-header-left">
            <div className="pref-header-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            <div>
              <h2 id="pref-modal-title">Edit Your Preferences</h2>
              <p>Help us understand your needs better to give more accurate AI recommendations.</p>
            </div>
          </div>
          <button type="button" className="pref-modal-close" onClick={onClose} aria-label="Close preferences">✕</button>
        </header>

        {/* Modal Body */}
        <div className="pref-modal-body">
          <div className="pref-modal-grid">
            
            {/* COLUMN 1: Location & Lifestyle */}
            <div className="pref-column">
              {/* Card 1: Location & Surroundings */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon purple">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  </span>
                  <div>
                    <h3>Location &amp; Surroundings</h3>
                    <p>Where do you want to live?</p>
                  </div>
                </div>

                <div className="pref-search-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search city, college or workplace..."
                  />
                </div>

                <div className="pref-field-group">
                  <label className="pref-field-label">Preferred distance from location</label>
                  <div className="pref-pills-row">
                    {['Within 1 km', '1 – 3 km', '3 – 5 km', '5+ km'].map((dist) => (
                      <button
                        key={dist}
                        type="button"
                        className={`pref-pill-btn ${distance === dist ? 'active' : ''}`}
                        onClick={() => setDistance(dist)}
                      >
                        {dist}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pref-field-group">
                  <label className="pref-field-label">Nearby places <small>(Select what matters to you)</small></label>
                  <div className="pref-checkbox-grid">
                    {[
                      { id: 'College / University', icon: '🎓' },
                      { id: 'Metro / Bus', icon: '🚇' },
                      { id: 'Hospital', icon: '🏥' },
                      { id: 'Market / Grocery', icon: '🛒' },
                      { id: 'Restaurants / Cafes', icon: '🍽️' },
                      { id: 'Gym', icon: '🏋️' },
                      { id: 'ATM / Bank', icon: '🏦' },
                      { id: 'Parks', icon: '🌲' },
                      { id: 'Pharmacy', icon: '💊' }
                    ].map(({ id, icon }) => {
                      const checked = nearby.includes(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`pref-check-pill ${checked ? 'checked' : ''}`}
                          onClick={() => toggleItem(nearby, setNearby, id)}
                        >
                          <span className="pref-checkbox-box">{checked ? '✓' : ''}</span>
                          <span className="pref-pill-icon">{icon}</span>
                          <span>{id}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="pref-field-group">
                  <div className="pref-slider-header">
                    <label className="pref-field-label">Importance</label>
                  </div>
                  <div className="pref-slider-wrap">
                    <span className="pref-slider-bound">Low</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={importance}
                      onChange={(e) => setImportance(Number(e.target.value))}
                      className="pref-range-slider"
                    />
                    <span className="pref-slider-bound">High</span>
                  </div>
                </div>
              </section>

              {/* Card 2: Lifestyle Preferences */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon purple">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.8 20c.6-4 2.3-6 5.2-6s4.6 2 5.2 6M15 15c2.4.1 4 1.7 4.5 5"/></svg>
                  </span>
                  <div>
                    <h3>Lifestyle Preferences</h3>
                    <p>What kind of neighborhood do you prefer?</p>
                  </div>
                </div>

                <div className="pref-lifestyle-list">
                  {[
                    { label: 'Noise Level', val: noiseLevel, set: setNoiseLevel, opts: ['Quiet', 'Moderate', 'Lively'] },
                    { label: 'Area Type', val: areaType, set: setAreaType, opts: ['Residential', 'Mixed', 'Commercial'] },
                    { label: 'Nightlife', val: nightlife, set: setNightlife, opts: ['Not important', 'Some', 'Important'] },
                    { label: 'Food Options', val: foodOptions, set: setFoodOptions, opts: ['Restaurants', 'Street food', 'Both'] },
                    { label: 'Social Environment', val: socialEnv, set: setSocialEnv, opts: ['Peaceful', 'Social', 'Very active'] },
                    { label: 'Green Spaces', val: greenSpaces, set: setGreenSpaces, opts: ['Not important', 'Prefer', 'Essential'] },
                    { label: 'Crowd Level', val: crowdLevel, set: setCrowdLevel, opts: ['Low', 'Moderate', 'High'] }
                  ].map(({ label, val, set, opts }) => (
                    <div className="pref-lifestyle-row" key={label}>
                      <span className="pref-lifestyle-label">{label}</span>
                      <div className="pref-pills-row compact">
                        {opts.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`pref-pill-btn ${val === opt ? 'active' : ''}`}
                            onClick={() => set(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* COLUMN 2: Safety, Utilities & Connectivity */}
            <div className="pref-column">
              {/* Card 3: Safety Preferences */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon purple">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 3 20 6v5c0 5-3.45 8.73-8 10-4.55-1.27-8-5-8-10V6l8-3Z"/></svg>
                  </span>
                  <div>
                    <h3>Safety Preferences</h3>
                    <p>How important is safety to you?</p>
                  </div>
                </div>

                <div className="pref-pills-row">
                  {['Low', 'Medium', 'High', 'Very High'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`pref-pill-btn ${safetyLevel === lvl ? 'active' : ''}`}
                      onClick={() => setSafetyLevel(lvl)}
                    >
                      {lvl === 'High' && '🛡️ '}
                      {lvl}
                    </button>
                  ))}
                </div>

                <div className="pref-field-group">
                  <label className="pref-field-label">Preferred surroundings <small>(Select all that apply)</small></label>
                  <div className="pref-checkbox-grid two-col">
                    {[
                      { id: 'Well-lit streets', icon: '👁️' },
                      { id: 'Low crime area', icon: '🛡️' },
                      { id: 'CCTV availability', icon: '📹' },
                      { id: 'Security guard', icon: '👮' },
                      { id: 'Gated community', icon: '🏛️' },
                      { id: 'Safe for late-night travel', icon: '🌙' }
                    ].map(({ id, icon }) => {
                      const checked = safetySurroundings.includes(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`pref-check-pill ${checked ? 'checked' : ''}`}
                          onClick={() => toggleItem(safetySurroundings, setSafetySurroundings, id)}
                        >
                          <span className="pref-checkbox-box">{checked ? '✓' : ''}</span>
                          <span className="pref-pill-icon">{icon}</span>
                          <span>{id}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </section>

              {/* Card 4: Utilities Preferences */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon cyan">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                  </span>
                  <div>
                    <h3>Utilities Preferences</h3>
                    <p>Your essential living requirements.</p>
                  </div>
                </div>

                <div className="pref-split-grid">
                  {/* Water Col */}
                  <div>
                    <h4 className="pref-subhead">💧 Water Availability</h4>
                    <div className="pref-radio-list">
                      {['24×7 required', 'Mostly available', 'Occasional shortage acceptable'].map((opt) => (
                        <label key={opt} className="pref-radio-label">
                          <input
                            type="radio"
                            name="water-avail"
                            checked={waterAvailability === opt}
                            onChange={() => setWaterAvailability(opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    <h4 className="pref-subhead">Water Source Preference</h4>
                    <div className="pref-pills-grid two-col">
                      {['Municipal', 'Borewell', 'Tanker backup', 'Any reliable source'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`pref-pill-btn ${waterSource === opt ? 'active' : ''}`}
                          onClick={() => setWaterSource(opt)}
                        >
                          <span className="pref-radio-dot">{waterSource === opt ? '•' : '○'}</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Electricity Col */}
                  <div>
                    <h4 className="pref-subhead">⚡ Electricity Availability</h4>
                    <div className="pref-radio-list">
                      {['24×7 required', 'Short outages acceptable', 'Backup preferred'].map((opt) => (
                        <label key={opt} className="pref-radio-label">
                          <input
                            type="radio"
                            name="elec-avail"
                            checked={electricityAvailability === opt}
                            onChange={() => setElectricityAvailability(opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    <h4 className="pref-subhead">Electricity Backup</h4>
                    <div className="pref-pills-grid two-col">
                      {['Generator', 'Inverter', 'UPS', 'Not required'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`pref-pill-btn ${backupPreference === opt ? 'active' : ''}`}
                          onClick={() => setBackupPreference(opt)}
                        >
                          <span className="pref-radio-dot">{backupPreference === opt ? '•' : '○'}</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Card 5: Connectivity Preferences */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon cyan">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                  </span>
                  <div>
                    <h3>Connectivity Preferences</h3>
                    <p>Which transportation options matter to you?</p>
                  </div>
                </div>

                <div className="pref-field-group">
                  <label className="pref-field-label">Preferred transport <small>(Select all that apply)</small></label>
                  <div className="pref-checkbox-grid auto-fit">
                    {[
                      { id: 'Metro', icon: '🚆' },
                      { id: 'Bus', icon: '🚌' },
                      { id: 'Cab', icon: '🚕' },
                      { id: 'Two-wheeler', icon: '🛵' },
                      { id: 'Walkable', icon: '🚶' }
                    ].map(({ id, icon }) => {
                      const checked = transport.includes(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`pref-check-pill ${checked ? 'checked' : ''}`}
                          onClick={() => toggleItem(transport, setTransport, id)}
                        >
                          <span className="pref-checkbox-box">{checked ? '✓' : ''}</span>
                          <span className="pref-pill-icon">{icon}</span>
                          <span>{id}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="pref-field-group">
                  <div className="pref-slider-header">
                    <label className="pref-field-label">Maximum acceptable commute <small>(to college/workplace)</small></label>
                    <strong className="pref-highlight-badge">{commute} minutes</strong>
                  </div>
                  <div className="pref-slider-wrap">
                    <span className="pref-slider-bound">15 min</span>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={commute}
                      onChange={(e) => setCommute(Number(e.target.value))}
                      className="pref-range-slider"
                    />
                    <span className="pref-slider-bound">60 min</span>
                  </div>
                </div>
              </section>
            </div>

            {/* COLUMN 3: Property, Environment & Additional Preferences */}
            <div className="pref-column">
              {/* Card 6: Property Preferences */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon purple">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/></svg>
                  </span>
                  <div>
                    <h3>Property Preferences</h3>
                    <p>What kind of accommodation are you looking for?</p>
                  </div>
                </div>

                <div className="pref-field-group">
                  <label className="pref-field-label">Property type</label>
                  <div className="pref-pills-grid three-col">
                    {['PG', 'Private Room', 'Shared Room'].map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        className={`pref-pill-btn ${propertyType.includes(pt) ? 'active' : ''}`}
                        onClick={() => setPropertyType(pt)}
                      >
                        {pt === 'PG' && '🏠 '}
                        {pt}
                      </button>
                    ))}
                  </div>
                  <div className="pref-pills-grid four-col" style={{ marginTop: '6px' }}>
                    {['1 BHK', '2 BHK', 'Flat', 'Studio'].map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        className={`pref-pill-btn ${propertyType === pt ? 'active' : ''}`}
                        onClick={() => setPropertyType(pt)}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pref-field-group">
                  <div className="pref-slider-header">
                    <label className="pref-field-label">Budget range <small>(per month)</small></label>
                  </div>
                  <div className="pref-budget-row">
                    <span className="pref-budget-display">
                      ₹ {budgetRange.min.toLocaleString()} – ₹ {budgetRange.max.toLocaleString()}
                    </span>
                    <div className="pref-slider-wrap" style={{ flex: 1 }}>
                      <input
                        type="range"
                        min="3000"
                        max="45000"
                        step="1000"
                        value={budgetRange.max}
                        onChange={(e) => setBudgetRange((r) => ({ ...r, max: Math.max(r.min + 2000, Number(e.target.value)) }))}
                        className="pref-range-slider"
                      />
                    </div>
                  </div>
                </div>

                <div className="pref-split-grid two-col" style={{ marginTop: '6px' }}>
                  <div>
                    <label className="pref-field-label">Furnishing</label>
                    <div className="pref-select-wrap">
                      <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)}>
                        <option value="">Select Furnishing</option>
                        <option>Fully furnished</option>
                        <option>Semi-furnished</option>
                        <option>Unfurnished</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="pref-field-label">Room sharing</label>
                    <div className="pref-select-wrap">
                      <select value={roomSharing} onChange={(e) => setRoomSharing(e.target.value)}>
                        <option value="">Select Sharing</option>
                        <option>Single</option>
                        <option>Double sharing</option>
                        <option>Triple sharing</option>
                        <option>4+ sharing</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '6px' }}>
                  <label className="pref-field-label">Food preference</label>
                  <div className="pref-select-wrap">
                    <select value={foodPreference} onChange={(e) => setFoodPreference(e.target.value)}>
                      <option value="">Select Food</option>
                      <option>Required</option>
                      <option>Optional</option>
                      <option>Self Cooking</option>
                      <option>Not Required</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Card 7: Environment Preferences */}
              <section className="pref-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon cyan">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20.5 3.5C13 3.7 6.2 7 5 14.3c-.45 2.76.85 5.01 2.5 6.2 1.2-3.2 3.7-6.7 8.5-9.1-3.62 2.75-5.91 5.5-7.15 8.4 1.06.48 2.28.52 3.45.1C19.7 17.2 21.6 9.25 20.5 3.5Z"/></svg>
                  </span>
                  <div>
                    <h3>Environment Preferences</h3>
                    <p>Air quality and green surroundings.</p>
                  </div>
                </div>

                <div className="pref-row-field">
                  <span className="pref-row-label">Air quality</span>
                  <div className="pref-pills-row">
                    {['Good air quality required', 'Moderate acceptable', 'Not important'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`pref-pill-btn ${airQuality === opt ? 'active' : ''}`}
                        onClick={() => setAirQuality(opt)}
                      >
                        {opt === 'Good air quality required' && '🍃 '}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pref-row-field">
                  <span className="pref-row-label">Green spaces</span>
                  <div className="pref-pills-row">
                    {['Park nearby', 'Green surroundings', 'Walking areas'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`pref-pill-btn ${envGreen === opt ? 'active' : ''}`}
                        onClick={() => setEnvGreen(opt)}
                      >
                        {opt === 'Park nearby' && '🌲 '}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pref-row-field">
                  <span className="pref-row-label">Pollution tolerance</span>
                  <div className="pref-pills-row">
                    {['Low', 'Medium', 'High'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`pref-pill-btn ${pollutionTolerance === opt ? 'active' : ''}`}
                        onClick={() => setPollutionTolerance(opt)}
                      >
                        {opt === 'Low' && '🍃 '}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Card 8: Additional Preferences (Optional) */}
              <section className="pref-card pref-additional-card">
                <div className="pref-card-header">
                  <span className="pref-card-icon purple">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                  <div>
                    <h3>Additional Preferences <small>(Optional)</small></h3>
                    <p>Any special requirements or lifestyle notes.</p>
                  </div>
                </div>

                <div className="pref-notes-wrap">
                  <textarea
                    maxLength={200}
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type your additional preferences here..."
                  />
                  <span className="pref-char-counter">{notes.length}/200</span>
                </div>
              </section>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <footer className="pref-modal-footer">
          <button type="button" className="pref-btn-secondary reset" onClick={handleReset}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Reset to Default
          </button>
          <div className="pref-footer-actions">
            <button type="button" className="pref-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="pref-btn-primary" onClick={handleSave}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 4 4 10-12"/></svg>
              Save Preferences
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

function PropertyDetailsModal({ property, onClose, onBookVisit }) {
  const amenities = ['Wi-Fi', 'Meals Included', 'AC (Selected Room)', 'Attached Bathroom', 'Laundry', 'Common Kitchen', 'Study Area', '24/7 Security', 'Power Backup', 'RO Water', 'Refrigerator', 'Housekeeping']
  return (
    <div className="property-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="property-modal" role="dialog" aria-modal="true" aria-labelledby="property-modal-title">
        <button type="button" className="property-modal-close" onClick={onClose} aria-label="Close property details">✕</button>
        <div className="property-modal-main">
          <div className="property-gallery">
            <div className="property-gallery-main">
              <span>92% Match</span>
              <i>‹</i>
              <div className={`property-detail-image photo-${property.index % 6}`} />
              <i>›</i>
              <small>1/10</small>
            </div>
            <div className="property-thumbnails">
              {[0, 1, 2, 3, 4].map((image) => <div className={`photo-${(property.index + image) % 6}`} key={image} />)}
              <b>+6<br/><small>More Photos</small></b>
            </div>
            <nav className="property-detail-tabs">
              <button className="active">Overview</button>
              <button>Amenities</button>
              <button>Location</button>
              <button>Reviews</button>
            </nav>
            <section className="property-description">
              <h3>Property Description</h3>
              <p>A safe and comfortable place for students and working professionals in {property.location}. This verified property offers modern amenities, reliable connectivity and a community-focused living experience.</p>
              <h3>Amenities</h3>
              <div className="detail-amenities">
                {amenities.map((amenity) => <span key={amenity}><Icon name="check" size={13}/>{amenity}</span>)}
              </div>
              <div className="tenant-reviews">
                <div><h3>Reviews from Tenants (2)</h3><a href="#">View All Reviews</a></div>
                <article><b>A</b><p><strong>Ananya Verma</strong><small>Stayed for 8 months</small><span>★ 4.8　2 months ago</span>“Very safe and comfortable PG. The food is good and the owner is really helpful.”</p></article>
                <article><b>R</b><p><strong>Riya Singh</strong><small>Stayed for 6 months</small><span>★ 4.5　4 months ago</span>“Clean rooms, good facilities and peaceful environment.”</p></article>
              </div>
            </section>
          </div>
          <aside className="property-detail-side">
            <section className="property-summary">
              <h2 id="property-modal-title">{property.name}</h2>
              <p>⌖ {property.location}</p>
              <strong>₹{property.price.toLocaleString()} <small>/ month</small></strong>
              <span>Includes meals</span>
              <div className="detail-stats">
                <b>⌂<small>{property.type}<br/>Independent</small></b>
                <b>♜<small>Meals Included<br/>Homely Food</small></b>
                <b>⌁<small>Wi-Fi<br/>High Speed</small></b>
                <b>⌖<small>0.8 km<br/>from Metro</small></b>
                <b>⌁<small>2.5 km<br/>from College</small></b>
                <b>◷<small>Safe & Secure<br/>Verified Property</small></b>
              </div>
            </section>
            <section className="owner-contact">
              <h3>Contact Owner</h3>
              <div><b>A</b><span><strong>Priya Sharma</strong><small>● Online</small></span></div>
              <button>☎ Call Now</button>
              <button>▣ Message</button>
            </section>
            <section className="detail-location">
              <h3>Location <a href="#">View on Map</a></h3>
              <div><span>⌖</span><b>{property.location}<small>Metro Station</small></b></div>
            </section>
            <section className="property-highlights">
              <h3>Property Highlights</h3>
              <p>◉ Prime location</p>
              <p>◉ Student-friendly environment</p>
              <p>◉ Hygienic & home-cooked meals</p>
              <p>◉ 24/7 security and CCTV</p>
              <p>◉ Close to metro, college and market</p>
            </section>
          </aside>
        </div>
        <footer className="property-modal-footer">
          <div className="property-footer-pricing">
            <strong>₹{property.price.toLocaleString()} <small>/ month</small></strong>
            <span>Includes meals • SafeRent Verified</span>
          </div>
          <div className="property-footer-actions">
            <button type="button" className="property-share-btn" onClick={() => { if (navigator.clipboard) { navigator.clipboard.writeText(window.location.href); alert('Property link copied to clipboard!'); } else { alert('Link copied!'); } }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share
            </button>
            <button type="button" className="property-book-btn" onClick={onBookVisit}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Book Now
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}

function RecommendationsPage({ onNavigate, filters }) {
  const defaultFilters = {
    location: 'Indirapuram, Ghaziabad',
    propertyType: 'PG',
    budget: '₹ 8,000 – ₹ 20,000',
    preferredFor: 'Single',
    amenities: 'College / University, Metro / Bus, Restaurants / Cafes'
  }
  const [selectedFilters, setSelectedFilters] = useState({ ...defaultFilters, ...filters })
  const [showPreferences, setShowPreferences] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const propertyTypeLabel = selectedFilters.propertyType === 'Flat' ? 'Flat' : selectedFilters.propertyType === 'Room' ? 'Room' : selectedFilters.propertyType

  useEffect(() => {
    const openPreferences = (event) => {
      const trigger = event.target.closest('.preferences h2 a, .preferences h2 button, .edit-preferences-btn')
      if (!trigger) return
      event.preventDefault()
      setShowPreferences(true)
    }
    document.addEventListener('click', openPreferences)
    return () => document.removeEventListener('click', openPreferences)
  }, [])

  useEffect(() => {
    const openPropertyDetails = (event) => {
      const button = event.target.closest('.recommend-list article > strong button')
      if (!button) return
      event.preventDefault()
      event.stopPropagation()
      const card = button.closest('article')
      const index = [...card.parentElement.children].indexOf(card)
      setSelectedProperty({ name: [...listingNames.PGs.slice(0, 2), '2 BHK Apartment'][index], index, location: places[index], price: [7000, 6500, 18000][index], type: propertyTypeLabel })
    }
    document.addEventListener('click', openPropertyDetails, true)
    return () => document.removeEventListener('click', openPropertyDetails, true)
  }, [propertyTypeLabel])

  useEffect(() => {
    if (!showPreferences) return undefined
    const host = document.createElement('div')
    document.body.appendChild(host)
    const modalRoot = createRoot(host)
    const closeModal = () => setShowPreferences(false)
    modalRoot.render(<PreferencesModal values={selectedFilters} onClose={closeModal} onSave={(nextFilters) => { setSelectedFilters((current) => ({ ...current, ...nextFilters })); closeModal() }} />)
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [showPreferences, selectedFilters])

  useEffect(() => {
    if (!selectedProperty) return undefined
    const host = document.createElement('div')
    document.body.appendChild(host)
    const modalRoot = createRoot(host)
    modalRoot.render(<PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onBookVisit={() => { setSelectedProperty(null); onNavigate('Book a Visit', undefined, selectedProperty) }} />)
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [selectedProperty, onNavigate])

  return (
    <StudentChrome active="AI Recommendations" onNavigate={onNavigate}>
      <section className="ai-title">
        <div>
          <h1>AI Recommendations</h1>
          <p>Get personalized property suggestions based on your preferences, budget and lifestyle.</p>
        </div>
        <aside>🤖 <b>Let AI do the searching for you!</b><em>“Right Homes, Brighter Tomorrows.”</em></aside>
      </section>

      <section className="ai-layout">
        <div className="ai-main-column">
          <section className="preferences">
            <h2>
              <span>Your Preferences</span>
              <button type="button" className="edit-preferences-btn" onClick={() => setShowPreferences(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                Edit Preferences
              </button>
            </h2>
            <p>We use your preferences to give better recommendations.</p>
            <div>
              <span>⌖<b>{selectedFilters.location}</b></span>
              <span>⌂<b>{propertyTypeLabel}</b></span>
              <span>₹<b>Budget<br/>{selectedFilters.budget}</b></span>
              <span>♧<b>Preferred For<br/>{selectedFilters.preferredFor}</b></span>
              <span>▱<b>Amenities<br/>{selectedFilters.amenities}</b></span>
            </div>
          </section>

          <nav className="recommend-tabs">
            <button>Recommended for You</button>
          </nav>

          <h2 className="top-recs">Top AI Recommendations <small>Properties selected just for you based on AI analysis.</small></h2>

          <section className="recommend-list">
            {[...listingNames.PGs.slice(0, 2), '2 BHK Apartment'].map((name, i) => (
              <article key={name}>
                <div className={`recommend-photo photo-${i}`}/>
                <div>
                  <h3>{name}</h3>
                  <p>⌖ &nbsp;{places[i]}</p>
                  <span>{propertyTypeLabel}　 {selectedFilters.preferredFor}　 With Food　 Near Metro</span>
                  <small>⌁ {selectedFilters.amenities}　♢ 24x7 Security</small>
                </div>
                <b>{[9.2, 8.8, 8.5][i]}<small>AI Match Score</small></b>
                <strong>
                  ₹{[7000, 6500, 18000][i].toLocaleString()} <small>/ month</small>
                  <button onClick={() => onNavigate('Book a Visit')}>View Details</button>
                </strong>
              </article>
            ))}
          </section>

          {/* Your Preferences Match banner after the articles */}
          <section className="match-score match-score-banner">
            <div className="match-score-header">
              <div className="match-score-left">
                <h2>Your Preferences Match</h2>
                <p>AI calculated match score against your search filters &amp; verified PG attributes.</p>
              </div>
              <div className="match-score-badge">
                <span className="match-badge-pct">92%</span>
                <span className="match-badge-lbl">Overall Match</span>
              </div>
            </div>
            <div className="match-breakdown-grid">
              <div className="match-bar-item">
                <div className="match-bar-info"><span>📍 Location &amp; Connectivity</span><b>100%</b></div>
                <div className="match-bar-track"><div className="match-bar-fill" style={{ width: '100%', background: '#4f46e5' }}/></div>
              </div>
              <div className="match-bar-item">
                <div className="match-bar-info"><span>🛡️ Safety &amp; Surroundings</span><b>95%</b></div>
                <div className="match-bar-track"><div className="match-bar-fill" style={{ width: '95%', background: '#10b981' }}/></div>
              </div>
              <div className="match-bar-item">
                <div className="match-bar-info"><span>💰 Budget Alignment</span><b>90%</b></div>
                <div className="match-bar-track"><div className="match-bar-fill" style={{ width: '90%', background: '#f59e0b' }}/></div>
              </div>
              <div className="match-bar-item">
                <div className="match-bar-info"><span>⚡ Amenities &amp; Utilities</span><b>85%</b></div>
                <div className="match-bar-track"><div className="match-bar-fill" style={{ width: '85%', background: '#8b5cf6' }}/></div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <InfoStrip />
    </StudentChrome>
  )
}

function LegacyVisitPage({ onNavigate }) {
  const [slot, setSlot] = useState('01:00 PM')
  const [confirmed, setConfirmed] = useState(false)
  return <StudentChrome active="Book a Visit" onNavigate={onNavigate}><section className="visit-heading"><h1>{confirmed ? 'Visit Confirmed!' : 'Book a Visit'}</h1><p>{confirmed ? 'Your visit request is on its way to the PG owner.' : "Schedule a visit to see the property in person. It's free, easy and helps you make a better decision."}</p></section>{confirmed ? <section className="confirmation">✓<h2>Booking request confirmed</h2><p>We have reserved your selected time. You will receive confirmation shortly.</p><button onClick={() => onNavigate('Home')}>Back to Dashboard</button></section> : <><div className="steps"><b>1 <span>Select Date & Time</span></b><b>2 <span>Your Details</span></b><b>3 <span>Confirm Booking</span></b></div><section className="visit-layout"><article className="visit-property"><div className="visit-photo"><span>✓ Verified PG</span></div><h2>Sunrise PG for Girls <i>★ 4.8 (128 reviews)</i></h2><p>⌖ Niti Khand, Indirapuram, Ghaziabad</p><h1>₹7,000 <small>/ month</small></h1><div className="visit-tags"><span>Girls Only</span><span>With Food</span><span>⌁ Wi-Fi</span><span>AC</span></div><hr/><h3>About this property</h3><p>A safe and comfortable PG for girls with modern amenities, homely food and great connectivity to metro and markets.</p><a href="#">View Full Details →</a></article><article className="visit-form"><h2>Select Date & Time</h2><p>Choose a convenient date and time to visit the property.</p><div className="calendar-slots"><section><h3>September 2025</h3><div className="week">Sun　Mon　Tue　Wed　Thu　Fri　Sat</div><div className="days">1　2　3　4　5　6<br/>7　8　9　10　11　12　13<br/>14　15　16　17　<b>18</b>　19　20<br/>21　22　23　24　25　26　27<br/>28　29　30</div></section><section><h3>Available Time Slots</h3><div className="slots">{['10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM'].map(time => <button className={slot === time ? 'active' : ''} onClick={() => setSlot(time)} key={time}>{time}</button>)}</div></section></div><hr/><h2>Your Details</h2><div className="details-inputs"><label>Full Name<input defaultValue="Aman Verma"/></label><label>Mobile Number<input defaultValue="+91 9876543210"/></label><label>Email Address<input defaultValue="amanverma@gmail.com"/></label></div><label className="message">Any Message (Optional)<textarea defaultValue="I would like to visit and know more about the food facilities and room availability."/></label></article><aside className="visit-summary"><h2>Visit Summary</h2><div><div className="summary-photo"/><h3>Sunrise PG for Girls<small>★ 4.8 (128 reviews)<br/>⌖ Niti Khand, Indirapuram<br/><b>₹7,000</b> / month</small></h3></div><p>▣　Selected Date <b>Thursday, 18 September 2025</b></p><p>◷　Selected Time <b>{slot} – 01:30 PM</b></p><p>♙　Your Name <b>Aman Verma</b></p><p>✉　Email Address <b>amanverma@gmail.com</b></p><section><h3>ⓘ Important Notes</h3><p>✓ The PG owner will confirm your visit shortly.</p><p>✓ You will receive a confirmation notification.</p><p>✓ Be on time for a better experience.</p></section><button onClick={() => setConfirmed(true)}>▣　 Confirm Booking</button><button onClick={() => onNavigate('Home')}>Cancel</button></aside></section></>}<InfoStrip /></StudentChrome>
}

function VisitPage({ onNavigate, onConfirm, onCancel, property = defaultVisitProperty }) {
  const [slot, setSlot] = useState('01:00 PM')
  const [selectedDate, setSelectedDate] = useState(18)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1))
  const [visitorDetails, setVisitorDetails] = useState({
    fullName: 'Aman Verma',
    mobileNumber: '+91 9876543210',
    emailAddress: 'amanverma@gmail.com',
    message: 'I would like to visit and know more about the food facilities and room availability.'
  })
  const [confirmed, setConfirmed] = useState(false)
  const visitProperty = property || defaultVisitProperty
  const monthDate = currentMonth
  const monthName = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay()
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
  const selectedDateLabel = new Date(monthDate.getFullYear(), monthDate.getMonth(), selectedDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const times = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM']
  const changeMonth = (direction) => {
    setCurrentMonth((previousMonth) => {
      const nextMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + direction, 1)
      setSelectedDate((currentDay) => Math.min(currentDay, new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate()))
      return nextMonth
    })
  }
  const updateVisitorDetail = (field, value) => {
    setVisitorDetails((current) => ({ ...current, [field]: value }))
  }
  const confirmBooking = () => {
    onConfirm({
      name: visitProperty.name,
      status: 'Upcoming',
      price: `₹${visitProperty.price.toLocaleString()}`,
      date: `${selectedDateLabel} at ${slot}`,
      location: visitProperty.location,
      guestName: visitorDetails.fullName,
      guestEmail: visitorDetails.emailAddress,
      guestPhone: visitorDetails.mobileNumber
    })
    onNavigate('My Bookings')
  }
  const cancelBooking = () => onCancel({
    name: visitProperty.name,
    status: 'Cancelled',
    price: `₹${visitProperty.price.toLocaleString()}`,
    date: `${selectedDateLabel} at ${slot}`,
    location: visitProperty.location,
    guestName: visitorDetails.fullName,
    guestEmail: visitorDetails.emailAddress,
    guestPhone: visitorDetails.mobileNumber
  })
  return <StudentChrome active="Book a Visit" onNavigate={onNavigate}><section className="visit-heading"><h1>{confirmed ? 'Visit Confirmed!' : 'Book a Visit'}</h1><p>{confirmed ? 'Your visit request is on its way to the PG owner.' : "Schedule a visit to see the property in person. It's free, easy and helps you make a better decision."}</p></section>{confirmed ? <section className="confirmation">Booking confirmed<h2>Booking request confirmed</h2><p>We have reserved {selectedDateLabel} at {slot} for your visit.</p><button onClick={() => onNavigate('My Bookings')}>View My Bookings</button></section> : <section className="visit-layout"><article className="visit-property"><div className="visit-photo"><span>Verified PG</span></div><h2>{visitProperty.name} <i>4.8 (128 reviews)</i></h2><p>{visitProperty.location}</p><h1>₹{visitProperty.price.toLocaleString()} <small>/ month</small></h1><div className="visit-tags"><span>{visitProperty.type === 'Flats' ? 'Flat' : visitProperty.type === 'Rooms' ? 'Room' : 'PG'}</span><span>With Food</span><span>Wi-Fi</span><span>AC</span></div><hr/><h3>About this property</h3><p>A safe and comfortable property with modern amenities, homely food and great connectivity to metro and markets.</p><a href="#property-details">View Full Details</a></article><article className="visit-form"><h2>Select Date & Time</h2><p>Choose a convenient date and time to visit the property.</p><div className="calendar-slots"><section className="calendar"><header><button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>‹</button><h3>{monthName}</h3><button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>›</button></header><div className="week">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div><div className="days">{Array.from({ length: firstDay }, (_, index) => <span className="empty-day" key={`empty-${index}`} />)}{Array.from({ length: daysInMonth }, (_, index) => { const day = index + 1; return <button type="button" className={selectedDate === day ? 'selected' : ''} onClick={() => setSelectedDate(day)} key={day}>{day}</button> })}</div></section><section><h3>Available Time Slots</h3><div className="slots">{times.map((time) => <button type="button" className={slot === time ? 'active' : ''} onClick={() => setSlot(time)} key={time}>{time}</button>)}</div></section></div><hr/><h2>Your Details</h2><div className="details-inputs"><label>Full Name<input value={visitorDetails.fullName} onChange={(event) => updateVisitorDetail('fullName', event.target.value)} /></label><label>Mobile Number<input value={visitorDetails.mobileNumber} onChange={(event) => updateVisitorDetail('mobileNumber', event.target.value)} /></label><label>Email Address<input value={visitorDetails.emailAddress} onChange={(event) => updateVisitorDetail('emailAddress', event.target.value)} /></label></div><label className="message">Any Message (Optional)<textarea value={visitorDetails.message} onChange={(event) => updateVisitorDetail('message', event.target.value)} /></label></article><aside className="visit-summary"><h2>Visit Summary</h2><div><div className={`summary-photo photo-${visitProperty.index % 6}`} /><h3>{visitProperty.name}<small>4.8 (128 reviews)<br />{visitProperty.location}<br /><b>₹{visitProperty.price.toLocaleString()}</b> / month</small></h3></div><p>Selected Date <b>{selectedDateLabel}</b></p><p>Selected Time <b>{slot}</b></p><p>Your Name <b>{visitorDetails.fullName}</b></p><p>Email Address <b>{visitorDetails.emailAddress}</b></p><p>Mobile Number <b>{visitorDetails.mobileNumber}</b></p>{visitorDetails.message && <p>Message <b>{visitorDetails.message}</b></p>}<section><h3>Important Notes</h3><p>The PG owner will confirm your visit shortly.</p><p>You will receive a confirmation notification.</p><p>Be on time for a better experience.</p></section><button type="button" onClick={confirmBooking}>Confirm Booking</button><button type="button" onClick={cancelBooking}>Cancel Booking</button></aside></section>}<InfoStrip /></StudentChrome>
}

function SavedPage({ onNavigate, saved, onRemove }) {
  const setSaved = (nextSaved) => {
    const removed = saved.find((item) => !nextSaved.includes(item))
    if (removed) onRemove(removed)
  }
  return <StudentChrome active="Saved Properties" onNavigate={onNavigate}><section className="saved-title"><div><h1>♥ &nbsp;Saved Properties</h1><p>All the properties you've saved for later. Compare, revisit and book when you're ready.</p></div><aside>Good Choices<br/><em>Brighter Tomorrows ♡</em></aside></section><div className="saved-tabs"><button className="active">▣ All Saved ({saved.length})</button><button>⌂ PGs (4)</button><button>▥ Flats (3)</button><button>⌁ Rooms (1)</button><button>＋ Compare Properties (0)</button></div><section className="saved-layout"><div><div className="listing-toolbar"><strong>Saved properties</strong><span><button>Sort by: Recently Saved　⌄</button><button className="active">▦ Grid</button></span></div><div className="listing-grid saved-grid">{saved.map((name, index) => <article className="listing-card" key={name}><div className={`listing-photo photo-${index % 6}`}><span>{index % 3 === 1 ? 'Flat' : index % 3 === 2 ? 'Room' : 'PG'}</span><button onClick={() => setSaved(saved.filter((item) => item !== name))}>♥</button></div><div className="listing-body"><h3>{name}</h3><p>⌖ &nbsp;{places[index % places.length]}</p><div className="listing-price">₹{[7000,18000,6500,9000,25000,6000,7500,8500][index].toLocaleString()} <small>/ month</small><i>★ 4.{index + 3} ({58 + index * 12})</i></div><div className="listing-tags"><span>With Food</span><span>Wi-Fi</span><span>AC</span></div><div className="listing-actions"><button>View Details</button><button onClick={() => onNavigate('Book a Visit')}>Book a Visit</button></div></div></article>)}</div></div><aside className="saved-side"><section><h2>🔖 Your Saved Properties</h2><b>{saved.length}</b><p>Properties saved</p></section><section><h2>⚖️ Compare & Choose Better</h2><p>Select multiple properties to compare features, prices and amenities.</p><button>Compare Properties　→</button></section><section><h2>Quick Actions</h2><p>◷　View Recently Viewed　›</p><p>✧　Get AI Recommendations　›</p><p>⚙　Update Your Preferences　›</p></section></aside></section><InfoStrip /></StudentChrome>
}

function SavedPageV2({ onNavigate, saved, onRemove }) {
  const [tab, setTab] = useState('All')
  const [sort, setSort] = useState('recent')
  const [grid, setGrid] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [compareMessage, setCompareMessage] = useState('')
  const [compareSelection, setCompareSelection] = useState([])
  const getType = (name) => listingNames.Flats.includes(name) ? 'Flats' : listingNames.Rooms.includes(name) ? 'Rooms' : 'PGs'
  const savedRecords = saved.map((name, index) => ({ name, type: getType(name), index, location: places[index % places.length], price: getType(name) === 'Flats' ? 18000 : getType(name) === 'Rooms' ? 7500 : 7000 }))
  const counts = { All: savedRecords.length, PGs: savedRecords.filter(({ type }) => type === 'PGs').length, Flats: savedRecords.filter(({ type }) => type === 'Flats').length, Rooms: savedRecords.filter(({ type }) => type === 'Rooms').length }
  const visibleRecords = savedRecords.filter(({ type }) => tab === 'All' || type === tab).sort((first, second) => sort === 'price' ? first.price - second.price : first.name.localeCompare(second.name))
    const toggleCompare = (name) => setCompareSelection((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
    const compareProperties = () => setCompareMessage(compareSelection.length ? `${compareSelection.length} ${compareSelection.length === 1 ? 'property' : 'properties'} selected for comparison.` : 'Select properties from the list to compare their features.')
  useEffect(() => {
    const cleanups = []
    document.querySelectorAll('.saved-grid .listing-card').forEach((card) => {
      const name = card.querySelector('h3')?.textContent
      const photo = card.querySelector('.listing-photo')
      const body = card.querySelector('.listing-body')
      if (!name || !photo || !body) return
      let savedHeart = body.querySelector('.saved-heart')
      if (!savedHeart) {
        savedHeart = document.createElement('button')
        savedHeart.type = 'button'
        savedHeart.className = 'saved-heart'
        savedHeart.textContent = '♥'
        savedHeart.setAttribute('aria-label', `Remove ${name} from saved properties`)
        body.prepend(savedHeart)
      }
      const handleSavedHeart = () => onRemove(name)
      savedHeart.addEventListener('click', handleSavedHeart)
      cleanups.push(() => savedHeart.removeEventListener('click', handleSavedHeart))
      let input = photo.querySelector('.compare-check input')
      if (!input) {
        const label = document.createElement('label')
        label.className = 'compare-check'
        input = document.createElement('input')
        input.type = 'checkbox'
        label.append(input)
        photo.prepend(label)
      }
      input.checked = compareSelection.includes(name)
      input.setAttribute('aria-label', `Add ${name} to comparison`)
      const handleChange = () => toggleCompare(name)
      input.addEventListener('change', handleChange)
      cleanups.push(() => input.removeEventListener('change', handleChange))
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [visibleRecords, compareSelection])
  const tabs = [['All', <Icon name="heart" size={16}/>], ['PGs', <Icon name="grid" size={16}/>], ['Flats', <Icon name="building" size={16}/>], ['Rooms', <Icon name="room" size={16}/>]]
  return <StudentChrome active="Saved Properties" onNavigate={onNavigate}>
    <section className="saved-title"><div><h1>Saved Properties</h1><p>Compare, revisit and book the homes you have saved.</p></div><aside>Good Choices<br/><em>Brighter Tomorrows</em></aside></section>
    <div className="saved-tabs">{tabs.map(([name, icon]) => <button type="button" className={tab === name ? 'active' : ''} onClick={() => setTab(name)} key={name}>{icon}<span>{name === 'All' ? 'All Saved' : name} ({counts[name]})</span></button>)}<button type="button" onClick={compareProperties}><Icon name="grid" size={16}/><span>Compare ({compareSelection.length})</span></button></div>
    {compareMessage && <p className="saved-notice">{compareMessage}</p>}
    <section className="saved-layout"><div><div className="listing-toolbar"><strong>{visibleRecords.length} saved properties</strong><span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort saved properties"><option value="recent">Sort by: Recently Saved</option><option value="name">Sort by: Property Name</option><option value="price">Sort by: Price</option></select><button type="button" className={grid ? 'active' : ''} onClick={() => setGrid(true)} aria-label="Grid view"><Icon name="grid" size={15}/></button><button type="button" className={!grid ? 'active' : ''} onClick={() => setGrid(false)} aria-label="List view"><Icon name="menu" size={15}/></button></span></div><div className={`listing-grid saved-grid ${grid ? '' : 'saved-list-view'}`}>{visibleRecords.map(({ name, type, index, location, price }) => <article className="listing-card" key={name}><div className={`listing-photo photo-${index % 6}`}><span>{type === 'PGs' ? 'PG' : type === 'Flats' ? 'Flat' : 'Room'}</span></div><div className="listing-body"><h3>{name}</h3><p>{location}</p><div className="listing-price">₹{price.toLocaleString()} <small>/ month</small></div><div className="listing-tags"><span>With Food</span><span>Wi-Fi</span><span>AC</span></div><div className="listing-actions"><button type="button" onClick={() => setSelectedProperty({ name, type, index, location, price })}>View Details</button><button type="button" onClick={() => onNavigate('Book a Visit')}>Book a Visit</button></div></div></article>)}</div></div><aside className="saved-side"><section><h2><Icon name="heart" size={16}/> Saved Properties</h2><b>{saved.length}</b><p>Properties saved</p></section><section><h2><Icon name="grid" size={16}/> Compare & Choose</h2><p>Review prices, amenities and property types together.</p><button type="button" onClick={() => setCompareMessage('Select properties from the list to compare their features.')}>Compare Properties <Icon name="arrow" size={14}/></button></section><section><h2>Quick Actions</h2><button type="button" onClick={() => onNavigate('Explore')}>Explore More <Icon name="compass" size={14}/></button><button type="button" onClick={() => onNavigate('AI Recommendations')}>AI Recommendations <Icon name="sparkle" size={14}/></button><button type="button" onClick={() => onNavigate('Book a Visit')}>Book a Visit <Icon name="calendar" size={14}/></button></section></aside></section><InfoStrip />{selectedProperty && <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onBookVisit={() => { setSelectedProperty(null); onNavigate('Book a Visit') }} />}
  </StudentChrome>
}

function BookingsPage({ onNavigate, confirmedBookings = [] }) {
  const [tab, setTab] = useState('All')
  const staticBookings = [{ name: 'Sunshine PG', status: 'Active', price: '₹7,500', date: '01 Aug 2025 – 31 Jul 2026', location: 'Niti Khand, Indirapuram, Ghaziabad' }, { name: 'Maple PG', status: 'Upcoming', price: '₹6,500', date: 'Move-in: 15 Sep 2025', location: 'Vaishali, Ghaziabad' }, { name: 'Green View PG', status: 'Completed', price: '₹6,000', date: '15 Jan 2025 – 30 Jun 2025', location: 'Raj Nagar, Ghaziabad' }]
  const bookings = [...confirmedBookings, ...staticBookings]
  const filteredBookings = tab === 'All' ? bookings : bookings.filter(({ status }) => tab === status)
  return <StudentChrome active="My Bookings" onNavigate={onNavigate}><section className="booking-title"><div><h1>My Bookings</h1><p>Track your bookings, manage your stay and access all important details.</p></div><button onClick={() => onNavigate('PGs')}>⊕　Book a New PG</button></section><div className="booking-tabs">{['All Bookings (3)','Active (1)','Upcoming (1)','Past (1)','Cancelled (0)'].map(item => <button className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div><section className="bookings-layout"><div className="booking-list">{bookings.map(([name,status,price,date], index) => <article className={`booking-card ${index === 0 ? 'expanded' : ''}`} key={name}><div className={`booking-img photo-${index}`}/><span className={`booking-status ${status.toLowerCase()}`}>{status}</span><div className="booking-info"><h2>{name}</h2><p>⌖　{places[index]}</p><small>▣　{index ? 'Shared Room' : 'Single Room'}　　⌁　Wi-Fi　　♜　Meals Included　　❄　AC</small></div><div className="booking-price"><b>{price}</b> / month<p>Booking ID: #SRN{12543 + index * 201}<br/>{date}</p><button>View Details</button></div>{index === 0 && <section className="booking-details"><h3>▣　Booking Details</h3><div><p>Move-in Date<b>01 Aug 2025</b></p><p>Lease End Date<b>31 Jul 2026</b></p><p>Stay Duration<b>12 Months</b></p><p>Monthly Rent<b>₹7,500</b></p><p>Security Deposit<b className="paid">₹7,500 (Paid)</b></p><p>Payment Status<b className="paid">On Time</b></p></div><div><p>Property Address<b>Sunshine PG, C-12, Niti Khand,<br/>Indirapuram, Ghaziabad</b></p><p>Owner Details<b>Rohit Sharma<br/>+91 98765 43210<br/>rohitpg@gmail.com</b></p></div><div><p>Facilities<b>☑ Furnished Room<br/>☑ Wi-Fi<br/>☑ Meals Included<br/>☑ Air Conditioning<br/>☑ 24/7 Security</b></p></div></section>}</article>)}</div><aside className="booking-side"><section><h2>Booking Status</h2><p>●　<b>Booking Confirmed</b><small>20 Jul 2025, 10:30 AM</small></p><p>●　<b>Deposit Paid</b><small>21 Jul 2025, 02:15 PM</small></p><p>◉　<b>Move-in Date</b><small>01 Aug 2025</small></p><p>○　Stay in Progress</p><p>○　Completed</p></section><section><h2>Quick Actions</h2><p>▣　Download Agreement</p><p>▤　Payment History</p><p>⚒　Request Maintenance</p><p>⊕　Extend Stay</p><p>⊗　Cancel Booking</p></section></aside></section></StudentChrome>
}

function BookingsPageV2({ onNavigate, confirmedBookings = [] }) {
  const [tab, setTab] = useState('All')
  const staticBookings = [
    { name: 'Sunshine PG', status: 'Active', price: '₹7,500', date: '01 Aug 2025 - 31 Jul 2026', location: 'Niti Khand, Indirapuram, Ghaziabad' },
    { name: 'Maple PG', status: 'Upcoming', price: '₹6,500', date: 'Move-in: 15 Sep 2025', location: 'Vaishali, Ghaziabad' },
    { name: 'Green View PG', status: 'Completed', price: '₹6,000', date: '15 Jan 2025 - 30 Jun 2025', location: 'Raj Nagar, Ghaziabad' }
  ]
  const bookings = [...confirmedBookings, ...staticBookings]
  const filteredBookings = tab === 'All' ? bookings : bookings.filter(({ status }) => status === tab)
  const tabs = ['All', 'Active', 'Upcoming', 'Completed', 'Cancelled']
  return <StudentChrome active="My Bookings" onNavigate={onNavigate}>
    <section className="booking-title"><div><h1>My Bookings</h1><p>Track your bookings, manage your stay and access all important details.</p></div><button onClick={() => onNavigate('PGs')}>Book a New PG</button></section>
    <div className="booking-tabs">{tabs.map((item) => <button className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item} ({item === 'All' ? bookings.length : bookings.filter(({ status }) => status === item).length})</button>)}</div>
    <section className="bookings-layout"><div className="booking-list">{filteredBookings.map(({ name, status, price, date, location }, index) => <article className={`booking-card ${index === 0 ? 'expanded' : ''}`} key={`${name}-${date}`}>
      <div className={`booking-img photo-${index % 6}`} /><span className={`booking-status ${status.toLowerCase()}`}>{status}</span>
      <div className="booking-info"><h2>{name}</h2><p>{location}</p><small>Single Room | Wi-Fi | Meals Included | AC</small></div>
      <div className="booking-price"><b>{price}</b> / month<p>Booking ID: #SRN{12543 + index * 201}<br />{date}</p><button type="button" onClick={(event) => event.currentTarget.closest('.booking-card').classList.toggle('expanded')}>View Details</button></div>
      <section className="booking-details"><h3>About Property</h3><p className="booking-about">Complete verified information about this PG, room or flat, inside the property and in the surrounding area.</p><div className="booking-facts"><p>Surroundings<b>Metro, college, market and pharmacy nearby</b></p><p>Electricity<b>24/7 power supply with backup</b></p><p>Water<b>Regular supply and RO drinking water</b></p><p>Internet<b>High-speed Wi-Fi available</b></p><p>Food Service<b>Homely meals, kitchen access and dining area</b></p><p>Security<b>24/7 security, CCTV and verified owner</b></p></div><p>Facilities<b>Furnished room, housekeeping, air conditioning and laundry</b></p></section>
    </article>)}</div></section><InfoStrip />
  </StudentChrome>
}

function LegacyProfilePage({ onNavigate }) {
  return <StudentChrome active="Profile" onNavigate={onNavigate}><section className="profile-title"><div><h1>My Profile</h1><p>Manage your account, preferences and stay information all in one place.</p></div><aside>A Better<br/><em>You in a Safer Neighborhood ♡</em></aside></section><div className="profile-tabs"><button className="active">♙ Profile</button><button>⚙ Preferences</button><button>▣ Documents</button><button>♢ Security</button><button>♧ Notifications</button></div><section className="profile-layout"><aside className="profile-card"><b>A</b><h2>Aman Verma　✎</h2><p>Student</p><p>🎓 ABES Institute of Technology</p><p>⌖ Indirapuram, Ghaziabad</p><blockquote>“Looking for a safe and comfortable place to stay while I build my future.”</blockquote><div><span><b>12</b>Properties Viewed</span><span><b>5</b>Saved</span><span><b>2</b>Visits Booked</span></div><button>Edit Profile</button><button>View Public Profile</button></aside><div className="profile-main"><DataCard title="♙　Personal Information" rows={['Full Name|Aman Verma','Email Address|amanverma@gmail.com','Mobile Number|+91 9876543210','Date of Birth|15 March 2005','Gender|Male','Current Location|Indirapuram, Ghaziabad, Uttar Pradesh','College/University|ABES Institute of Technology','Course|B.Tech (Information Technology)','Year|3rd Year']}/><DataCard title="⚙　Preferences" rows={['Looking For|PG / Flat (Both)','Preferred Location|Indirapuram, Ghaziabad','Budget Range|₹5,000 - ₹15,000','Preferred For|Boys Only','Move-in Date|October 2025','Amenities Preference|Wi-Fi, AC, Attached Bath, Food','Lifestyle Preference|Study Friendly, Quiet Environment']}/></div><aside className="profile-side"><section><h2>🛡️ Profile Verification</h2><p>Your profile is 80% complete</p><meter min="0" max="100" value="80"/><b>80%</b><div>⚖️<strong>Verify your identity</strong><small>to build trust and get better matches.</small><button>↥　Upload ID Proof</button></div></section><section><h2>Quick Actions</h2><p>✎　Edit Profile　›</p><p>✧　Manage Preferences　›</p><p>▣　Upload Documents　›</p><p>🔒　Change Password　›</p><p>♧　Notification Settings　›</p></section></aside></section><section className="profile-lower"><DataCard title="▣　Documents" rows={['College ID|● Verified','Aadhaar Card|● Verified','Other Document|⊕ Add Now']}/><DataCard title="🔒　Security" rows={['Password|********　　✎ Edit','Two-Factor Authentication|Not Enabled　　Enable','Login Devices|2 Active Devices　　Manage']}/><DataCard title="◷　Account Activity" rows={['Login from Windows|Today, 10:24 AM','Updated Preferences|18 Sep 2025','Saved a Property|17 Sep 2025','Booked a Visit|15 Sep 2025']}/></section></StudentChrome>
}

function ProfilePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('Profile')
  const [documents, setDocuments] = useState({ identity: null, address: null })
  const [status, setStatus] = useState('Upload your identity and address documents to verify your profile.')
  const verificationProgress = Object.values(documents).filter(Boolean).length * 50
  const uploadDocument = (type, event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus('Please upload a clear image photo of the document.')
      event.target.value = ''
      return
    }
    setDocuments((current) => ({ ...current, [type]: file }))
    setStatus(`${file.name} uploaded. Add the other document to complete verification.`)
  }
  const profileTabs = [['Profile', <Icon name="people" size={16}/>], ['Preferences', <Icon name="settings" size={16}/>], ['Documents', <Icon name="building" size={16}/>], ['Security', <Icon name="shield" size={16}/>], ['Notifications', <Icon name="bell" size={16}/>]]
  const showEditMessage = () => setStatus('Profile editing is ready. Update your details in Settings.')
  return <StudentChrome active="Profile" onNavigate={onNavigate}>
    <section className="profile-title"><div><h1>My Profile</h1><p>Manage your account, preferences, documents and verification.</p></div><aside>A Better<br/><em>You in a Safer Neighborhood</em></aside></section>
    <div className="profile-tabs">{profileTabs.map(([name, icon]) => <button type="button" className={activeTab === name ? 'active' : ''} onClick={() => setActiveTab(name)} key={name}>{icon}<span>{name}</span></button>)}</div>
    {activeTab === 'Profile' && <section className="profile-layout"><aside className="profile-card"><b>A</b><h2>Aman Verma</h2><p>Student</p><p>ABES Institute of Technology</p><p>Indirapuram, Ghaziabad</p><blockquote>Looking for a safe and comfortable place to stay while I build my future.</blockquote><div><span><b>12</b>Properties Viewed</span><span><b>5</b>Saved</span><span><b>2</b>Visits Booked</span></div><button type="button" onClick={showEditMessage}>Edit Profile</button><button type="button" onClick={() => onNavigate('Settings')}>Account Settings</button></aside><div className="profile-main"><DataCard title="Personal Information" rows={['Full Name|Aman Verma','Email Address|amanverma@gmail.com','Mobile Number|+91 9876543210','Date of Birth|15 March 2005','Gender|Male','Current Location|Indirapuram, Ghaziabad, Uttar Pradesh','College/University|ABES Institute of Technology','Course|B.Tech (Information Technology)','Year|3rd Year']} onEdit={showEditMessage}/><DataCard title="Preferences" rows={['Looking For|PG / Flat (Both)','Preferred Location|Indirapuram, Ghaziabad','Budget Range|₹5,000 - ₹15,000','Preferred For|Boys Only','Move-in Date|October 2025','Amenities Preference|Wi-Fi, AC, Attached Bath, Food','Lifestyle Preference|Study Friendly, Quiet Environment']} onEdit={showEditMessage}/><DataCard title="Documents" rows={[`Identity Document|${documents.identity ? documents.identity.name : 'Not uploaded'}`, `Address Document|${documents.address ? documents.address.name : 'Not uploaded'}`, `Verification Status|${verificationProgress === 100 ? 'Verified' : 'Pending upload'}`]} onEdit={() => setActiveTab('Documents')}/><DataCard title="Security" rows={['Password|Last updated recently','Two-Factor Authentication|Not enabled','Login Alerts|Enabled']} onEdit={() => setActiveTab('Security')}/></div><aside className="profile-side"><VerificationCard documents={documents} progress={verificationProgress} status={status} onUpload={uploadDocument}/><section><h2><Icon name="sparkle" size={16}/> Quick Actions</h2><button className="quick-action-link" type="button" onClick={() => setActiveTab('Documents')}>Manage Documents</button><button className="quick-action-link" type="button" onClick={() => onNavigate('Saved Properties')}>View Saved Properties</button><button className="quick-action-link" type="button" onClick={() => onNavigate('My Bookings')}>View My Bookings</button></section></aside></section>}
    {activeTab === 'Documents' && <section className="profile-document-panel"><VerificationCard documents={documents} progress={verificationProgress} status={status} onUpload={uploadDocument}/><button type="button" onClick={() => document.getElementById('identity-document')?.click()}>Add New Document</button></section>}
    {activeTab === 'Preferences' && <PreferencesPanel onStatus={setStatus}/>} 
    {activeTab === 'Security' && <section className="profile-document-panel"><DataCard title="Security" rows={['Password|Last updated recently','Two-Factor Authentication|Not enabled','Login Alerts|Enabled']} onEdit={() => setStatus('Security settings can be updated from Settings.')}/><button type="button" onClick={() => onNavigate('Settings')}>Open Security Settings</button></section>}
    {activeTab === 'Notifications' && <section className="profile-document-panel"><DataCard title="Notifications" rows={['Booking Updates|Enabled','Property Alerts|Enabled','Messages|Enabled']} onEdit={() => setStatus('Notification preferences updated.')}/><button type="button" onClick={() => setStatus('Notification preferences updated.')}>Save Notification Preferences</button></section>}
    {status && <p className="profile-status" role="status">{status}</p>}
    <InfoStrip />
  </StudentChrome>
}

function PreferencesPanel({ onStatus }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    lookingFor: 'PG / Flat (Both)',
    location: 'Indirapuram, Ghaziabad',
    budget: '₹5,000 - ₹15,000',
    amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Food'],
    electricity: '24/7 electricity with power backup',
    water: 'Regular water supply and RO drinking water',
    surroundings: 'Near metro, college, market and pharmacy'
  })
  const amenityOptions = ['Wi-Fi', 'AC', 'Attached Bath', 'Food', 'Laundry', 'Parking', 'Study Area', 'Housekeeping']
  const toggleAmenity = (amenity) => setDraft((current) => ({ ...current, amenities: current.amenities.includes(amenity) ? current.amenities.filter((item) => item !== amenity) : [...current.amenities, amenity] }))
  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }))
  const save = () => { setEditing(false); onStatus('Preferences saved successfully.') }
  return <section className="profile-preferences-page"><header><div><h2><Icon name="settings" size={17}/> Preferences</h2><p>Choose the facilities and lifestyle details that matter for your next home.</p></div>{editing ? <span className="preference-actions"><button type="button" onClick={save}>Save</button><button type="button" onClick={() => setEditing(false)}>Cancel</button></span> : <button type="button" onClick={() => setEditing(true)}>Edit</button>}</header><div className="preference-edit-grid"><label>Looking For<select disabled={!editing} value={draft.lookingFor} onChange={(event) => update('lookingFor', event.target.value)}><option>PG / Flat (Both)</option><option>PG</option><option>Flat</option><option>Room</option></select></label><label>Preferred Location<input disabled={!editing} value={draft.location} onChange={(event) => update('location', event.target.value)} /></label><label>Budget Range<select disabled={!editing} value={draft.budget} onChange={(event) => update('budget', event.target.value)}><option>₹5,000 - ₹15,000</option><option>₹15,000 - ₹25,000</option><option>₹25,000 - ₹50,000</option></select></label></div><section className="preference-choice-section"><h3>Amenities</h3><p>Select the amenities you want in a PG, room or flat.</p><div className="preference-choice-grid">{amenityOptions.map((amenity) => <label className={draft.amenities.includes(amenity) ? 'selected' : ''} key={amenity}><input type="checkbox" disabled={!editing} checked={draft.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />{amenity}</label>)}</div></section><section className="preference-choice-section"><h3>Lifestyle Preferences</h3><p>Tell us about the practical conditions around your preferred home.</p><div className="preference-edit-grid"><label>Electricity Availability<select disabled={!editing} value={draft.electricity} onChange={(event) => update('electricity', event.target.value)}><option>24/7 electricity with power backup</option><option>Regular electricity, limited backup</option><option>Solar and backup power preferred</option></select></label><label>Water Availability<select disabled={!editing} value={draft.water} onChange={(event) => update('water', event.target.value)}><option>Regular water supply and RO drinking water</option><option>Regular water supply</option><option>24/7 water supply required</option></select></label><label>Surroundings<select disabled={!editing} value={draft.surroundings} onChange={(event) => update('surroundings', event.target.value)}><option>Near metro, college, market and pharmacy</option><option>Quiet residential surroundings</option><option>Close to public transport and markets</option></select></label></div></section></section>
}

function VerificationCard({ documents, progress, status, onUpload }) {
  return <section className="verification-card"><h2><Icon name="shield" size={16}/> Profile Verification</h2><p>{progress === 100 ? 'Both document photos uploaded. Verification is complete.' : `${progress}% verified`}</p><div className="verification-track"><span style={{ width: `${progress}%` }}/></div><b>{progress}%</b><small>{status}</small><label className="document-upload">Upload Identity Document<input id="identity-document" type="file" accept="image/*" onChange={(event) => onUpload('identity', event)} /></label><label className="document-upload">Upload Address Document<input id="address-document" type="file" accept="image/*" onChange={(event) => onUpload('address', event)} /></label>{Object.entries(documents).map(([type, file]) => file && <p className="uploaded-document" key={type}>{type === 'identity' ? 'Identity' : 'Address'}: {file.name}</p>)}</section>
}

function DataCard({ title, rows, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [draftRows, setDraftRows] = useState(rows)
  const updateRow = (index, value) => setDraftRows((current) => current.map((row, rowIndex) => rowIndex === index ? `${row.split('|')[0]}|${value}` : row))
  const startEditing = () => { setEditing(true); onEdit?.() }
  const saveChanges = () => setEditing(false)
  return <section className="data-card"><h2>{title}<span>{editing ? <><button type="button" onClick={saveChanges}>Save</button><button type="button" onClick={() => { setDraftRows(rows); setEditing(false) }}>Cancel</button></> : <button type="button" onClick={startEditing}>Edit</button>}</span></h2>{draftRows.map((row, index) => { const [label, value] = row.split('|'); return <p key={label}><span>{label}</span>{editing ? <input value={value} onChange={(event) => updateRow(index, event.target.value)} aria-label={label} /> : <b>{value}</b>}</p> })}</section>
}

function LegacySettingsPage({ onNavigate, onLogout }) {
  const [dark, setDark] = useState(false)
  return <StudentChrome active="Settings" onNavigate={onNavigate}><section className="settings-hero"><div><h1>Settings</h1><p>Manage your account, preferences and privacy all in one place.</p><em>Your Comfort<br/>Our Priority ♡</em></div><aside>“　A better student life<br/>starts with the right space.</aside></section><div className="setting-tabs"><button className="active">♙　Account Settings</button><button>⚙　Preferences</button><button>♧　Notifications</button><button>♢　Privacy & Security</button><button>?　Help & Support</button></div><section className={`settings-layout ${dark ? 'dark-preview' : ''}`}><div><section className="settings-card account-form"><h2>♙　Profile Information</h2><p>Update your personal details.</p><div className="setting-inputs"><span className="settings-avatar">A</span><label>Full Name<input defaultValue="Aman Verma"/></label><label>Email Address<input defaultValue="amanverma@gmail.com"/></label><label>Phone Number<input defaultValue="+91 98765 43210"/></label><label>Date of Birth<input defaultValue="15 Mar 2005"/></label><label className="wide">About You<textarea defaultValue="B.Tech IT Student | Looking for a safe and comfortable PG near my college."/></label></div></section><section className="settings-card preferences-form"><h2>⚙　Preferences</h2><p>Customize your experience.</p><div className="preference-fields"><label>Preferred Locations<input defaultValue="Indirapuram  ×　 Vaishali  ×　 Raj Nagar ×"/></label><label>Preferred Budget Range<select defaultValue="5000"> <option value="5000">₹5,000 - ₹10,000</option></select></label><label>Room Type Preference<select><option>Single Room</option></select></label><label>Gender Preference<select><option>No Preference</option></select></label></div></section><section className="settings-card privacy-card"><h2>🛡️　Privacy & Security</h2><p>Keep your account safe.</p><div><span>🔒　<b>Two-Factor Authentication<small>Add an extra layer of security to your account.</small></b><input type="checkbox"/></span><span>▣　<b>Login Activity<small>View your recent login activity.</small></b>　›</span></div></section></div><aside className="settings-side"><section className="theme"><h2>◐　Theme Mode</h2><p>Choose the look and feel of your app.</p><div><button>☼<b>Light</b></button><button className={!dark ? 'selected' : ''} onClick={() => setDark(false)}>▣<b>Default</b></button><button className={dark ? 'selected' : ''} onClick={() => setDark(true)}>☾<b>Dark</b></button></div></section><section><h2>⚙　Quick Settings</h2><p>♙　Edit Profile　›</p><p>🔒　Change Password　›</p><p>▤　Manage Payment Methods　›</p><p>♧　Notification Preferences　›</p><p>◎　Language　›</p><p>?　Help & Support　›</p></section><button className="logout-btn" onClick={onLogout}>⇥　 Logout　›<small>Sign out from your account on this device.</small></button></aside></section></StudentChrome>
}


function LegacySettingsPageV2({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('Account')
    const toggleLike = (name) => setLiked((list) => list.includes(name) ? list.filter((item) => item !== name) : [...list, name])
  const tabs = [['Account', 'Account Settings'], ['Preferences', 'Preferences'], ['Notifications', 'Notifications'], ['Privacy', 'Privacy & Security'], ['Help', 'Help & Support']]
  const save = () => setStatus('Settings saved successfully.')
  const quickAction = (message) => setStatus(message)
  const accountOverview = <><section className="settings-card account-overview-card"><h2>Preferences</h2><p>Indirapuram, Vaishali, Raj Nagar · ₹5,000 - ₹10,000 · Single Room</p><button type="button" className="settings-save" onClick={() => setActiveTab('Preferences')}>Edit Preferences</button></section><section className="settings-card account-overview-card"><h2>Notifications</h2><label className="settings-toggle"><span>Booking Updates<small>Receive updates about visits and bookings.</small></span><input type="checkbox" defaultChecked /></label><label className="settings-toggle"><span>Property Alerts<small>Receive alerts for matching homes.</small></span><input type="checkbox" defaultChecked /></label><button type="button" className="settings-save" onClick={() => setActiveTab('Notifications')}>Manage Notifications</button></section><section className="settings-card account-overview-card"><h2>Privacy &amp; Security</h2><p>Two-Factor Authentication: Off</p><p>Login Alerts: Enabled</p><button type="button" className="settings-save" onClick={() => setActiveTab('Privacy')}>Manage Privacy &amp; Security</button></section><section className="settings-card account-overview-card"><h2>Help &amp; Support</h2><p>Find answers or contact the AI SafeRent support team.</p><button type="button" className="settings-save" onClick={() => setActiveTab('Help')}>Open Help &amp; Support</button></section></>
  return <StudentChrome active="Settings" onNavigate={onNavigate}><section className="settings-hero"><div><h1>Settings</h1><p>Manage your account, preferences and privacy all in one place.</p><em>Your Comfort<br/>Our Priority</em></div><aside>A better student life<br/>starts with the right space.</aside></section><div className="setting-tabs">{tabs.map(([key, label]) => <button type="button" className={activeTab === key ? 'active' : ''} onClick={() => setActiveTab(key)} key={key}>{label}</button>)}</div><section className={`settings-layout ${dark ? 'dark-preview' : ''}`}><div>{activeTab === 'Account' && <section className="settings-card"><h2>Profile Information</h2><p>Update your personal details.</p><div className="setting-inputs settings-form-grid"><span className="settings-avatar">A</span><label>Full Name<input defaultValue="Aman Verma" /></label><label>Email Address<input defaultValue="amanverma@gmail.com" /></label><label>Phone Number<input defaultValue="+91 98765 43210" /></label><label>Date of Birth<input defaultValue="15 Mar 2005" /></label><label className="wide">About You<textarea defaultValue="B.Tech IT Student | Looking for a safe and comfortable PG near my college." /></label></div><button type="button" className="settings-save" onClick={save}>Save Account Details</button></section>}{activeTab === 'Preferences' && <section className="settings-card"><h2>Preferences</h2><p>Customize your home search.</p><div className="preference-fields"><label>Preferred Locations<input defaultValue="Indirapuram, Vaishali, Raj Nagar" /></label><label>Budget Range<select defaultValue="5000"><option value="5000">₹5,000 - ₹10,000</option><option value="15000">₹15,000 - ₹25,000</option></select></label><label>Room Type<select><option>Single Room</option><option>Shared Room</option><option>1 BHK</option></select></label><label>Gender Preference<select><option>No Preference</option><option>Girls Only</option><option>Boys Only</option></select></label></div><button type="button" className="settings-save" onClick={save}>Save Preferences</button></section>}{activeTab === 'Notifications' && <section className="settings-card"><h2>Notifications</h2><p>Choose the updates you want to receive.</p>{['Booking Updates','Property Alerts','Messages','Price Drops'].map((item) => <label className="settings-toggle" key={item}><span>{item}<small>Receive {item.toLowerCase()} from AI SafeRent.</small></span><input type="checkbox" defaultChecked /></label>)}<button type="button" className="settings-save" onClick={save}>Save Notifications</button></section>}{activeTab === 'Privacy' && <section className="settings-card"><h2>Privacy & Security</h2><p>Keep your account safe.</p><label className="settings-toggle"><span>Two-Factor Authentication<small>Add an extra layer of security.</small></span><input type="checkbox" onChange={() => quickAction('Two-factor authentication preference updated.')} /></label><button type="button" className="settings-save" onClick={() => quickAction('Login activity opened.')}>View Login Activity</button></section>}{activeTab === 'Help' && <section className="settings-card"><h2>Help & Support</h2><p>Find answers or contact our support team.</p><button type="button" className="settings-save" onClick={() => quickAction('Support request started.')}>Contact Support</button></section>}</div><aside className="settings-side"><section className="theme"><h2>Theme Mode</h2><p>Choose the look and feel of your app.</p><div><button type="button" onClick={() => setDark(false)} className={!dark ? 'selected' : ''}>Light</button><button type="button" onClick={() => setDark(false)} className={!dark ? 'selected' : ''}>Default</button><button type="button" onClick={() => setDark(true)} className={dark ? 'selected' : ''}>Dark</button></div></section><section className="quick-settings-card"><h2>Quick Settings</h2><button type="button" onClick={() => onNavigate('Profile')}>Edit Profile</button><button type="button" onClick={() => quickAction('Change password flow opened.')}>Change Password</button><button type="button" onClick={() => quickAction('Payment methods opened.')}>Manage Payment Methods</button><button type="button" onClick={() => setActiveTab('Notifications')}>Notification Preferences</button><button type="button" onClick={() => quickAction('Language selector opened.')}>Language</button><button type="button" onClick={() => setActiveTab('Help')}>Help & Support</button></section><button className="logout-btn" onClick={onLogout}>Logout<small>Sign out from your account on this device.</small></button></aside></section>{status && <p className="settings-status" role="status">{status}</p>}</StudentChrome>
}
function SettingsPage({ onNavigate, onLogout }) {
  const [tab, setTab] = useState('Account')
  const [status, setStatus] = useState('')
  const tabs = [['Account', 'Account Settings'], ['Preferences', 'Preferences'], ['Notifications', 'Notifications'], ['Privacy', 'Privacy & Security'], ['Help', 'Help & Support']]
  const action = (message) => setStatus(message)
  const accountSections = <><section className="settings-card account-overview-card"><h2>Preferences</h2><p>Indirapuram, Vaishali, Raj Nagar · ₹5,000 - ₹10,000 · Single Room</p><button type="button" className="settings-save" onClick={() => setTab('Preferences')}>Edit Preferences</button></section><section className="settings-card account-overview-card"><h2>Notifications</h2><p>Booking updates and property alerts are enabled.</p><button type="button" className="settings-save" onClick={() => setTab('Notifications')}>Manage Notifications</button></section><section className="settings-card account-overview-card"><h2>Privacy &amp; Security</h2><p>Two-Factor Authentication: Off · Login Alerts: Enabled</p><button type="button" className="settings-save" onClick={() => setTab('Privacy')}>Manage Privacy &amp; Security</button></section><section className="settings-card account-overview-card"><h2>Help &amp; Support</h2><p>Find answers or contact the AI SafeRent support team.</p><button type="button" className="settings-save" onClick={() => setTab('Help')}>Open Help &amp; Support</button></section></>
  return <StudentChrome active="Settings" onNavigate={onNavigate}><section className="settings-hero"><div><h1>Settings</h1><p>Manage your account, preferences and privacy all in one place.</p></div></section><div className="setting-tabs">{tabs.map(([key, label]) => <button type="button" className={tab === key ? 'active' : ''} onClick={() => setTab(key)} key={key}>{label}</button>)}</div><main className="settings-account-view"><section className="settings-card"><h2>{tab === 'Account' ? 'Account Settings' : tabs.find(([key]) => key === tab)?.[1]}</h2>{tab === 'Account' && <><p>Update your personal details.</p><div className="setting-inputs settings-form-grid"><span className="settings-avatar">A</span><label>Full Name<input defaultValue="Aman Verma" /></label><label>Email Address<input defaultValue="amanverma@gmail.com" /></label><label>Phone Number<input defaultValue="+91 98765 43210" /></label><label className="wide">About You<textarea defaultValue="B.Tech IT Student | Looking for a safe and comfortable PG near my college." /></label></div><button type="button" className="settings-save" onClick={() => action('Account details saved.')}>Save Account Details</button></>}{tab === 'Preferences' && <><p>Customize your home search preferences.</p><div className="preference-fields"><label>Preferred Locations<input defaultValue="Indirapuram, Vaishali, Raj Nagar" /></label><label>Budget<select><option>₹5,000 - ₹10,000</option><option>₹15,000 - ₹25,000</option></select></label></div><button type="button" className="settings-save" onClick={() => action('Preferences saved.')}>Save Preferences</button></>}{tab === 'Notifications' && <><p>Choose the updates you want to receive.</p>{['Booking Updates', 'Property Alerts', 'Messages'].map((item) => <label className="settings-toggle" key={item}><span>{item}<small>Receive {item.toLowerCase()}.</small></span><input type="checkbox" defaultChecked /></label>)}<button type="button" className="settings-save" onClick={() => action('Notification preferences saved.')}>Save Notifications</button></>}{tab === 'Privacy' && <><p>Keep your account safe.</p><label className="settings-toggle"><span>Two-Factor Authentication<small>Add an extra layer of security.</small></span><input type="checkbox" /></label><button type="button" className="settings-save" onClick={() => action('Privacy settings saved.')}>Save Privacy Settings</button></>}{tab === 'Help' && <><p>Find answers or contact our support team.</p><button type="button" className="settings-save" onClick={() => action('Support request started.')}>Contact Support</button></>}</section>{tab === 'Account' && <section className="settings-account-overview">{accountSections}</section>}<aside className="quick-settings-card"><h2>Quick Settings</h2><button type="button" onClick={() => onNavigate('Profile')}>Edit Profile</button><button type="button" onClick={() => action('Change password flow opened.')}>Change Password</button><button type="button" onClick={() => setTab('Notifications')}>Notification Preferences</button><button type="button" onClick={() => setTab('Help')}>Help &amp; Support</button><button type="button" className="logout-btn" onClick={onLogout}>Logout</button></aside></main>{status && <p className="settings-status" role="status">{status}</p>}</StudentChrome>
}

function InfoStrip() { return <section className="info-strip"><span>🛡️ <b>Verified Listings<small>Every property is manually verified</small></b></span><span>⌖ <b>Safe Neighborhoods<small>Check safety scores & reviews</small></b></span><span>▣ <b>Transparent Information<small>No hidden charges</small></b></span><span>▣ <b>Book Site Visits<small>Schedule visits easily</small></b></span></section> }

const ownerNav = [[<Icon name="grid" size={18}/>, 'Dashboard'], [<Icon name="building" size={18}/>, 'My Properties'], [<Icon name="sparkle" size={18}/>, 'Add Property'], [<Icon name="calendar" size={18}/>, 'Booking'], [<Icon name="people" size={18}/>, 'Tenants'], [<Icon name="mail" size={18}/>, 'Messages'], [<Icon name="settings" size={18}/>, 'Settings']]
const ownerProperties = [['Sunrise PG for Girls', 'Indirapuram, Ghaziabad', 'Girls Only', '₹ 7,000 / month', '3/10'], ['Comfort Stay PG', 'Vaishali, Ghaziabad', 'Boys Only', '₹ 6,500 / month', '5/12'], ['Urban Nest PG', 'Raj Nagar, Ghaziabad', 'Boys & Girls', '₹ 8,000 / month', '2/8']]
const requests = [['A', 'Aman Singh', 'Requested visit', 'Sunrise PG for Girls', '10:30 AM', 'Pending'], ['N', 'Neha Sharma', 'Booked a room', 'Comfort Stay PG', 'Yesterday', 'Confirmed'], ['R', 'Rahul Verma', 'Requested visit', 'Urban Nest PG', '16 Sep', 'Pending'], ['S', 'Sneha Patel', 'Mess inquiry', 'Sunrise PG for Girls', '15 Sep', 'Responded']]

function OwnerHero({ title, subtitle, action, onAction }) {
  return <section className="owner-page-hero"><div><h1>{title}</h1><p>{subtitle}</p><em>Good tenants build great communities ♡</em></div>{action && <button onClick={onAction}>{action}</button>}</section>
}

const initialOwnerProperties = [
  { id: 1, name: 'Sunrise PG for Boys', location: 'Indirapuram, Ghaziabad', type: 'Boys Only', price: 7500, priceFormatted: '₹7,500 / month', rooms: '12 Rooms', tenants: '24 Tenants', amenities: 'Wi-Fi · Meals · Power Backup', imageClass: 'image-0', img: '/student-hero.png', status: 'Active' },
  { id: 2, name: 'Maple Girls PG', location: 'Vaishali, Ghaziabad', type: 'Girls Only', price: 8000, priceFormatted: '₹8,000 / month', rooms: '8 Rooms', tenants: '16 Tenants', amenities: 'Wi-Fi · AC · Meals', imageClass: 'image-1', img: '/student-hero.png', status: 'Active' },
  { id: 3, name: 'Comfort Stay PG', location: 'Raj Nagar, Ghaziabad', type: 'Boys Only', price: 6500, priceFormatted: '₹6,500 / month', rooms: '6 Rooms', tenants: '10 Tenants', amenities: 'Wi-Fi · Meals · Laundry', imageClass: 'image-2', img: '/student-hero.png', status: 'Active' },
  { id: 4, name: 'Greenwood Luxury Co-Living', location: 'Sector 62, Noida', type: 'Co-Living', price: 9500, priceFormatted: '₹9,500 / month', rooms: '15 Rooms', tenants: '30 Tenants', amenities: 'AC · Gym · Wi-Fi · Meals', imageClass: 'image-3', img: '/sunset-room.png', status: 'Active' },
  { id: 5, name: 'Royal Orchid PG for Girls', location: 'Vasundhara, Ghaziabad', type: 'Girls Only', price: 8500, priceFormatted: '₹8,500 / month', rooms: '10 Rooms', tenants: '20 Tenants', amenities: 'Wi-Fi · 3 Meals · Security', imageClass: 'image-4', img: '/owner-welcome-bg.png', status: 'Active' },
  { id: 6, name: 'Urban Haven Studio Rooms', location: 'Crossing Republik, Ghaziabad', type: 'Co-Living', price: 7000, priceFormatted: '₹7,000 / month', rooms: '5 Studios', tenants: '10 Tenants', amenities: 'Attached Bath · Wi-Fi · Balcony', imageClass: 'image-5', img: '/owner-property-hero-bg.png', status: 'Active' },
  { id: 7, name: 'Starlight Executive Boys PG', location: 'Kaushambi, Ghaziabad', type: 'Boys Only', price: 6800, priceFormatted: '₹6,800 / month', rooms: '14 Rooms', tenants: '28 Tenants', amenities: 'Power Backup · Laundry · Wi-Fi', imageClass: 'image-6', img: '/student-hero.png', status: 'Active' }
]

function OwnerPropertiesPage({ onNavigate, properties: propsProperties, setProperties: propsSetProperties }) {
  const [localProperties, setLocalProperties] = useState(initialOwnerProperties)
  const properties = propsProperties || localProperties
  const setProperties = propsSetProperties || setLocalProperties
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [viewProperty, setViewProperty] = useState(null)
  const [editProperty, setEditProperty] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const filterOptions = [
    { label: 'All Properties', value: 'All' },
    { label: 'Girls Only PG', value: 'Girls Only' },
    { label: 'Boys Only PG', value: 'Boys Only' },
    { label: 'Co-Living Spaces', value: 'Co-Living' },
    { label: 'Under ₹7,500 / mo', value: 'Under7500' },
    { label: 'With Meals Included', value: 'Meals' }
  ]

  const filteredProperties = properties.filter((item) => {
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.location.toLowerCase().includes(q) || 
      item.amenities.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.priceFormatted.toLowerCase().includes(q)

    let matchesFilter = true
    if (selectedFilter === 'Under7500') {
      matchesFilter = item.price <= 7500
    } else if (selectedFilter === 'Meals') {
      matchesFilter = item.amenities.includes('Meals')
    } else if (selectedFilter !== 'All') {
      matchesFilter = item.type === selectedFilter
    }

    return matchesSearch && matchesFilter
  })

  const saveEditedProperty = (updated) => {
    setProperties(properties.map(p => p.id === updated.id ? updated : p))
    setEditProperty(null)
    showToast(`Property "${updated.name}" updated successfully!`)
  }

  const deleteProperty = (id) => {
    const propToDelete = properties.find(p => p.id === id)
    setProperties(properties.filter(p => p.id !== id))
    setEditProperty(null)
    showToast(`Property "${propToDelete?.name || 'Listing'}" deleted successfully!`)
  }

  return <section>
    <OwnerHero 
      title="My Properties" 
      subtitle="Manage your PGs, rooms and flats all in one place." 
      action="Add New Property" 
      onAction={() => onNavigate('Add Property')}
    />
    
    <section className="owner-page-stats">
      <article><b><Icon name="building" size={21}/></b><span><strong>{properties.length}</strong><small>Total Properties</small></span></article>
      <article><b><Icon name="people" size={21}/></b><span><strong>138</strong><small>Total Tenants</small></span></article>
      <article><b><Icon name="calendar" size={21}/></b><span><strong>18</strong><small>Active Bookings</small></span></article>
      <article><b><Icon name="star" size={21}/></b><span><strong>4.8</strong><small>Average Rating</small></span></article>
    </section>

    {toastMessage && <div className="owner-status-banner">✓ {toastMessage}</div>}

    <div className="owner-page-toolbar">
      <strong>All Properties ({filteredProperties.length} of {properties.length} Listings)</strong>
      
      <div className="owner-toolbar-search">
        <Icon name="search" size={16}/>
        <input 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search properties by name, location, amenities..."
        />
        {searchTerm && (
          <button type="button" className="toolbar-clear-btn" onClick={() => setSearchTerm('')} aria-label="Clear search">×</button>
        )}
      </div>

      <div className="owner-toolbar-filter-wrap">
        <button 
          type="button" 
          className={`owner-filter-toggle-btn ${selectedFilter !== 'All' ? 'active-filter' : ''}`}
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <Icon name="sparkle" size={15}/> 
          <span>Filter{selectedFilter !== 'All' ? `: ${selectedFilter}` : ''}</span>
          <i>▾</i>
        </button>
        
        {showFilterMenu && (
          <div className="owner-filter-dropdown">
            <div className="filter-dropdown-header">Filter Properties</div>
            {filterOptions.map((opt) => (
              <button 
                key={opt.value} 
                type="button"
                className={selectedFilter === opt.value ? 'selected' : ''}
                onClick={() => { setSelectedFilter(opt.value); setShowFilterMenu(false) }}
              >
                <span>{opt.label}</span>
                {selectedFilter === opt.value && <b>✓</b>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

    {(searchTerm || selectedFilter !== 'All') && (
      <div className="owner-active-filters">
        <span>Active filters:</span>
        {searchTerm && <button type="button" onClick={() => setSearchTerm('')}>Search: "{searchTerm}" ✕</button>}
        {selectedFilter !== 'All' && <button type="button" onClick={() => setSelectedFilter('All')}>Category: {filterOptions.find(f => f.value === selectedFilter)?.label || selectedFilter} ✕</button>}
        <button type="button" className="clear-all-link" onClick={() => { setSearchTerm(''); setSelectedFilter('All') }}>Reset All</button>
      </div>
    )}

    {filteredProperties.length === 0 ? (
      <div className="owner-empty-grid">
        <b>⌕</b>
        <h3>No matching properties found</h3>
        <p>No listings matched your search "{searchTerm}" and active filters.</p>
        <button type="button" onClick={() => { setSearchTerm(''); setSelectedFilter('All') }}>Reset Search &amp; Filters</button>
      </div>
    ) : (
      <section className="owner-property-grid">
        {filteredProperties.map((prop) => (
          <article key={prop.id}>
            <div className={`owner-property-image ${prop.imageClass}`}>
              <span>{prop.status}</span>
            </div>
            <h2>{prop.name}</h2>
            <p><Icon name="pin" size={12}/> {prop.location}</p>
            <small><Icon name="people" size={12}/> {prop.rooms} · {prop.tenants} · {prop.amenities}</small>
            <strong>{prop.priceFormatted}</strong>
            <div className="owner-property-actions">
              <button type="button" onClick={() => setViewProperty(prop)}>View Details</button>
              <button type="button" onClick={() => setEditProperty(prop)}>Edit</button>
            </div>
          </article>
        ))}
      </section>
    )}

    {/* View Details Modal */}
    {viewProperty && (
      <div className="property-listing-backdrop" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setViewProperty(null) }}>
        <div className="property-listing-modal owner-preview-modal">
          <button className="property-listing-close" type="button" onClick={() => setViewProperty(null)} aria-label="Close">×</button>
          <div className="owner-detail-banner" style={{ backgroundImage: `url(${viewProperty.img})` }}>
            <span className="detail-status-badge">✓ {viewProperty.status} Listing</span>
          </div>
          <div className="owner-detail-body">
            <h2>{viewProperty.name}</h2>
            <p className="detail-loc"><Icon name="pin" size={14}/> {viewProperty.location}</p>
            <div className="detail-meta-row">
              <span><Icon name="people" size={14}/> {viewProperty.type}</span>
              <span><Icon name="building" size={14}/> {viewProperty.rooms}</span>
              <span><Icon name="people" size={14}/> {viewProperty.tenants}</span>
              <span><Icon name="sparkle" size={14}/> {viewProperty.amenities}</span>
            </div>
            <div className="detail-price-box">
              <strong>{viewProperty.priceFormatted}</strong>
              <small>Verified Safe PG · 100% On-time Tenant Occupancy</small>
            </div>
            <div className="owner-detail-actions">
              <button type="button" onClick={() => { setViewProperty(null); onNavigate('Booking') }}>View Bookings</button>
              <button type="button" onClick={() => { const p = viewProperty; setViewProperty(null); setEditProperty(p) }}>Edit Property</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Edit Property Modal */}
    {editProperty && (
      <OwnerEditPropertyDialog 
        property={editProperty} 
        onClose={() => setEditProperty(null)} 
        onSave={saveEditedProperty} 
        onDelete={deleteProperty}
      />
    )}
  </section>
}

function OwnerEditPropertyDialog({ property, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: property.name,
    location: property.location,
    type: property.type,
    price: property.price,
    rooms: property.rooms,
    tenants: property.tenants,
    amenities: property.amenities,
    status: property.status
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  const amenityList = ['Wi-Fi', 'Meals', 'AC', 'Power Backup', 'Laundry', 'Gym', 'Attached Bath', 'Security']

  const toggleAmenity = (name) => {
    const current = formData.amenities.split(' · ')
    const updated = current.includes(name) ? current.filter(i => i !== name) : [...current, name]
    setFormData({ ...formData, amenities: updated.join(' · ') })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...property,
      ...formData,
      priceFormatted: `₹${Number(formData.price).toLocaleString('en-IN')} / month`
    })
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    if (onDelete) {
      onDelete(property.id)
    }
  }

  return (
    <div className="property-listing-backdrop" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="property-listing-modal owner-edit-modal">
        <button className="property-listing-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <header className="listing-modal-heading">
          <div>
            <span className="listing-step-icon">✎</span>
            <span>
              <h2>Edit Property Listing</h2>
              <p>Update pricing, availability, amenities or remove "{property.name}".</p>
            </span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="owner-edit-form">
          <div className="listing-section">
            <h3><b>1</b><span>⌂</span> Property Information</h3>
            <div className="listing-fields">
              <label className="listing-wide">
                Property Name *
                <input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </label>
              <label className="listing-wide">
                Location &amp; Address *
                <input 
                  value={formData.location} 
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Listing Type *
                <select 
                  value={formData.type} 
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Boys Only">Boys Only</option>
                  <option value="Girls Only">Girls Only</option>
                  <option value="Co-Living">Co-Living</option>
                </select>
              </label>
              <label>
                Listing Status *
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Occupied">Fully Occupied</option>
                  <option value="Maintenance">Under Maintenance</option>
                </select>
              </label>
            </div>
          </div>

          <div className="listing-section">
            <h3><b>2</b><span>₹</span> Rent &amp; Room Capacity</h3>
            <div className="listing-fields">
              <label>
                Monthly Rent (₹) *
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Total Rooms *
                <input 
                  value={formData.rooms} 
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Tenants Count *
                <input 
                  value={formData.tenants} 
                  onChange={(e) => setFormData({ ...formData, tenants: e.target.value })} 
                  required 
                />
              </label>
            </div>
          </div>

          <div className="listing-section">
            <h3><b>3</b><span>⚙</span> Amenities</h3>
            <div className="listing-amenities" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {amenityList.map((item) => {
                  const isChecked = formData.amenities.includes(item)
                  return (
                    <label key={item} className={isChecked ? 'selected' : ''} style={{ cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => toggleAmenity(item)} 
                      />
                      {item}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <footer className="listing-modal-footer edit-modal-footer">
            <div className="edit-footer-left">
              <button 
                type="button" 
                className={`btn-delete-property ${confirmDelete ? 'confirm-active' : ''}`}
                onClick={handleDelete}
              >
                🗑 {confirmDelete ? 'Click again to confirm delete' : 'Delete Property'}
              </button>
            </div>
            <div className="edit-footer-right">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Save Changes ✓</button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  )
}

function PropertyListingModal({ onClose, onPublish }) {
  const fileInputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [amenities, setAmenities] = useState(['Wi-Fi', 'Furnished Room', 'Attached Bathroom', 'Meals', 'Power Backup'])
  const [mediaList, setMediaList] = useState([
    { id: 'm-1', type: 'image', url: '/student-hero.png', name: 'Master Room.jpg' },
    { id: 'm-2', type: 'image', url: '/sunset-room.png', name: 'Balcony View.jpg' },
    { id: 'm-3', type: 'image', url: '/owner-welcome-bg.png', name: 'Living Space.jpg' }
  ])
  const [formData, setFormData] = useState({
    name: '',
    propertyType: 'PG',
    listingFor: 'Boys Only',
    address: '',
    city: 'Indirapuram',
    state: 'Ghaziabad',
    pincode: '201014',
    rent: '',
    deposit: '',
    rooms: '',
    availableFrom: new Date().toISOString().split('T')[0],
    description: '',
    houseRules: ''
  })

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const toggleAmenity = (name) => {
    setAmenities((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  const handleFiles = (files) => {
    if (!files || files.length === 0) return
    const newItems = Array.from(files).map((file) => ({
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file),
      name: file.name
    }))
    setMediaList((prev) => [...prev, ...newItems])
  }

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files)
  }

  const removeMedia = (idToRemove) => {
    setMediaList((prev) => prev.filter((item) => item.id !== idToRemove))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const amenityNames = ['Wi-Fi', 'Furnished Room', 'Attached Bathroom', 'AC', 'Laundry', 'Meals', 'Parking', 'Lift', 'Power Backup', '24/7 Security', 'Gym', 'Balcony']

  const handlePublishSubmit = (e) => {
    e.preventDefault()
    const rentVal = Number(formData.rent) || 7500
    const newProp = {
      id: Date.now(),
      name: formData.name.trim() || 'Modern Luxury PG',
      location: `${formData.city || 'Indirapuram'}, ${formData.state || 'Ghaziabad'}`,
      fullAddress: formData.address || 'Main Road, Near Metro Station',
      type: formData.listingFor || 'Boys Only',
      propertyType: formData.propertyType || 'PG',
      price: rentVal,
      priceFormatted: `₹${rentVal.toLocaleString('en-IN')} / month`,
      rooms: `${formData.rooms || '8'} Rooms`,
      tenants: '0 Tenants',
      amenities: amenities.join(' · ') || 'Wi-Fi · Meals · AC',
      imageClass: 'image-0',
      img: mediaList[0]?.url || '/student-hero.png',
      media: mediaList,
      status: 'Active',
      description: formData.description || 'Modern and safe living accommodation with verified facilities.',
      deposit: formData.deposit ? `₹${Number(formData.deposit).toLocaleString('en-IN')}` : '₹5,000',
      rules: formData.houseRules || 'Standard community house rules apply.',
      availableFrom: formData.availableFrom
    }
    onPublish(newProp, false)
  }

  const handleSaveDraft = () => {
    const rentVal = Number(formData.rent) || 6500
    const draftProp = {
      id: Date.now(),
      name: formData.name.trim() ? `${formData.name.trim()} (Draft)` : 'New PG Listing (Draft)',
      location: `${formData.city || 'Indirapuram'}, ${formData.state || 'Ghaziabad'}`,
      fullAddress: formData.address || '',
      type: formData.listingFor || 'Boys Only',
      propertyType: formData.propertyType || 'PG',
      price: rentVal,
      priceFormatted: `₹${rentVal.toLocaleString('en-IN')} / month`,
      rooms: `${formData.rooms || '4'} Rooms`,
      tenants: '0 Tenants',
      amenities: amenities.join(' · ') || 'Wi-Fi · AC',
      imageClass: 'image-0',
      img: mediaList[0]?.url || '/student-hero.png',
      media: mediaList,
      status: 'Draft',
      description: formData.description,
      deposit: formData.deposit ? `₹${Number(formData.deposit).toLocaleString('en-IN')}` : '',
      rules: formData.houseRules,
      availableFrom: formData.availableFrom
    }
    onPublish(draftProp, true)
  }

  return <div className="property-listing-backdrop" role="dialog" aria-modal="true" aria-labelledby="listing-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="property-listing-modal">
      <button className="property-listing-close" type="button" aria-label="Close listing form" onClick={onClose}>×</button>
      <header className="listing-modal-heading">
        <div>
          <span className="listing-step-icon">＋</span>
          <span>
            <h2 id="listing-title">Create Property Listing</h2>
            <p>Share the photos, videos, and details tenants need to discover and book your property.</p>
          </span>
        </div>
      </header>

      <form onSubmit={handlePublishSubmit}>
        <section className="listing-section">
          <h3><b>1</b><span>⌂</span> Basic Information</h3>
          <p>Tell us the essential identification and location details.</p>
          <div className="listing-fields">
            <label>
              Property Name *
              <input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                placeholder="e.g. Royal Orchid PG for Boys" 
                required 
              />
            </label>
            <label>
              Property Category *
              <select 
                value={formData.propertyType} 
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                required
              >
                <option value="PG">PG (Paying Guest)</option>
                <option value="Room">Private Single / Shared Room</option>
                <option value="Flat">Furnished Flat / Apartment</option>
              </select>
            </label>
            <fieldset>
              <legend>Target Occupants *</legend>
              <label>
                <input 
                  type="radio" 
                  name="listing-for" 
                  checked={formData.listingFor === 'Boys Only'} 
                  onChange={() => setFormData({ ...formData, listingFor: 'Boys Only' })} 
                /> Boys Only
              </label>
              <label>
                <input 
                  type="radio" 
                  name="listing-for" 
                  checked={formData.listingFor === 'Girls Only'} 
                  onChange={() => setFormData({ ...formData, listingFor: 'Girls Only' })} 
                /> Girls Only
              </label>
              <label>
                <input 
                  type="radio" 
                  name="listing-for" 
                  checked={formData.listingFor === 'Co-Living'} 
                  onChange={() => setFormData({ ...formData, listingFor: 'Co-Living' })} 
                /> Co-Living
              </label>
            </fieldset>
            <label className="listing-wide">
              Complete Address *
              <input 
                value={formData.address} 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                placeholder="Plot No., Building Name, Street / Sector" 
                required 
              />
            </label>
            <label>
              City / Locality *
              <input 
                value={formData.city} 
                onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                placeholder="e.g. Indirapuram" 
                required 
              />
            </label>
            <label>
              State / Region *
              <input 
                value={formData.state} 
                onChange={(e) => setFormData({ ...formData, state: e.target.value })} 
                placeholder="e.g. Ghaziabad" 
                required 
              />
            </label>
            <label>
              Pincode *
              <input 
                value={formData.pincode} 
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} 
                placeholder="e.g. 201014" 
                required 
              />
            </label>
          </div>
        </section>

        <section className="listing-section">
          <h3><b>2</b><span>▣</span> Photos &amp; Videos</h3>
          <p>Add attractive photos and videos to get 3x more inquiries and tenant visits.</p>
          <div className="listing-photos">
            <label 
              className={`listing-upload ${dragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              ⇧
              <strong>Drag &amp; drop photos or videos here</strong>
              <small>or click to browse from device<br/>Supports JPG, PNG, MP4, WebM (Max 25MB)</small>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*,video/*" 
                multiple 
                onChange={handleFileInputChange} 
              />
            </label>

            {mediaList.map((media) => (
              <div key={media.id} className="listing-photo">
                {media.type === 'video' ? (
                  <>
                    <video src={media.url} muted playsInline autoPlay loop />
                    <span className="media-video-badge">▶ Video</span>
                  </>
                ) : (
                  <>
                    <div style={{ width: '100%', height: '100%', backgroundImage: `url(${media.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <span className="media-photo-badge">📷 Photo</span>
                  </>
                )}
                <button type="button" onClick={() => removeMedia(media.id)} aria-label="Remove media">×</button>
              </div>
            ))}

            <button 
              className="listing-add-photo" 
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              ＋
              <small>Add Media</small>
            </button>
          </div>
        </section>

        <section className="listing-section">
          <h3><b>3</b><span>▤</span> Property Details &amp; Pricing</h3>
          <p>Set rent, room capacity, availability, house rules, and amenities.</p>
          <div className="listing-fields">
            <label>
              Monthly Rent (₹) *
              <input 
                type="number"
                value={formData.rent} 
                onChange={(e) => setFormData({ ...formData, rent: e.target.value })} 
                placeholder="e.g. 7500" 
                required 
              />
            </label>
            <label>
              Security Deposit (₹)
              <input 
                type="number"
                value={formData.deposit} 
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })} 
                placeholder="e.g. 5000" 
              />
            </label>
            <label>
              Total Rooms Available *
              <input 
                value={formData.rooms} 
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} 
                placeholder="e.g. 10 Rooms" 
                required 
              />
            </label>
            <label>
              Available From *
              <input 
                type="date" 
                value={formData.availableFrom} 
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })} 
                required 
              />
            </label>
            <label className="listing-description">
              Property Description *
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Describe your property, nearest metro station/college, rooms features, and vibe..." 
                required 
              />
            </label>
            <label className="listing-description">
              House Rules
              <textarea 
                value={formData.houseRules} 
                onChange={(e) => setFormData({ ...formData, houseRules: e.target.value })} 
                placeholder="e.g. Visitors permitted till 10 PM, Silent hours after 11 PM, Cleanliness mandatory..." 
              />
            </label>
          </div>

          <div className="listing-amenities">
            <h4>
              <span>⚙</span> 
              Amenities 
              <small>Select all included amenities &amp; facilities.</small>
            </h4>
            <div>
              {amenityNames.map((name) => (
                <label className={amenities.includes(name) ? 'selected' : ''} key={name}>
                  <input 
                    type="checkbox" 
                    checked={amenities.includes(name)} 
                    onChange={() => toggleAmenity(name)} 
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>
        </section>

        <footer className="listing-modal-footer">
          <button type="button" onClick={handleSaveDraft}>Save as Draft</button>
          <button type="submit">Publish Property →</button>
        </footer>
      </form>
    </div>
  </div>
}

function AddPropertyPage({ onNavigate, onAddProperty }) { 
  const [submittedProperty, setSubmittedProperty] = useState(null)
  const [showListing, setShowListing] = useState(false)

  const handlePublish = (newProp, isDraft = false) => {
    if (onAddProperty) {
      onAddProperty(newProp)
    }
    setSubmittedProperty(newProp)
    setShowListing(false)
  }

  return <section>
    <OwnerHero 
      title="Add New Property" 
      subtitle="List your PG, room or flat and connect with verified tenants across AI SafeRent."
    />
    <div className="owner-success">
      <b>{submittedProperty ? '✓' : '＋'}</b>
      <h2>{submittedProperty ? (submittedProperty.status === 'Draft' ? 'Property saved as draft!' : `Property "${submittedProperty.name}" published!`) : 'Start a new listing'}</h2>
      <p>{submittedProperty ? 'Your listing is created and immediately visible in My Properties. You can manage or edit it anytime.' : 'Add property details, photos, amenities and rent to reach verified tenants.'}</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
        {submittedProperty ? (
          <>
            <button type="button" onClick={() => onNavigate('My Properties')}>View in My Properties</button>
            <button type="button" style={{ background: '#eef2ff', color: '#4432ea', border: '1px solid #c7d2fe' }} onClick={() => { setSubmittedProperty(null); setShowListing(true); }}>+ Add Another Property</button>
          </>
        ) : (
          <button type="button" onClick={() => setShowListing(true)}>Create Property Listing</button>
        )}
      </div>
    </div>
    {showListing && (
      <PropertyListingModal 
        onClose={() => setShowListing(false)} 
        onPublish={handlePublish} 
      />
    )}
  </section> 
}

const initialBookingsData = [
  {
    id: 1,
    num: '#1',
    tenantName: 'Ananya Singh',
    tenantEmail: 'ananya@gmail.com',
    tenantPhone: '+91 98765 43210',
    avatar: '/student-hero.png',
    avatarInitial: 'A',
    avatarBg: '#8b5cf6',
    propertyName: 'Sunshine PG',
    propertyLocation: 'Indirapuram, Gzb',
    propertyImg: '/student-hero.png',
    startDate: '01 Sep 2025',
    endDate: '31 Aug 2026',
    status: 'Active',
    rentAmount: 7500,
    rentFormatted: '₹7,500 / month',
    roomNo: 'Room 204 (Double Sharing)',
    deposit: '₹7,500',
    timeAgo: '2 days ago',
    paymentStatus: 'Paid'
  },
  {
    id: 2,
    num: '#2',
    tenantName: 'Rahul Verma',
    tenantEmail: 'rahulv@gmail.com',
    tenantPhone: '+91 91234 56789',
    avatar: '/sunset-room.png',
    avatarInitial: 'R',
    avatarBg: '#3b82f6',
    propertyName: 'Maple PG',
    propertyLocation: 'Vaishali, Gzb',
    propertyImg: '/sunset-room.png',
    startDate: '15 Aug 2025',
    endDate: '14 Aug 2026',
    status: 'Active',
    rentAmount: 8000,
    rentFormatted: '₹8,000 / month',
    roomNo: 'Room 102 (Single Room)',
    deposit: '₹8,000',
    timeAgo: '4 days ago',
    paymentStatus: 'Paid'
  },
  {
    id: 3,
    num: '#3',
    tenantName: 'Sneha Tiwari',
    tenantEmail: 'sneha.t@gmail.com',
    tenantPhone: '+91 99887 66554',
    avatar: '/owner-welcome-bg.png',
    avatarInitial: 'S',
    avatarBg: '#ec4899',
    propertyName: 'Comfort Stay',
    propertyLocation: 'Raj Nagar, Gzb',
    propertyImg: '/owner-welcome-bg.png',
    startDate: '10 Sep 2025',
    endDate: '09 Mar 2026',
    status: 'Pending',
    rentAmount: 6500,
    rentFormatted: '₹6,500 / month',
    roomNo: 'Room 305 (Triple Sharing)',
    deposit: '₹6,500',
    timeAgo: '5 days ago',
    paymentStatus: 'Pending Verification'
  },
  {
    id: 4,
    num: '#4',
    tenantName: 'Aditya Kumar',
    tenantEmail: 'aditya.k@gmail.com',
    tenantPhone: '+91 97654 32109',
    avatar: '/student-hero.png',
    avatarInitial: 'A',
    avatarBg: '#10b981',
    propertyName: 'Urban Nest',
    propertyLocation: 'Kaushambi, Gzb',
    propertyImg: '/owner-property-hero-bg.png',
    startDate: '01 Aug 2025',
    endDate: '31 Jul 2026',
    status: 'Active',
    rentAmount: 9000,
    rentFormatted: '₹9,000 / month',
    roomNo: 'Room 108 (Premium Single)',
    deposit: '₹9,000',
    timeAgo: '1 week ago',
    paymentStatus: 'Paid'
  },
  {
    id: 5,
    num: '#5',
    tenantName: 'Priya Mehta',
    tenantEmail: 'priya.m@gmail.com',
    tenantPhone: '+91 88991 23456',
    avatar: '/sunset-room.png',
    avatarInitial: 'P',
    avatarBg: '#f59e0b',
    propertyName: 'Bliss PG',
    propertyLocation: 'Indirapuram, Gzb',
    propertyImg: '/sunset-room.png',
    startDate: '12 Jul 2025',
    endDate: '11 Jan 2026',
    status: 'Completed',
    rentAmount: 7000,
    rentFormatted: '₹7,000 / month',
    roomNo: 'Room 201 (Double Sharing)',
    deposit: '₹7,000 (Refunded)',
    timeAgo: '2 weeks ago',
    paymentStatus: 'Completed'
  },
  {
    id: 6,
    num: '#6',
    tenantName: 'Karan Arora',
    tenantEmail: 'karan.a@gmail.com',
    tenantPhone: '+91 85296 74123',
    avatar: '/owner-welcome-bg.png',
    avatarInitial: 'K',
    avatarBg: '#ef4444',
    propertyName: 'Green View PG',
    propertyLocation: 'Vasundhara, Gzb',
    propertyImg: '/owner-welcome-bg.png',
    startDate: '05 Jun 2025',
    endDate: '05 Sep 2025',
    status: 'Cancelled',
    rentAmount: 6000,
    rentFormatted: '₹6,000 / month',
    roomNo: 'Room 404 (Double Sharing)',
    deposit: '₹6,000 (Cancelled)',
    timeAgo: '3 weeks ago',
    paymentStatus: 'Cancelled'
  }
]

function OwnerBookingsPage({ onNavigate }) {
  const [bookings, setBookings] = useState(initialBookingsData)
  const [activeTab, setActiveTab] = useState('All')
  const [dateRange, setDateRange] = useState('01 Aug 2025 - 31 Dec 2025')
  const [showDateMenu, setShowDateMenu] = useState(false)
  const [propertyFilter, setPropertyFilter] = useState('All')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [viewBooking, setViewBooking] = useState(null)
  const [actionMenuId, setActionMenuId] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Calculate status counts
  const activeCount = bookings.filter(b => b.status === 'Active').length
  const pendingCount = bookings.filter(b => b.status === 'Pending').length
  const completedCount = bookings.filter(b => b.status === 'Completed').length
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length
  const totalCount = bookings.length

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === 'All' || b.status === activeTab
    const matchesProperty = propertyFilter === 'All' || b.propertyName === propertyFilter
    return matchesTab && matchesProperty
  })

  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b))
    setActionMenuId(null)
    if (viewBooking && viewBooking.id === id) {
      setViewBooking({ ...viewBooking, status: newStatus })
    }
    showToast(`Booking #${id} status updated to "${newStatus}"!`)
  }

  const cancelBooking = (id) => {
    updateBookingStatus(id, 'Cancelled')
  }

  const propertyOptions = ['All', 'Sunshine PG', 'Maple PG', 'Comfort Stay', 'Urban Nest', 'Bliss PG', 'Green View PG']
  const dateOptions = ['01 Aug 2025 - 31 Dec 2025', 'All Time (2025 - 2026)', 'This Month (Sep 2026)', 'Last 6 Months']

  // Donut chart angles
  const pActive = totalCount ? (activeCount / totalCount) * 100 : 0
  const pPending = totalCount ? (pendingCount / totalCount) * 100 : 0
  const pCompleted = totalCount ? (completedCount / totalCount) * 100 : 0
  const pCancelled = totalCount ? (cancelledCount / totalCount) * 100 : 0

  const stop1 = pActive
  const stop2 = stop1 + pPending
  const stop3 = stop2 + pCompleted

  const donutGradient = totalCount === 0 ? '#e2e8f0' : `conic-gradient(
    #10b981 0% ${stop1}%,
    #f59e0b ${stop1}% ${stop2}%,
    #3b82f6 ${stop2}% ${stop3}%,
    #ef4444 ${stop3}% 100%
  )`

  // Recent bookings list (4 items)
  const recentBookings = bookings.slice(0, 4)

  return (
    <section className="booking-page-container">
      <OwnerHero 
        title="My Bookings" 
        subtitle="Track, manage and stay connected with your tenants."
      />

      {toastMessage && <div className="owner-status-banner">✓ {toastMessage}</div>}

      {/* Top Tabs & Toolbar Controls */}
      <div className="booking-page-toolbar">
        <div className="booking-tabs-list">
          <button 
            type="button" 
            className={`booking-tab-item ${activeTab === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTab('All')}
          >
            All Bookings ({totalCount})
          </button>
          <button 
            type="button" 
            className={`booking-tab-item ${activeTab === 'Active' ? 'active' : ''}`}
            onClick={() => setActiveTab('Active')}
          >
            Active ({activeCount})
          </button>
          <button 
            type="button" 
            className={`booking-tab-item ${activeTab === 'Pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('Pending')}
          >
            Pending ({pendingCount})
          </button>
          <button 
            type="button" 
            className={`booking-tab-item ${activeTab === 'Completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('Completed')}
          >
            Completed ({completedCount})
          </button>
          <button 
            type="button" 
            className={`booking-tab-item ${activeTab === 'Cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('Cancelled')}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>

        <div className="booking-top-controls">
          {/* Date range picker button */}
          <div style={{ position: 'relative' }}>
            <button 
              type="button" 
              className="booking-date-btn"
              onClick={() => { setShowDateMenu(!showDateMenu); setShowFilterMenu(false); }}
            >
              <Icon name="calendar" size={15} />
              <span>{dateRange}</span>
              <i>▾</i>
            </button>
            {showDateMenu && (
              <div className="booking-popover">
                <h4>Select Date Range</h4>
                {dateOptions.map((d) => (
                  <button 
                    key={d} 
                    type="button" 
                    className={`booking-popover-item ${dateRange === d ? 'selected' : ''}`}
                    onClick={() => { setDateRange(d); setShowDateMenu(false); showToast(`Date range set to ${d}`); }}
                  >
                    <span>{d}</span>
                    {dateRange === d && <b>✓</b>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter button */}
          <div style={{ position: 'relative' }}>
            <button 
              type="button" 
              className={`booking-filter-btn ${propertyFilter !== 'All' ? 'active-filter' : ''}`}
              onClick={() => { setShowFilterMenu(!showFilterMenu); setShowDateMenu(false); }}
            >
              <Icon name="sparkle" size={15} />
              <span>Filter{propertyFilter !== 'All' ? `: ${propertyFilter}` : ''}</span>
              <i>▾</i>
            </button>
            {showFilterMenu && (
              <div className="booking-popover">
                <h4>Filter by Property</h4>
                {propertyOptions.map((p) => (
                  <button 
                    key={p} 
                    type="button" 
                    className={`booking-popover-item ${propertyFilter === p ? 'selected' : ''}`}
                    onClick={() => { setPropertyFilter(p); setShowFilterMenu(false); }}
                  >
                    <span>{p === 'All' ? 'All Properties' : p}</span>
                    {propertyFilter === p && <b>✓</b>}
                  </button>
                ))}
                {propertyFilter !== 'All' && (
                  <button 
                    type="button" 
                    style={{ marginTop: '8px', color: '#e11d48', background: '#fff1f2', width: '100%', padding: '6px', border: 0, borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                    onClick={() => { setPropertyFilter('All'); setShowFilterMenu(false); }}
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Bookings Table (Left) + Overview & Recent Bookings (Right) */}
      <div className="owner-bookings-layout">
        {/* Left Column: Bookings Table */}
        <section className="owner-table-card bookings-table-card">
          <table className="booking-table">
            <thead>
              <tr>
                <th className="booking-num-col">#</th>
                <th>Tenant Details</th>
                <th>Property</th>
                <th>Booking Period</th>
                <th>Status</th>
                <th>Rent Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px 16px', color: '#68799f' }}>
                    <strong>No bookings found for the selected filter.</strong>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="booking-num-col">{b.num}</td>
                    <td>
                      <div className="booking-tenant-cell">
                        <div 
                          className="booking-tenant-avatar" 
                          style={{ backgroundImage: `url(${b.avatar})`, backgroundColor: b.avatarBg }}
                        >
                          {!b.avatar && b.avatarInitial}
                        </div>
                        <div className="booking-tenant-info">
                          <strong>{b.tenantName}</strong>
                          <small>{b.tenantEmail}</small>
                          <small>{b.tenantPhone}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="booking-property-cell">
                        <div 
                          className="booking-property-thumb" 
                          style={{ backgroundImage: `url(${b.propertyImg})` }}
                        />
                        <div className="booking-property-info">
                          <strong>{b.propertyName}</strong>
                          <small>{b.propertyLocation}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="booking-period-cell">
                        <strong>{b.startDate}</strong>
                        <small>- {b.endDate}</small>
                      </div>
                    </td>
                    <td>
                      <span className={`booking-status-pill status-${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <div className="booking-rent-cell">
                        <strong>{b.rentFormatted}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="booking-actions-cell">
                        <button 
                          type="button" 
                          className="booking-view-btn"
                          onClick={() => setViewBooking(b)}
                        >
                          View
                        </button>
                        <button 
                          type="button" 
                          className={`booking-more-btn ${actionMenuId === b.id ? 'active' : ''}`}
                          onClick={() => setActionMenuId(actionMenuId === b.id ? null : b.id)}
                          aria-label="More actions"
                        >
                          ⋮
                        </button>

                        {/* 3-dot dropdown menu */}
                        {actionMenuId === b.id && (
                          <div className="booking-actions-menu">
                            <button type="button" onClick={() => { setViewBooking(b); setActionMenuId(null); }}>
                              👁 View Details
                            </button>
                            <button type="button" onClick={() => { if (onNavigate) onNavigate('Messages'); setActionMenuId(null); }}>
                              💬 Message Tenant
                            </button>
                            {b.status !== 'Active' && (
                              <button type="button" onClick={() => updateBookingStatus(b.id, 'Active')}>
                                ✓ Mark Active
                              </button>
                            )}
                            {b.status !== 'Completed' && (
                              <button type="button" onClick={() => updateBookingStatus(b.id, 'Completed')}>
                                ✓ Mark Completed
                              </button>
                            )}
                            {b.status !== 'Pending' && (
                              <button type="button" onClick={() => updateBookingStatus(b.id, 'Pending')}>
                                ⏳ Mark Pending
                              </button>
                            )}
                            <button type="button" className="danger" onClick={() => cancelBooking(b.id)}>
                              ✕ Cancel Booking
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Right Column: 2 Cards */}
        <aside className="booking-sidebar">
          {/* Card 1: Booking Overview */}
          <div className="booking-overview-card">
            <h3>Booking Overview</h3>
            <div className="donut-container">
              <div 
                className="donut-chart-wrap" 
                style={{ background: donutGradient }}
              >
                <div className="donut-hole">
                  <strong>{totalCount}</strong>
                  <small>Total</small>
                </div>
              </div>

              <div className="donut-legend">
                <div className="donut-legend-item">
                  <span className="donut-legend-dot dot-active" />
                  <span>{activeCount} Active</span>
                </div>
                <div className="donut-legend-item">
                  <span className="donut-legend-dot dot-pending" />
                  <span>{pendingCount} Pending</span>
                </div>
                <div className="donut-legend-item">
                  <span className="donut-legend-dot dot-completed" />
                  <span>{completedCount} Completed</span>
                </div>
                <div className="donut-legend-item">
                  <span className="donut-legend-dot dot-cancelled" />
                  <span>{cancelledCount} Cancelled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Bookings */}
          <div className="recent-bookings-card">
            <div className="recent-bookings-header">
              <h3>Recent Bookings</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('All'); }}>
                View all
              </a>
            </div>

            <div className="recent-bookings-list">
              {recentBookings.map((rb) => (
                <div 
                  key={rb.id} 
                  className="recent-booking-item"
                  onClick={() => setViewBooking(rb)}
                >
                  <div className="recent-booking-left">
                    <div 
                      className="recent-booking-avatar" 
                      style={{ backgroundImage: `url(${rb.avatar})`, backgroundColor: rb.avatarBg }}
                    >
                      {!rb.avatar && rb.avatarInitial}
                    </div>
                    <div className="recent-booking-info">
                      <strong>{rb.tenantName}</strong>
                      <small>{rb.propertyName}</small>
                    </div>
                  </div>

                  <div className="recent-booking-right">
                    <span className={`booking-status-pill status-${rb.status.toLowerCase()}`}>
                      {rb.status}
                    </span>
                    <time>{rb.timeAgo}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* View Booking Details Modal */}
      {viewBooking && (
        <div 
          className="property-listing-backdrop" 
          role="dialog" 
          aria-modal="true" 
          onMouseDown={(e) => { if (e.target === e.currentTarget) setViewBooking(null) }}
        >
          <div className="property-listing-modal booking-details-modal">
            <button 
              className="property-listing-close" 
              type="button" 
              onClick={() => setViewBooking(null)} 
              aria-label="Close"
            >
              ×
            </button>

            <header className="listing-modal-heading" style={{ borderBottom: 0, padding: '10px 0 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  className="booking-tenant-avatar" 
                  style={{ width: '48px', height: '48px', flexBasis: '48px', backgroundImage: `url(${viewBooking.avatar})`, backgroundColor: viewBooking.avatarBg }}
                />
                <div>
                  <h2 style={{ margin: 0, fontSize: '18px', color: '#0c1c54' }}>{viewBooking.tenantName}</h2>
                  <p style={{ margin: '2px 0 0', color: '#68799f', fontSize: '12px' }}>
                    {viewBooking.tenantEmail} · {viewBooking.tenantPhone}
                  </p>
                </div>
                <span className={`booking-status-pill status-${viewBooking.status.toLowerCase()}`} style={{ marginLeft: 'auto' }}>
                  {viewBooking.status}
                </span>
              </div>
            </header>

            <div className="booking-modal-meta">
              <div className="booking-meta-item">
                <label>Property</label>
                <strong>{viewBooking.propertyName}</strong>
                <small style={{ color: '#6a7b9e' }}>{viewBooking.propertyLocation}</small>
              </div>
              <div className="booking-meta-item">
                <label>Allocated Space</label>
                <strong>{viewBooking.roomNo}</strong>
              </div>
              <div className="booking-meta-item">
                <label>Booking Duration</label>
                <strong>{viewBooking.startDate} - {viewBooking.endDate}</strong>
              </div>
              <div className="booking-meta-item">
                <label>Monthly Rent</label>
                <strong style={{ color: '#4f3cf3' }}>{viewBooking.rentFormatted}</strong>
              </div>
              <div className="booking-meta-item">
                <label>Security Deposit</label>
                <strong>{viewBooking.deposit}</strong>
              </div>
              <div className="booking-meta-item">
                <label>Payment Status</label>
                <strong style={{ color: viewBooking.paymentStatus === 'Paid' ? '#059669' : '#d97706' }}>
                  ✓ {viewBooking.paymentStatus}
                </strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px', flexWrap: 'wrap' }}>
              {viewBooking.status !== 'Active' && (
                <button 
                  type="button" 
                  style={{ padding: '9px 15px', borderRadius: '8px', border: '1px solid #10b981', color: '#059669', background: '#ecfdf5', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => updateBookingStatus(viewBooking.id, 'Active')}
                >
                  ✓ Mark as Active
                </button>
              )}
              {viewBooking.status !== 'Cancelled' && (
                <button 
                  type="button" 
                  style={{ padding: '9px 15px', borderRadius: '8px', border: '1px solid #fed7d7', color: '#dc2626', background: '#fff5f5', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => updateBookingStatus(viewBooking.id, 'Cancelled')}
                >
                  Cancel Booking
                </button>
              )}
              <button 
                type="button" 
                style={{ padding: '9px 16px', borderRadius: '8px', border: 0, color: '#fff', background: '#4f3cf3', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => { setViewBooking(null); if (onNavigate) onNavigate('Messages'); }}
              >
                💬 Message Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function OwnerTenantsPage({ onNavigate }) { return <section><OwnerHero title="My Tenants" subtitle="Manage your current and past tenants with ease."/><section className="owner-page-stats"><article><b><Icon name="people" size={21}/></b><span><strong>42</strong><small>Total Tenants</small></span></article><article><b><Icon name="check" size={21}/></b><span><strong>28</strong><small>Active Tenants</small></span></article><article><b><Icon name="arrow" size={21}/></b><span><strong>8</strong><small>Moving Out Soon</small></span></article><article><b><Icon name="home" size={21}/></b><span><strong>6</strong><small>Past Tenants</small></span></article></section><section className="tenant-layout"><div className="owner-table-card"><header><strong>All Tenants (42)</strong><button>All Properties</button></header><div className="tenant-row selected"><b>A</b><span><strong>Ananya Singh</strong><small>+91 98765 43210 · Sunshine PG</small></span><em>Active</em></div><div className="tenant-row"><b>R</b><span><strong>Rahul Verma</strong><small>+91 98765 43210 · Maple PG</small></span><em>Active</em></div><div className="tenant-row"><b>S</b><span><strong>Sneha Tiwari</strong><small>+91 98765 43210 · Comfort Stay</small></span><em className="moving">Moving Out</em></div></div><aside className="tenant-profile"><h2>Tenant Profile</h2><b>A</b><h3>Ananya Singh</h3><em>Active</em><p>Phone: +91 98765 43210</p><p>Email: ananya@gmail.com</p><hr/><p>Property: Sunshine PG</p><p>Room No: 101</p><p>Monthly Rent: ₹7,500</p><button onClick={() => onNavigate('Messages')}>Message</button><button>View Agreement</button></aside></section></section> }

function OwnerMessagesPage() { const [text,setText] = useState(''); const [messages,setMessages] = useState(['Hi, is the room still available?','Hello Ananya, yes the room is still available.']); const send = () => { if (text.trim()) { setMessages([...messages, text]); setText('') } }; return <section><OwnerHero title="Messages" subtitle="Connect with tenants, answer queries and build long-term relationships."/><div className="owner-success"><b>3</b><h2>Messages inbox</h2><p>{messages.join(' · ')}</p><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message"/><button onClick={send}>Send Message</button></div></section> }

function OwnerSettingsPage({ onLogout }) { const [dark,setDark]=useState(false); return <><OwnerHero title="Settings" subtitle="Manage your account, preferences and business details all in one place."/><section className={`owner-settings ${dark?'dark-preview':''}`}><main><section><h2>♙　Profile Information</h2><p>Update your personal information.</p><div className="owner-fields"><label>Full Name<input defaultValue="Rohit Sharma"/></label><label>Email Address<input defaultValue="rohitsharma@gmail.com"/></label><label>Phone Number<input defaultValue="+91 98765 43210"/></label><label>Role<input defaultValue="PG Owner"/></label></div></section><section><h2>▥　Business Details</h2><p>Manage your PG business information.</p><div className="owner-fields"><label>Business Name<input defaultValue="Rohit PG Homes"/></label><label>Address<input defaultValue="Indirapuram, Ghaziabad, Uttar Pradesh"/></label><label>City<input defaultValue="Ghaziabad"/></label><label>Pincode<input defaultValue="201014"/></label></div></section><section><h2>☷　Preferences</h2><div className="owner-fields"><label>Preferred Communication<select><option>Email</option><option>Phone</option></select></label><label>Property Alerts<select><option>All Updates</option></select></label></div></section></main><aside><section><h2>◐ Theme Mode</h2><p>Choose the look and feel of your dashboard.</p><div className="theme-picks"><button>☼<b>Light</b></button><button className={!dark?'selected':''} onClick={()=>setDark(false)}>▣<b>Default</b></button><button className={dark?'selected':''} onClick={()=>setDark(true)}>☾<b>Dark</b></button></div></section><section><h2>⚙ Quick Settings</h2><p>♙　Edit Profile　›</p><p>🔒　Change Password　›</p><p>▣　Manage Bank Details　›</p><p>♧　Notification Preferences　›</p><p>◎　Language　›</p></section><button className="owner-logout" onClick={onLogout}>⇥　Logout <small>Sign out from your account.</small></button></aside></section></> }

function OwnerCollabsPage() {
  return <section>
    <OwnerHero title="Collabs" subtitle="Discover partnership opportunities, local collaboration requests, and growth leads for your PG business."/>
    <section className="owner-page-stats">
      <article><b><Icon name="people" size={21}/></b><span><strong>12</strong><small>Active Collaborations</small></span></article>
      <article><b><Icon name="sparkle" size={21}/></b><span><strong>06</strong><small>New Partner Leads</small></span></article>
      <article><b><Icon name="mail" size={21}/></b><span><strong>04</strong><small>Pending Proposals</small></span></article>
      <article><b><Icon name="star" size={21}/></b><span><strong>9.4</strong><small>Partnership Score</small></span></article>
    </section>
    <section className="owner-table-card">
      <header><strong>Recent Collaboration Requests</strong><button>View all</button></header>
      <div className="booking-simple">
        <article><b>Food Partner</b><span>Local tiffin service<br/><small>Healthy meals for tenants</small></span><em>New</em><strong>₹12,000 / month</strong><button>Review</button></article>
        <article><b>Transport Tie-up</b><span>Cab service<br/><small>Daily commute support</small></span><em>Negotiating</em><strong>₹18,000 / month</strong><button>Review</button></article>
        <article><b>Gym Partnership</b><span>Fitness center<br/><small>Tenant wellness offers</small></span><em>Approved</em><strong>₹15,000 / month</strong><button>Review</button></article>
      </div>
    </section>
  </section>
}

function OwnerDashboard({ onLogout }) {
  const [menu, setMenu] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('Dashboard')
  const [properties, setProperties] = useState(initialOwnerProperties)
  const [viewProperty, setViewProperty] = useState(null)
  const [editProperty, setEditProperty] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const saveEditedProperty = (updated) => {
    setProperties(properties.map(p => p.id === updated.id ? updated : p))
    setEditProperty(null)
    showToast(`Property "${updated.name}" updated successfully!`)
  }

  const deleteProperty = (id) => {
    const propToDelete = properties.find(p => p.id === id)
    setProperties(properties.filter(p => p.id !== id))
    setEditProperty(null)
    showToast(`Property "${propToDelete?.name || 'Listing'}" deleted successfully!`)
  }

  const handleAddProperty = (newProp) => {
    setProperties((prev) => [newProp, ...prev])
    showToast(`Property "${newProp.name}" published successfully!`)
  }

  return <div className={`owner-dashboard ${collapsed ? 'owner-is-collapsed' : ''}`}>
    <aside className={`owner-sidebar ${collapsed ? 'collapsed' : ''} ${menu ? 'show' : ''}`}>
      <div className="owner-sidebar-header">
        <a className="brand owner-brand" href="#">
          <span className="brand-mark"><Icon name="home" size={28}/></span>
          {!collapsed && <span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span>}
        </a>
        <button 
          className="owner-collapse-toggle" 
          onClick={() => setCollapsed(!collapsed)} 
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon name={collapsed ? "chevronRight" : "chevronLeft"} size={16}/>
        </button>
      </div>

      <button className="owner-profile" title="Rohit Sharma (PG Owner)">
        <b>R</b>
        {!collapsed && <span>Rohit Sharma<small>PG Owner</small></span>}
        {!collapsed && <i>⌄</i>}
      </button>

      <nav>
        {ownerNav.map(([icon, label]) => (
          <button 
            key={label} 
            className={`owner-nav-btn ${active === label ? 'active' : ''}`} 
            onClick={() => { setActive(label); setMenu(false); }}
            title={label}
          >
            <b>{icon}</b>
            <span className="nav-label">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
    <main className={`owner-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <header className={`owner-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <button className="owner-menu" onClick={() => setMenu(!menu)} aria-label="Open menu"><Icon name="menu" size={20}/></button>
        <label className="global-search"><Icon name="search" size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search properties, tenants or messages..."/></label>
        <div className="owner-tools"><span className="owner-bell"><Icon name="bell" size={18}/><i /></span><span className="owner-avatar">R</span><button onClick={onLogout}><b>Rohit Sharma</b><small>PG Owner · Sign out</small></button><i>⌄</i></div>
      </header>

      {toastMessage && <div className="owner-status-banner">✓ {toastMessage}</div>}

      {active === 'Dashboard' && <>
        <section className="owner-welcome">
          <div>
            <span className="owner-eyebrow">OWNER OVERVIEW</span>
            <h1>Welcome back, Rohit!</h1>
            <p>Manage your properties, connect with tenants, and grow your business with AI SafeRent.</p>
          </div>
          <div className="today">
            <b><Icon name="calendar" size={18}/></b>
            <span>
              <strong>Thursday, 23 Sep 2026</strong>
              <small>Here's what's happening with your properties today.</small>
            </span>
          </div>
        </section>

        <section className="owner-stats">
          <article>
            <b><Icon name="building" size={19}/></b>
            <strong>{properties.length}<small>Total Properties</small></strong>
            <em>↑ 25%</em>
          </article>
          <article>
            <b><Icon name="calendar" size={19}/></b>
            <strong>28<small>Total Bookings</small></strong>
            <em>↑ 12%</em>
          </article>
          <article>
            <b><Icon name="eyeOpen" size={19}/></b>
            <strong>1,245<small>Profile Views</small></strong>
            <em>↑ 40%</em>
          </article>
          <article>
            <b><Icon name="star" size={19}/></b>
            <strong>4.6<small>Average Rating</small></strong>
            <em>↑ 0.3</em>
          </article>
        </section>

        <section className="owner-mid">
          <section className="owner-properties owner-panel">
            <div className="owner-title">
              <div>
                <h2>Your Properties</h2>
                <p>Manage and update your property listings.</p>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); setActive('My Properties'); }}>View all <Icon name="arrow" size={13}/></a>
            </div>
            {properties.slice(0, 3).map((prop) => (
              <article key={prop.id || prop.name}>
                <div className={`owner-property-image ${prop.imageClass || 'image-0'}`}></div>
                <div className="owner-property-info">
                  <strong>{prop.name}</strong>
                  <p><Icon name="pin" size={12}/> {prop.location}</p>
                  <small>
                    <Icon name="people" size={12}/> {prop.type} &nbsp; 
                    <Icon name="wallet" size={12}/> {prop.priceFormatted} &nbsp; 
                    <Icon name="building" size={12}/> Available: {prop.rooms}
                  </small>
                </div>
                <em>{prop.status || 'Active'}</em>
                <button type="button" onClick={() => setViewProperty(prop)}>View</button>
                <button type="button" onClick={() => setEditProperty(prop)}>Edit</button>
                <button className="more" aria-label="More options">⋮</button>
              </article>
            ))}
          </section>

          <section className="requests owner-panel">
            <div className="owner-title">
              <h2>Recent Bookings &amp; Requests</h2>
              <a href="#" onClick={(e) => { e.preventDefault(); setActive('Booking'); }}>View all <Icon name="arrow" size={13}/></a>
            </div>
            {requests.map(([initial, name, request, place, date, status], index) => (
              <article key={name}>
                <b className={`request-initial i-${index}`}>{initial}</b>
                <span><strong>{name}</strong><small>{request}<br/>{place}</small></span>
                <time>{date}</time>
                <em className={status.toLowerCase()}>{status}</em>
              </article>
            ))}
          </section>
        </section>

        <section className="owner-bottom">
          <article className="tips owner-panel">
            <h2>Tips to Get More Bookings</h2>
            <div>
              <span><Icon name="camera" size={19}/><b>Add more photos<small>Listings with photos get 3x more views.</small></b></span>
              <span><Icon name="calendar" size={19}/><b>Keep availability updated<small>Updated listings rank higher.</small></b></span>
              <span><Icon name="shield" size={19}/><b>Get verified<small>Build trust with tenants.</small></b></span>
              <span><Icon name="zap" size={19}/><b>Respond quickly<small>Faster responses lead to more bookings.</small></b></span>
            </div>
          </article>
          <article className="need-help owner-panel">
            <b><Icon name="help" size={22}/></b>
            <span>
              <h2>Need Help?</h2>
              <p>Our support team is here to help you with any queries.</p>
              <button type="button" onClick={() => setActive('Messages')}>Contact Support <Icon name="arrow" size={14}/></button>
            </span>
          </article>
          <article className="owner-promo">
            <div className="promo-icon"><Icon name="home" size={20}/></div>
            <span className="promo-kicker">BUILD YOUR COMMUNITY</span>
            <h3>More visibility.<br/><strong>Better tenants.</strong></h3>
            <p>Keep your listings fresh and make every space count.</p>
            <button type="button" onClick={() => setActive('My Properties')}>My Properties <Icon name="arrow" size={13}/></button>
          </article>
        </section>

        <footer className="owner-footer">
          <a className="brand footer-brand" href="#"><span className="brand-mark"><Icon name="home" size={27}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a>
          <nav><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Help</a></nav>
          <span>© 2026 AI SafeRent. All rights reserved.</span>
        </footer>

        {/* View Details Modal in Dashboard */}
        {viewProperty && (
          <div className="property-listing-backdrop" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setViewProperty(null) }}>
            <div className="property-listing-modal owner-preview-modal">
              <button className="property-listing-close" type="button" onClick={() => setViewProperty(null)} aria-label="Close">×</button>
              <div className="owner-detail-banner" style={{ backgroundImage: `url(${viewProperty.img || '/student-hero.png'})` }}>
                <span className="detail-status-badge">✓ {viewProperty.status || 'Active'} Listing</span>
              </div>
              <div className="owner-detail-body">
                <h2>{viewProperty.name}</h2>
                <p className="detail-loc"><Icon name="pin" size={14}/> {viewProperty.location}</p>
                <div className="detail-meta-row">
                  <span><Icon name="people" size={14}/> {viewProperty.type}</span>
                  <span><Icon name="building" size={14}/> {viewProperty.rooms}</span>
                  <span><Icon name="people" size={14}/> {viewProperty.tenants}</span>
                  <span><Icon name="sparkle" size={14}/> {viewProperty.amenities}</span>
                </div>
                <div className="detail-price-box">
                  <strong>{viewProperty.priceFormatted}</strong>
                  <small>Verified Safe PG · 100% On-time Tenant Occupancy</small>
                </div>
                <div className="owner-detail-actions">
                  <button type="button" onClick={() => { setViewProperty(null); setActive('Booking'); }}>View Bookings</button>
                  <button type="button" onClick={() => { const p = viewProperty; setViewProperty(null); setEditProperty(p); }}>Edit Property</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Property Modal in Dashboard */}
        {editProperty && (
          <OwnerEditPropertyDialog 
            property={editProperty} 
            onClose={() => setEditProperty(null)} 
            onSave={saveEditedProperty} 
            onDelete={deleteProperty}
          />
        )}
      </>}
      {active === 'My Properties' && <OwnerPropertiesPage properties={properties} setProperties={setProperties} onNavigate={setActive}/>} 
      {active === 'Add Property' && <AddPropertyPage onNavigate={setActive} onAddProperty={handleAddProperty}/>} 
      {active === 'Booking' && <OwnerBookingsPage onNavigate={setActive}/>} 
      {active === 'Tenants' && <OwnerTenantsPage onNavigate={setActive}/>} 
      {active === 'Messages' && <OwnerMessagesPage/>} 
      {active === 'Collabs' && <OwnerCollabsPage/>} 
      {active === 'Settings' && <OwnerSettingsPage onLogout={onLogout}/>} 
    </main>
  </div>
}

function App() {
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('tenant')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [page, setPage] = useState('login')
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1500); return () => clearTimeout(timer) }, [])
  const benefits = [['shield', 'Verified', 'Properties'], ['people', 'Safer', 'Neighborhoods'], ['pin', 'AI', 'Recommendations'], ['leaf', 'Better', 'Living']]
  const defaultSearchFilters = {
    location: 'Indirapuram, Ghaziabad',
    propertyType: 'PG',
    budget: '₹ 0 – ₹ 30,000',
    preferredFor: 'Anyone',
    amenities: 'Wi-Fi, AC, Attached Bath'
  }
  const [searchFilters, setSearchFilters] = useState(defaultSearchFilters)
  const [savedProperties, setSavedProperties] = useState([])
  const [confirmedBookings, setConfirmedBookings] = useState([])
  const [selectedVisitProperty, setSelectedVisitProperty] = useState(defaultVisitProperty)
  const toggleSavedProperty = (name) => setSavedProperties((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  const studentNavigate = (destination, filters, property) => {
    if (destination === 'Book a Visit') setSelectedVisitProperty(property || defaultVisitProperty)
    if (filters) {
      setSearchFilters((current) => ({ ...current, ...filters }))
    }
    const routes = { Home: 'dashboard', PGs: 'pgs', Flats: 'flats', Rooms: 'rooms', Explore: 'explore', 'AI Recommendations': 'recommendations', 'Book a Visit': 'visit', 'Saved Properties': 'saved', 'My Bookings': 'bookings', Profile: 'profile', Settings: 'settings' }
    setPage(routes[destination] || 'dashboard')
  }
  if (page === 'dashboard') return <StudentDashboard onLogout={() => setPage('login')} onNavigate={studentNavigate} />
  if (page === 'pgs') return <ListingsPage type="PGs" onNavigate={studentNavigate} savedNames={savedProperties} onToggleSaved={toggleSavedProperty} />
  if (page === 'flats') return <ListingsPage type="Flats" onNavigate={studentNavigate} savedNames={savedProperties} onToggleSaved={toggleSavedProperty} />
  if (page === 'rooms') return <ListingsPage type="Rooms" onNavigate={studentNavigate} savedNames={savedProperties} onToggleSaved={toggleSavedProperty} />
  if (page === 'explore') return <ExplorePage onNavigate={studentNavigate} />
  if (page === 'recommendations') return <RecommendationsPage onNavigate={studentNavigate} filters={searchFilters} />
  if (page === 'visit') return <VisitPage property={selectedVisitProperty} onNavigate={studentNavigate} onConfirm={(booking) => setConfirmedBookings((current) => [booking, ...current])} onCancel={(booking) => { setConfirmedBookings((current) => [booking, ...current]); setPage('bookings') }} />
  if (page === 'saved') return <SavedPageV2 onNavigate={studentNavigate} saved={savedProperties} onRemove={toggleSavedProperty} />
  if (page === 'bookings') return <BookingsPageV2 onNavigate={studentNavigate} confirmedBookings={confirmedBookings} />
  if (page === 'profile') return <ProfilePage onNavigate={studentNavigate} />
  if (page === 'settings') return <SettingsPage onNavigate={studentNavigate} onLogout={() => setPage('login')} />
  if (page === 'owner-dashboard') return <OwnerDashboard onLogout={() => setPage('login')} />
  const submitLogin = (event) => { event.preventDefault(); setPage(role === 'tenant' ? 'dashboard' : 'owner-dashboard') }
  return <>
    {loading && <Preloader />}
    <main className="page-shell">
      <div className="image-overlay" />
      <section className="brand-side">
        <a className="brand" href="#"><span className="brand-mark login-brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a>
        <div className="hero-copy">
          <p className="handwritten">Same City<br/>New Opportunities <b>♡</b></p>
          <h1>More Than a Place<br/>A <em>Safer Tomorrow</em></h1>
          <p className="intro">AI SafeRent helps students and professionals<br/>find safe, affordable and verified PGs, rooms and flats<br/>with AI-powered neighborhood insights.</p>
        </div>
        <div className="benefits">{benefits.map(([icon, first, second]) => <div className="benefit" key={icon}><span className="benefit-icon"><Icon name={icon}/></span><p>{first}<br/>{second}</p></div>)}</div>
        <aside className="quote"><b>“</b><p>A safer home<br/>for a brighter future.</p><i /></aside>
      </section>

      <section className="login-side">
        <form className="login-card" onSubmit={submitLogin}>
          <header><h2>Welcome to <span>AI SafeRent</span></h2><p>Login to continue</p></header>
          <div className="role-toggle">
            <button type="button" className={role === 'tenant' ? 'selected' : ''} onClick={() => setRole('tenant')}><Icon name="cap"/>Student / Tenant</button>
            <button type="button" className={role === 'owner' ? 'selected' : ''} onClick={() => setRole('owner')}><Icon name="building"/>PG Owner</button>
          </div>
          <label className="field"><Icon name="mail"/><input type="email" placeholder="Enter your email address" aria-label="Email address"/></label>
          <label className="field"><Icon name="lock"/><input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" aria-label="Password"/><button type="button" className="eye" onClick={() => setShowPassword(!showPassword)}><Icon name="eye"/></button></label>
          <div className="form-options"><label className="remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/><span>✓</span>Remember me</label><a href="#">Forgot password?</a></div>
          <button className="login-button" type="submit">Login <Icon name="arrow"/></button>
          <div className="or"><span />OR<span /></div>
          <div className="socials">
            <button type="button" className="social-btn google-btn">
              <span className="social-icon google-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" role="img" aria-label="Google icon">
                  <path fill="#EA4335" d="M24 9.5c3.2 0 6.1 1.1 8.3 3.2l6.2-6.2A23.9 23.9 0 0 0 24 0C14.8 0 6.8 5.6 2.7 13.7l7.8 6.1c1.8-5.6 6.8-9.3 13.5-9.3Z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3-.4-4.4H24v8.4h12.9c-.6 2.8-2.1 5.2-4.4 6.8l7.1 5.5c4.2-3.8 6.9-9.4 6.9-16.3Z"/>
                  <path fill="#FBBC05" d="M24 48c6.1 0 11.3-2 15.1-5.4l-7.2-5.6c-2.1 1.4-4.7 2.2-7.9 2.2-6 0-11.2-4.1-13-9.5L2.5 31.7A23.8 23.8 0 0 0 24 48Z"/>
                  <path fill="#34A853" d="M10.9 32.9C8.8 29.7 7.7 25.9 7.7 24c0-1.9.9-5.1 2.1-7.1L2.3 11.3A23.7 23.7 0 0 0 0 24c0 3.8.9 7.6 2.5 10.9l8.4-6Z"/>
                </svg>
              </span>
              <span>Continue with Google</span>
            </button>
            <button type="button" className="social-btn apple-btn">
              <span className="social-icon apple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" aria-label="Apple icon">
                  <path fill="currentColor" d="M15.4 12.3c0-2.3 1.9-3.4 2-3.5-1.1-1.7-2.8-1.9-3.4-1.9-1.4-.1-2.8.8-3.5.8-.8 0-2-.8-3.2-.8-1.7 0-3.2 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.8 1.2 1.9 2.5 3.2 2.4 1.3-.1 1.8-.8 3.4-.8 1.6 0 2.1.8 3.4.8 1.4 0 2.3-1.2 3.1-2.4.9-1.4 1.3-2.8 1.3-2.8-.1 0-2.8-1.1-4.2-3.4Zm-2.4-6.7c.6-.8 1.1-1.9 1-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.6-1.3Z"/>
                </svg>
              </span>
              <span>Continue with Apple</span>
            </button>
          </div>
          <p className="signup-text">Don’t have an account? <a href="#">Sign Up</a></p>
        </form>
      </section>
      <footer><span>© 2026 AI SafeRent. All rights reserved.</span><nav><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Help</a></nav></footer>
    </main>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
