<template>
  <div class="massChart pageBlock" v-if="this.$store.getters.loaded">
    <h4 class="chartTitle">Number of meteorite landings by mass</h4>
    <div class="blockContent">
      <canvas id="mass-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      massChartData: {
        type: "bar",
        data: {
          labels: ["10", "100", "1000", "10K", "100K", "1M", "10M", "100M"],
          datasets: [
            {
              label: "Mass (g)",
              data: this.$store.getters.getMassHist,
              backgroundColor: "rgba(54,73,93,.7)",
              borderColor: "#36485d",
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  display: false,
                  beginAtZero: true,
                  padding: 25
                }
              }
            ],
            xAxes: [
              {
                barPercentage: 1.25
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      // eslint-disable-next-line no-unused-vars
      const massChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("mass-chart", this.massChartData);
  }
};
</script>

<style lang="scss">
.massChart {
  max-width: 800px;
  max-height: 800px;
}
</style>
