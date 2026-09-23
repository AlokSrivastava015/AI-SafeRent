import { useEffect, useState } from 'react'
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
    heart: <path d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z"/>
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Preloader() {
  return <div className="preloader" aria-label="Loading AI SafeRent">
    <div className="loader-mark"><Icon name="home" size={38}/></div>
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

function StudentSidebar({ active, onNavigate, menu, onClose, collapsed, onCollapse }) {
  const [exploreOpen, setExploreOpen] = useState(['Explore', 'PGs', 'Flats', 'Rooms'].includes(active))
  const select = (name) => { onNavigate(name); onClose?.() }
  return <aside className={`sidebar student-sidebar ${menu ? 'show' : ''} ${collapsed ? 'collapsed' : ''}`}>
    <button className="sidebar-collapse" onClick={onCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>‹</button>
    <nav>{navItems.map(([icon, name]) => name === 'Explore' ? <div className="explore-nav" key={name}><button className={['Explore', 'PGs', 'Flats', 'Rooms'].includes(active) ? 'active' : ''} onClick={() => setExploreOpen(!exploreOpen)}><b>{icon}</b><span>Explore</span><i aria-hidden="true">{exploreOpen ? '▴' : '▾'}</i></button>{exploreOpen && <div className="explore-subnav"><button className={active === 'PGs' ? 'selected' : ''} onClick={() => select('PGs')}><Icon name="grid" size={16}/><span>PGs</span></button><button className={active === 'Flats' ? 'selected' : ''} onClick={() => select('Flats')}><Icon name="building" size={16}/><span>Flats</span></button><button className={active === 'Rooms' ? 'selected' : ''} onClick={() => select('Rooms')}><Icon name="room" size={16}/><span>Rooms</span></button></div>}</div> : <button key={name} className={name === active ? 'active' : ''} onClick={() => select(name)}><b>{icon}</b><span>{name}</span></button>)}</nav>
  </aside>
}

function StudentDashboard({ onLogout, onNavigate }) {
  const [menu, setMenu] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
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
  return <div className={`dashboard ${collapsed ? 'sidebar-is-collapsed' : ''}`}>
    <header className="dash-header"><a className="brand dash-brand" href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><div className="dash-account"><button className="notification" aria-label="Notifications"><Icon name="bell" size={18}/><i /></button><span className="avatar">A</span><span className="account-copy">Hi, Alok<small>Student/Tenant</small></span><span>⌄</span></div></header>
    <StudentSidebar active="Home" onNavigate={onNavigate} menu={menu} onClose={() => setMenu(false)} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
    <main className="dash-main">
      <section className="dash-hero"><div className="dash-hero-copy"><span className="eyebrow">Verified Spaces. Happy Places.</span><h1>Safest places.<br/>Better spaces.<em>Yours to call home.</em></h1><p>PGs, Flats & Rooms for Students<br/>and Working Professionals.</p><div className="trust-row"><span><Icon name="shield" size={14}/> Safe</span><span><Icon name="check" size={14}/> Verified</span><span><Icon name="home" size={14}/> Affordable</span><span><Icon name="settings" size={14}/> Trusted</span></div></div><div className="dna"><small>Neighborhood<br/>DNA Score</small><strong>9.2</strong><span>Excellent</span><a href="#score">See details →</a></div></section>
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

function StudentChrome({ active, onNavigate, children }) {
  const [menu, setMenu] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  return <div className={`student-pages ${collapsed ? 'sidebar-is-collapsed' : ''}`}><header className="student-header"><button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Open navigation"><Icon name="menu" size={21}/></button><a className="brand dash-brand" onClick={() => onNavigate('Home')} href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><label className="student-search"><Icon name="search" size={17}/><input placeholder="Search by location, property name or landmark..."/></label><div className="student-user"><span><Icon name="bell" size={20}/></span><b>A</b><i>Aman Verma<small>Student</small></i><em>⌄</em></div></header><StudentSidebar active={active} onNavigate={onNavigate} menu={menu} onClose={() => setMenu(false)} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} /><main className="student-content">{children}</main></div>
}

function ListingCard({ name, type, index, onVisit, onDetails }) {
  const price = type === 'Flats' ? [18000,12000,25000,14500,28000,20000,16500,22000,19500,11000,24000,30000][index] : type === 'Rooms' ? [9000,7500,8500,11000,12000,6000,13500,5500,7000,10000,9500,8000][index] : [7000,6500,8000,5500,9000,7500,8500,6800,7200,6200,7800,8800][index]
  return <article className="listing-card"><div className={`listing-photo photo-${index % 6}`}><span>{index % 3 === 0 ? 'Verified' : index % 3 === 1 ? 'Popular' : 'Near Metro'}</span><button>♡</button></div><div className="listing-body"><h3>{name}</h3><p>⌖ &nbsp;{places[index % places.length]}</p><div className="listing-price">₹{price.toLocaleString()} <small>/ month</small><i>★ 4.{(index + 4) % 10} ({72 + index * 7})</i></div><div className="listing-tags"><span>{type === 'PGs' ? 'With Food' : 'Furnished'}</span><span>Wi-Fi</span><span>{index % 2 ? 'AC' : 'Attached Bath'}</span></div><div className="listing-actions"><button onClick={() => onDetails({ name, index, location: places[index % places.length], price, type })}>View Details</button><button onClick={onVisit}>Book a Visit</button></div></div></article>
}

function ListingsPage({ type, onNavigate, savedNames, onToggleSaved }) {
  /* return <StudentChrome active={type} onNavigate={onNavigate}><section className="browse-heading"><div><h1>{type} in Indirapuram</h1><p>Explore verified {type.toLowerCase()} for rent with real photos, genuine listings and neighborhood insights.</p></div><aside>Safe. Affordable. Verified.<br/><em>A better space for a brighter you ♡</em></aside></section><div className="browse-tabs"><button className="active">All {type}</button>{type === 'PGs' ? <><button>Girls PG</button><button>Boys PG</button><button>Co-Living</button><button>With Food</button></> : type === 'Flats' ? <><button>1 BHK</button><button>2 BHK</button><button>3 BHK</button><button>4 BHK+</button></> : <><button>Private Room</button><button>Shared Room</button><button>With AC</button><button>Near Metro</button></>}<button>☷ More Filters</button></div><section className="listing-layout"><div><div className="listing-toolbar"><strong>Showing 12 {type} in Indirapuram</strong><span><button>Sort by: Relevance　⌄</button><button className="active">▦ Grid</button></span></div><div className="listing-grid">{listingNames[type].map((name, index) => <ListingCard key={name} name={name} type={type} index={index} onVisit={() => onNavigate('Book a Visit')}/>)}</div></div><aside className="refine"><h2>Explore {type} Around You</h2><div className="fake-map"><b>⌂</b><b>⌖</b><b>⌂</b><b>⌖</b><span>Indirapuram<br/><small>High Safety Score</small></span></div><h2>Refine Your Search <a href="#">Reset</a></h2><label>Budget Range<strong>₹0 – ₹50,000</strong><input type="range"/></label><h4>{type === 'PGs' ? 'Preferred For' : type === 'Flats' ? 'BHK Type' : 'Room Type'}</h4><div className="checks"><label><input type="checkbox" defaultChecked/> Girls</label><label><input type="checkbox"/> Boys</label><label><input type="checkbox"/> Any</label></div><h4>Amenities</h4><div className="checks"><label><input type="checkbox" defaultChecked/> AC</label><label><input type="checkbox"/> Wi-Fi</label><label><input type="checkbox"/> Parking</label><label><input type="checkbox"/> Security</label></div><button className="apply-filter">☷ &nbsp; Apply Filters</button></aside></section><InfoStrip /></StudentChrome> */
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    location: 'Indirapuram, Ghaziabad',
    propertyType: type === 'Flats' ? 'Flat' : type === 'Rooms' ? 'Room' : 'PG',
    budget: '₹ 0 – ₹ 30,000',
    preferredFor: 'Anyone',
    amenities: 'Wi-Fi, AC, Attached Bath'
  })
  const headingType = type === 'PGs' ? 'PGs' : type === 'Flats' ? 'Flats' : 'Rooms'
  const pageHeading = headingType
  const tabOptions = type === 'PGs' ? ['All PGs', 'Girls PG', 'Boys PG', 'Co-Living', 'With Food'] : type === 'Flats' ? ['All Flats', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'] : ['All Rooms', 'Private Room', 'Shared Room', 'With AC', 'Near Metro']
  const [selectedTab, setSelectedTab] = useState(tabOptions[0])
  useEffect(() => {
    const heartButtons = document.querySelectorAll('.listing-grid .listing-photo button')
    const handleHeart = (event) => {
      const card = event.currentTarget.closest('.listing-card')
      const name = card?.querySelector('h3')?.textContent
      if (!name) return
      onToggleSaved(name)
      event.currentTarget.textContent = savedNames.includes(name) ? '♡' : '♥'
    }
    heartButtons.forEach((button) => {
      const name = button.closest('.listing-card')?.querySelector('h3')?.textContent
      button.textContent = savedNames.includes(name) ? '♥' : '♡'
      button.addEventListener('click', handleHeart)
    })
    return () => heartButtons.forEach((button) => button.removeEventListener('click', handleHeart))
  }, [savedNames, onToggleSaved])

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
    modalRoot.render(<PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onBookVisit={() => { setSelectedProperty(null); onNavigate('Book a Visit') }} />)
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [selectedProperty, onNavigate])

  return <StudentChrome active={type} onNavigate={onNavigate}><section className="browse-heading"><div><h1>{pageHeading}</h1><p>Explore verified {type.toLowerCase()} for rent with real photos, genuine listings and neighborhood insights.</p></div><aside>Safe. Affordable. Verified.<br/><em>A better space for a brighter you ♡</em></aside></section><div className="browse-tabs"><button className="active">All {type}</button>{type === 'PGs' ? <><button>Girls PG</button><button>Boys PG</button><button>Co-Living</button><button className="category-tab">With Food</button></> : type === 'Flats' ? <><button>1 BHK</button><button>2 BHK</button><button>3 BHK</button><button className="category-tab">4 BHK+</button></> : <><button>Private Room</button><button>Shared Room</button><button>With AC</button><button className="category-tab">Near Metro</button></>}</div><section className="listing-layout listing-layout-full"><div><section className="preferences listing-preferences"><h2>Your Preferences <a href="#" onClick={(event) => { event.preventDefault(); setShowFilters(true) }}>✎ Edit Preferences</a></h2><p>We use your preferences to give better recommendations.</p><div><span>⌖<b>{selectedFilters.location}</b></span><span>⌂<b>{selectedFilters.propertyType}</b></span><span>₹<b>Budget<br/>{selectedFilters.budget}</b></span><span>♧<b>Preferred For<br/>{selectedFilters.preferredFor}</b></span><span>▱<b>Amenities<br/>{selectedFilters.amenities}</b></span></div></section><div className="listing-toolbar"><strong>Showing 12 {type} in Indirapuram</strong><span><button>Sort by: Relevance　⌄</button><button className="active">▦ Grid</button></span></div><div className={`listing-grid ${type === 'PGs' ? 'pg-listing-grid' : ''}`}>{listingNames[type].map((name, index) => <ListingCard key={name} name={name} type={type} index={index} onVisit={() => onNavigate('Book a Visit')} onDetails={setSelectedProperty}/>)}</div></div></section><InfoStrip /></StudentChrome>
}

function ExplorePage({ onNavigate }) {
  const [selected, setSelected] = useState('All')
  return <StudentChrome active="Explore" onNavigate={onNavigate}><section className="explore-heading"><div><h1>Explore Indirapuram</h1><p>Discover PGs, flats and rooms around you with an interactive map.</p></div><aside>Explore<br/><em>Safe Neighborhoods<br/>Brighter Opportunities ♡</em></aside></section><div className="explore-filters"><button className={selected === 'All' ? 'active' : ''} onClick={() => setSelected('All')}><Icon name="grid" size={14}/> All</button>{['PGs','Flats','Rooms'].map(type => <button key={type} className={selected === type ? 'active' : ''} onClick={() => { setSelected(type); onNavigate(type)}}>{type === 'PGs' ? <Icon name="home" size={14}/> : type === 'Flats' ? <Icon name="building" size={14}/> : <Icon name="room" size={14}/>} {type}</button>)}<label>Price Range <b>Any　⌄</b></label><label>Property Type <b>Any　⌄</b></label><button>☷ More Filters</button></div><section className="explore-layout"><div className="large-map"><input placeholder="⌕  Search this area"/><b className="map-center">⌂<small>Indirapuram<br/>High Safety Score</small></b><i className="map-marker a">⌂</i><i className="map-marker b">⌖</i><i className="map-marker c">⌂</i><i className="map-marker d">⌖</i><div className="map-view">Map View<br/><button>▦ Default</button><button>Satellite</button></div></div><aside className="explore-results"><h2>124 properties found <button>Sort by: Relevance　⌄</button></h2>{listingNames.PGs.slice(0,5).map((name, i) => <article key={name}><div className={`tiny-photo photo-${i}`}/><span><strong>{i === 1 ? '2 BHK Apartment' : name}</strong><small>⌖ &nbsp;{places[i]}<br/>★ 4.{i + 4} ({76 + i * 12})<br/><b>₹{[7000,18000,6500,25000,9000][i].toLocaleString()} </b>/ month</small></span><button onClick={() => onNavigate('Book a Visit')}>View Details</button></article>)}</aside></section><InfoStrip /></StudentChrome>
}

function PreferencesModal({ values, onClose, onSave, title = 'Edit Your Preferences' }) {
  const [draft, setDraft] = useState({
    location: values.location,
    budget: values.budget,
    propertyType: values.propertyType,
    preferredFor: values.preferredFor,
    amenities: values.amenities,
    roomType: values.roomType || 'Single Room',
    moveIn: values.moveIn || '1 Oct 2026',
    duration: values.duration || '6 Months',
    notes: values.notes || ''
  })
  const [amenityList, setAmenityList] = useState(values.amenities.split(', '))
  const amenities = ['Wi-Fi', 'Meals', 'AC', 'Parking', 'Laundry', 'Attached Bath', 'Power Backup', 'Study Area', 'Other']
  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }))
  const toggleAmenity = (amenity) => setAmenityList((current) => current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity])
  const savePreferences = () => onSave({ ...draft, amenities: amenityList.join(', ') || 'No preference' })
  const resetPreferences = () => {
    setDraft({ ...draft, location: 'Indirapuram, Vaishali, Raj Nagar', budget: '₹ 5,000 – ₹ 15,000', propertyType: 'PG', preferredFor: 'No Preference', roomType: 'Single Room', moveIn: '1 Oct 2026', duration: '6 Months', notes: '' })
    setAmenityList(['Wi-Fi', 'Meals'])
  }

  return <div className="preferences-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="preferences-modal" role="dialog" aria-modal="true" aria-labelledby="preferences-title"><header className="preferences-modal-header"><div><span className="modal-icon"><Icon name="settings" size={20}/></span><div><h2 id="preferences-title">Edit Your Preferences</h2><p>Help us understand your needs better to give more accurate AI recommendations.</p></div></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close preferences">×</button></header><div className="preferences-modal-body"><label className="modal-field location-field"><span><b><Icon name="pin" size={15}/> Preferred Locations</b><small>Select cities or areas where you want to stay</small></span><input value={draft.location} onChange={(event) => updateDraft('location', event.target.value)} placeholder="Enter a location"/></label><div className="modal-grid"><label className="modal-field"><span><b><Icon name="sparkle" size={15}/> Budget Range <small>(per month)</small></b><small>Set your preferred monthly rent range</small></span><select value={draft.budget} onChange={(event) => updateDraft('budget', event.target.value)}><option>₹ 0 – ₹ 30,000</option><option>₹ 5,000 – ₹ 15,000</option><option>₹ 15,000 – ₹ 25,000</option><option>₹ 25,000 – ₹ 50,000</option></select></label><label className="modal-field"><span><b><Icon name="room" size={15}/> Room Type</b><small>Select your preferred room type</small></span><select value={draft.roomType} onChange={(event) => updateDraft('roomType', event.target.value)}><option>Single Room</option><option>Shared Room</option><option>1 BHK</option><option>2 BHK</option></select></label><label className="modal-field"><span><b><Icon name="people" size={15}/> Gender Preference</b><small>Choose your preferred accommodation</small></span><select value={draft.preferredFor} onChange={(event) => updateDraft('preferredFor', event.target.value)}><option>No Preference</option><option>Girls</option><option>Boys</option><option>Anyone</option></select></label></div><div className="modal-grid modal-grid-wide"><fieldset className="modal-field amenity-field"><legend><Icon name="settings" size={15}/> Amenities</legend><small>Select must-have amenities</small><div className="amenity-options">{amenities.map((amenity) => <label key={amenity} className={amenityList.includes(amenity) ? 'checked' : ''}><input type="checkbox" checked={amenityList.includes(amenity)} onChange={() => toggleAmenity(amenity)}/><span>{amenity}</span></label>)}</div></fieldset><label className="modal-field"><span><b><Icon name="home" size={15}/> Preferred PG Type</b><small>Select type of accommodation</small></span><div className="choice-options">{['Boys PG', 'Girls PG', 'Co-living', 'Hostel', 'Independent House', 'No Preference'].map((type) => <label key={type} className={draft.propertyType === type ? 'checked' : ''}><input type="radio" name="pg-type" checked={draft.propertyType === type} onChange={() => updateDraft('propertyType', type)}/><span>{type}</span></label>)}</div></label><div className="modal-stack"><label className="modal-field"><span><b><Icon name="calendar" size={15}/> Move-in Timeline</b><small>When are you planning to move in?</small></span><select value={draft.moveIn} onChange={(event) => updateDraft('moveIn', event.target.value)}><option>1 Oct 2026</option><option>1 Nov 2026</option><option>Within 3 months</option><option>Flexible</option></select></label><label className="modal-field"><span><b><Icon name="calendar" size={15}/> Stay Duration</b><small>Expected length of stay</small></span><select value={draft.duration} onChange={(event) => updateDraft('duration', event.target.value)}><option>6 Months</option><option>12 Months</option><option>More than 1 year</option><option>Flexible</option></select></label></div></div><label className="modal-field notes-field"><span><b><Icon name="mail" size={15}/> Additional Preferences <small>(Optional)</small></b><small>Share any preferences about your lifestyle, location, or needs</small></span><textarea maxLength="200" value={draft.notes} onChange={(event) => updateDraft('notes', event.target.value)} placeholder="Type your additional preferences here..."/><small className="character-count">{draft.notes.length}/200</small></label></div><footer className="preferences-modal-footer"><button type="button" className="reset-preferences" onClick={resetPreferences}>↻ Reset to Default</button><div><button type="button" className="cancel-preferences" onClick={onClose}>Cancel</button><button type="button" className="save-preferences" onClick={savePreferences}><Icon name="check" size={15}/> Save Preferences</button></div></footer></section></div>
}

