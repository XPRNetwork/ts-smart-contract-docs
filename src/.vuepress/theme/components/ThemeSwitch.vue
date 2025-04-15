<template>
  <div class="theme-switcher-container">
    <label class="switch">
      <input 
        type="checkbox" 
        @change="toggleTheme" 
        :checked="isDarkTheme"
        aria-label="Toggle dark mode"
      >
      <span class="slider round">
        <span class="icon light">☀️</span>
        <span class="icon dark">🌙</span>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      isDarkTheme: false
    }
  },
  mounted() {
    // All browser-side initialization happens here instead of created()
    this.initializeTheme();
    
    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Use the appropriate event listener method based on browser support
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', this.handleSystemThemeChange);
      } else if (mediaQuery.addListener) {
        // Older browsers support
        mediaQuery.addListener(this.handleSystemThemeChange);
      }
    }
  },
  beforeDestroy() {
    // Clean up event listener
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Use the appropriate removal method based on browser support
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
      } else if (mediaQuery.removeListener) {
        // Older browsers support
        mediaQuery.removeListener(this.handleSystemThemeChange);
      }
    }
  },
  created() {
    // Don't access browser APIs during SSR
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
  },
  methods: {
    initializeTheme() {
      // Safe check for browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      
      try {
        // First check localStorage for saved preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
          // Use saved preference if available
          this.isDarkTheme = savedTheme === 'dark';
        } else {
          // Check if system preference is available
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // System prefers dark mode
            this.isDarkTheme = true;
          } else {
            // Check current theme or default to light
            const currentTheme = document.documentElement.getAttribute('data-theme');
            this.isDarkTheme = currentTheme === 'dark';
          }
        }
        
        // Apply theme based on initial determination
        this.applyTheme();
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Fallback to light theme if there's an error
        this.isDarkTheme = false;
      }
    },
    
    applyTheme() {
      if (typeof document === 'undefined') {
        return;
      }
      
      // Apply theme to HTML element
      if (this.isDarkTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', '');
      }
    },
    
    toggleTheme() {
      // Toggle theme state
      this.isDarkTheme = !this.isDarkTheme;
      
      // Apply theme to HTML element
      this.applyTheme();
      
      // Save preference to localStorage
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    },
    
    handleSystemThemeChange(event) {
      try {
        // Only update if user hasn't set a preference
        if (typeof window !== 'undefined' && window.localStorage && !localStorage.getItem('theme')) {
          this.isDarkTheme = event.matches;
          
          // Apply theme based on system change
          this.applyTheme();
        }
      } catch (error) {
        console.error('Error handling system theme change:', error);
      }
    }
  }
}
</script>


<style scoped>
.theme-switcher-container {
  display: inline-block;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: flex;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  transition: .4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 5px 0 5px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  z-index: 2;
}

input:checked + .slider {
  background-color: #007bff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Icons */
.icon {
  font-size: 14px;
  z-index: 1;
}

.icon.light {
  margin-right: 0px;
}

.icon.dark {
  margin-left: 4px;
  font-size: 12px;
}
</style>