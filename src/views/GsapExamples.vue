<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Hero animation
  gsap.from('.hero-text', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
  })

  // Scroll-triggered boxes
  gsap.utils.toArray<HTMLElement>('.box').forEach((box, index) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      },
      x: index % 2 === 0 ? -200 : 200,
      opacity: 0,
      rotation: index % 2 === 0 ? -10 : 10,
      duration: 1,
      ease: 'power3.out'
    })
  })

  // Parallax sections
  gsap.utils.toArray<HTMLElement>('.parallax-section').forEach((section) => {
    const bg = section.querySelector('.parallax-bg') as HTMLElement
    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -100,
        ease: 'none'
      })
    }
  })

  // Pin section
  const pinSection = document.querySelector('.pin-section')
  if (pinSection) {
    ScrollTrigger.create({
      trigger: pinSection,
      start: 'top top',
      end: '+=500',
      pin: true,
      pinSpacing: true
    })

    gsap.to('.pin-content', {
      scrollTrigger: {
        trigger: pinSection,
        start: 'top top',
        end: '+=500',
        scrub: true
      },
      scale: 1.5,
      rotation: 360,
      ease: 'none'
    })
  }

  // Text reveals
  gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((text) => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    })
  })

  // Counter
  const counter = document.querySelector('.counter-number')
  if (counter) {
    gsap.from(counter, {
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%'
      },
      textContent: 0,
      duration: 2,
      ease: 'power1.inOut',
      snap: { textContent: 1 }
    })
  }

  // Stagger animation
  gsap.from('.stagger-item', {
    scrollTrigger: {
      trigger: '.stagger-container',
      start: 'top 70%'
    },
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'back.out(1.7)'
  })

  // Horizontal scroll
  const horizontalSection = document.querySelector('.horizontal-scroll')
  const horizontalContainer = document.querySelector('.horizontal-container')

  if (horizontalSection && horizontalContainer) {
    const scrollWidth = (horizontalContainer as HTMLElement).scrollWidth

    gsap.to(horizontalContainer, {
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1
      },
      x: () => -(scrollWidth - window.innerWidth),
      ease: 'none'
    })
  }

  // Clip reveal
  gsap.utils.toArray<HTMLElement>('.clip-reveal').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 75%'
      },
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.5,
      ease: 'power3.inOut'
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="gsap-page">
    <!-- Hero -->
    <div class="hero-section">
      <h1 class="hero-text">
        <span class="gradient-text">GSAP</span> Scroll Animations
      </h1>
      <p class="hero-subtitle">Professional scroll-triggered animations using GreenSock</p>
    </div>

    <!-- Boxes -->
    <section class="boxes-section">
      <h2 class="section-title reveal-text">Scroll-Triggered Elements</h2>
      <div class="boxes-container">
        <div class="box" v-for="i in 6" :key="i">
          <div class="box-number">{{ i }}</div>
          <p>Scroll to animate</p>
        </div>
      </div>
    </section>

    <!-- Parallax -->
    <section class="parallax-section">
      <div class="parallax-bg"></div>
      <div class="parallax-content">
        <h2 class="reveal-text">Parallax Scrolling</h2>
        <p class="reveal-text">Background moves at different speed</p>
      </div>
    </section>

    <!-- Pin -->
    <section class="pin-section">
      <div class="pin-content">
        <div class="pin-box">
          <h2>Pinned & Scaled</h2>
          <p>This element pins while scrolling and rotates 360°</p>
        </div>
      </div>
    </section>

    <!-- Counter -->
    <section class="counter-section">
      <h2 class="reveal-text">Animated Counter</h2>
      <div class="counter-display">
        <span class="counter-number">100</span>
        <span class="counter-label">Projects Completed</span>
      </div>
    </section>

    <!-- Stagger -->
    <section class="stagger-section">
      <h2 class="reveal-text">Stagger Animation</h2>
      <div class="stagger-container">
        <div class="stagger-item" v-for="i in 9" :key="i">
          <div class="stagger-icon">⚡</div>
          <h3>Feature {{ i }}</h3>
          <p>Staggered reveal</p>
        </div>
      </div>
    </section>

    <!-- Horizontal Scroll -->
    <section class="horizontal-scroll">
      <div class="horizontal-container">
        <div class="horizontal-panel" v-for="i in 5" :key="i">
          <h2>Panel {{ i }}</h2>
          <p>Scroll horizontally</p>
        </div>
      </div>
    </section>

    <!-- Text Reveals -->
    <section class="text-section">
      <h2 class="reveal-text big-title">Smooth</h2>
      <h2 class="reveal-text big-title">Professional</h2>
      <h2 class="reveal-text big-title">Animations</h2>
    </section>

    <!-- Clip Path -->
    <section class="clip-section">
      <h2 class="reveal-text">Image Reveal with Clip Path</h2>
      <div class="clip-grid">
        <div class="clip-reveal clip-box" v-for="i in 3" :key="i">
          <div class="clip-content">
            <h3>Image {{ i }}</h3>
            <p>Clip-path animation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final -->
    <section class="final-section">
      <h2 class="reveal-text">GSAP ScrollTrigger</h2>
      <p class="reveal-text">Industry-standard animation library</p>
    </section>
  </div>
