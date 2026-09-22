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

const navItems = [[<Icon name="home" size={18}/>, 'Home'], [<Icon name="grid" size={18}/>, 'PGs'], [<Icon name="building" size={18}/>, 'Flats'], [<Icon name="room" size={18}/>, 'Rooms'], [<Icon name="people" size={18}/>, 'Findmates'], [<Icon name="compass" size={18}/>, 'Explore'], [<Icon name="sparkle" size={18}/>, 'AI Recommendations'], [<Icon name="calendar" size={18}/>, 'Book a Visit'], [<Icon name="heart" size={18}/>, 'Saved Properties'], [<Icon name="calendar" size={18}/>, 'My Bookings'], [<Icon name="people" size={18}/>, 'Profile'], [<Icon name="settings" size={18}/>, 'Settings']]
const categories = [[<Icon name="people" size={22}/>, 'PG for Girls'], [<Icon name="people" size={22}/>, 'PG for Boys'], [<Icon name="building" size={22}/>, 'Flats'], [<Icon name="room" size={22}/>, '1 RK / Studio'], [<Icon name="room" size={22}/>, 'Rooms'], [<Icon name="people" size={22}/>, 'Findmates']]
const properties = [
  ['The Blossom House', 'Indirapuram, Ghaziabad', '₹7,500', 'PG for Girls'],
  ['Urban Nest 2BHK', 'Vaishali, Ghaziabad', '₹18,000', '2BHK Flat'],
  ['Cozy Private Room', 'Raj Nagar, Ghaziabad', '₹5,000', 'Private Room'],
]

function StudentDashboard({ onLogout, onNavigate }) {
  const [menu, setMenu] = useState(false)
  const [liked, setLiked] = useState([])
  const [search, setSearch] = useState('')
  const toggleLike = (name) => setLiked((list) => list.includes(name) ? list.filter((item) => item !== name) : [...list, name])
  return <div className="dashboard">
    <header className="dash-header"><button className="hamburger" onClick={() => setMenu(!menu)}>☰</button><a className="brand dash-brand" href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><div className="dash-account"><button className="notification">♧<i /></button><span className="avatar">A</span><button className="account-copy" onClick={onLogout}>Hi, Alok<small>Student/Tenant · Sign out</small></button><span>⌄</span></div></header>
    <aside className={`sidebar ${menu ? 'show' : ''}`}><nav>{navItems.map(([icon, name], index) => <button key={name} className={index === 0 ? 'active' : ''} onClick={() => { setMenu(false); if (index) onNavigate(name) }}><b>{icon}</b>{name}</button>)}</nav><div className="list-property"><span>🏢</span><strong>List Your Property<small>Reach thousands of verified tenants</small></strong><button>List Now →</button></div></aside>
    <main className="dash-main">
      <section className="dash-hero"><div className="dash-hero-copy"><span className="eyebrow">Verified Spaces. Happy Places.</span><h1>Safest places.<br/>Better spaces.<em>Yours to call home.</em></h1><p>PGs, Flats & Rooms for Students<br/>and Working Professionals.</p><div className="trust-row"><span>♢ Safe</span><span>✓ Verified</span><span>⌂ Affordable</span><span>⚙ Trusted</span></div></div><div className="dna"><small>Neighborhood<br/>DNA Score</small><strong>9.2</strong><span>Excellent</span><a href="#score">See details →</a></div></section>
      <section className="search-panel"><div className="search-tabs"><button className="chosen">▦ PG</button><button>▥ Flat</button><button>▱ Room</button></div><div className="search-inputs"><label>Where do you want to live?<b>⌖</b><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter locality / city"/></label><label>Budget<input readOnly value="₹ 0 – ₹ 30,000"/></label><label>Preferred for<input readOnly value="Anyone"/></label><button className="search-button" aria-label="Search">⌕</button></div></section>
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
  return <div className="student-pages"><header className="student-header"><button className="hamburger" onClick={() => setMenu(!menu)}>☰</button><a className="brand dash-brand" onClick={() => onNavigate('Home')} href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><label className="student-search">⌕<input placeholder="Search by location, property name or landmark..."/></label><div className="student-user"><span>♧</span><b>A</b><i>Aman Verma<small>Student</small></i><em>⌄</em></div></header><aside className={`sidebar student-side ${menu ? 'show' : ''}`}><nav>{navItems.map(([icon, name]) => <button key={name} className={name === active ? 'active' : ''} onClick={() => {setMenu(false); onNavigate(name)}}><b>{icon}</b>{name}</button>)}</nav></aside><main className="student-content">{children}</main></div>
}

