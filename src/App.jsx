import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense, lazy } from 'react'
import Header from './components/Header'
import MenuSection from './components/MenuSection'
import ErrorBoundary from './components/ErrorBoundary'
import { Eye, ChevronRight, Utensils, Sparkles, ArrowUp } from 'lucide-react'

// Code splitting for heavy off-screen and modal components
const FishCanvas = lazy(() => import('./components/FishCanvas'))
const IngredientSpotlight = lazy(() => import('./components/IngredientSpotlight'))
const HeritageSection = lazy(() => import('./components/HeritageSection'))
const ReviewsSection = lazy(() => import('./components/ReviewsSection'))
const ReservationModal = lazy(() => import('./components/ReservationModal'))
const CartDrawer = lazy(() => import('./components/CartDrawer'))
const Footer = lazy(() => import('./components/Footer'))

// Spinning text items orbiting around the 3D model
const orbitItems = [
  { icon: '🌊', text: 'Authentic Coastal Recipe', sub: 'Traditional South-Sea' },
  { icon: '🔥', text: 'Slow-Cooked Perfection', sub: 'Simmered in Clay Pots' },
  { icon: '📜', text: '150+ Years Heritage', sub: 'Passed Down Generations' },
  { icon: '🌿', text: 'Hand-Ground Spices', sub: 'Roasted Whole Aromatics' },
  { icon: '🥥', text: 'Creamy Coconut Base', sub: 'Pressed Fresh Daily' },
  { icon: '🏆', text: 'Award-Winning Taste', sub: 'Voted #1 Coastal Dish' },
]

// Outer ring — fresh natural ingredients
const ingredientRing = [
  'Turmeric', 'Red Chili', 'Coconut', 'Tamarind', 'Mustard Seeds',
  'Fenugreek', 'Ginger', 'Garlic', 'Coriander', 'Cumin',
  'Black Pepper', 'Curry Leaves', 'Kokum', 'Fresh Fish'
]

