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
      <v-card-text class="pa-4" v-html="message"/>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer/>
        <v-btn :color="btnTrueColor" flat @click="close(true)">{{ btnTrueLabel }}</v-btn>
        <v-btn :color="btnFalseColor" flat @click="close(false)">{{ btnFalseLabel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createElement, removeElement } from '../utils'

export default {
  props: {
    btnTrueLabel: {
      type: String,
      default: 'Yes'
    },
    btnFalseLabel: {
      type: String,
      default: 'No'
    },
    btnTrueColor: {
      type: String,
      default: 'primary'
    },
    btnFalseColor: {
      type: String,
      default: 'grey'
    },
    icon: {
      type: String
    },
    message: {
      type: String,
      required: true
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
      default: 300
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
      opened: false,
      confirmed: false
    }
  },
  methods: {
    close (confirmed = false) {
      // close dialog
      if (this.opened) this.opened = false

      // set value
      this.confirmed = confirmed

      // wait for close animation
      requestAnimationFrame(() => {
        // execute user on close
        if (this.onClose && typeof this.onClose === 'function') {
          this.onClose(confirmed)
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
