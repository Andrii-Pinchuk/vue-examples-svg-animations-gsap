<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const container = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let animationId: number

// Nuclear Power Station Components
let reactorDome: THREE.Mesh
let mainBuilding: THREE.Mesh
let turbineHall: THREE.Mesh
let chimney: THREE.Mesh
let steamParticles: THREE.Points[] = []

const initThreeJS = () => {
  if (!container.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)
  scene.fog = new THREE.Fog(0x0a0a0a, 50, 200)

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    60,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(40, 30, 40)
  camera.lookAt(0, 0, 0)

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.value.appendChild(renderer.domElement)

  // Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 20
  controls.maxDistance = 100

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 2)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(50, 50, 30)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.left = -50
  directionalLight.shadow.camera.right = 50
  directionalLight.shadow.camera.top = 50
  directionalLight.shadow.camera.bottom = -50
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x545454, 1)
  scene.add(hemisphereLight)

  // Ground
  const groundGeometry = new THREE.PlaneGeometry(100, 100)
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
    metalness: 0.2
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // Grid Helper
  const gridHelper = new THREE.GridHelper(100, 50, 0x333333, 0x222222)
  scene.add(gridHelper)

  // Build Nuclear Power Station
  buildNuclearPowerStation()

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    controls.update()

    // Animate reactor dome glow
    if (reactorDome) {
      const time = Date.now() * 0.001
      const glowIntensity = 0.5 + Math.sin(time) * 0.2
      ;(reactorDome.material as THREE.MeshStandardMaterial).emissive.setScalar(glowIntensity * 0.3)
    }

    // Animate steam particles
    steamParticles.forEach(steam => {
      const positionAttribute = steam.geometry.attributes.position
      if (!positionAttribute) return

      const positions = positionAttribute.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        const currentPos = positions[i]
        if (currentPos !== undefined) {
          positions[i] = currentPos + 0.1 // Move up
          if (positions[i]! > 35) {
            positions[i] = 20 // Reset
          }
        }
      }
      positionAttribute.needsUpdate = true
    })

    renderer.render(scene, camera)
  }

  animate()
}

