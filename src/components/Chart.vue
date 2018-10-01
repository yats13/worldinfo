<script>
import { Doughnut } from 'vue-chartjs'
export default {
extends: Doughnut,
  mounted () {
    this.renderChart({
      labels: [  'сельское хозяйство', 'лесничества', 'карьеры и шахты', 'заводы', 'транспортные предприятия', 'строительные компании', 'компании по ремонту дорог'],
      datasets: [
        {
          label: 'Украина',
          backgroundColor: ['#e94867', '#f1c40f','#f87979','#16a085','#f39369','#2980b9','#e67e22'],
          data: [34, 20, 12, 23, 15, 40, 4]
        }
      ]
    })
  }
}
</script>
