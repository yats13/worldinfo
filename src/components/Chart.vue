<template>
    <div><canvas id="myChart"></canvas></div>
</template>
<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: [],
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        width: 200,
        height: 200,
        scales: {
          xAxes: [
            {
              barThickness: 10,
              ticks: {
                mirror: true,
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        backgroundColor: "#fff"
      }
    };
  },
  methods: {
    getBgColors() {
      axios
        .get("https://worldinfo.com.ua/api/categories")
        .then(response => {
          response.data.forEach(item => {
            if (item.count > 0) {
              this.chartData.labels.push(item.name);
              this.chartData.datasets[0].label.push(item.name);
              this.chartData.datasets[0].data.push(item.count);
              this.chartData.datasets[0].backgroundColor.push(item.color);
            }
          });
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    chartRender() {
      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: this.chartData,
        options: this.options
      });
      return myChart;
    }
  },
  mounted() {
    setTimeout(() => {
      this.chartRender();
    }, 400);
    this.getBgColors();
  }
};
</script>