const buildNuclearPowerStation = () => {
  // Materials
  const concreteMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b8b8b,
    roughness: 0.9,
    metalness: 0.1
  })

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    roughness: 0.4,
    metalness: 0.8
  })

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    transmission: 0.9,
    opacity: 0.5,
    transparent: true,
    roughness: 0.1,
    metalness: 0,
    thickness: 0.5
  })

  // 1. Reactor Building with Dome (Containment Building)
  const reactorBaseGeometry = new THREE.CylinderGeometry(6, 6, 12, 32)
  const reactorBase = new THREE.Mesh(reactorBaseGeometry, concreteMaterial)
  reactorBase.position.set(0, 6, 0)
  reactorBase.castShadow = true
  reactorBase.receiveShadow = true
  scene.add(reactorBase)

  // Reactor Dome
  const domeGeometry = new THREE.SphereGeometry(6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
  reactorDome = new THREE.Mesh(domeGeometry, new THREE.MeshStandardMaterial({
    color: 0x667eea,
    roughness: 0.3,
    metalness: 0.7,
    emissive: 0x667eea,
    emissiveIntensity: 0.3
  }))
  reactorDome.position.set(0, 12, 0)
  reactorDome.castShadow = true
  scene.add(reactorDome)

  // Add glow effect to dome
  const glowGeometry = new THREE.SphereGeometry(6.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide
  })
  const glow = new THREE.Mesh(glowGeometry, glowMaterial)
  glow.position.set(0, 12, 0)
  scene.add(glow)

  // 2. Cooling Towers (Natural Draft Cooling Towers)
  const createCoolingTower = (x: number, z: number) => {
    const towerGroup = new THREE.Group()

    // Bottom section
    const bottomGeometry = new THREE.CylinderGeometry(5, 6, 8, 32)
    const bottom = new THREE.Mesh(bottomGeometry, concreteMaterial)
    bottom.position.y = 4
    bottom.castShadow = true
    bottom.receiveShadow = true
    towerGroup.add(bottom)

    // Middle (narrow) section
    const middleGeometry = new THREE.CylinderGeometry(4, 5, 12, 32)
    const middle = new THREE.Mesh(middleGeometry, concreteMaterial)
    middle.position.y = 14
    middle.castShadow = true
    middle.receiveShadow = true
    towerGroup.add(middle)

    // Top section
    const topGeometry = new THREE.CylinderGeometry(5, 4, 8, 32)
    const top = new THREE.Mesh(topGeometry, concreteMaterial)
    top.position.y = 24
    top.castShadow = true
    top.receiveShadow = true
    towerGroup.add(top)

    // Steam effect
    const steamGeometry = new THREE.BufferGeometry()
    const steamPositions = []
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 3
      steamPositions.push(
        Math.cos(angle) * radius,
        20 + Math.random() * 10,
        Math.sin(angle) * radius
      )
    }
    steamGeometry.setAttribute('position', new THREE.Float32BufferAttribute(steamPositions, 3))

    const steamMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    })
    const steam = new THREE.Points(steamGeometry, steamMaterial)
    towerGroup.add(steam)
    steamParticles.push(steam)

    towerGroup.position.set(x, 0, z)
    scene.add(towerGroup)

    return towerGroup
  }

  createCoolingTower(-20, 10)
  createCoolingTower(-20, -10)

  // 3. Main Control Building
  const mainBuildingGeometry = new THREE.BoxGeometry(10, 8, 12)
  mainBuilding = new THREE.Mesh(mainBuildingGeometry, concreteMaterial)
  mainBuilding.position.set(12, 4, 0)
  mainBuilding.castShadow = true
  mainBuilding.receiveShadow = true
  scene.add(mainBuilding)

  // Windows
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      const windowGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.2)
      const window = new THREE.Mesh(windowGeometry, glassMaterial)
      window.position.set(12.6, 2 + i * 2.5, -4 + j * 2.5)
      scene.add(window)
    }
  }

  // 4. Turbine Hall
  const turbineHallGeometry = new THREE.BoxGeometry(18, 10, 8)
  turbineHall = new THREE.Mesh(turbineHallGeometry, metalMaterial)
  turbineHall.position.set(12, 5, 12)
  turbineHall.castShadow = true
  turbineHall.receiveShadow = true
  scene.add(turbineHall)

  // Turbine hall roof detail
  const roofGeometry = new THREE.BoxGeometry(18, 0.5, 8)
  const roof = new THREE.Mesh(roofGeometry, new THREE.MeshStandardMaterial({ color: 0x2a2a2a }))
  roof.position.set(12, 10.25, 12)
  scene.add(roof)

  // 5. Chimney/Stack
  const chimneyGeometry = new THREE.CylinderGeometry(1.5, 2, 25, 16)
  chimney = new THREE.Mesh(chimneyGeometry, concreteMaterial)
  chimney.position.set(20, 12.5, 12)
  chimney.castShadow = true
  chimney.receiveShadow = true
  scene.add(chimney)

  // Chimney top ring
  const chimneyTopGeometry = new THREE.TorusGeometry(1.5, 0.3, 8, 16)
  const chimneyTop = new THREE.Mesh(chimneyTopGeometry, metalMaterial)
  chimneyTop.position.set(20, 25, 12)
  chimneyTop.rotation.x = Math.PI / 2
  scene.add(chimneyTop)

  // 6. Security Fence
  const fenceGroup = new THREE.Group()
  const fencePostMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })

  for (let i = -30; i <= 30; i += 5) {
    // Front fence
    const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), fencePostMaterial)
    post1.position.set(i, 2, 25)
    fenceGroup.add(post1)

    // Back fence
    const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), fencePostMaterial)
    post2.position.set(i, 2, -25)
    fenceGroup.add(post2)
  }

  for (let i = -25; i <= 25; i += 5) {
    // Left fence
    const post3 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), fencePostMaterial)
    post3.position.set(-30, 2, i)
    fenceGroup.add(post3)

    // Right fence
    const post4 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), fencePostMaterial)
    post4.position.set(30, 2, i)
    fenceGroup.add(post4)
  }

  scene.add(fenceGroup)

  // 7. Auxiliary Buildings
  const auxBuilding1 = new THREE.Mesh(
    new THREE.BoxGeometry(6, 5, 6),
    concreteMaterial
  )
  auxBuilding1.position.set(-8, 2.5, 12)
  auxBuilding1.castShadow = true
  scene.add(auxBuilding1)

  const auxBuilding2 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 4, 5),
    concreteMaterial
  )
  auxBuilding2.position.set(-8, 2, -12)
  auxBuilding2.castShadow = true
  scene.add(auxBuilding2)

  // 8. Piping connections
  const pipeMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 0.5,
    metalness: 0.8
  })

  // Pipes from reactor to cooling towers
  for (let i = 0; i < 2; i++) {
    const pipeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 20, 16)
    const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial)
    pipe.rotation.z = Math.PI / 2
    pipe.position.set(-10, 3, i === 0 ? 10 : -10)
    scene.add(pipe)
  }
}

