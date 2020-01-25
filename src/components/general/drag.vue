<template>
<section>
  <div class='item'>I'm an item</div>
  <div class='item'>I'm an item</div>
  <div class='item'>I'm an item</div>

  <div class="dropzone">
    <h3>Dropzone</h3>
  </div>
</section>
</template>
<script>
import interact from 'interactjs'
export default {
  name: 'drag',
  components: {
  },
  props: [],
  data () {
    return {
    }
  },
  methods: {
    startQuiz () {
      this.$emit('startQuiz')
    },
    skip () {
      this.$emit('quizDone')
    }
  },
  computed: {
  },
  mounted: function () {
    interact('.item')
      .draggable({
        onmove: function (event) {
          const target = event.target

          const dataX = target.getAttribute('data-x')
          const dataY = target.getAttribute('data-y')
          console.log(dataX, dataY)
          const initialX = parseFloat(dataX) || 0
          const initialY = parseFloat(dataY) || 0

          const deltaX = event.dx
          const deltaY = event.dy

          const newX = initialX + deltaX
          const newY = initialY + deltaY

          target
            .style
            .transform = `translate(${newX}px, ${newY}px)`

          target.setAttribute('data-x', newX)
          target.setAttribute('data-y', newY)
        }
      })
  }
}
</script>
<style scoped>
.item {
  touch-action: none;
  user-select: none;
  }
</style>