function ListingCard({ name, type, index, onVisit }) {
  const price = type === 'Flats' ? [18000,12000,25000,14500,28000,20000,16500,22000,19500,11000,24000,30000][index] : type === 'Rooms' ? [9000,7500,8500,11000,12000,6000,13500,5500,7000,10000,9500,8000][index] : [7000,6500,8000,5500,9000,7500,8500,6800,7200,6200,7800,8800][index]
  return <article className="listing-card"><div className={`listing-photo photo-${index % 6}`}><span>{index % 3 === 0 ? 'Verified' : index % 3 === 1 ? 'Popular' : 'Near Metro'}</span><button>♡</button></div><div className="listing-body"><h3>{name}</h3><p>⌖ &nbsp;{places[index % places.length]}</p><div className="listing-price">₹{price.toLocaleString()} <small>/ month</small><i>★ 4.{(index + 4) % 10} ({72 + index * 7})</i></div><div className="listing-tags"><span>{type === 'PGs' ? 'With Food' : 'Furnished'}</span><span>Wi-Fi</span><span>{index % 2 ? 'AC' : 'Attached Bath'}</span></div><div className="listing-actions"><button>View Details</button><button onClick={onVisit}>Book a Visit</button></div></div></article>
}

function ListingsPage({ type, onNavigate }) {
  return <StudentChrome active={type} onNavigate={onNavigate}><section className="browse-heading"><div><h1>{type} in Indirapuram</h1><p>Explore verified {type.toLowerCase()} for rent with real photos, genuine listings and neighborhood insights.</p></div><aside>Safe. Affordable. Verified.<br/><em>A better space for a brighter you ♡</em></aside></section><div className="browse-tabs"><button className="active">All {type}</button>{type === 'PGs' ? <><button>Girls PG</button><button>Boys PG</button><button>Co-Living</button><button>With Food</button></> : type === 'Flats' ? <><button>1 BHK</button><button>2 BHK</button><button>3 BHK</button><button>4 BHK+</button></> : <><button>Private Room</button><button>Shared Room</button><button>With AC</button><button>Near Metro</button></>}<button>☷ More Filters</button></div><section className="listing-layout"><div><div className="listing-toolbar"><strong>Showing 12 {type} in Indirapuram</strong><span><button>Sort by: Relevance　⌄</button><button className="active">▦ Grid</button></span></div><div className="listing-grid">{listingNames[type].map((name, index) => <ListingCard key={name} name={name} type={type} index={index} onVisit={() => onNavigate('Book a Visit')}/>)}</div></div><aside className="refine"><h2>Explore {type} Around You</h2><div className="fake-map"><b>⌂</b><b>⌖</b><b>⌂</b><b>⌖</b><span>Indirapuram<br/><small>High Safety Score</small></span></div><h2>Refine Your Search <a href="#">Reset</a></h2><label>Budget Range<strong>₹0 – ₹50,000</strong><input type="range"/></label><h4>{type === 'PGs' ? 'Preferred For' : type === 'Flats' ? 'BHK Type' : 'Room Type'}</h4><div className="checks"><label><input type="checkbox" defaultChecked/> Girls</label><label><input type="checkbox"/> Boys</label><label><input type="checkbox"/> Any</label></div><h4>Amenities</h4><div className="checks"><label><input type="checkbox" defaultChecked/> AC</label><label><input type="checkbox"/> Wi-Fi</label><label><input type="checkbox"/> Parking</label><label><input type="checkbox"/> Security</label></div><button className="apply-filter">☷ &nbsp; Apply Filters</button></aside></section><InfoStrip /></StudentChrome>
}