</template>

<style scoped>
.gsap-page {
  min-height: 100vh;
  padding-bottom: 4rem;
}

.hero-section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.hero-text {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin-bottom: 1rem;
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
  max-width: 800px;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #fff;
}

.boxes-section {
  padding: 4rem 2rem;
  margin: 4rem 0;
}

.boxes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.box {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.box:hover {
  transform: translateY(-10px);
  border-color: rgba(102, 126, 234, 0.6);
}

.box-number {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.box p {
  color: #a0a0a0;
  font-size: 1.1rem;
}

.parallax-section {
  position: relative;
  height: 600px;
  margin: 6rem 0;
  overflow: hidden;
  border-radius: 24px;
}

.parallax-bg {
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  bottom: -100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.3;
}

.parallax-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
}

.parallax-content h2 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.parallax-content p {
  font-size: 1.5rem;
  color: #a0a0a0;
}

.pin-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6rem 0;
}

.pin-content {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
}

.pin-box {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: 24px;
  padding: 4rem 3rem;
  text-align: center;
}

.pin-box h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.pin-box p {
  font-size: 1.2rem;
  color: #a0a0a0;
}

.counter-section {
  padding: 6rem 2rem;
  text-align: center;
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.counter-number {
  font-size: 8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.counter-label {
  font-size: 1.5rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.stagger-section {
  padding: 6rem 2rem;
}

.stagger-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stagger-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stagger-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-5px);
}

.stagger-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stagger-item h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stagger-item p {
  color: #a0a0a0;
}

.horizontal-scroll {
  height: 100vh;
  overflow: hidden;
  margin: 6rem 0;
}

.horizontal-container {
  display: flex;
  height: 100%;
  width: fit-content;
}

.horizontal-panel {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.horizontal-panel:nth-child(odd) {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.horizontal-panel:nth-child(even) {
  background: linear-gradient(135deg, rgba(118, 75, 162, 0.1), rgba(240, 147, 251, 0.1));
}

.horizontal-panel h2 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.horizontal-panel p {
  font-size: 1.5rem;
  color: #a0a0a0;
}

.text-section {
  padding: 6rem 2rem;
  text-align: center;
}

.big-title {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  margin: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.clip-section {
  padding: 6rem 2rem;
}

.clip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.clip-box {
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
}

.clip-content {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.clip-content h3 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.clip-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.final-section {
  padding: 8rem 2rem;
  text-align: center;
}

.final-section h2 {
  font-size: 4rem;
  margin-bottom: 2rem;
}

.final-section p {
  font-size: 1.5rem;
  color: #a0a0a0;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .boxes-container,
  .stagger-container {
    grid-template-columns: 1fr;
  }

  .horizontal-panel h2 {
    font-size: 2.5rem;
  }

  .counter-number {
    font-size: 5rem;
  }
}
</style>

