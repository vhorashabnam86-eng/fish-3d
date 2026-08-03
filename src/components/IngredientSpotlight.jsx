import React, { useState } from 'react'
import { Sparkles, ShieldCheck, Heart, Info } from 'lucide-react'

const ingredientsList = [
  {
    id: 'kokum',
    name: 'Wild Malabar Kokum',
    icon: '🍇',
    origin: 'Western Ghats Forests',
    flavorProfile: 'Tangy, Fruity & Deeply Refreshing',
    healthBenefit: 'Natural digestive aid & rich in Garcinol antioxidants',
    desc: 'Sun-dried wild kokum rinds impart the signature lip-smacking tang that defines authentic coastal fish curry.'
  },
  {
    id: 'coconut',
    name: 'First-Press Coconut Milk',
    icon: '🥥',
    origin: 'Coastal Palm Groves',
    flavorProfile: 'Velvety, Creamy & Naturally Sweet',
    healthBenefit: 'Healthy medium-chain fatty acids (MCTs)',
    desc: 'Extracted fresh every morning from hand-grated mature coconuts to create our lush, velvety golden gravy base.'
  },
  {
    id: 'turmeric',
    name: 'Single-Origin Turmeric',
    icon: '✨',
    origin: 'Organic Hills of Alleppey',
    flavorProfile: 'Earthy, Pungent & Warm',
    healthBenefit: 'Potent natural anti-inflammatory & Curcumin boost',
    desc: 'Stone-ground whole turmeric roots bring vibrant natural golden hue and anti-inflammatory richness.'
  },
  {
    id: 'chili',
    name: 'Smoked Byadgi Red Chili',
    icon: '🌶️',
    origin: 'Karnataka Spice Valleys',
    flavorProfile: 'Deep Crimson, Mildly Spicy & Smoky',
    healthBenefit: 'Rich in Vitamin C & Metabolism stimulation',
    desc: 'Famous for its stunning deep crimson color and complex mild heat without overwhelming delicate fish flavor.'
  },
  {
    id: 'curryleaves',
    name: 'Fresh Garden Curry Leaves',
    icon: '🌿',
    origin: 'In-House Organic Garden',
    flavorProfile: 'Aromatic, Herbal & Citrusy',
    healthBenefit: 'Supports eye health & blood sugar regulation',
    desc: 'Hand-picked just minutes before tempering in hot coconut oil to release their soulful citrusy aroma.'
  },
  {
    id: 'kingfish',
    name: 'Fresh Ocean Kingfish',
    icon: '🐟',
    origin: 'Daily Morning Coastal Catch',
    flavorProfile: 'Firm, Flaky & Naturally Rich',
    healthBenefit: 'High Protein & Omega-3 Essential Fatty Acids',
    desc: 'Strictly wild-caught by local artisanal fishermen every dawn — never frozen, never stored.'
  }
]

export default function IngredientSpotlight() {
  const [selectedId, setSelectedId] = useState('kokum')

  const activeIngredient = ingredientsList.find(ing => ing.id === selectedId) || ingredientsList[0]

  return (
    <section id="recipe" className="recipe-section">
      <div className="section-header text-center">
        <span className="section-subtitle">Inside The Pot</span>
        <h2 className="section-title">The Alchemy of 6 Sacred Spices</h2>
        <p className="section-desc">
          No artificial flavors or pre-made powders. Every ingredient is sourced directly from heritage coastal farms.
        </p>
      </div>

      <div className="recipe-container">
        {/* Left: Ingredient Selector Pills */}
        <div className="ingredient-selector-grid">
          {ingredientsList.map((ing) => (
            <button
              key={ing.id}
              className={`ingredient-pill ${selectedId === ing.id ? 'active' : ''}`}
              onClick={() => setSelectedId(ing.id)}
            >
              <span className="pill-icon">{ing.icon}</span>
              <span className="pill-name">{ing.name}</span>
            </button>
          ))}
        </div>

        {/* Right: Active Ingredient Card Spotlight */}
        <div className="ingredient-detail-card">
          <div className="card-top-icon">{activeIngredient.icon}</div>
          <div className="card-badge">
            <Sparkles size={14} /> Sourced From {activeIngredient.origin}
          </div>

          <h3 className="detail-title">{activeIngredient.name}</h3>
          <p className="detail-desc">{activeIngredient.desc}</p>

          <div className="detail-meta-grid">
            <div className="detail-meta-item">
              <div className="meta-label">
                <Info size={14} /> Flavor Profile
              </div>
              <div className="meta-value">{activeIngredient.flavorProfile}</div>
            </div>

            <div className="detail-meta-item">
              <div className="meta-label">
                <Heart size={14} /> Wellness Benefit
              </div>
              <div className="meta-value">{activeIngredient.healthBenefit}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
