import React, { useState, useEffect } from 'react'
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react'

export default function ReservationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '07:30 PM',
    seating: 'Seaside Garden Terrace',
    notes: ''
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="modal-header">
              <span className="modal-subtitle">Reserve Your Experience</span>
              <h3 className="modal-title">Book a Table</h3>
              <p className="modal-desc">Enjoy an unforgettable seaside dining experience with live 3D dish preparation.</p>
            </div>

            <div className="form-grid">
              {/* Guests Selector */}
              <div className="form-group full-width">
                <label className="form-label"><Users size={14} /> Number of Guests</label>
                <div className="guest-options">
                  {['1', '2', '4', '6', '8', '10+'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`guest-chip ${formData.guests === num ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, guests: num })}
                    >
                      {num} {num === '1' ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label"><Calendar size={14} /> Date</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              {/* Time */}
              <div className="form-group">
                <label className="form-label"><Clock size={14} /> Preferred Time</label>
                <select
                  className="form-select"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="12:30 PM">12:30 PM (Lunch)</option>
                  <option value="01:30 PM">01:30 PM (Lunch)</option>
                  <option value="07:00 PM">07:00 PM (Dinner)</option>
                  <option value="07:30 PM">07:30 PM (Dinner)</option>
                  <option value="08:30 PM">08:30 PM (Dinner)</option>
                  <option value="09:15 PM">09:15 PM (Late Dinner)</option>
                </select>
              </div>

              {/* Seating Preference */}
              <div className="form-group full-width">
                <label className="form-label">Seating Atmosphere</label>
                <div className="seating-options">
                  {['Seaside Garden Terrace', 'Main Dining Room', 'Chef Private Table'].map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      className={`seating-chip ${formData.seating === seat ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, seating: seat })}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shabnam Vohra"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="form-input"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="submit-reservation-btn">
              <Sparkles size={18} /> Confirm Table Reservation
            </button>
          </form>
        ) : (
          <div className="reservation-success-view">
            <div className="success-icon">
              <CheckCircle2 size={48} color="#8ecfb5" />
            </div>
            <h3>Reservation Confirmed!</h3>
            <p>Thank you, <strong>{formData.name}</strong>. Your table for <strong>{formData.guests} guests</strong> has been reserved for <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.</p>
            <div className="booking-ref-box">
              <span>Booking Reference ID:</span>
              <strong>#FC-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
            </div>
            <button onClick={handleReset} className="close-success-btn">
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
