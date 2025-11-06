<script setup lang="ts">
</script>

<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-container">
        <h1 class="nav-title">Vue 3 Frontend Portfolio</h1>
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li>
            <router-link to="/svg-animations" class="nav-link">SVG Animations</router-link>
          </li>
          <li>
            <router-link to="/gsap" class="nav-link">GSAP</router-link>
          </li>
          <li>
            <router-link to="/canvas" class="nav-link">Canvas</router-link>
          </li>
          <li>
            <router-link to="/threejs" class="nav-link">Three.js</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

.main-nav {
  max-width: fit-content;
  margin: 0 auto;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: fit-content;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-align: center;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: #ffffff;
}

.nav-link.router-link-active::after {
  width: 100%;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>