const handleResize = () => {
  if (!container.value) return

  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (controls) {
    controls.dispose()
  }
})
</script>

<template>
  <div class="threejs-page">
    <div class="page-header">
      <h1 class="page-title">Three.js 3D Visualization</h1>
      <p class="page-description">Interactive 3D Nuclear Power Station model built with Three.js</p>
    </div>

    <div class="canvas-wrapper">
      <div ref="container" class="threejs-container"></div>
      <div class="controls-info">
        <p><strong>Controls:</strong></p>
        <ul>
          <li>🖱️ Left Click + Drag: Rotate camera</li>
          <li>🖱️ Right Click + Drag: Pan camera</li>
          <li>🖱️ Scroll: Zoom in/out</li>
        </ul>
      </div>
    </div>

    <div class="info-section">
      <h2 class="section-title">Nuclear Power Station Components</h2>
      <div class="components-grid">
        <div class="component-card">
          <div class="component-icon">⚛️</div>
          <h3>Reactor Building</h3>
          <p>Containment building with pressurized dome housing the nuclear reactor core</p>
        </div>
        <div class="component-card">
          <div class="component-icon">🌊</div>
          <h3>Cooling Towers</h3>
          <p>Natural draft hyperboloid cooling towers for heat dissipation with animated steam</p>
        </div>
        <div class="component-card">
          <div class="component-icon">🏢</div>
          <h3>Control Building</h3>
          <p>Main control room building with monitoring and safety systems</p>
        </div>
        <div class="component-card">
          <div class="component-icon">⚡</div>
          <h3>Turbine Hall</h3>
          <p>Houses steam turbines and electrical generators for power production</p>
        </div>
        <div class="component-card">
          <div class="component-icon">🏭</div>
          <h3>Exhaust Stack</h3>
          <p>Ventilation chimney for controlled release of filtered air</p>
        </div>
        <div class="component-card">
          <div class="component-icon">🔧</div>
          <h3>Auxiliary Systems</h3>
          <p>Support buildings, piping, and security infrastructure</p>
        </div>
      </div>
    </div>

    <div class="tech-section">
      <h2 class="section-title">Three.js Features Demonstrated</h2>
      <div class="features-list">
        <div class="feature-item">
          <h3>🎨 3D Geometry</h3>
          <p>Complex geometric shapes using BoxGeometry, CylinderGeometry, SphereGeometry, and custom geometries</p>
        </div>
        <div class="feature-item">
          <h3>💡 Advanced Lighting</h3>
          <p>Multiple light sources: Ambient, Directional with shadows, and Hemisphere lighting</p>
        </div>
        <div class="feature-item">
          <h3>🎭 Materials & Textures</h3>
          <p>PBR materials with metalness, roughness, emission, and physical glass materials</p>
        </div>
        <div class="feature-item">
          <h3>🌫️ Particle Systems</h3>
          <p>Animated steam particles using Points and BufferGeometry</p>
        </div>
        <div class="feature-item">
          <h3>🎮 Orbit Controls</h3>
          <p>Interactive camera controls with damping and constraints</p>
        </div>
        <div class="feature-item">
          <h3>🌑 Shadows & Fog</h3>
          <p>Real-time shadow mapping and atmospheric fog effects</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.threejs-page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.2rem;
  color: #a0a0a0;
  max-width: 800px;
  margin: 0 auto;
}

.canvas-wrapper {
  position: relative;
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.threejs-container {
  width: 100%;
  height: 700px;
  background: #0a0a0a;
}

.controls-info {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(10, 10, 10, 0.9);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(10px);
}

.controls-info p {
  color: #667eea;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.controls-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.controls-info li {
  color: #a0a0a0;
  font-size: 0.9rem;
  margin: 0.3rem 0;
}

.info-section,
.tech-section {
  margin: 4rem 0;
  padding: 2rem;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #fff;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.component-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.component-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-5px);
}

.component-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.component-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.component-card p {
  color: #a0a0a0;
  line-height: 1.6;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid #667eea;
  padding: 1.5rem;
  border-radius: 8px;
}

.feature-item h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #fff;
}

.feature-item p {
  color: #a0a0a0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .threejs-container {
    height: 500px;
  }

  .controls-info {
    font-size: 0.85rem;
    padding: 0.75rem 1rem;
  }

  .components-grid,
  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>

