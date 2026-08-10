import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CutFish({ wireframe = false, isAutoRotating = false, scale = 0.85 }) {
  const groupRef = useRef()
  const pivotRef = useRef()
  const { scene } = useGLTF('/models/cut_fish/scene.gltf')
  const rotationRef = useRef(0)

  // One-time centering and shadow setup
  useEffect(() => {
    if (!scene) return

    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    // Adjust y-center to account for high knife handle height so board and fish body are perfectly centered at origin
    center.y -= 0.18

    scene.children.forEach((child) => {
      child.position.sub(center)
    })

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true
        child.receiveShadow = true
        const mat = child.material
        if (mat.map) {
          mat.color.set('#ffffff')
        }
        mat.roughness = 0.45
        mat.metalness = 0.08
      }
    })
  }, [scene])

  // Toggle wireframe on existing materials efficiently
  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = wireframe
        child.material.needsUpdate = true
      }
    })
  }, [scene, wireframe])

  useFrame((state, delta) => {
    if (!groupRef.current || !pivotRef.current) return

    const t = state.clock.getElapsedTime()
    if (isAutoRotating) {
      rotationRef.current += delta * 0.3
    }

    const hover = Math.sin(t * 0.5) * 0.015
    const tiltX = Math.sin(t * 0.4) * 0.012 + Math.sin(t * 0.7) * 0.008
    const tiltZ = Math.cos(t * 0.3) * 0.01 + Math.cos(t * 0.6) * 0.006

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tiltX, 0.05)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tiltZ, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, hover, 0.04)

    pivotRef.current.rotation.y = THREE.MathUtils.lerp(
      pivotRef.current.rotation.y,
      rotationRef.current,
      0.08
    )
  })

  return (
    <group ref={pivotRef}>
      <group ref={groupRef} dispose={null} scale={[scale, scale, scale]} position={[0, -0.05, 0]}>
        <primitive object={scene} position={[0, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/cut_fish/scene.gltf')

