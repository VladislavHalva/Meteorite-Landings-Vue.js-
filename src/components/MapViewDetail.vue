<template>
  <div class="mapViewDetail">
    <GmapMap
      :center="{ lat: lat, lng: lng }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ["lat", "lng"],
  data() {
    return {
      center: { lat: this.lat, lng: this.lng },
      markers: [
        {
          position: { lat: this.lat, lng: this.lng }
        }
      ]
    };
  }
};
</script>
