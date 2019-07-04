<template>
  <v-dialog @input="close" v-model="opened" :max-width="width" :persistent="persistent">
    <v-toolbar
      v-if="!!title"
      :dark="titleColor === 'light'"
      :light="titleColor === 'dark'"
      :color="titleBackground">
      <v-icon v-if="!!icon">{{ icon }}</v-icon>
      <v-toolbar-title class="headline" v-text="title"/>
    </v-toolbar>
    <v-card tile>
      <v-card-text v-if="message" v-html="message"/>
      <v-card-text v-if="code" class="alert-code">
        <pre v-html="code"></pre>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer/>
        <v-btn :color="btnCloseColor" flat @click="close(true)">{{ btnCloseLabel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createElement, removeElement } from '../utils'

export default {
  name: 'x-alert',
  props: {
    btnCloseLabel: {
      type: String,
      default: 'Close'
    },
    btnCloseColor: {
      type: String
    },
    icon: {
      type: String
    },
    message: {
      type: String,
      required: true
    },
    code: {
      type: String
    },
    title: {
      type: String
    },
    titleColor: {
      type: String,
      default: 'dark'
    },
    titleBackground: {
      type: String,
      default: 'grey lighten-2'
    },
    width: {
      type: Number,
      default: 500
    },
    persistent: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    close () {
      if (this.opened) this.opened = false

      // wait for close animation
      requestAnimationFrame(() => {
        // execute user on close
        if (this.onClose && typeof this.onClose === 'function') {
          this.onClose()
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
  }
}
</script>

<style>
  .alert-code {
    overflow: auto;
    background: #eee;
  }
</style>

