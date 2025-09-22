/**
 * Scale Settings Manager - User Interface Scaling Control
 * Provides UI for users to customize mobile and desktop scaling preferences
 */

class ScaleSettingsManager {
  constructor() {
    this.storageKey = 'lc-handbook-scale-preferences';
    this.defaults = {
      mobile: 'normal',    // 1.0 scale
      desktop: 'compact',  // 0.85 scale (High density)
      theme: 'system'      // follow system theme (default)
    };
    
    this.mobileOptions = {
      'small': { scale: 0.85, label: 'Small', description: 'Compact, space-efficient' },
      'compact': { scale: 0.9, label: 'Compact', description: 'Slightly smaller' },
      'normal': { scale: 1.0, label: 'Normal', description: 'Default size' },
      'comfortable': { scale: 1.1, label: 'Comfortable', description: 'Slightly larger' },
      'large': { scale: 1.2, label: 'Large', description: 'Easy to read' }
    };
    
    this.desktopOptions = {
      'tiny': { scale: 0.75, label: 'Tiny', description: 'Maximum information density' },
      'compact': { scale: 0.85, label: 'Compact', description: 'High density' },
      'normal': { scale: 0.9, label: 'Normal', description: 'Balanced (recommended)' },
      'comfortable': { scale: 1.0, label: 'Comfortable', description: 'Spacious' },
      'large': { scale: 1.1, label: 'Large', description: 'Maximum readability' }
    };
    
    this.themeOptions = {
      'system': { label: 'System', description: 'Follow your system theme' },
      'light': { label: 'Light', description: 'Clean, bright interface' },
      'dark': { label: 'Dark', description: 'Easy on the eyes' }
    };
    
    this.init();
  }
  
  init() {
    this.loadSettings();
    this.applySettings();
    this.addSettingsToModal();
    
    // Add retry mechanism for modal detection
    let retryCount = 0;
    const maxRetries = 10;
    const retryInterval = 500; // 500ms
    
    const retryAddSettings = () => {
      if (retryCount >= maxRetries) {
        console.log('Max retries reached for adding settings to modals');
        return;
      }
      
      const desktopModal = document.getElementById('desktop-settings-modal');
      if (desktopModal) {
        const modalBody = desktopModal.querySelector('.desktop-modal-body');
        if (modalBody && !modalBody.querySelector('#desktop-scale-slider')) {
          console.log(`Retry ${retryCount + 1}: Adding desktop settings`);
          this.addToDesktopModal(desktopModal);
        }
      }
      
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(retryAddSettings, retryInterval);
      }
    };
    
    // Start retry mechanism after a short delay
    setTimeout(retryAddSettings, 1000);
    
