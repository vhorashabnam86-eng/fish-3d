import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Silent catch in production
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div style={{
          padding: '30px',
          textAlign: 'center',
          background: 'rgba(255, 245, 240, 0.8)',
          borderRadius: '16px',
          margin: '20px auto',
          maxWidth: '500px',
          border: '1px solid rgba(232, 131, 106, 0.2)'
        }}>
          <h3 style={{ color: '#e8836a', marginBottom: '10px' }}>
            {this.props.title || 'Interactive Preview Unavailable'}
          </h3>
          <p style={{ color: '#6b5e54', fontSize: '0.95rem' }}>
            {this.props.message || 'The interactive 3D model could not be displayed on your current graphics hardware.'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
