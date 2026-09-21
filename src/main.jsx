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
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>
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

const navItems = [['⌂', 'Home'], ['▦', 'PGs'], ['▥', 'Flats'], ['⌁', 'Rooms'], ['♧', 'Findmates'], ['⌖', 'Explore'], ['✧', 'AI Recommendations'], ['▣', 'Book a Visit'], ['♧', 'Saved Properties'], ['▧', 'My Bookings'], ['♙', 'Profile'], ['⚙', 'Settings']]
const categories = [['👩', 'PG for Girls'], ['👨', 'PG for Boys'], ['▥', 'Flats'], ['▱', '1 RK / Studio'], ['♧', 'Rooms'], ['♧', 'Findmates']]
const properties = [
  ['The Blossom House', 'Indirapuram, Ghaziabad', '₹7,500', 'PG for Girls'],
  ['Urban Nest 2BHK', 'Vaishali, Ghaziabad', '₹18,000', '2BHK Flat'],
  ['Cozy Private Room', 'Raj Nagar, Ghaziabad', '₹5,000', 'Private Room'],
]

function StudentDashboard({ onLogout }) {
  const [menu, setMenu] = useState(false)
  const [liked, setLiked] = useState([])
  const [search, setSearch] = useState('')
  const toggleLike = (name) => setLiked((list) => list.includes(name) ? list.filter((item) => item !== name) : [...list, name])
  return <div className="dashboard">
    <header className="dash-header"><button className="hamburger" onClick={() => setMenu(!menu)}>☰</button><a className="brand dash-brand" href="#"><span className="brand-mark"><Icon name="home" size={31}/></span><span><strong>AI Safe<span>Rent</span></strong><small>Find Safe Homes. Live Better.</small></span></a><div className="dash-account"><button className="notification">♧<i /></button><span className="avatar">A</span><button className="account-copy" onClick={onLogout}>Hi, Alok<small>Student/Tenant · Sign out</small></button><span>⌄</span></div></header>
    <aside className={`sidebar ${menu ? 'show' : ''}`}><nav>{navItems.map(([icon, name], index) => <button key={name} className={index === 0 ? 'active' : ''} onClick={() => setMenu(false)}><b>{icon}</b>{name}</button>)}</nav><div className="list-property"><span>🏢</span><strong>List Your Property<small>Reach thousands of verified tenants</small></strong><button>List Now →</button></div></aside>
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

const ownerNav = [['▦', 'Dashboard'], ['▥', 'My Properties'], ['⊞', 'Add Property'], ['▣', 'Bookings & Requests'], ['♧', 'Tenants'], ['⌖', 'Explore'], ['⌁', 'Analytics'], ['♙', 'Profile'], ['⚙', 'Settings']]
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
  if (page === 'dashboard') return <StudentDashboard onLogout={() => setPage('login')} />
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
