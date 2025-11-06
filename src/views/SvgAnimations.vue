<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const mouseX = ref(0)
const mouseY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 100
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="svg-animations">
    <div class="page-header">
      <h1 class="page-title">SVG Animations</h1>
      <p class="page-description">Advanced SVG animations with parallax scrolling and interactive effects</p>
    </div>

    <!-- Parallax SVG Scene -->
    <div class="parallax-section">
      <h2 class="section-title">Parallax Landscape</h2>
      <div class="parallax-container">
        <svg class="parallax-svg" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Sky with Gradient -->
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
            </linearGradient>
            <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f0e68c;stop-opacity:0.8" />
            </radialGradient>
          </defs>

          <!-- Sky Background -->
          <rect width="1200" height="600" fill="url(#skyGradient)" />

          <!-- Stars (Layer 1 - Slowest) -->
          <g class="stars-layer" :style="{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.05}px)` }">
            <circle v-for="i in 50" :key="`star-${i}`"
              :cx="(i * 137) % 1200"
              :cy="(i * 211) % 500"
              :r="(i % 3) + 1"
              fill="white"
              opacity="0.8">
              <animate attributeName="opacity"
                :values="`0.3;1;0.3`"
                :dur="`${2 + (i % 3)}s`"
                repeatCount="indefinite" />
            </circle>
          </g>

          <!-- Moon with Mouse Parallax -->
          <g :style="{ transform: `translate(${mouseX * 0.3}px, ${mouseY * 0.3}px)` }">
            <circle cx="900" cy="120" r="60" fill="url(#moonGradient)" opacity="0.9">
              <animate attributeName="r" values="60;62;60" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          <!-- Mountains (Layer 2) -->
          <g class="mountains-back" :style="{ transform: `translateX(${-scrollY * 0.1}px)` }">
            <path d="M 0,400 L 200,250 L 400,350 L 600,200 L 800,300 L 1000,220 L 1200,320 L 1200,600 L 0,600 Z"
              fill="#0f3460" opacity="0.7" />
          </g>

          <!-- Mountains (Layer 3) -->
          <g class="mountains-mid" :style="{ transform: `translateX(${-scrollY * 0.2}px)` }">
            <path d="M 0,450 L 150,320 L 350,380 L 550,280 L 750,360 L 950,300 L 1150,380 L 1200,600 L 0,600 Z"
              fill="#16213e" opacity="0.85" />
          </g>

          <!-- Trees (Layer 4 - Fastest) -->
          <g class="trees-layer" :style="{ transform: `translateX(${-scrollY * 0.4}px)` }">
            <g v-for="i in 15" :key="`tree-${i}`">
              <ellipse :cx="i * 80" cy="560" :rx="15" :ry="8" fill="#0a2f35" />
              <rect :x="i * 80 - 5" y="520" width="10" height="40" fill="#0a2f35" />
              <polygon :points="`${i * 80},520 ${i * 80 - 20},550 ${i * 80 + 20},550`" fill="#0d3b42" />
              <polygon :points="`${i * 80},500 ${i * 80 - 25},540 ${i * 80 + 25},540`" fill="#0f4851" />
            </g>
          </g>

          <!-- Ground -->
          <rect y="560" width="1200" height="40" fill="#0a1f28" />
        </svg>
      </div>
    </div>

    <!-- Interactive SVG Morphing -->
    <div class="morphing-section">
      <h2 class="section-title">Interactive SVG Morphing</h2>
      <div class="morphing-container">
        <svg class="morphing-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>

          <path class="morph-shape" fill="url(#morphGradient)">
            <animate attributeName="d"
              dur="5s"
              repeatCount="indefinite"
              values="
                M200,50 Q350,100 350,200 Q350,300 200,350 Q50,300 50,200 Q50,100 200,50 Z;
                M200,50 Q300,50 350,150 Q400,200 350,250 Q300,350 200,350 Q100,350 50,250 Q0,200 50,150 Q100,50 200,50 Z;
                M200,50 Q250,100 300,150 Q350,200 300,250 Q250,300 200,350 Q150,300 100,250 Q50,200 100,150 Q150,100 200,50 Z;
                M200,50 Q350,100 350,200 Q350,300 200,350 Q50,300 50,200 Q50,100 200,50 Z" />
          </path>

          <circle cx="200" cy="200" r="80" fill="rgba(255,255,255,0.1)" class="pulse-circle" />
          <circle cx="200" cy="200" r="60" fill="rgba(255,255,255,0.15)" class="pulse-circle-2" />
        </svg>
        <p class="morphing-text">Smooth SVG path morphing animation</p>
      </div>
    </div>

    <!-- Animated Path Drawing -->
    <div class="path-drawing-section">
      <h2 class="section-title">Path Drawing Animation</h2>
      <div class="path-container">
        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" class="path-svg">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- Animated Path 1 -->
          <path class="draw-path"
            d="M50,200 Q150,50 250,200 T450,200"
            stroke="url(#pathGradient)"
            stroke-width="4"
            fill="none"
            stroke-linecap="round" />

          <!-- Animated Path 2 -->
          <path class="draw-path-2"
            d="M50,250 C150,100 250,350 350,200 S450,100 550,250"
            stroke="#667eea"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
            opacity="0.7" />

          <!-- Moving circles along path -->
          <circle r="8" fill="#667eea" class="circle-on-path">
            <animateMotion dur="4s" repeatCount="indefinite"
              path="M50,200 Q150,50 250,200 T450,200" />
          </circle>

          <circle r="6" fill="#764ba2" class="circle-on-path-2">
            <animateMotion dur="5s" repeatCount="indefinite"
              path="M50,250 C150,100 250,350 350,200 S450,100 550,250" />
          </circle>
        </svg>
      </div>
    </div>

    <!-- Animated Gear System -->
    <div class="gear-section">
      <h2 class="section-title">Animated Gear System</h2>
      <div class="gear-container">
        <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" class="gear-svg">
          <defs>
            <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- Large Gear -->
          <g class="gear-large" transform-origin="150 150">
            <circle cx="150" cy="150" r="60" fill="url(#gearGradient)" />
            <g v-for="i in 8" :key="`tooth-large-${i}`">
              <rect
                :x="145"
                :y="85"
                width="10"
                height="20"
                fill="#764ba2"
                :transform="`rotate(${i * 45} 150 150)`" />
            </g>
            <circle cx="150" cy="150" r="20" fill="#0a0a0a" />
          </g>

          <!-- Medium Gear -->
          <g class="gear-medium" transform-origin="300 150">
            <circle cx="300" cy="150" r="45" fill="url(#gearGradient)" opacity="0.9" />
            <g v-for="i in 6" :key="`tooth-medium-${i}`">
              <rect
                :x="297"
                :y="100"
                width="6"
                height="15"
                fill="#667eea"
                :transform="`rotate(${i * 60} 300 150)`" />
            </g>
            <circle cx="300" cy="150" r="15" fill="#0a0a0a" />
          </g>

          <!-- Small Gear -->
          <g class="gear-small" transform-origin="380 220">
            <circle cx="380" cy="220" r="30" fill="url(#gearGradient)" opacity="0.85" />
            <g v-for="i in 6" :key="`tooth-small-${i}`">
              <rect
                :x="377"
                :y="185"
                width="6"
                height="12"
                fill="#764ba2"
                :transform="`rotate(${i * 60} 380 220)`" />
            </g>
            <circle cx="380" cy="220" r="10" fill="#0a0a0a" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svg-animations {
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

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
}

