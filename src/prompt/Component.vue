<template>
  <v-dialog @input="close" v-model="opened" v-bind="dialogProps">
    <vx-form-single
      ref="form"
      :title="title"
      :titleColor="titleColor"
      :titleBackground="titleBackground"
      :icon="icon"
      :message="message"
      :schemes="schemes"
      v-model="values"
      @submit="submit"
      flat>
      <template v-slot:actions="{ valid }">
        <v-spacer/>
        <v-btn
          flat
          :disabled="processing"
          :color="btnCancelColor"
          v-text="btnCancelLabel"
          @click="close"/>
        <v-btn
          type="submit"
          :disabled="!valid"
          :loading="processing"
          :color="btnSubmitColor"
          v-text="btnSubmitLabel"/>
      </template>
    </vx-form-single>
  </v-dialog>
</template>

<script>
import { createElement, removeElement } from '../utils'

export default {
  props: {
    btnSubmitLabel: {
      type: String,
      default: 'Submit'
    },
    btnCancelLabel: {
      type: String,
      default: 'Cancel'
    },
    btnSubmitColor: {
      type: String,
      default: 'primary'
    },
    btnCancelColor: {
      type: String,
      default: 'grey'
    },
    icon: {
      type: String
    },
    message: {
      type: String
    },
    title: {
      type: String
    },
    titleColor: {
      type: String,
      default: 'light'
    },
    titleBackground: {
      type: String,
      default: 'primary'
    },
    schemes: {
      type: [Array, Object]
    },
    width: {
      type: Number,
      default: 300
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: true
    },
    onSubmit: {
      type: Function
    }
  },
  data () {
    return {
      processing: false,
      opened: false,
      valid: false,
      value: null,
      values: {}
    }
  },
  computed: {
    dialogProps () {
      return {
        fullscreen: this.fullscreen,
        persistent: this.persistent,
        maxWidth: this.width
      }
    }
  },
  methods: {
    submit () {
      // validate form
      if (this.$refs.form.validate()) {
        // execute user on submit
        if (this.onSubmit && typeof this.onSubmit === 'function') {
          // close the prompt then execute user on submit
          this.close().then(() => this.onSubmit(this))
        }
      }
    },
    close () {
      // close dialog
      if (this.opened) this.opened = false

      // wait for close animation
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          this.$destroy()
          removeElement(this.$el)
          resolve()
        })
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
