import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, Check } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmail('')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand & Hours Column */}
        <div className="footer-col brand-col">
          <div className="nav-logo">
            <div className="nav-logo-icon">🍛</div>
            <div className="nav-logo-text">Fish<span>Curry</span></div>
          </div>
          <p className="footer-brand-desc">
            Authentic 150-year coastal culinary heritage slow-cooked in traditional clay pots.
          </p>

          <div className="footer-hours-box">
            <Clock size={16} className="hours-icon" />
            <div>
              <strong>Opening Hours:</strong>
              <div>Mon – Sun: 12:00 PM – 11:00 PM</div>
            </div>
          </div>
        </div>

        {/* Location & Contact Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-title">Visit Our Dining Room</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={16} />
              <span>42 Seaside Boulevard, Malabar Coastline, Beachfront 400001</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+91 (022) 4928-1874</span>
            </li>
            <li>
              <Mail size={16} />
              <span>reservations@fishcurry3d.com</span>
            </li>
          </ul>

          <div className="maps-preview-badge">
            📍 <span>Google Maps: 4.9 ★ (2,500+ Reviews)</span>
          </div>
        </div>

        {/* Newsletter & Discount Column */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-col-title">Join The Feast Club</h4>
          <p>Subscribe for exclusive seasonal recipes, secret spice drops, and <strong>10% off your first order</strong>.</p>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="newsletter-btn">
              {subscribed ? <Check size={18} /> : <Send size={18} />}
            </button>
          </form>
          {subscribed && <span className="subscribe-success">🎉 Welcome to The Feast Club! Code <strong>COASTAL10</strong> applied.</span>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FishCurry Culinary Experience. All Rights Reserved. Crafted with 3D Excellence.</p>
        <div className="social-icons">
          <a href="#" className="footer-social-link" title="Instagram"><Instagram size={16} /></a>
          <a href="#" className="footer-social-link" title="Facebook"><Facebook size={16} /></a>
          <a href="#" className="footer-social-link" title="Twitter"><Twitter size={16} /></a>
        </div>
      </div>
    </footer>
  )
}