.parallax-section,
.morphing-section,
.path-drawing-section,
.gear-section {
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.parallax-container {
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.parallax-svg {
  width: 100%;
  height: 100%;
}

.morphing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.morphing-svg {
  width: 100%;
  max-width: 400px;
  height: 400px;
}

.morph-shape {
  filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.5));
}

.pulse-circle {
  animation: pulse 2s ease-in-out infinite;
}

.pulse-circle-2 {
  animation: pulse 2s ease-in-out infinite 1s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

.morphing-text {
  color: #a0a0a0;
  font-size: 1.1rem;
  text-align: center;
}

.path-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.path-svg {
  width: 100%;
  height: auto;
}

.draw-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 3s ease-in-out infinite;
}

.draw-path-2 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 3s ease-in-out infinite 0.5s;
}

@keyframes drawPath {
  0% {
    stroke-dashoffset: 1000;
  }
  50%, 100% {
    stroke-dashoffset: 0;
  }
}

.circle-on-path {
  filter: drop-shadow(0 0 8px #667eea);
}

.circle-on-path-2 {
  filter: drop-shadow(0 0 6px #764ba2);
}

.gear-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.gear-svg {
  width: 100%;
  height: auto;
}

.gear-large {
  animation: rotateCW 8s linear infinite;
}

.gear-medium {
  animation: rotateCCW 6s linear infinite;
}

.gear-small {
  animation: rotateCW 4s linear infinite;
}

@keyframes rotateCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateCCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@media (max-width: 768px) {
  .parallax-container {
    height: 400px;
  }

  .morphing-svg {
    max-width: 300px;
    height: 300px;
  }
}
</style>

