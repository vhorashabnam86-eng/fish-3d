import React from 'react'
import { Flame, Clock, Award, Shield } from 'lucide-react'

const timelineEvents = [
  {
    year: '1874',
    title: 'The Seaside Kitchen',
    desc: 'Grandmother Parvathi cooks her first claypot kingfish curry on open wood fires for local fishermen returning at dusk.'
  },
  {
    year: '1940',
    title: 'The Secret Spice Vault',
    desc: 'The family hand-documents the exact 6-spice ratio and kokum curing process, passed down through secret family journals.'
  },
  {
    year: '1995',
    title: 'Coastal Flagship Restaurant',
    desc: 'Our first oceanfront dining room opens, earning national acclaim for uncompromised slow-cooked authenticity.'
  },
  {
    year: '2026',
    title: 'Global 3D Experience',
    desc: 'Bridging 150 years of heritage with state-of-the-art interactive 3D technology to showcase our recipe to the world.'
  }
]

export default function HeritageSection() {
  return (
    <section id="story" className="heritage-section">
      <div className="section-header text-center">
        <span className="section-subtitle">Since 1874</span>
        <h2 className="section-title">150 Years of Slow-Cooked Mastery</h2>
        <p className="section-desc">
          Four generations of passion, uncompromised authentic technique, and clay pots seasoned over decades.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="heritage-pillars-grid">
        <div className="pillar-card">
          <div className="pillar-icon-wrapper">
            <Flame size={24} />
          </div>
          <h3>Traditional Clay Pots</h3>
          <p>Pottery seasoned with coconut oil for months to absorb subtle smoky flavors into every curry batch.</p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon-wrapper">
            <Clock size={24} />
          </div>
          <h3>Slow-Simmered 4 Hours</h3>
          <p>We never rush. Spices are roasted slowly on low wood embers until oils naturally bloom.</p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon-wrapper">
            <Award size={24} />
          </div>
          <h3>Zero Artificial Additives</h3>
          <p>100% natural, preservative-free, gluten-free recipe without artificial colorings or MSG.</p>
        </div>
      </div>

      {/* Timeline Journey */}
      <div className="timeline-wrapper">
        <div className="timeline-track"></div>
        <div className="timeline-items">
          {timelineEvents.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-year-badge">{item.year}</div>
              <div className="timeline-content-card">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
