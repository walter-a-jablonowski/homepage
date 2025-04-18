/**
 * Walter A. Jablonowski - Personal Website
 * Map implementation using Leaflet
 */

class MapController {
  constructor() {
    this.mapElement = document.getElementById('map');
    this.bambergCoords = [49.8988, 10.9027]; // Bamberg coordinates
    this.map = null;
    
    // Initialize the map when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.loadMapResources();
    });
  }
  
  /**
   * Load Leaflet resources and initialize map
   */
  loadMapResources() {
    // Create link element for Leaflet CSS if not already present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      document.head.appendChild(leafletCss);
    }
    
    // Create script element for Leaflet JS if not already loaded
    if (typeof L === 'undefined') {
      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      leafletScript.onload = () => this.initMap();
      document.head.appendChild(leafletScript);
    } else {
      // Leaflet already loaded, initialize map
      this.initMap();
    }
  }
  
  /**
   * Initialize the map
   */
  initMap() {
    if (!this.mapElement) return;
    
    // Create map
    this.map = L.map('map').setView(this.bambergCoords, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
    // Add marker for Bamberg
    L.marker(this.bambergCoords).addTo(this.map)
      .bindPopup('Walter A. Jablonowski<br>Bamberg, Germany')
      .openPopup();
  }
}

// Initialize the map controller
const mapController = new MapController();
