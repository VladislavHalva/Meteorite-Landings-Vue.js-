<template>
  <div class="yearChart pageBlock">
    <div class="blockContent">
      <h4 class="chartTitle">Number of meteorite landings by date</h4>
      <canvas id="year-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      yearChartData: {
        type: "line",
        data: {
          labels: this.$store.getters.getYearHist.years,
          datasets: [
            {
              label: "Year of discovery / fall.",
              data: this.$store.getters.getYearHist.bins,
              backgroundColor: "rgba(54,73,93,.5)",
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
      const yearChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("year-chart", this.yearChartData);
  }
};
</script>

<style lang="scss">
.yearChart {
  max-width: 800px;
  max-height: 800px;
}
</style>
