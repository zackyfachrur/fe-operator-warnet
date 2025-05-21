<template>
  <div id="map" style="height: 500px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";

const computers = ref([
  {
    id: 1,
    name: "Afrijeng Cyber Cabang Ke - 3",
    description: "Warnet Samping Tiang",
    lat: -6.354401529419673,
    lng: 106.84288260487138,
  },
  {
    id: 2,
    name: "Afrijeng Cyber Cabang Ke - 2",
    description: "Warnet Depan Warung",
    lat: -6.35435634152829,
    lng: 106.8426410602521,
  },
  {
    id: 3,
    name: "Afrijeng Cyber Cabang Ke - 1",
    description: "Warnet Soto Mie Ayam",
    lat: -6.3540390371202955,
    lng: 106.84289241276862,
  },
]);
onMounted(() => {
  const map = L.map("map", {
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    dragging: true,
    touchZoom: false,
  }).setView([-6.3540390371202955, 106.84289241276862], 18);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  computers.value.forEach((comp) => {
    L.marker([comp.lat, comp.lng])
      .addTo(map)
      .bindPopup(`<b>${comp.name}</b><br>Lokasi: ${comp.description}`)
      .openPopup();
  });
});
</script>

<style>
/* Leaflet default styles */
@import "leaflet/dist/leaflet.css";

#map {
  width: 100%;
  height: 500px;
  padding: 2rem;
  background-color: white;
  border-radius: 20px;
  z-index: 0;
}
</style>
