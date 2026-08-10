import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import CutFish from './CutFish'

// Soft warm floating light particles
function WarmMotes({ count = 25 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i)
      y += 0.0015
      if (y > 4) y = -4
      posAttr.setY(i, y)

      let x = posAttr.getX(i)
      x += Math.sin(time * 0.1 + i * 0.7) * 0.001
      posAttr.setX(i, x)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#e8a87c"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Gentle orbiting warm spotlight (lightweight fill)
function SoftSpotlight() {
  const lightRef = useRef()

  useFrame((state) => {
    if (!lightRef.current) return
    const t = state.clock.getElapsedTime()
    lightRef.current.position.x = Math.sin(t * 0.15) * 5
    lightRef.current.position.z = Math.cos(t * 0.15) * 5
  })

  return (
    <spotLight
      ref={lightRef}
      position={[5, 5, 5]}
      intensity={1.5}
      color="#ffecd2"
      angle={0.5}
      penumbra={0.9}
    />
  )
}

export default function FishCanvas({ wireframe, isAutoRotating, style }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200)

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

  // Pause WebGL frame loop when canvas section is scrolled off-screen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Guarantee mouse wheel scrolling and mobile vertical touch scrolling work 100% over 3D Canvas
  useEffect(() => {
    const canvasEl = containerRef.current?.querySelector('canvas')
    if (!canvasEl) return

    canvasEl.style.touchAction = 'pan-y'

    // 1. Stop OrbitControls from hijacking mouse wheel / trackpad page scrolling
    const handleWheelCapture = (e) => {
      e.stopImmediatePropagation()
    }

    // 2. Mobile touch gesture detection:
    // Vertical swipe -> stop OrbitControls from calling preventDefault(), allowing native page scroll.
    // Horizontal swipe -> pass to OrbitControls for 3D model rotation.
    let touchStartX = 0
    let touchStartY = 0
    let touchDirection = null

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      touchDirection = null
    }

    const handleTouchMoveCapture = (e) => {
      if (e.touches.length !== 1) return
      const dx = Math.abs(e.touches[0].clientX - touchStartX)
      const dy = Math.abs(e.touches[0].clientY - touchStartY)

      if (!touchDirection && (dx > 4 || dy > 4)) {
        touchDirection = dy > dx ? 'vertical' : 'horizontal'
      }

      if (touchDirection === 'vertical') {
        e.stopImmediatePropagation()
      }
    }

    canvasEl.addEventListener('wheel', handleWheelCapture, { capture: true, passive: true })
    canvasEl.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true })
    canvasEl.addEventListener('touchmove', handleTouchMoveCapture, { capture: true, passive: true })

    return () => {
      canvasEl.removeEventListener('wheel', handleWheelCapture, { capture: true })
      canvasEl.removeEventListener('touchstart', handleTouchStart, { capture: true })
      canvasEl.removeEventListener('touchmove', handleTouchMoveCapture, { capture: true })
    }
  }, [])

  const isMobile = windowWidth <= 576
  const isTablet = windowWidth > 576 && windowWidth <= 992
  const modelScale = isMobile ? 0.50 : isTablet ? 0.58 : 0.68
  const bgColor = '#f0e8df'

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        touchAction: 'pan-y',
        cursor: 'grab',
        ...style
      }}
    >
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
        shadows
        style={{ touchAction: 'pan-y' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={isMobile ? [0, 0, 6.2] : [0, 0, 5.0]}
          fov={isMobile ? 40 : 34}
        />

        <fog attach="fog" args={[bgColor, 12, 28]} />

        {/* --- Optimized Natural Warm Lighting Rig --- */}
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.2}
          color="#fff5eb"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
        />
        <directionalLight
          position={[-4, 3, 2]}
          intensity={1.1}
          color="#ffe8d6"
        />
        <pointLight position={[0, 2, -5]} intensity={2} color="#f4a27a" />
        <pointLight position={[0, -3, 0]} intensity={0.5} color="#ffecd2" />
        <ambientLight intensity={0.65} color="#fff8f0" />
        <SoftSpotlight />

        <WarmMotes count={25} />

        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={0.28}
          scale={10}
          blur={3}
          far={4}
          color="#c4a882"
        />

        <CutFish
          wireframe={wireframe}
          isAutoRotating={isAutoRotating}
          scale={modelScale}
        />

        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 5}
          rotateSpeed={0.6}
          dampingFactor={0.08}
          enableDamping={true}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        />
      </Canvas>
    </div>
  )
}

