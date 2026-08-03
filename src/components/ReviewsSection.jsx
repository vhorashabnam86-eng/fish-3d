import React from 'react'
import { Star, Quote, Award } from 'lucide-react'

const reviewsData = [
  {
    id: 1,
    name: 'Chef Vikas Khanna',
    role: 'Michelin Star Chef & Food Critic',
    rating: 5,
    avatar: '👨‍🍳',
    quote: 'The depth of flavor in their Malabar Kingfish Curry is unmatched anywhere in India. The Kokum and fresh coconut milk harmony is sublime.'
  },
  {
    id: 2,
    name: 'Ananya Roy',
    role: 'Food & Travel Writer, Vogue',
    rating: 5,
    avatar: '👩‍💼',
    quote: 'Eating here is like stepping into a coastal fishing village 100 years ago. The clay pot aroma alone is worth traveling across the city.'
  },
  {
    id: 3,
    name: 'David Miller',
    role: 'Culinary Traveler from London',
    rating: 5,
    avatar: '✈️',
    quote: 'I tasted fish curries across Asia, but FishCurry’s 150-year secret spice blend is strictly in a league of its own. Unforgettable!'
  }
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="section-header text-center">
        <span className="section-subtitle">Foodie Accolades</span>
        <h2 className="section-title">Loved by Critics & Food Lovers</h2>
        <p className="section-desc">
          Rated 4.9/5 stars across over 2,500+ verified customer reviews and international food publications.
        </p>
      </div>

      {/* Press Badges Banner */}
      <div className="press-badges-banner">
        <div className="press-badge">
          <span className="press-score">4.9 ★</span>
          <span className="press-source">Zomato Gold</span>
        </div>
        <div className="press-badge">
          <Award size={18} className="press-icon" />
          <span className="press-source">Michelin Guide Highlight</span>
        </div>
        <div className="press-badge">
          <span className="press-score">5.0 ★</span>
          <span className="press-source">Tripadvisor Excellence 2026</span>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="reviews-grid">
        {reviewsData.map((rev) => (
          <div key={rev.id} className="review-card">
            <Quote className="quote-bg-icon" size={48} />
            <div className="review-rating">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} size={15} fill="#f4a27a" color="#f4a27a" />
              ))}
            </div>
            <p className="review-text">"{rev.quote}"</p>
            <div className="review-author">
              <div className="author-avatar">{rev.avatar}</div>
              <div className="author-info">
                <h4 className="author-name">{rev.name}</h4>
                <span className="author-role">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
