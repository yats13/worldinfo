<script>
import { Doughnut } from 'vue-chartjs'
export default {
extends: Doughnut,
props:['labels', 'options'],
    mounted() {
        console.log(this.labels)
        console.log(this.options)
        this.renderChart()
    }
}
</script>