<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas1 = ref<HTMLCanvasElement | null>(null)
const canvas2 = ref<HTMLCanvasElement | null>(null)
const canvas3 = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

let animationFrames: number[] = []

// Particle System
const initParticleSystem = () => {
  const canvas = canvas1.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const particles: Particle[] = []
  const particleCount = 100
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe']

  for (let i = 0; i < particleCount; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length)
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 3 + 1,
      color: (colors[colorIndex] || '#667eea') as string
    })
  }

  const animate = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()

      particles.slice(i + 1).forEach(other => {
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = `rgba(102, 126, 234, ${1 - distance / 100})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })

    animationFrames.push(requestAnimationFrame(animate))
  }

  animate()
}

// Wave Animation
const initWaveAnimation = () => {
  const canvas = canvas2.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const waves = [
    { y: canvas.height * 0.3, length: 0.01, amplitude: 50, frequency: 0.01 },
    { y: canvas.height * 0.5, length: 0.015, amplitude: 40, frequency: 0.012 },
    { y: canvas.height * 0.7, length: 0.02, amplitude: 30, frequency: 0.015 }
  ]

  let increment = 0

  const animate = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    waves.forEach((wave, index) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          wave.y + Math.sin(i * wave.length + increment * wave.frequency) * wave.amplitude
        )
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      const opacity = 0.3 - index * 0.08

      if (index === 0) {
        gradient.addColorStop(0, `rgba(102, 126, 234, ${opacity})`)
        gradient.addColorStop(1, `rgba(102, 126, 234, 0)`)
      } else if (index === 1) {
        gradient.addColorStop(0, `rgba(118, 75, 162, ${opacity})`)
        gradient.addColorStop(1, `rgba(118, 75, 162, 0)`)
      } else {
        gradient.addColorStop(0, `rgba(240, 147, 251, ${opacity})`)
        gradient.addColorStop(1, `rgba(240, 147, 251, 0)`)
      }

      ctx.fillStyle = gradient
      ctx.fill()
    })

    increment += 5
    animationFrames.push(requestAnimationFrame(animate))
  }

  animate()
}

// Mouse Trail
const initMouseTrail = () => {
  const canvas = canvas3.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  interface Trail {
    x: number
    y: number
    radius: number
    life: number
  }

  const trails: Trail[] = []
  let mouseX = canvas.width / 2
  let mouseY = canvas.height / 2

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  })

  const animate = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    trails.push({
      x: mouseX,
      y: mouseY,
      radius: 20,
      life: 1
    })

    for (let i = trails.length - 1; i >= 0; i--) {
      const trail = trails[i]
      if (!trail) continue

      trail.life -= 0.02
      trail.radius += 0.5

      if (trail.life <= 0) {
        trails.splice(i, 1)
        continue
      }

      const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, trail.radius)
      gradient.addColorStop(0, `rgba(102, 126, 234, ${trail.life * 0.5})`)
      gradient.addColorStop(0.5, `rgba(118, 75, 162, ${trail.life * 0.3})`)
      gradient.addColorStop(1, `rgba(240, 147, 251, 0)`)

      ctx.beginPath()
      ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    animationFrames.push(requestAnimationFrame(animate))
  }

  animate()
}

onMounted(() => {
  setTimeout(() => {
    initParticleSystem()
    initWaveAnimation()
    initMouseTrail()
  }, 100)

  const handleResize = () => {
    if (canvas1.value) {
      canvas1.value.width = canvas1.value.offsetWidth
      canvas1.value.height = canvas1.value.offsetHeight
    }
    if (canvas2.value) {
      canvas2.value.width = canvas2.value.offsetWidth
      canvas2.value.height = canvas2.value.offsetHeight
    }
    if (canvas3.value) {
      canvas3.value.width = canvas3.value.offsetWidth
      canvas3.value.height = canvas3.value.offsetHeight
    }
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    animationFrames.forEach(frame => cancelAnimationFrame(frame))
    animationFrames = []
  })
})
</script>

<template>
  <div class="canvas-page">
    <div class="page-header">
      <h1 class="page-title">Canvas Animations</h1>
      <p class="page-description">HTML5 Canvas API with particle systems, waves, and interactive effects</p>
    </div>

    <!-- Particle System -->
    <section class="canvas-section">
      <h2 class="section-title">Particle Network System</h2>
      <p class="section-description">Connected particles with dynamic interactions</p>
      <div class="canvas-container">
        <canvas ref="canvas1" class="animation-canvas"></canvas>
      </div>
    </section>

    <!-- Wave Animation -->
    <section class="canvas-section">
      <h2 class="section-title">Sine Wave Animation</h2>
      <p class="section-description">Layered sine waves with smooth gradients</p>
      <div class="canvas-container">
        <canvas ref="canvas2" class="animation-canvas"></canvas>
      </div>
    </section>

    <!-- Mouse Trail -->
    <section class="canvas-section">
      <h2 class="section-title">Interactive Mouse Trail</h2>
      <p class="section-description">Move your mouse over the canvas</p>
      <div class="canvas-container interactive">
        <canvas ref="canvas3" class="animation-canvas"></canvas>
        <div class="canvas-overlay">Move your mouse here</div>
      </div>
    </section>

    <!-- Features -->
    <section class="info-section">
      <h2 class="section-title">Canvas API Features</h2>
      <div class="features-grid">
        <div class="feature-box">
          <h3>🎨 2D Context</h3>
          <p>Drawing shapes, paths, and images</p>
        </div>
        <div class="feature-box">
          <h3>⚡ Performance</h3>
          <p>Hardware-accelerated 60fps animations</p>
        </div>
        <div class="feature-box">
          <h3>🎯 Pixel Control</h3>
          <p>Direct pixel-level manipulation</p>
        </div>
        <div class="feature-box">
          <h3>🌊 Gradients</h3>
          <p>Linear and radial gradients</p>
        </div>
        <div class="feature-box">
          <h3>🔄 Animation Loop</h3>
          <p>RequestAnimationFrame optimization</p>
        </div>
        <div class="feature-box">
          <h3>🖱️ Interactivity</h3>
          <p>Mouse and touch event handling</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.canvas-page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
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

.canvas-section {
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
  text-align: center;
}

.section-description {
  text-align: center;
  color: #a0a0a0;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #0a0a0a;
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.canvas-container.interactive {
  cursor: crosshair;
}

.animation-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.canvas-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
  pointer-events: none;
  text-align: center;
}

.canvas-container:hover .canvas-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-section {
  margin: 4rem 0;
  padding: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-box:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-5px);
}

.feature-box h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.feature-box p {
  color: #a0a0a0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .canvas-container {
    height: 400px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>

