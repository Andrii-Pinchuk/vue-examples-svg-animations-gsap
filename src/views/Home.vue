<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 100)
})
</script>

<template>
  <div class="home" :class="{ visible }">
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Frontend Developer</span>
          <br />
          Portfolio Showcase
        </h1>
        <p class="hero-subtitle">
          Advanced Vue 3 + TypeScript examples featuring SVG animations, GSAP, Canvas, and Three.js
        </p>
        <div class="hero-features">
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>SVG Animations</h3>
            <p>Advanced parallax and interactive SVG animations</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>GSAP</h3>
            <p>Professional scroll-triggered animations</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎭</div>
            <h3>Canvas</h3>
            <p>HTML5 Canvas animations and effects</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌐</div>
            <h3>Three.js</h3>
            <p>3D Nuclear Power Station visualization</p>
          </div>
        </div>
      </div>
    </div>

    <div class="about-section">
      <h2 class="section-title">About This Project</h2>
      <div class="about-content">
        <div class="about-text">
          <h3>Technical Stack</h3>
          <ul>
            <li><strong>Vue 3:</strong> Composition API with TypeScript</li>
            <li><strong>Vite:</strong> Fast build tool and dev server</li>
            <li><strong>GSAP:</strong> Professional animation library</li>
            <li><strong>Three.js:</strong> 3D graphics library</li>
            <li><strong>Canvas API:</strong> 2D graphics rendering</li>
          </ul>
        </div>
        <div class="about-text">
          <h3>Skills Demonstrated</h3>
          <ul>
            <li>Advanced SVG manipulation and animations</li>
            <li>Scroll-based animations with GSAP</li>
            <li>Canvas-based particle systems</li>
            <li>3D modeling with Three.js</li>
            <li>TypeScript best practices</li>
            <li>Responsive design principles</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <h2>Explore Examples</h2>
      <p>Navigate through the menu above to see each technology in action</p>
      <div class="cta-buttons">
        <router-link to="/svg-animations" class="cta-button">Start Exploring</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.home.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.1), transparent);
}

.hero-content {
  text-align: center;
  max-width: 1400px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: #a0a0a0;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.feature-card p {
  color: #a0a0a0;
  line-height: 1.6;
}

.about-section {
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  margin: 4rem 0;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.about-text h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.about-text ul {
  list-style: none;
  padding: 0;
}

.about-text li {
  padding: 0.75rem 0;
  color: #a0a0a0;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.about-text li:last-child {
  border-bottom: none;
}

.about-text strong {
  color: #667eea;
}

.cta-section {
  text-align: center;
  padding: 4rem 2rem;
}

.cta-section h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.cta-section p {
  color: #a0a0a0;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 2rem 1rem;
  }

  .hero-features {
    grid-template-columns: 1fr;
  }

  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>

