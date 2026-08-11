import React, { useState, useMemo, useCallback, useRef } from 'react'
import { Plus, Check, Star, Flame, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Dishes' },
  { id: 'curry', label: 'Signature Curries' },
  { id: 'grill', label: 'Tandoori & Grills' },
  { id: 'seafood', label: 'Seafood Specials' },
  { id: 'appetizer', label: 'Starters & Crisps' },
]

const menuItems = [
  {
    id: 1,
    name: 'Malabar Kingfish Curry',
    category: 'curry',
    price: 18.50,
    priceInr: 480,
    description: 'Slow-cooked in an artisanal clay pot with hand-ground Malabar spices, roasted coconut milk, and fresh kokum.',
    spiceLevel: 2,
    tag: 'Chef Special',
    rating: 4.9,
    prepTime: '20 mins',
    image: '/images/fish_curry.webp'
  },
  {
    id: 2,
    name: 'Tandoori Coastal Grilled Steak',
    category: 'grill',
    price: 19.95,
    priceInr: 520,
    description: 'Fresh ocean fish fillet marinated overnight in Kashmiri chili, garlic, fenugreek, and char-grilled over open woodfire.',
    spiceLevel: 3,
    tag: 'House Favorite',
    rating: 4.9,
    prepTime: '25 mins',
    image: '/images/grilled_fish.webp'
  },
  {
    id: 3,
    name: 'Royal Coconut Prawn Curry',
    category: 'seafood',
    price: 21.00,
    priceInr: 550,
    description: 'Jumbo tiger prawns simmered gently in rich creamy coconut extract, turmeric, mustard seeds, and fresh curry leaves.',
    spiceLevel: 1,
    tag: 'Must Try',
    rating: 5.0,
    prepTime: '18 mins',
    image: '/images/prawn_curry.webp'
  },
  {
    id: 4,
    name: 'Golden Rava Crispy Fish Fry',
    category: 'appetizer',
    price: 16.00,
    priceInr: 420,
    description: 'Crispy semolina crusted sea bass fillets flash fried with spicy chutney marinade, Served with fresh lime wedges.',
    spiceLevel: 2,
    tag: 'Crunchy',
    rating: 4.8,
    prepTime: '15 mins',
    image: '/images/fish_fry.webp'
  },
  {
    id: 5,
    name: 'Mangalorean Claypot Ghee Roast',
    category: 'grill',
    price: 22.00,
    priceInr: 560,
    description: 'Tender fish morsels tossed in pure organic ghee, dry roasted Byadgi chilis, tamarind paste, and aromatic curry leaves.',
    spiceLevel: 3,
    tag: 'Spicy Signature',
    rating: 4.9,
    prepTime: '22 mins',
    image: '/images/grilled_fish.webp'
  },
  {
    id: 6,
    name: 'Coastal Kokum Dum Biryani',
    category: 'seafood',
    price: 18.00,
    priceInr: 490,
    description: 'Aromatic long-grain Basmati rice layered with spiced fish cubes, saffron, fried onions, and steamed in sealed clay pots.',
    spiceLevel: 2,
    tag: 'Aromatic',
    rating: 4.9,
    prepTime: '25 mins',
    image: '/images/fish_curry.webp'
  }
]

export default function MenuSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [addedItemIds, setAddedItemIds] = useState({})
  const tabsRef = useRef(null)

  const handleScrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const filteredDishes = useMemo(() => {
    return activeCategory === 'all'
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory)
  }, [activeCategory])

  const handleAdd = useCallback((dish) => {
    onAddToCart(dish)
    setAddedItemIds(prev => ({ ...prev, [dish.id]: true }))
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [dish.id]: false }))
    }, 1500)
  }, [onAddToCart])

  return (
    <section id="menu" className="menu-section">
      <div className="section-header text-center">
        <span className="section-subtitle">A Culinary Odyssey</span>
        <h2 className="section-title">Our Signature Dishes</h2>
        <p className="section-desc">
          Crafted daily using ocean-fresh catches, traditional clay pots, and time-honored coastal spice recipes.
        </p>
      </div>

      {/* Category Tabs Wrapper with Side Scroll Arrows */}
      <div className="menu-tabs-wrapper">
        <button
          className="tabs-scroll-btn scroll-left"
          onClick={() => handleScrollTabs('left')}
          aria-label="Scroll tabs left"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="menu-tabs" ref={tabsRef}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`menu-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          className="tabs-scroll-btn scroll-right"
          onClick={() => handleScrollTabs('right')}
          aria-label="Scroll tabs right"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Dish Grid */}
      <div className="menu-grid">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <div className="dish-image-wrapper">
              <img
                src={dish.image}
                alt={dish.name}
                className="dish-img"
                loading="lazy"
                width="600"
                height="600"
                decoding="async"
              />
              <span className="dish-badge">{dish.tag}</span>
              <div className="dish-rating">
                <Star size={14} className="star-icon" />
                <span>{dish.rating}</span>
              </div>
            </div>

            <div className="dish-content">
              <div className="dish-header">
                <h3 className="dish-title">{dish.name}</h3>
                <div className="dish-price">${dish.price.toFixed(2)}</div>
              </div>

              <p className="dish-desc">{dish.description}</p>

              <div className="dish-meta">
                <div className="dish-spice" title={`Spice Level: ${dish.spiceLevel}/3`}>
                  <Flame size={14} className="flame-icon" />
                  {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                    <span key={i} className="spice-dot">🌶️</span>
                  ))}
                </div>
                <div className="dish-time">
                  <Clock size={13} />
                  <span>{dish.prepTime}</span>
                </div>
              </div>

              <button
                className={`dish-add-btn ${addedItemIds[dish.id] ? 'added' : ''}`}
                onClick={() => handleAdd(dish)}
                aria-label={`Add ${dish.name} to order`}
              >
                {addedItemIds[dish.id] ? (
                  <>
                    <Check size={16} /> Added to Cart
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add to Order
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

