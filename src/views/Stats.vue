<template>
  <div class="stats">
    <h1 class="pageTitle pageBlock blockContent">Statistics</h1>
    <div class="chartsContainer">
      <MassChart v-if="this.$store.getters.loaded" class="chart"></MassChart>
      <YearChart v-if="this.$store.getters.loaded" class="chart"></YearChart>
      <div class="loading" v-else>Loading ...</div>
    </div>
  </div>
</template>

<script>
import MassChart from "@/components/MassChart.vue";
import YearChart from "@/components/YearChart.vue";

export default {
  name: "Stats",
  components: { MassChart, YearChart }
};
</script>