    // Also try when DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.addSettingsToModal(), 500);
      });
    }
    
    // Listen for modal events if available
    document.addEventListener('click', (e) => {
      if (e.target && (e.target.id === 'desktop-settings-btn' || e.target.closest('#desktop-settings-btn'))) {
        // Settings button clicked, ensure our settings are added
        setTimeout(() => {
          console.log('Settings button clicked, ensuring settings are added');
          this.addSettingsToModal();
        }, 100);
      }
    });
  }
  
  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      this.settings = saved ? JSON.parse(saved) : { ...this.defaults };
    } catch (e) {
      console.warn('Failed to load scale settings, using defaults');
      this.settings = { ...this.defaults };
    }
  }
  
  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Failed to save scale settings');
    }
  }
  
  /**
   * Apply current settings to the document body
   */
  applySettings() {
    const body = document.body;
    
    const expectedMobileClass = `mobile-scale-${this.settings.mobile}`;
    const expectedDesktopClass = `desktop-scale-${this.settings.desktop}`;
    
    // Only apply changes if the current classes don't match expected
    if (!body.classList.contains(expectedMobileClass) || !body.classList.contains(expectedDesktopClass)) {
      // Remove existing scale classes
      this.removeScaleClasses(body);
      
      // Apply current settings
      body.classList.add(expectedMobileClass);
      body.classList.add(expectedDesktopClass);
    }
    
    // Apply theme - including system theme detection
    body.classList.remove('dark-theme', 'light-theme');
    
    if (this.settings.theme === 'system') {
      // Follow system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        body.classList.add('dark-theme');
      } else {
        body.classList.add('light-theme');
      }
    } else if (this.settings.theme === 'dark') {
      body.classList.add('dark-theme');
    } else if (this.settings.theme === 'light') {
      body.classList.add('light-theme');
    }
    
    // Notify the main theme system about the current theme
    window.dispatchEvent(new CustomEvent('scaleSettingsChanged', {
      detail: { type: 'theme', value: this.settings.theme }
    }));
    
    // Also update the existing theme dropdowns if they exist
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle && mobileThemeToggle.value !== this.settings.theme) {
      mobileThemeToggle.value = this.settings.theme;
    }
    
    const desktopThemeToggle = document.getElementById('desktop-theme-toggle');  
    if (desktopThemeToggle && desktopThemeToggle.value !== this.settings.theme) {
      desktopThemeToggle.value = this.settings.theme;
    }
  }
  
  /**
   * Remove all scale classes from element
   */
  removeScaleClasses(element) {
    const scaleClasses = element.classList.value.match(/(?:mobile|desktop)-scale-\w+/g) || [];
    scaleClasses.forEach(cls => element.classList.remove(cls));
  }
  
  /**
   * Update a setting and apply changes
   */
  updateSetting(type, value) {
    if (this.settings[type] !== value) {
      this.settings[type] = value;
      this.saveSettings();
      this.applySettings();
      
      // Trigger a custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('scaleSettingsChanged', {
        detail: { type, value, settings: { ...this.settings } }
      }));
    }
  }
  
  /**
   * Manually reinitialize settings (useful for debugging)
   */
  reinitialize() {
    console.log('Reinitializing scale settings...');
    this.addSettingsToModal();
  }
  
  /**
   * Add scale settings to the existing settings modal
   */
  addSettingsToModal() {
    // For mobile settings modal
    const mobileModal = document.getElementById('mobile-settings-modal');
    if (mobileModal) {
      console.log('Found mobile modal, adding mobile settings');
      this.addToMobileModal(mobileModal);
    } else {
      console.log('Mobile modal not found');
    }
    
    // For desktop settings modal  
    const desktopModal = document.getElementById('desktop-settings-modal');
    if (desktopModal) {
      console.log('Found desktop modal, adding desktop settings');
      this.addToDesktopModal(desktopModal);
    } else {
      console.log('Desktop modal not found');
    }
    
    // If we found mobile modal but not desktop, and we're on a larger screen,
    // add desktop settings to the mobile modal as well
    const screenWidth = window.innerWidth;
    if (mobileModal && !desktopModal && screenWidth >= 768) {
      console.log('Adding desktop settings to mobile modal for larger screen');
      const desktopSection = this.createDesktopScaleSection();
      const modalBody = mobileModal.querySelector('.mobile-modal-body');
      if (modalBody) {
        // Add separator
        const separator = document.createElement('hr');
        separator.style.margin = '24px 0';
        separator.style.border = 'none';
        separator.style.borderTop = '1px solid #e1e4e8';
        modalBody.appendChild(separator);
        
        // Add desktop section with header
        const desktopHeader = document.createElement('h4');
        desktopHeader.textContent = 'Desktop Scale';
        desktopHeader.style.margin = '0 0 16px 0';
        desktopHeader.style.fontSize = '16px';
        desktopHeader.style.fontWeight = '600';
        desktopHeader.style.color = '#24292f';
        modalBody.appendChild(desktopHeader);
        
        modalBody.appendChild(desktopSection);
        
        // Attach listeners
        this.attachDesktopSliderListeners(desktopSection);
        this.styleDesktopSlider(desktopSection);
      }
    }
  }
  
  /**
   * Add settings to mobile modal
   */
  addToMobileModal(modal) {
    const modalBody = modal.querySelector('.mobile-modal-body');
    if (!modalBody) return;
    
    const scaleSection = this.createMobileScaleSection();
    modalBody.appendChild(scaleSection);
    
    // Attach event listeners and styling
    this.attachMobileSliderListeners(scaleSection);
    this.styleMobileSlider(scaleSection);
  }
  
  /**
   * Add settings to desktop modal
   */
  addToDesktopModal(modal) {
    const modalBody = modal.querySelector('.desktop-modal-body');
    if (!modalBody) {
      console.log('Desktop modal body not found');
      return;
    }
    
    // Check if we've already added our settings
    if (modalBody.querySelector('#desktop-scale-slider')) {
      console.log('Desktop scale settings already exist');
      return;
    }
    
    console.log('Adding desktop scale section to modal');
    const scaleSection = this.createDesktopScaleSection();
    modalBody.appendChild(scaleSection);
    
    // Attach event listeners and styling
    this.attachDesktopSliderListeners(scaleSection);
    this.styleDesktopSlider(scaleSection);
  }
  
  /**
   * Create mobile scale settings section - Unified Design
   */
  createMobileScaleSection() {
    const section = document.createElement('div');
    section.style.marginBottom = '24px';
    
    section.innerHTML = `
      <!-- Layout Density -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label style="font-size: 14px; font-weight: 500; color: #24292f;">Layout Density</label>
          <span id="mobile-scale-value" style="font-size: 13px; font-weight: 600; color: #667eea; padding: 2px 8px; background: rgba(102, 126, 234, 0.1); border-radius: 12px;">
            ${this.mobileOptions[this.settings.mobile].label}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; color: #656d76;">Compact</span>
          <span style="font-size: 12px; color: #656d76;">Spacious</span>
        </div>
        <div style="position: relative;">
          <input type="range" id="mobile-scale-slider" min="0" max="4" step="1" 
                 value="${Object.keys(this.mobileOptions).indexOf(this.settings.mobile)}"
                 style="width: 100%; height: 6px; -webkit-appearance: none; appearance: none; 
                        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); 
                        border-radius: 3px; outline: none;">
        </div>
        <div style="font-size: 12px; color: #656d76; margin-top: 6px; text-align: center;" id="mobile-scale-description">
          ${this.mobileOptions[this.settings.mobile].description}
        </div>
      </div>
      
      <!-- Theme -->
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label style="font-size: 14px; font-weight: 500; color: #24292f;">Theme</label>
          <span id="mobile-theme-value" style="font-size: 13px; font-weight: 600; color: #667eea; padding: 2px 8px; background: rgba(102, 126, 234, 0.1); border-radius: 12px;">
            ${this.themeOptions[this.settings.theme].label}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; color: #656d76;">Light</span>
          <span style="font-size: 12px; color: #656d76;">System</span>
          <span style="font-size: 12px; color: #656d76;">Dark</span>
        </div>
        <div style="position: relative;">
          <input type="range" id="mobile-theme-slider" min="0" max="2" step="1" 
                 value="${this.settings.theme === 'light' ? 0 : (this.settings.theme === 'system' ? 1 : 2)}"
                 style="width: 100%; height: 6px; -webkit-appearance: none; appearance: none; 
                        background: linear-gradient(90deg, #fbbf24 0%, #667eea 50%, #1f2937 100%); 
                        border-radius: 3px; outline: none;">
        </div>
        <div style="font-size: 12px; color: #656d76; margin-top: 6px; text-align: center;" id="mobile-theme-description">
          ${this.themeOptions[this.settings.theme].description}
        </div>
      </div>
    `;
    
    return section;
  }
  
  /**
   * Create desktop scale settings section - Unified Design
   */
  createDesktopScaleSection() {
    const section = document.createElement('div');
    section.style.marginBottom = '24px';
    
    section.innerHTML = `
      <!-- Layout Density -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label style="font-size: 14px; font-weight: 500; color: #24292f;">Layout Density</label>
          <span id="desktop-scale-value" style="font-size: 13px; font-weight: 600; color: #667eea; padding: 2px 8px; background: rgba(102, 126, 234, 0.1); border-radius: 12px;">
            ${this.desktopOptions[this.settings.desktop].label}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; color: #656d76;">Compact</span>
          <span style="font-size: 12px; color: #656d76;">Spacious</span>
        </div>
        <div style="position: relative;">
          <input type="range" id="desktop-scale-slider" min="0" max="4" step="1" 
                 value="${Object.keys(this.desktopOptions).indexOf(this.settings.desktop)}"
                 style="width: 100%; height: 6px; -webkit-appearance: none; appearance: none; 
                        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); 
                        border-radius: 3px; outline: none;">
        </div>
        <div style="font-size: 12px; color: #656d76; margin-top: 6px; text-align: center;" id="desktop-scale-description">
          ${this.desktopOptions[this.settings.desktop].description}
        </div>
      </div>
      
      <!-- Theme -->
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label style="font-size: 14px; font-weight: 500; color: #24292f;">Theme</label>
          <span id="desktop-theme-value" style="font-size: 13px; font-weight: 600; color: #667eea; padding: 2px 8px; background: rgba(102, 126, 234, 0.1); border-radius: 12px;">
            ${this.themeOptions[this.settings.theme].label}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; color: #656d76;">Light</span>
          <span style="font-size: 12px; color: #656d76;">System</span>
          <span style="font-size: 12px; color: #656d76;">Dark</span>
        </div>
        <div style="position: relative;">
          <input type="range" id="desktop-theme-slider" min="0" max="2" step="1" 
                 value="${this.settings.theme === 'light' ? 0 : (this.settings.theme === 'system' ? 1 : 2)}"
                 style="width: 100%; height: 6px; -webkit-appearance: none; appearance: none; 
                        background: linear-gradient(90deg, #fbbf24 0%, #667eea 50%, #1f2937 100%); 
                        border-radius: 3px; outline: none;">
        </div>
        <div style="font-size: 12px; color: #656d76; margin-top: 6px; text-align: center;" id="desktop-theme-description">
          ${this.themeOptions[this.settings.theme].description}
        </div>
      </div>
    `;
    
    return section;
  }
  
  /**
   * Create scale options buttons (legacy method - keeping for compatibility)
   */
  createScaleOptions(options, currentValue, type) {
    return Object.entries(options).map(([key, option]) => {
      const isSelected = this.settings[type] === key;
      return `
        <button type="button" 
                class="scale-option ${isSelected ? 'selected' : ''}"
                data-scale-type="${type}"
                data-scale-value="${key}"
                style="
                  display: block;
                  width: 100%;
                  margin-bottom: 8px;
                  padding: 12px 16px;
                  background: ${isSelected ? '#667eea' : '#ffffff'};
                  color: ${isSelected ? '#ffffff' : '#24292f'};
                  border: 2px solid ${isSelected ? '#667eea' : '#e1e4e8'};
                  border-radius: 8px;
                  font-size: 14px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  text-align: left;
                ">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600;">${option.label}</span>
            <span style="font-size: 12px; opacity: 0.8;">${Math.round(option.scale * 100)}%</span>
          </div>
          <div style="font-size: 12px; opacity: 0.8; margin-top: 4px;">
            ${option.description}
          </div>
        </button>
      `;
    }).join('');
  }
  
  /**
   * Create desktop scale options as radio buttons
   */
  createDesktopScaleOptions() {
    return Object.entries(this.desktopOptions).map(([key, option]) => {
      const isSelected = this.settings.desktop === key;
      return `
        <label style="
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          margin-bottom: 4px;
          border-radius: 6px;
          cursor: pointer;
          background: ${isSelected ? 'rgba(102, 126, 234, 0.1)' : 'transparent'};
          transition: background 0.2s ease;
        ">
          <input type="radio" 
                 name="desktop-scale" 
                 value="${key}"
                 ${isSelected ? 'checked' : ''}
                 style="accent-color: #667eea;">
          <div style="flex: 1;">
            <div style="font-weight: 500; color: #374151; font-size: 14px;">
              ${option.label} <span style="font-size: 12px; color: #6b7280;">(${Math.round(option.scale * 100)}%)</span>
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              ${option.description}
            </div>
          </div>
        </label>
      `;
    }).join('');
  }
  
  /**
   * Attach event listeners to mobile slider
   */
  attachMobileSliderListeners(section) {
    // Layout Density Slider
    const scaleSlider = section.querySelector('#mobile-scale-slider');
    const scaleValueDisplay = section.querySelector('#mobile-scale-value');
    const scaleDescription = section.querySelector('#mobile-scale-description');
    
    if (scaleSlider) {
      scaleSlider.addEventListener('input', (e) => {
        const index = parseInt(e.target.value);
        const scaleKeys = Object.keys(this.mobileOptions);
        const selectedKey = scaleKeys[index];
        const option = this.mobileOptions[selectedKey];
        
        // Update displays
        scaleValueDisplay.textContent = option.label;
        scaleDescription.textContent = option.description;
        
        // Update setting
        this.updateSetting('mobile', selectedKey);
      });
    }

    // Theme Slider
    const themeSlider = section.querySelector('#mobile-theme-slider');
    const themeValueDisplay = section.querySelector('#mobile-theme-value');
    const themeDescription = section.querySelector('#mobile-theme-description');
    
    if (themeSlider) {
      // Enable the theme slider
      themeSlider.disabled = false;
      themeSlider.style.opacity = '1';
      themeSlider.style.cursor = 'pointer';
      themeSlider.title = 'Switch between light, system, and dark themes';
      
      themeSlider.addEventListener('input', (e) => {
        const sliderValue = parseInt(e.target.value);
        let themeValue;
        
        switch (sliderValue) {
          case 0:
            themeValue = 'light';
            break;
          case 1:
            themeValue = 'system';
            break;
          case 2:
            themeValue = 'dark';
            break;
          default:
            themeValue = 'system';
            break;
        }
        
        const option = this.themeOptions[themeValue];
        
        // Update displays
        themeValueDisplay.textContent = option.label;
        if (themeDescription) {
          themeDescription.textContent = option.description;
        }
        
        // Update setting
        this.updateSetting('theme', themeValue);
      });
    }
  }
  
  /**
   * Attach event listeners to desktop slider
   */
  attachDesktopSliderListeners(section) {
    // Layout Density Slider
    const scaleSlider = section.querySelector('#desktop-scale-slider');
    const scaleValueDisplay = section.querySelector('#desktop-scale-value');
    const scaleDescription = section.querySelector('#desktop-scale-description');
    
    if (scaleSlider) {
      scaleSlider.addEventListener('input', (e) => {
        const index = parseInt(e.target.value);
        const scaleKeys = Object.keys(this.desktopOptions);
        const selectedKey = scaleKeys[index];
        const option = this.desktopOptions[selectedKey];
        
        // Update displays
        scaleValueDisplay.textContent = option.label;
        scaleDescription.textContent = option.description;
        
        // Update setting
        this.updateSetting('desktop', selectedKey);
      });
    }

    // Theme Slider
    const themeSlider = section.querySelector('#desktop-theme-slider');
    const themeValueDisplay = section.querySelector('#desktop-theme-value');
    const themeDescription = section.querySelector('#desktop-theme-description');
    
    if (themeSlider) {
      // Enable the theme slider
      themeSlider.disabled = false;
      themeSlider.style.opacity = '1';
      themeSlider.style.cursor = 'pointer';
      themeSlider.title = 'Switch between light, system, and dark themes';
      
      themeSlider.addEventListener('input', (e) => {
        const sliderValue = parseInt(e.target.value);
        let themeValue;
        
        switch (sliderValue) {
          case 0:
            themeValue = 'light';
            break;
          case 1:
            themeValue = 'system';
            break;
          case 2:
            themeValue = 'dark';
            break;
          default:
            themeValue = 'system';
            break;
        }
        
        const option = this.themeOptions[themeValue];
        
        // Update displays
        themeValueDisplay.textContent = option.label;
        if (themeDescription) {
          themeDescription.textContent = option.description;
        }
        
        // Update setting
        this.updateSetting('theme', themeValue);
      });
    }
  }
  
  /**
   * Style mobile slider with custom appearance
   */
  styleMobileSlider(section) {
    const slider = section.querySelector('#mobile-scale-slider');
    
    // Add custom slider styling
    const style = document.createElement('style');
    style.textContent = `
      #mobile-scale-slider::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #667eea;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      #mobile-scale-slider::-webkit-slider-thumb:hover {
        background: #5a67d8;
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      
      #mobile-scale-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #667eea;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      #mobile-scale-slider::-moz-range-thumb:hover {
        background: #5a67d8;
        transform: scale(1.1);
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Style desktop slider with custom appearance
   */
  styleDesktopSlider(section) {
    const slider = section.querySelector('#desktop-scale-slider');
    
    // Add custom slider styling for desktop
    const style = document.createElement('style');
    style.textContent = `
      #desktop-scale-slider::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #667eea;
        border: 2px solid #ffffff;
        box-shadow: 0 1px 4px rgba(102, 126, 234, 0.3);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      #desktop-scale-slider::-webkit-slider-thumb:hover {
        background: #5a67d8;
        transform: scale(1.15);
        box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
      }
      
      #desktop-scale-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #667eea;
        border: 2px solid #ffffff;
        box-shadow: 0 1px 4px rgba(102, 126, 234, 0.3);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      #desktop-scale-slider::-moz-range-thumb:hover {
        background: #5a67d8;
        transform: scale(1.15);
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Get current settings
   */
  getSettings() {
    return { ...this.settings };
  }
  
  /**
   * Reset to defaults
   */
  resetToDefaults() {
    this.settings = { ...this.defaults };
    this.saveSettings();
    this.applySettings();
    
    // Update any open modals
    this.updateModalDisplays();
  }
  
  /**
   * Update modal displays after settings change
   */
  updateModalDisplays() {
    // Update mobile modal if open
    const mobileOptions = document.getElementById('mobile-scale-options');
    if (mobileOptions) {
      mobileOptions.innerHTML = this.createScaleOptions('mobile', this.mobileOptions);
    }
    
    // Update desktop modal if open
    const desktopOptions = document.getElementById('desktop-scale-options');
    if (desktopOptions) {
      desktopOptions.innerHTML = this.createDesktopScaleOptions();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.scaleSettingsManager = new ScaleSettingsManager();
});

