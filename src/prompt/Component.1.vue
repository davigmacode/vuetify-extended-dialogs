<template>
  <v-dialog @input="close" v-model="opened" v-bind="dialogProps">
    <v-toolbar
      v-if="!!title"
      :dark="titleColor === 'light'"
      :light="titleColor === 'dark'"
      :color="titleBackground">
      <v-icon v-if="!!icon">{{ icon }}</v-icon>
      <v-toolbar-title class="headline" v-text="title"/>
    </v-toolbar>
    <v-card tile>
      <v-form ref="form" @submit.prevent.stop="submit" v-model="valid" lazy-validation>
        <v-card-text v-if="!!message" v-html="message" class="pb-0 pt-4 pl-4 pr-4"/>
        <v-container class="pa-4">
          <v-layout row wrap>
            <prompt-field v-if="field" :detail="field" v-model="value"/>
            <template v-if="fields">
              <prompt-field v-for="field in fields" :key="field.slug" :detail="field" v-model="values[field.slug]"/>
            </template>
          </v-layout>
        </v-container>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            type="submit"
            :disabled="!valid"
            :color="btnSubmitColor"
            v-text="btnSubmitLabel"/>
          <v-btn
            flat
            :color="btnCancelColor"
            v-text="btnCancelLabel"
            @click="close"/>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { createElement, removeElement } from '../utils'
import PromptField from './Field.vue'

export default {
  components: {
    PromptField
  },
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
      default: 'dark'
    },
    titleBackground: {
      type: String,
      default: 'grey lighten-2'
    },
    field: {
      type: Object
    },
    fields: {
      type: Array
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
    },
    populate () {
      let field = this.field
      if (field && field.default) {
        this.value = field.default
      }

      let fields = this.fields
      if (fields && Array.isArray(fields)) {
        for (let i = 0; i < fields.length; i++) {
          let field = fields[i];
          if (field.default) {
            this.$set(this.values, field.slug, field.default)
          }
        }
      }
    }
  },
  beforeMount () {
    createElement(this.$el)
  },
  mounted () {
    this.opened = true
    this.populate()
  }
}
</script>