function PropertyDetailsModal({ property, onClose, onBookVisit }) {
  const amenities = ['Wi-Fi', 'Meals Included', 'AC (Selected Room)', 'Attached Bathroom', 'Laundry', 'Common Kitchen', 'Study Area', '24/7 Security', 'Power Backup', 'RO Water', 'Refrigerator', 'Housekeeping']
  return <div className="property-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="property-modal" role="dialog" aria-modal="true" aria-labelledby="property-modal-title"><button type="button" className="property-modal-close" onClick={onClose} aria-label="Close property details">×</button><div className="property-modal-main"><div className="property-gallery"><div className="property-gallery-main"><span>92% Match</span><i>‹</i><div className={`property-detail-image photo-${property.index % 6}`} /><i>›</i><small>1/10</small></div><div className="property-thumbnails">{[0, 1, 2, 3, 4].map((image) => <div className={`photo-${(property.index + image) % 6}`} key={image} />)}<b>+6<br/><small>More Photos</small></b></div><nav className="property-detail-tabs"><button className="active">Overview</button><button>Amenities</button><button>Location</button><button>Reviews</button></nav><section className="property-description"><h3>Property Description</h3><p>A safe and comfortable place for students and working professionals in {property.location}. This verified property offers modern amenities, reliable connectivity and a community-focused living experience.</p><h3>Amenities</h3><div className="detail-amenities">{amenities.map((amenity) => <span key={amenity}><Icon name="check" size={13}/>{amenity}</span>)}</div><div className="tenant-reviews"><div><h3>Reviews from Tenants (2)</h3><a href="#">View All Reviews</a></div><article><b>A</b><p><strong>Ananya Verma</strong><small>Stayed for 8 months</small><span>★ 4.8　2 months ago</span>“Very safe and comfortable PG. The food is good and the owner is really helpful.”</p></article><article><b>R</b><p><strong>Riya Singh</strong><small>Stayed for 6 months</small><span>★ 4.5　4 months ago</span>“Clean rooms, good facilities and peaceful environment.”</p></article></div></section></div><aside className="property-detail-side"><section className="property-summary"><h2 id="property-modal-title">{property.name}</h2><p>⌖ {property.location}</p><strong>₹{property.price.toLocaleString()} <small>/ month</small></strong><span>Includes meals</span><div className="detail-stats"><b>⌂<small>{property.type}<br/>Independent</small></b><b>♜<small>Meals Included<br/>Homely Food</small></b><b>⌁<small>Wi-Fi<br/>High Speed</small></b><b>⌖<small>0.8 km<br/>from Metro</small></b><b>⌁<small>2.5 km<br/>from College</small></b><b>◷<small>Safe & Secure<br/>Verified Property</small></b></div></section><section className="owner-contact"><h3>Contact Owner</h3><div><b>A</b><span><strong>Priya Sharma</strong><small>● Online</small></span></div><button>☎ Call Now</button><button>▣ Message</button></section><section className="detail-location"><h3>Location <a href="#">View on Map</a></h3><div><span>⌖</span><b>{property.location}<small>Metro Station</small></b></div></section><section className="property-highlights"><h3>Property Highlights</h3><p>◉ Prime location</p><p>◉ Student-friendly environment</p><p>◉ Hygienic & home-cooked meals</p><p>◉ 24/7 security and CCTV</p><p>◉ Close to metro, college and market</p></section></aside></div><footer className="property-modal-footer"><button type="button" onClick={onClose}>↗ Share</button><button type="button" onClick={onBookVisit}>▣ Book Now</button></footer></section></div>
}

