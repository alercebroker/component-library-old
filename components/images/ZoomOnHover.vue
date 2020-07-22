<template>
  <v-row class="pa-0" justify="center" align="center" style="height: 100%;">
    <v-col v-for="(image, index) in images" :key="image" class="pa-0" sm="4">
      <div
        class="zoom-on-hover"
        @mousemove="move($event, index)"
        @mouseenter="zoom"
        @mouseleave="unzoom"
      >
        <img
          :ref="'normal_' + index"
          class="normal"
          :class="customClasses"
          :src="image"
          onerror="this.src='https://via.placeholder.com/300'"
        />
        <img
          :ref="'zoom_' + index"
          class="zoom"
          :src="image"
          onerror="this.src='https://via.placeholder.com/300'"
        />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class ZoomOnHover extends Vue {
  @Prop({ type: Array, default: () => [] })
  images

  @Prop({ type: String, default: '' })
  customClasses

  @Prop({ type: Number, default: 1 })
  scale

  @Prop({ type: Boolean, default: false })
  disabled

  scaleFactor = 1
  resizeCheckIntervals = []

  mounted() {
    if (this.$props.scale) {
      this.scaleFactor = parseInt(this.$props.scale)
      for (let i = 0; i < this.images.length; i++) {
        this.$refs['zoom_' + i][0].style.transform =
          'scale(' + this.scaleFactor + ')'
      }
    }
  }

  zoom() {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.images.length; i++) {
      this.$refs['zoom_' + i][0].style.opacity = 1
      this.$refs['normal_' + i][0].style.opacity = 0
    }
  }

  unzoom() {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.images.length; i++) {
      this.$refs['zoom_' + i][0].style.opacity = 0
      this.$refs['normal_' + i][0].style.opacity = 1
    }
  }

  move(event, index) {
    if (this.disabled) {
      return
    }
    const offset = this.pageOffset(this.$el.children[index].children[0])
    let zoom = this.$refs['zoom_' + index][0]
    const normal = this.$refs['normal_' + index][0]
    const relativeX = event.clientX - offset.x + window.pageXOffset
    const relativeY = event.clientY - offset.y + window.pageYOffset
    const normalFactorX = relativeX / normal.offsetWidth
    const normalFactorY = relativeY / normal.offsetHeight
    const x =
      normalFactorX * (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth)
    const y =
      normalFactorY *
      (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight)
    for (let i = 0; i < this.images.length; i++) {
      zoom = this.$refs['zoom_' + i][0]
      zoom.style.left = -x + 'px'
      zoom.style.top = -y + 'px'
    }
  }

  pageOffset(el) {
    // -> {x: number, y: number}
    // get the left and top offset of a dom block element
    const rect = el.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return {
      y: rect.top + scrollTop,
      x: rect.left + scrollLeft,
    }
  }

  onImageError(e) {
    console.log('ERROR', e)
  }
}
</script>
<style lang="css" scoped>
.zoom-on-hover {
  position: relative;
  overflow: hidden;
}
.zoom-on-hover .normal {
  width: 100%;
}
.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
}
</style>