// JS-driven orbiting ring: pauses rAF when off-screen or tab inactive
function OrbitRing({ items, radiusX, radiusY, duration, reverse = false, className }) {
  const ringRef = useRef(null)
  const animRef = useRef(null)
  const isHoveredRef = useRef(false)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    if (!ringRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
    }, { threshold: 0.05 })
    observer.observe(ringRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastTime = null
    let accumulatedTime = 0
    const dir = reverse ? -1 : 1

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      if (isVisibleRef.current && !isHoveredRef.current) {
        accumulatedTime += delta
        const ringAngle = ((accumulatedTime / (duration * 1000)) * 360 * dir) % 360

        if (ringRef.current) {
          const children = ringRef.current.children
          const count = items.length

          for (let i = 0; i < count; i++) {
            const itemAngle = (360 / count) * i
            const totalAngle = itemAngle + ringAngle
            const rad = (totalAngle * Math.PI) / 180

            const cosVal = Math.cos(rad)
            const sinVal = Math.sin(rad)

            const x = cosVal * radiusX
            const y = sinVal * radiusY

            const child = children[i]
            if (child) {
              const depthScale = 0.84 + (sinVal + 1) * 0.11
              const depthOpacity = 0.60 + (sinVal + 1) * 0.20

              child.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${depthScale})`
              child.style.opacity = depthOpacity
              child.style.zIndex = sinVal > 0 ? 20 : 5
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [items.length, radiusX, radiusY, duration, reverse])

  return (
    <div
      ref={ringRef}
      className={`orbit-ring-js ${className || ''}`}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false }}
    >
      {items.map((item, i) => (
        <div key={i} className="orbit-js-item">
          <div className="orbit-text-card">
            <span className="orbit-card-icon">{item.icon}</span>
            <div className="orbit-card-content">
              <span className="orbit-main-text">{item.text}</span>
              <span className="orbit-sub-text">{item.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Background ingredients orbit ring: pauses rAF when off-screen
function IngredientRing({ items, radiusX, radiusY, duration }) {
  const ringRef = useRef(null)
  const animRef = useRef(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    if (!ringRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
    }, { threshold: 0.05 })
    observer.observe(ringRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastTime = null
    let accumulatedTime = 0

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      if (isVisibleRef.current) {
        accumulatedTime += delta
        const ringAngle = -((accumulatedTime / (duration * 1000)) * 360) % 360

        if (ringRef.current) {
          const children = ringRef.current.children
          const count = items.length

          for (let i = 0; i < count; i++) {
            const itemAngle = (360 / count) * i
            const totalAngle = itemAngle + ringAngle
            const rad = (totalAngle * Math.PI) / 180

            const x = Math.cos(rad) * radiusX
            const y = Math.sin(rad) * radiusY

            const child = children[i]
            if (child) {
              child.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [items.length, radiusX, radiusY, duration])

  return (
    <div ref={ringRef} className="orbit-ring-js ring-ingredients">
      {items.map((name, i) => (
        <div key={i} className="orbit-js-item">
          <span className="orbit-ingredient-label">{name}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [wireframe, setWireframe] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Malabar Kingfish Curry',
      price: 18.50,
      quantity: 1,
      image: '/images/fish_curry.webp'
    }
  ])

  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    let timeoutId = null
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 150)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const showScrollTopRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400
      // Only trigger a state update when the threshold is actually crossed
      if (shouldShow !== showScrollTopRef.current) {
        showScrollTopRef.current = shouldShow
        setShowScrollTop(shouldShow)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cart Handlers
  const handleAddToCart = useCallback((dish) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === dish.id)
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
      } else {
        return [...prev, { id: dish.id, name: dish.name, price: dish.price, image: dish.image, quantity: 1 }]
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const handleUpdateQuantity = useCallback((id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id)
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item))
    }
  }, [handleRemoveItem])

  const handleClearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  const isMobile = windowWidth <= 576
  const isTablet = windowWidth > 576 && windowWidth <= 992
  const isSmallLaptop = windowWidth > 992 && windowWidth <= 1366

  const mainRing = isMobile
    ? { rx: Math.min(windowWidth * 0.40, 160), ry: 95 }
    : isTablet
    ? { rx: Math.min(windowWidth * 0.42, 320), ry: 130 }
    : isSmallLaptop
    ? { rx: Math.min(windowWidth * 0.44, 430), ry: 145 }
    : { rx: 480, ry: 155 }

  const bgRing = isMobile
    ? { rx: Math.min(windowWidth * 0.45, 180), ry: 130 }
    : isTablet
    ? { rx: Math.min(windowWidth * 0.46, 380), ry: 200 }
    : { rx: 620, ry: 250 }

  return (
    <div className="app-container">
      {/* ========== STICKY NAVIGATION HEADER ========== */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* ========== FULL-SCREEN HERO SHOWCASE ========== */}
      <section id="home" className="hero-fullscreen">
        <div className="hero-bg-gradient"></div>

        {/* TOP HERO TYPOGRAPHY */}
        <div className="hero-header-overlay">
          <h1 className="hero-title-single">
            The Art of Coastal <span>FishCurry</span>
          </h1>
        </div>

        {/* CENTER: 3D Model Stage */}
        <div className="model-stage">
          <div className="model-glow"></div>
          <div className="model-glow-ring"></div>
          <ErrorBoundary>
            <Suspense fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8e7968', fontSize: '0.9rem' }}>
                <span>Loading 3D Experience...</span>
              </div>
            }>
              <FishCanvas
                wireframe={wireframe}
                isAutoRotating={false}
              />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* SPINNING TEXT RING AROUND 3D MODEL */}
        <OrbitRing
          items={isMobile ? orbitItems.slice(0, 4) : orbitItems}
          radiusX={mainRing.rx}
          radiusY={mainRing.ry}
          duration={36}
          className="ring-main"
        />

        {/* BACKGROUND INGREDIENT SPINNER */}
        <IngredientRing
          items={isMobile ? ingredientRing.slice(0, 6) : ingredientRing}
          radiusX={bgRing.rx}
          radiusY={bgRing.ry}
          duration={50}
        />

        {/* HERO BOTTOM BAR */}
        <div className="bottom-bar">
          <div className="bottom-bar-left">
            <span className="bottom-tag">🐟 Interactive 3D Model</span>
            <span className="bottom-hint">Drag to Rotate 360°</span>
          </div>
          <div className="bottom-bar-center">
            <button className="btn-primary" onClick={() => {
              const el = document.getElementById('menu')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}>
              <Utensils size={16} />
              Explore Signature Menu
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="bottom-bar-right">
            <button
              onClick={() => setWireframe(!wireframe)}
              title="Toggle Wireframe Mode"
              aria-label="Toggle Wireframe Mode"
              className={`btn-icon ${wireframe ? 'active' : ''}`}
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ========== SIGNATURE MENU & DISHES ========== */}
      <MenuSection onAddToCart={handleAddToCart} />

      {/* ========== SECRET RECIPE & INGREDIENT SPOTLIGHT ========== */}
      <Suspense fallback={<div className="section-loader" />}>
        <IngredientSpotlight />
      </Suspense>

      {/* ========== 150-YEAR HERITAGE STORY ========== */}
      <Suspense fallback={<div className="section-loader" />}>
        <HeritageSection />
      </Suspense>

      {/* ========== CUSTOMER REVIEWS & ACCOLADES ========== */}
      <Suspense fallback={<div className="section-loader" />}>
        <ReviewsSection />
      </Suspense>

      {/* ========== SITE FOOTER & LOCATION ========== */}
      <Suspense fallback={<div className="section-loader" />}>
        <Footer />
      </Suspense>

      {/* ========== MODALS & DRAWERS ========== */}
      <Suspense fallback={null}>
        <ReservationModal
          isOpen={reservationOpen}
          onClose={() => setReservationOpen(false)}
        />
      </Suspense>

      <Suspense fallback={null}>
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </Suspense>

      {/* ========== FLOATING SCROLL TO TOP BUTTON ========== */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  )
}