// Also initialize immediately if DOM is already ready
if (document.readyState === 'loading') {
  // DOM not ready yet
} else {
  // DOM already ready
  window.scaleSettingsManager = new ScaleSettingsManager();
}

// Add a temporary test interface (remove in production)
window.testScaling = function() {
  const body = document.body;
  
  // Cycle through mobile scales for demo
  const mobileScales = ['small', 'compact', 'normal', 'comfortable', 'large'];
  let currentIndex = mobileScales.indexOf(window.scaleSettingsManager.settings.mobile);
  let nextIndex = (currentIndex + 1) % mobileScales.length;
  
  console.log(`Switching from ${mobileScales[currentIndex]} to ${mobileScales[nextIndex]}`);
  window.scaleSettingsManager.updateSetting('mobile', mobileScales[nextIndex]);
};

// Global function for manual debugging
window.initScaleSettings = function() {
  console.log('Manual scale settings initialization...');
  if (window.scaleSettingsManager) {
    window.scaleSettingsManager.reinitialize();
  } else {
    window.scaleSettingsManager = new ScaleSettingsManager();
  }
};

// Also make it available for manual testing
window.addDesktopScaleSettings = function() {
  console.log('Manually adding desktop scale settings...');
  const desktopModal = document.getElementById('desktop-settings-modal');
  if (desktopModal && window.scaleSettingsManager) {
    window.scaleSettingsManager.addToDesktopModal(desktopModal);
    console.log('Desktop settings added successfully');
  } else {
    console.log('Desktop modal not found or settings manager not initialized');
  }
};
