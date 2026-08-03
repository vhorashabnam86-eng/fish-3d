import React, { useState, useEffect } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [checkoutComplete, setCheckoutComplete] = useState(false)

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 ? 3.50 : 0
  const grandTotal = subtotal + deliveryFee

  const handleCheckout = () => {
    setCheckoutComplete(true)
    setTimeout(() => {
      onClearCart()
    }, 4000)
  }

  const handleClose = () => {
    setCheckoutComplete(false)
    onClose()
  }

  return (
    <div className="cart-backdrop" onClick={handleClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} />
            <h3>Your Order Basket</h3>
            <span className="cart-item-count">({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
          </div>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {!checkoutComplete ? (
          <>
            {cartItems.length === 0 ? (
              <div className="empty-cart-view">
                <div className="empty-cart-icon">🍛</div>
                <h4>Your Basket is Empty</h4>
                <p>Explore our signature 3D recipe menu and add your favorite coastal dishes!</p>
              </div>
            ) : (
              <div className="cart-body">
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="cart-qty-controls">
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary-box">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Express Hot Delivery</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>

                  <button className="checkout-btn" onClick={handleCheckout}>
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="checkout-success-view">
            <CheckCircle2 size={54} color="#8ecfb5" />
            <h3>Order Received!</h3>
            <p>Your coastal feast is being slow-cooked in our clay pots. Estimated delivery: <strong>30 minutes</strong>.</p>
            <button className="close-success-btn" onClick={handleClose}>
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
