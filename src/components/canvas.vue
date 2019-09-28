<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      canvas: null
    }
  },
  methods: {
    ...mapMutations('canvas', [
      'keyDownHandler',
      'keyUpHandler',
      'redraw',
      'setImages',
      'setAnswers',
      'setSymbols',
      'setQuestions',
      'update',
      'initializeValues',
      'setCanvas',
      'askQuestion'

    ]),
    ...mapGetters('canvas',[
      'getFps',
      'getMusic'
    ])
  },
  mounted() {

    this.canvas = document.getElementById('gameCanvas')
    this.initializeValues(this.canvas)
    this.redraw(this.canvas)
    window.addEventListener("resize", this.redraw, false);
    document.addEventListener("keydown", this.keyDownHandler, false);
    this.setImages()
    this.setAnswers()
    this.setSymbols()
    this.setQuestions()
    //setTimeout(function() {console.log('Why HEllo There')}, 3000)
    setInterval(this.update, 1000 / this.getFps())
    //this.getMusic().play()
  }
}
</script>

<template>
  <div class="canvas-container">
    <canvas id="gameCanvas" class="canvas" height=300 width=480>
      <!-- P Shows up if the canvas doesnt -->
      <p>Your browser does not support HTML5!</p>
    </canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: black;
}

#gameCanvas {
  background-color: lightgrey;
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: auto;
  padding-bottom: auto;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;

}

</style>
