<template>
  <v-snackbar
    v-model="opened"
    @input="close"
    :color="color"
    :timeout="timeout"
    :auto-height="autoHeight"
    :vertical="mode === 'vertical'"
    :multi-line="mode === 'multi-line'"
    :top="valign === 'top'"
    :bottom="valign === 'bottom'"
    :right="align === 'right'"
    :left="align === 'left'">
    {{ message }}
    <v-btn
      flat
      dark
      @click="close"
      :color="buttonCloseColor"
      v-text="buttonCloseText">
    </v-btn>
  </v-snackbar>
</template>

<script>
import { VSnackbar } from 'vuetify'
import { createElement } from '../utils'

export default {
  components: {
    VSnackbar
  },
  props: {
    autoHeight: {
      type: Boolean,
      default: true
    },
    buttonCloseText: {
      type: String,
      default: 'Close'
    },
    buttonCloseColor: {
      type: String,
      default: 'white'
    },
    color: {
      type: String,
      default: 'dark'
    },
    align: {
      type: String,
      default: 'center'
    },
    valign: {
      type: String,
      default: 'bottom'
    },
    message: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      default: 3000
    },
    mode: {
      type: String,
      default: ''
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
