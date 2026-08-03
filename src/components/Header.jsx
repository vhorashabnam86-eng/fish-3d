import React, { useState, useEffect } from 'react'
import { Utensils, ShoppingBag, Menu, X, Calendar } from 'lucide-react'

export default function Header({ cartCount, onOpenCart, onOpenReservation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="navbar">
      <div className="nav-logo" onClick={() => handleNavClick('home')}>
        <div className="nav-logo-icon">🍛</div>
        <div className="nav-logo-text">
          Fish<span>Curry</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="nav-links">
        <li><button onClick={() => handleNavClick('home')} className="nav-link-btn">Home</button></li>
        <li><button onClick={() => handleNavClick('menu')} className="nav-link-btn">Menu & Dishes</button></li>
        <li><button onClick={() => handleNavClick('recipe')} className="nav-link-btn">Secret Recipe</button></li>
        <li><button onClick={() => handleNavClick('story')} className="nav-link-btn">Our Heritage</button></li>
        <li><button onClick={() => handleNavClick('reviews')} className="nav-link-btn">Reviews</button></li>
      </ul>

      {/* Header Actions */}
      <div className="nav-actions">
        <button
          className="nav-btn-icon cart-btn"
          onClick={onOpenCart}
          title="View Shopping Cart"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
        </button>

        <button
          className="nav-btn-reservation"
          onClick={onOpenReservation}
        >
          <Calendar size={16} />
          <span>Book Table</span>
        </button>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="nav-logo">
                <div className="nav-logo-icon">🍛</div>
                <div className="nav-logo-text">Fish<span>Curry</span></div>
              </div>
              <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <ul className="mobile-nav-links">
              <li><button onClick={() => handleNavClick('home')}>Home Experience</button></li>
              <li><button onClick={() => handleNavClick('menu')}>Signature Menu</button></li>
              <li><button onClick={() => handleNavClick('recipe')}>Secret Spices</button></li>
              <li><button onClick={() => handleNavClick('story')}>150-Yr Story</button></li>
              <li><button onClick={() => handleNavClick('reviews')}>Customer Reviews</button></li>
            </ul>

            <div className="mobile-drawer-actions">
              <button
                className="mobile-nav-cta"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenReservation()
                }}
              >
                <Calendar size={18} /> Book a Table
              </button>
              <button
                className="mobile-nav-cart-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenCart()
                }}
              >
                <ShoppingBag size={18} /> View Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