function ExplorePage({ onNavigate }) {
  const [selected, setSelected] = useState('All')
  return <StudentChrome active="Explore" onNavigate={onNavigate}><section className="explore-heading"><div><h1>Explore Indirapuram</h1><p>Discover PGs, flats and rooms around you with an interactive map.</p></div><aside>Explore<br/><em>Safe Neighborhoods<br/>Brighter Opportunities ♡</em></aside></section><div className="explore-filters"><button className={selected === 'All' ? 'active' : ''} onClick={() => setSelected('All')}>▦ All</button>{['PGs','Flats','Rooms'].map(type => <button key={type} className={selected === type ? 'active' : ''} onClick={() => { setSelected(type); onNavigate(type)}}>{type === 'PGs' ? '⌂' : type === 'Flats' ? '▥' : '⌁'} {type}</button>)}<label>Price Range <b>Any　⌄</b></label><label>Property Type <b>Any　⌄</b></label><button>☷ More Filters</button></div><section className="explore-layout"><div className="large-map"><input placeholder="⌕  Search this area"/><b className="map-center">⌂<small>Indirapuram<br/>High Safety Score</small></b><i className="map-marker a">⌂</i><i className="map-marker b">⌖</i><i className="map-marker c">⌂</i><i className="map-marker d">⌖</i><div className="map-view">Map View<br/><button>▦ Default</button><button>Satellite</button></div></div><aside className="explore-results"><h2>124 properties found <button>Sort by: Relevance　⌄</button></h2>{listingNames.PGs.slice(0,5).map((name, i) => <article key={name}><div className={`tiny-photo photo-${i}`}/><span><strong>{i === 1 ? '2 BHK Apartment' : name}</strong><small>⌖ &nbsp;{places[i]}<br/>★ 4.{i + 4} ({76 + i * 12})<br/><b>₹{[7000,18000,6500,25000,9000][i].toLocaleString()} </b>/ month</small></span><button onClick={() => onNavigate('Book a Visit')}>View Details</button></article>)}</aside></section><InfoStrip /></StudentChrome>
}

function RecommendationsPage({ onNavigate }) {
  return <StudentChrome active="AI Recommendations" onNavigate={onNavigate}><section className="ai-title"><div><h1>AI Recommendations</h1><p>Get personalized property suggestions based on your preferences, budget and lifestyle.</p></div><aside>🤖 <b>Let AI do the searching for you!</b><em>“Right Homes, Brighter Tomorrows.”</em></aside></section><section className="ai-layout"><div><section className="preferences"><h2>Your Preferences <a href="#">✎ Edit Preferences</a></h2><p>We use your preferences to give better recommendations.</p><div><span>⌖<b>Indirapuram,<br/>Ghaziabad</b></span><span>⌂<b>PG / Flat<br/>(Both)</b></span><span>₹<b>Budget<br/>₹5,000 – ₹15,000</b></span><span>♧<b>Preferred For<br/>Girls</b></span><span>▱<b>Amenities<br/>Wi-Fi, AC, Attached Bath</b></span></div></section><nav className="recommend-tabs"><button>Recommended for You</button><button>Best Value</button><button>Nearest to Metro</button><button>Top Rated</button></nav><h2 className="top-recs">Top AI Recommendations <small>Properties selected just for you based on AI analysis.</small></h2><section className="recommend-list">{[...listingNames.PGs.slice(0,2), '2 BHK Apartment'].map((name,i) => <article key={name}><div className={`recommend-photo photo-${i}`}/><div><h3>{name}</h3><p>⌖ &nbsp;{places[i]}</p><span>PG　 Girls Only　 With Food　 Near Metro</span><small>⌁ Wi-Fi　▣ AC　♧ Attached Bath　♢ 24x7 Security</small></div><b>{[9.2,8.8,8.5][i]}<small>AI Match Score</small></b><strong>₹{[7000,6500,18000][i].toLocaleString()} <small>/ month</small><button onClick={() => onNavigate('Book a Visit')}>View Details</button></strong></article>)}</section></div><aside className="ai-side"><section><h2>💡 AI Insights</h2><p>🛡️ <b>Safe Neighborhoods</b><br/>These properties are in low-crime areas.</p><p>🚇 <b>Best Connectivity</b><br/>Close to metro stations and public transport.</p><p>₹ <b>Within Your Budget</b><br/>All recommended properties fit your budget.</p></section><section className="match-score"><h2>Your Preferences Match</h2><b>92%<small>Match</small></b><p>● Location　100%<br/>● Budget　90%<br/>● Amenities　85%<br/>● Safety　95%</p></section></aside></section><InfoStrip /></StudentChrome>
}

