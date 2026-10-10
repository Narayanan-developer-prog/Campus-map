// Unga college: Google Maps la 12.851178, 80.170949 (lat, lng)
const campus = [80.170949, 12.851178]; // MapLibre order: [lng, lat]

const map = new maplibregl.Map({
  container: "map",
  center: campus,
  zoom: 17,
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster", tileSize: 256,
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        attribution: "© OpenStreetMap contributors",
      },
      sat: {
        type: "raster", tileSize: 256,
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
        attribution: "Esri",
      },
    },
    layers: [
      { id: "osm", type: "raster", source: "osm" },
      { id: "sat", type: "raster", source: "sat", layout: { visibility: "none" } },
    ],
  },
});

new maplibregl.Marker()
  .setLngLat(campus)
  .setPopup(new maplibregl.Popup().setHTML("<b>Main Gate</b>"))
  .addTo(map);

const mapEl = document.getElementById("map");
let sat = false;
document.getElementById("toggle").onclick = () => {
  sat = !sat;
  map.setLayoutProperty("sat", "visibility", sat ? "visible" : "none");
  mapEl.classList.toggle("dark", !sat); // satellite-la dark filter venaam
};