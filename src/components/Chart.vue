<script>
import { Doughnut } from 'vue-chartjs'
export default {
extends: Doughnut,
props:['labels', 'options'],
    mounted() {
        this.renderChart()
    }
}
</script>