function VisitPage({ onNavigate }) {
  const [slot, setSlot] = useState('01:00 PM')
  const [confirmed, setConfirmed] = useState(false)
  return <StudentChrome active="Book a Visit" onNavigate={onNavigate}><section className="visit-heading"><h1>{confirmed ? 'Visit Confirmed!' : 'Book a Visit'}</h1><p>{confirmed ? 'Your visit request is on its way to the PG owner.' : "Schedule a visit to see the property in person. It's free, easy and helps you make a better decision."}</p></section>{confirmed ? <section className="confirmation">✓<h2>Booking request confirmed</h2><p>We have reserved your selected time. You will receive confirmation shortly.</p><button onClick={() => onNavigate('Home')}>Back to Dashboard</button></section> : <><div className="steps"><b>1 <span>Select Date & Time</span></b><b>2 <span>Your Details</span></b><b>3 <span>Confirm Booking</span></b></div><section className="visit-layout"><article className="visit-property"><div className="visit-photo"><span>✓ Verified PG</span></div><h2>Sunrise PG for Girls <i>★ 4.8 (128 reviews)</i></h2><p>⌖ Niti Khand, Indirapuram, Ghaziabad</p><h1>₹7,000 <small>/ month</small></h1><div className="visit-tags"><span>Girls Only</span><span>With Food</span><span>⌁ Wi-Fi</span><span>AC</span></div><hr/><h3>About this property</h3><p>A safe and comfortable PG for girls with modern amenities, homely food and great connectivity to metro and markets.</p><a href="#">View Full Details →</a></article><article className="visit-form"><h2>Select Date & Time</h2><p>Choose a convenient date and time to visit the property.</p><div className="calendar-slots"><section><h3>September 2025</h3><div className="week">Sun　Mon　Tue　Wed　Thu　Fri　Sat</div><div className="days">1　2　3　4　5　6<br/>7　8　9　10　11　12　13<br/>14　15　16　17　<b>18</b>　19　20<br/>21　22　23　24　25　26　27<br/>28　29　30</div></section><section><h3>Available Time Slots</h3><div className="slots">{['10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM'].map(time => <button className={slot === time ? 'active' : ''} onClick={() => setSlot(time)} key={time}>{time}</button>)}</div></section></div><hr/><h2>Your Details</h2><div className="details-inputs"><label>Full Name<input defaultValue="Aman Verma"/></label><label>Mobile Number<input defaultValue="+91 9876543210"/></label><label>Email Address<input defaultValue="amanverma@gmail.com"/></label></div><label className="message">Any Message (Optional)<textarea defaultValue="I would like to visit and know more about the food facilities and room availability."/></label></article><aside className="visit-summary"><h2>Visit Summary</h2><div><div className="summary-photo"/><h3>Sunrise PG for Girls<small>★ 4.8 (128 reviews)<br/>⌖ Niti Khand, Indirapuram<br/><b>₹7,000</b> / month</small></h3></div><p>▣　Selected Date <b>Thursday, 18 September 2025</b></p><p>◷　Selected Time <b>{slot} – 01:30 PM</b></p><p>♙　Your Name <b>Aman Verma</b></p><p>✉　Email Address <b>amanverma@gmail.com</b></p><section><h3>ⓘ Important Notes</h3><p>✓ The PG owner will confirm your visit shortly.</p><p>✓ You will receive a confirmation notification.</p><p>✓ Be on time for a better experience.</p></section><button onClick={() => setConfirmed(true)}>▣　 Confirm Booking</button><button onClick={() => onNavigate('Home')}>Cancel</button></aside></section></>}<InfoStrip /></StudentChrome>
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
  const studentNavigate = (destination) => {
    const routes = { Home: 'dashboard', PGs: 'pgs', Flats: 'flats', Rooms: 'rooms', Explore: 'explore', 'AI Recommendations': 'recommendations', 'Book a Visit': 'visit' }
    setPage(routes[destination] || 'dashboard')
  }
  if (page === 'dashboard') return <StudentDashboard onLogout={() => setPage('login')} onNavigate={studentNavigate} />
  if (page === 'pgs') return <ListingsPage type="PGs" onNavigate={studentNavigate} />
  if (page === 'flats') return <ListingsPage type="Flats" onNavigate={studentNavigate} />
  if (page === 'rooms') return <ListingsPage type="Rooms" onNavigate={studentNavigate} />
  if (page === 'explore') return <ExplorePage onNavigate={studentNavigate} />
  if (page === 'recommendations') return <RecommendationsPage onNavigate={studentNavigate} />
  if (page === 'visit') return <VisitPage onNavigate={studentNavigate} />
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
        <div className="top-nav"><span>New here?</span><button>Sign Up</button></div>
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
