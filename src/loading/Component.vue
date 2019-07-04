<template>
  <v-dialog
    @input="complete"
    v-model="opened"
    :max-width="width"
    persistent>
    <v-card
      :color="color"
      :dark="messageColor === 'light'"
      :light="messageColor === 'dark'">
      <v-card-text>
        {{ message }}
        <v-progress-linear
          indeterminate
          :color="progressColor"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createElement, removeElement } from '../utils'

export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    width: {
      type: Number,
      default: 300
    },
    message: {
      type: String,
      default: 'Please stand by..'
    },
    messageColor: {
      type: String,
      default: 'light'
    },
    progressColor: {
      type: String,
      default: 'white'
    },
    onProgress: {
      type: Function,
      default: (vm) => setTimeout(() => vm.complete(true), 3000)
    },
    onCompleted: {
      type: Function
    }
  },
  data () {
    return {
      opened: false,
      success: false,
      failed: false
    }
  },
  methods: {
    complete (success = false) {
      if (this.opened) this.opened = false

      this.success = success
      this.failed = !success

      // wait for close animation
      requestAnimationFrame(() => {
        // execute user on close
        if (this.onCompleted && typeof this.onCompleted === 'function') {
          this.onCompleted(this)
        }

        this.$destroy()
        removeElement(this.$el)
      })
    }
  },
  beforeMount () {
    createElement(this.$el)
  },
  mounted () {
    this.opened = true

    // execute user on progress
    if (this.onProgress && typeof this.onProgress === 'function') {
      this.onProgress(this)
    }
  }
}
</script>

<style>
  .alert-code {
    overflow: auto;
    background: #eee;
  }
</style>