function RecommendationsPage({ onNavigate, filters }) {
  const defaultFilters = {
    location: 'Indirapuram, Ghaziabad',
    propertyType: 'PG',
    budget: '₹ 0 – ₹ 30,000',
    preferredFor: 'Anyone',
    amenities: 'Wi-Fi, AC, Attached Bath'
  }
  const [selectedFilters, setSelectedFilters] = useState({ ...defaultFilters, ...filters })
  const [showPreferences, setShowPreferences] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const propertyTypeLabel = selectedFilters.propertyType === 'Flat' ? 'Flat' : selectedFilters.propertyType === 'Room' ? 'Room' : selectedFilters.propertyType

  useEffect(() => {
    const openPreferences = (event) => {
      const trigger = event.target.closest('.preferences h2 a')
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
    modalRoot.render(<PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onBookVisit={() => { setSelectedProperty(null); onNavigate('Book a Visit') }} />)
    return () => {
      modalRoot.unmount()
      host.remove()
    }
  }, [selectedProperty, onNavigate])

  return <StudentChrome active="AI Recommendations" onNavigate={onNavigate}><section className="ai-title"><div><h1>AI Recommendations</h1><p>Get personalized property suggestions based on your preferences, budget and lifestyle.</p></div><aside>🤖 <b>Let AI do the searching for you!</b><em>“Right Homes, Brighter Tomorrows.”</em></aside></section><section className="ai-layout"><div><section className="preferences"><h2>Your Preferences <a href="#">✎ Edit Preferences</a></h2><p>We use your preferences to give better recommendations.</p><div><span>⌖<b>{selectedFilters.location}</b></span><span>⌂<b>{propertyTypeLabel}</b></span><span>₹<b>Budget<br/>{selectedFilters.budget}</b></span><span>♧<b>Preferred For<br/>{selectedFilters.preferredFor}</b></span><span>▱<b>Amenities<br/>{selectedFilters.amenities}</b></span></div></section><nav className="recommend-tabs"><button>Recommended for You</button><button>Best Value</button><button>Nearest to Metro</button><button>Top Rated</button></nav><h2 className="top-recs">Top AI Recommendations <small>Properties selected just for you based on AI analysis.</small></h2><section className="recommend-list">{[...listingNames.PGs.slice(0,2), '2 BHK Apartment'].map((name,i) => <article key={name}><div className={`recommend-photo photo-${i}`}/><div><h3>{name}</h3><p>⌖ &nbsp;{places[i]}</p><span>{propertyTypeLabel}　 {selectedFilters.preferredFor}　 With Food　 Near Metro</span><small>⌁ {selectedFilters.amenities}　♢ 24x7 Security</small></div><b>{[9.2,8.8,8.5][i]}<small>AI Match Score</small></b><strong>₹{[7000,6500,18000][i].toLocaleString()} <small>/ month</small><button onClick={() => onNavigate('Book a Visit')}>View Details</button></strong></article>)}</section></div><aside className="ai-side"><section><h2>💡 AI Insights</h2><p>🛡️ <b>Safe Neighborhoods</b><br/>These properties are in low-crime areas.</p><p>🚇 <b>Best Connectivity</b><br/>Close to metro stations and public transport.</p><p>₹ <b>Within Your Budget</b><br/>All recommended properties fit your budget.</p></section><section className="match-score"><h2>Your Preferences Match</h2><b>92%<small>Match</small></b><p>● Location　100%<br/>● Budget　90%<br/>● Amenities　85%<br/>● Safety　95%</p></section></aside></section><InfoStrip /></StudentChrome>
}

function VisitPage({ onNavigate }) {
  const [slot, setSlot] = useState('01:00 PM')
  const [confirmed, setConfirmed] = useState(false)
  return <StudentChrome active="Book a Visit" onNavigate={onNavigate}><section className="visit-heading"><h1>{confirmed ? 'Visit Confirmed!' : 'Book a Visit'}</h1><p>{confirmed ? 'Your visit request is on its way to the PG owner.' : "Schedule a visit to see the property in person. It's free, easy and helps you make a better decision."}</p></section>{confirmed ? <section className="confirmation">✓<h2>Booking request confirmed</h2><p>We have reserved your selected time. You will receive confirmation shortly.</p><button onClick={() => onNavigate('Home')}>Back to Dashboard</button></section> : <><div className="steps"><b>1 <span>Select Date & Time</span></b><b>2 <span>Your Details</span></b><b>3 <span>Confirm Booking</span></b></div><section className="visit-layout"><article className="visit-property"><div className="visit-photo"><span>✓ Verified PG</span></div><h2>Sunrise PG for Girls <i>★ 4.8 (128 reviews)</i></h2><p>⌖ Niti Khand, Indirapuram, Ghaziabad</p><h1>₹7,000 <small>/ month</small></h1><div className="visit-tags"><span>Girls Only</span><span>With Food</span><span>⌁ Wi-Fi</span><span>AC</span></div><hr/><h3>About this property</h3><p>A safe and comfortable PG for girls with modern amenities, homely food and great connectivity to metro and markets.</p><a href="#">View Full Details →</a></article><article className="visit-form"><h2>Select Date & Time</h2><p>Choose a convenient date and time to visit the property.</p><div className="calendar-slots"><section><h3>September 2025</h3><div className="week">Sun　Mon　Tue　Wed　Thu　Fri　Sat</div><div className="days">1　2　3　4　5　6<br/>7　8　9　10　11　12　13<br/>14　15　16　17　<b>18</b>　19　20<br/>21　22　23　24　25　26　27<br/>28　29　30</div></section><section><h3>Available Time Slots</h3><div className="slots">{['10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM'].map(time => <button className={slot === time ? 'active' : ''} onClick={() => setSlot(time)} key={time}>{time}</button>)}</div></section></div><hr/><h2>Your Details</h2><div className="details-inputs"><label>Full Name<input defaultValue="Aman Verma"/></label><label>Mobile Number<input defaultValue="+91 9876543210"/></label><label>Email Address<input defaultValue="amanverma@gmail.com"/></label></div><label className="message">Any Message (Optional)<textarea defaultValue="I would like to visit and know more about the food facilities and room availability."/></label></article><aside className="visit-summary"><h2>Visit Summary</h2><div><div className="summary-photo"/><h3>Sunrise PG for Girls<small>★ 4.8 (128 reviews)<br/>⌖ Niti Khand, Indirapuram<br/><b>₹7,000</b> / month</small></h3></div><p>▣　Selected Date <b>Thursday, 18 September 2025</b></p><p>◷　Selected Time <b>{slot} – 01:30 PM</b></p><p>♙　Your Name <b>Aman Verma</b></p><p>✉　Email Address <b>amanverma@gmail.com</b></p><section><h3>ⓘ Important Notes</h3><p>✓ The PG owner will confirm your visit shortly.</p><p>✓ You will receive a confirmation notification.</p><p>✓ Be on time for a better experience.</p></section><button onClick={() => setConfirmed(true)}>▣　 Confirm Booking</button><button onClick={() => onNavigate('Home')}>Cancel</button></aside></section></>}<InfoStrip /></StudentChrome>
}

function SavedPage({ onNavigate, saved, onRemove }) {
  const setSaved = (nextSaved) => {
    const removed = saved.find((item) => !nextSaved.includes(item))
    if (removed) onRemove(removed)
  }
  return <StudentChrome active="Saved Properties" onNavigate={onNavigate}><section className="saved-title"><div><h1>♥ &nbsp;Saved Properties</h1><p>All the properties you've saved for later. Compare, revisit and book when you're ready.</p></div><aside>Good Choices<br/><em>Brighter Tomorrows ♡</em></aside></section><div className="saved-tabs"><button className="active">▣ All Saved ({saved.length})</button><button>⌂ PGs (4)</button><button>▥ Flats (3)</button><button>⌁ Rooms (1)</button><button>＋ Compare Properties (0)</button></div><section className="saved-layout"><div><div className="listing-toolbar"><strong>Saved properties</strong><span><button>Sort by: Recently Saved　⌄</button><button className="active">▦ Grid</button></span></div><div className="listing-grid saved-grid">{saved.map((name, index) => <article className="listing-card" key={name}><div className={`listing-photo photo-${index % 6}`}><span>{index % 3 === 1 ? 'Flat' : index % 3 === 2 ? 'Room' : 'PG'}</span><button onClick={() => setSaved(saved.filter((item) => item !== name))}>♥</button></div><div className="listing-body"><h3>{name}</h3><p>⌖ &nbsp;{places[index % places.length]}</p><div className="listing-price">₹{[7000,18000,6500,9000,25000,6000,7500,8500][index].toLocaleString()} <small>/ month</small><i>★ 4.{index + 3} ({58 + index * 12})</i></div><div className="listing-tags"><span>With Food</span><span>Wi-Fi</span><span>AC</span></div><div className="listing-actions"><button>View Details</button><button onClick={() => onNavigate('Book a Visit')}>Book a Visit</button></div></div></article>)}</div></div><aside className="saved-side"><section><h2>🔖 Your Saved Properties</h2><b>{saved.length}</b><p>Properties saved</p></section><section><h2>⚖️ Compare & Choose Better</h2><p>Select multiple properties to compare features, prices and amenities.</p><button>Compare Properties　→</button></section><section><h2>Quick Actions</h2><p>◷　View Recently Viewed　›</p><p>✧　Get AI Recommendations　›</p><p>⚙　Update Your Preferences　›</p></section></aside></section><InfoStrip /></StudentChrome>
}

function BookingsPage({ onNavigate }) {
  const [tab, setTab] = useState('All Bookings (3)')
  const bookings = [['Sunshine PG','Active','₹7,500','01 Aug 2025 – 31 Jul 2026'],['Maple PG','Upcoming','₹6,500','Move-in: 15 Sep 2025'],['Green View PG','Completed','₹6,000','15 Jan 2025 – 30 Jun 2025']]
  return <StudentChrome active="My Bookings" onNavigate={onNavigate}><section className="booking-title"><div><h1>My Bookings</h1><p>Track your bookings, manage your stay and access all important details.</p></div><button onClick={() => onNavigate('PGs')}>⊕　Book a New PG</button></section><div className="booking-tabs">{['All Bookings (3)','Active (1)','Upcoming (1)','Past (1)','Cancelled (0)'].map(item => <button className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div><section className="bookings-layout"><div className="booking-list">{bookings.map(([name,status,price,date], index) => <article className={`booking-card ${index === 0 ? 'expanded' : ''}`} key={name}><div className={`booking-img photo-${index}`}/><span className={`booking-status ${status.toLowerCase()}`}>{status}</span><div className="booking-info"><h2>{name}</h2><p>⌖　{places[index]}</p><small>▣　{index ? 'Shared Room' : 'Single Room'}　　⌁　Wi-Fi　　♜　Meals Included　　❄　AC</small></div><div className="booking-price"><b>{price}</b> / month<p>Booking ID: #SRN{12543 + index * 201}<br/>{date}</p><button>View Details</button></div>{index === 0 && <section className="booking-details"><h3>▣　Booking Details</h3><div><p>Move-in Date<b>01 Aug 2025</b></p><p>Lease End Date<b>31 Jul 2026</b></p><p>Stay Duration<b>12 Months</b></p><p>Monthly Rent<b>₹7,500</b></p><p>Security Deposit<b className="paid">₹7,500 (Paid)</b></p><p>Payment Status<b className="paid">On Time</b></p></div><div><p>Property Address<b>Sunshine PG, C-12, Niti Khand,<br/>Indirapuram, Ghaziabad</b></p><p>Owner Details<b>Rohit Sharma<br/>+91 98765 43210<br/>rohitpg@gmail.com</b></p></div><div><p>Facilities<b>☑ Furnished Room<br/>☑ Wi-Fi<br/>☑ Meals Included<br/>☑ Air Conditioning<br/>☑ 24/7 Security</b></p></div></section>}</article>)}</div><aside className="booking-side"><section><h2>Booking Status</h2><p>●　<b>Booking Confirmed</b><small>20 Jul 2025, 10:30 AM</small></p><p>●　<b>Deposit Paid</b><small>21 Jul 2025, 02:15 PM</small></p><p>◉　<b>Move-in Date</b><small>01 Aug 2025</small></p><p>○　Stay in Progress</p><p>○　Completed</p></section><section><h2>Quick Actions</h2><p>▣　Download Agreement</p><p>▤　Payment History</p><p>⚒　Request Maintenance</p><p>⊕　Extend Stay</p><p>⊗　Cancel Booking</p></section></aside></section></StudentChrome>
}

function ProfilePage({ onNavigate }) {
  return <StudentChrome active="Profile" onNavigate={onNavigate}><section className="profile-title"><div><h1>My Profile</h1><p>Manage your account, preferences and stay information all in one place.</p></div><aside>A Better<br/><em>You in a Safer Neighborhood ♡</em></aside></section><div className="profile-tabs"><button className="active">♙ Profile</button><button>⚙ Preferences</button><button>▣ Documents</button><button>♢ Security</button><button>♧ Notifications</button></div><section className="profile-layout"><aside className="profile-card"><b>A</b><h2>Aman Verma　✎</h2><p>Student</p><p>🎓 ABES Institute of Technology</p><p>⌖ Indirapuram, Ghaziabad</p><blockquote>“Looking for a safe and comfortable place to stay while I build my future.”</blockquote><div><span><b>12</b>Properties Viewed</span><span><b>5</b>Saved</span><span><b>2</b>Visits Booked</span></div><button>Edit Profile</button><button>View Public Profile</button></aside><div className="profile-main"><DataCard title="♙　Personal Information" rows={['Full Name|Aman Verma','Email Address|amanverma@gmail.com','Mobile Number|+91 9876543210','Date of Birth|15 March 2005','Gender|Male','Current Location|Indirapuram, Ghaziabad, Uttar Pradesh','College/University|ABES Institute of Technology','Course|B.Tech (Information Technology)','Year|3rd Year']}/><DataCard title="⚙　Preferences" rows={['Looking For|PG / Flat (Both)','Preferred Location|Indirapuram, Ghaziabad','Budget Range|₹5,000 - ₹15,000','Preferred For|Boys Only','Move-in Date|October 2025','Amenities Preference|Wi-Fi, AC, Attached Bath, Food','Lifestyle Preference|Study Friendly, Quiet Environment']}/></div><aside className="profile-side"><section><h2>🛡️ Profile Verification</h2><p>Your profile is 80% complete</p><meter min="0" max="100" value="80"/><b>80%</b><div>⚖️<strong>Verify your identity</strong><small>to build trust and get better matches.</small><button>↥　Upload ID Proof</button></div></section><section><h2>Quick Actions</h2><p>✎　Edit Profile　›</p><p>✧　Manage Preferences　›</p><p>▣　Upload Documents　›</p><p>🔒　Change Password　›</p><p>♧　Notification Settings　›</p></section></aside></section><section className="profile-lower"><DataCard title="▣　Documents" rows={['College ID|● Verified','Aadhaar Card|● Verified','Other Document|⊕ Add Now']}/><DataCard title="🔒　Security" rows={['Password|********　　✎ Edit','Two-Factor Authentication|Not Enabled　　Enable','Login Devices|2 Active Devices　　Manage']}/><DataCard title="◷　Account Activity" rows={['Login from Windows|Today, 10:24 AM','Updated Preferences|18 Sep 2025','Saved a Property|17 Sep 2025','Booked a Visit|15 Sep 2025']}/></section></StudentChrome>
}

function DataCard({ title, rows }) { return <section className="data-card"><h2>{title}<a href="#">Edit</a></h2>{rows.map(row => { const [label,value] = row.split('|'); return <p key={label}><span>{label}</span><b>{value}</b></p> })}</section> }

function SettingsPage({ onNavigate, onLogout }) {
  const [dark, setDark] = useState(false)
  return <StudentChrome active="Settings" onNavigate={onNavigate}><section className="settings-hero"><div><h1>Settings</h1><p>Manage your account, preferences and privacy all in one place.</p><em>Your Comfort<br/>Our Priority ♡</em></div><aside>“　A better student life<br/>starts with the right space.</aside></section><div className="setting-tabs"><button className="active">♙　Account Settings</button><button>⚙　Preferences</button><button>♧　Notifications</button><button>♢　Privacy & Security</button><button>?　Help & Support</button></div><section className={`settings-layout ${dark ? 'dark-preview' : ''}`}><div><section className="settings-card account-form"><h2>♙　Profile Information</h2><p>Update your personal details.</p><div className="setting-inputs"><span className="settings-avatar">A</span><label>Full Name<input defaultValue="Aman Verma"/></label><label>Email Address<input defaultValue="amanverma@gmail.com"/></label><label>Phone Number<input defaultValue="+91 98765 43210"/></label><label>Date of Birth<input defaultValue="15 Mar 2005"/></label><label className="wide">About You<textarea defaultValue="B.Tech IT Student | Looking for a safe and comfortable PG near my college."/></label></div></section><section className="settings-card preferences-form"><h2>⚙　Preferences</h2><p>Customize your experience.</p><div className="preference-fields"><label>Preferred Locations<input defaultValue="Indirapuram  ×　 Vaishali  ×　 Raj Nagar ×"/></label><label>Preferred Budget Range<select defaultValue="5000"> <option value="5000">₹5,000 - ₹10,000</option></select></label><label>Room Type Preference<select><option>Single Room</option></select></label><label>Gender Preference<select><option>No Preference</option></select></label></div></section><section className="settings-card privacy-card"><h2>🛡️　Privacy & Security</h2><p>Keep your account safe.</p><div><span>🔒　<b>Two-Factor Authentication<small>Add an extra layer of security to your account.</small></b><input type="checkbox"/></span><span>▣　<b>Login Activity<small>View your recent login activity.</small></b>　›</span></div></section></div><aside className="settings-side"><section className="theme"><h2>◐　Theme Mode</h2><p>Choose the look and feel of your app.</p><div><button>☼<b>Light</b></button><button className={!dark ? 'selected' : ''} onClick={() => setDark(false)}>▣<b>Default</b></button><button className={dark ? 'selected' : ''} onClick={() => setDark(true)}>☾<b>Dark</b></button></div></section><section><h2>⚙　Quick Settings</h2><p>♙　Edit Profile　›</p><p>🔒　Change Password　›</p><p>▤　Manage Payment Methods　›</p><p>♧　Notification Preferences　›</p><p>◎　Language　›</p><p>?　Help & Support　›</p></section><button className="logout-btn" onClick={onLogout}>⇥　 Logout　›<small>Sign out from your account on this device.</small></button></aside></section></StudentChrome>
}

function InfoStrip() { return <section className="info-strip"><span>🛡️ <b>Verified Listings<small>Every property is manually verified</small></b></span><span>⌖ <b>Safe Neighborhoods<small>Check safety scores & reviews</small></b></span><span>▣ <b>Transparent Information<small>No hidden charges</small></b></span><span>▣ <b>Book Site Visits<small>Schedule visits easily</small></b></span></section> }

const ownerNav = [[<Icon name="grid" size={18}/>, 'Dashboard'], [<Icon name="building" size={18}/>, 'My Properties'], [<Icon name="sparkle" size={18}/>, 'Add Property'], [<Icon name="calendar" size={18}/>, 'Bookings & Requests'], [<Icon name="people" size={18}/>, 'Tenants'], [<Icon name="compass" size={18}/>, 'Explore'], [<Icon name="sparkle" size={18}/>, 'Analytics'], [<Icon name="people" size={18}/>, 'Profile'], [<Icon name="settings" size={18}/>, 'Settings']]
const ownerProperties = [['Sunrise PG for Girls', 'Indirapuram, Ghaziabad', 'Girls Only', '₹ 7,000 / month', '3/10'], ['Comfort Stay PG', 'Vaishali, Ghaziabad', 'Boys Only', '₹ 6,500 / month', '5/12'], ['Urban Nest PG', 'Raj Nagar, Ghaziabad', 'Boys & Girls', '₹ 8,000 / month', '2/8']]
const requests = [['A', 'Aman Singh', 'Requested visit', 'Sunrise PG for Girls', '10:30 AM', 'Pending'], ['N', 'Neha Sharma', 'Booked a room', 'Comfort Stay PG', 'Yesterday', 'Confirmed'], ['R', 'Rahul Verma', 'Requested visit', 'Urban Nest PG', '16 Sep', 'Pending'], ['S', 'Sneha Patel', 'Mess inquiry', 'Sunrise PG for Girls', '15 Sep', 'Responded']]

function OwnerDashboard({ onLogout }) {
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  return <div className="owner-dashboard">
    <aside className={`owner-sidebar ${menu ? 'show' : ''}`}><a className="brand owner-brand" href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><button className="owner-profile"><b>P</b><span>PG Owner<small>Owner Account</small></span><i>⌄</i></button><nav>{ownerNav.map(([icon, label], i) => <button key={label} className={i === 0 ? 'active' : ''} onClick={() => setMenu(false)}><b>{icon}</b>{label}</button>)}</nav><div className="grow-business"><span>🏘️</span><strong>Grow Your Business</strong><p>List more properties and reach thousands of verified tenants.</p><button>Add New Property →</button></div></aside>
    <main className="owner-main"><header className="owner-header"><button className="owner-menu" onClick={() => setMenu(!menu)}>☰</button><label className="global-search">⌕<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by property name, location or tenant..."/></label><div className="owner-tools"><span className="owner-bell">♧<i /></span><span className="help">?</span><span className="owner-avatar">P</span><button onClick={onLogout}><b>Priya Verma</b><small>PG Owner · Sign out</small></button><i>⌄</i></div></header><section className="owner-welcome"><div><h1>Welcome back, Priya!</h1><p>Manage your properties, connect with tenants, and grow your business with AI SafeRent.</p></div><div className="today"><b>▣</b><span><strong>Thursday, 18 Sep 2025</strong><small>Here's what's happening with your properties today.</small></span></div></section>
      <section className="owner-stats"><article><b>⌂</b><strong>5<small>Total Properties</small></strong><em>↑ 25%</em></article><article><b>♧</b><strong>28<small>Total Bookings</small></strong><em>↑ 12%</em></article><article><b>◉</b><strong>1,245<small>Profile Views</small></strong><em>↑ 40%</em></article><article><b>★</b><strong>4.6<small>Average Rating</small></strong><em>↑ 0.3</em></article><article className="reach-card"><div><h3>Reach More Tenants</h3><p>Get higher visibility with a verified owner badge.</p><button>Upgrade Now →</button></div><span>↗</span></article></section>
      <section className="owner-mid"><section className="owner-properties owner-panel"><div className="owner-title"><div><h2>Your Properties</h2><p>Manage and update your property listings.</p></div><a href="#">View all →</a></div>{ownerProperties.map(([name, location, forWho, price, rooms], index) => <article key={name}><div className={`owner-property-image image-${index}`}></div><div className="owner-property-info"><strong>{name}</strong><p>⌖ &nbsp;{location}</p><small>♧ &nbsp;{forWho} &nbsp;&nbsp;&nbsp; ₹ &nbsp;{price} &nbsp;&nbsp;&nbsp; ▣ &nbsp;Available: {rooms}</small></div><em>Active</em><button>View</button><button>Edit</button><button className="more">⋮</button></article>)}</section><section className="requests owner-panel"><div className="owner-title"><h2>Recent Bookings & Requests</h2><a href="#">View all →</a></div>{requests.map(([initial, name, request, place, date, status], index) => <article key={name}><b className={`request-initial i-${index}`}>{initial}</b><span><strong>{name}</strong><small>{request}<br/>{place}</small></span><time>{date}</time><em className={status.toLowerCase()}>{status}</em></article>)}</section></section>
      <section className="owner-insights"><article className="owner-panel booking-chart"><h2>Booking Overview</h2><div className="bars">{[31,32,69,39,25,35,61,51,23,42,37,69,77].map((height, i) => <i key={i} style={{height: `${height}px`}} />)}</div><div className="chart-months"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div><p><i/> Confirmed &nbsp;&nbsp; <i/> Pending</p></article><article className="owner-panel occupancy"><h2>Occupancy Rate</h2><div className="occupancy-content"><b>75%<small>30/40<br/>Beds Occupied</small></b><p><span>● Occupied <strong>30</strong></span><span>● Available <strong>10</strong></span><em>+12% from last month</em></p></div></article><article className="owner-panel earnings"><div className="owner-title"><div><h2>Earnings Overview</h2><strong>₹2,10,000</strong><p>Total Rental Earnings</p></div><button>This Month　⌄</button></div><div className="linechart">╱╱╲╱╱╱╲╱╱╲</div></article></section>
      <section className="owner-bottom"><article className="tips owner-panel"><h2>Tips to Get More Bookings</h2><div><span>▣<b>Add more photos<small>Listings with photos get 3x more views.</small></b></span><span>▣<b>Keep availability updated<small>Updated listings rank higher.</small></b></span><span>♢<b>Get verified<small>Build trust with tenants.</small></b></span><span>ϟ<b>Respond quickly<small>Faster responses lead to more bookings.</small></b></span></div></article><article className="need-help owner-panel"><b>♧</b><span><h2>Need Help?</h2><p>Our support team is here to help you with any queries.</p><button>Contact Support　→</button></span></article><article className="owner-promo">Better<br/>Tenants<br/>Happier<br/>Spaces ♡</article></section>
      <footer className="owner-footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Icon name="home" size={27}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><nav><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Help</a></nav><span>© 2026 AI SafeRent. All rights reserved.</span></footer>
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
  const [savedProperties, setSavedProperties] = useState(listingNames.PGs.slice(0, 3).concat(listingNames.Flats.slice(0, 3), listingNames.Rooms.slice(0, 2)))
  const toggleSavedProperty = (name) => setSavedProperties((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  const studentNavigate = (destination, filters) => {
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
  if (page === 'visit') return <VisitPage onNavigate={studentNavigate} />
  if (page === 'saved') return <SavedPage onNavigate={studentNavigate} saved={savedProperties} onRemove={toggleSavedProperty} />
  if (page === 'bookings') return <BookingsPage onNavigate={studentNavigate} />
  if (page === 'profile') return <ProfilePage onNavigate={studentNavigate} />
  if (page === 'settings') return <SettingsPage onNavigate={studentNavigate} onLogout={() => setPage('login')} />
  if (page === 'owner-dashboard') return <OwnerDashboard onLogout={() => setPage('login')} />
  const submitLogin = (event) => { event.preventDefault(); setPage(role === 'tenant' ? 'dashboard' : 'owner-dashboard') }
  return <>
    {loading && <Preloader />}
    <main className="page-shell">
      <div className="image-overlay" />
      <section className="brand-side">
        <a className="brand" href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a>
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
          <div className="socials"><button type="button"><b className="google">G</b>Continue with Google</button><button type="button"><b className="apple">●</b>Continue with Apple</button></div>
          <p className="signup-text">Don’t have an account? <a href="#">Sign Up</a></p>
        </form>
      </section>
      <footer><span>© 2026 AI SafeRent. All rights reserved.</span><nav><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Help</a></nav></footer>
    </main>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
