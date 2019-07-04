<template>
  <v-flex v-if="detail.type" v-bind="grids">
    <v-text-field
      v-if="is('text')"
      v-bind="params"
      @input="input"
      :value="value"
    />
    <v-text-field
      v-if="is('password')"
      v-bind="params"
      @input="input"
      :value="value"
    />
    <v-textarea
      v-if="is('textarea')"
      v-bind="params"
      @input="input"
      :value="value"
    />
    <v-select
      v-if="is('select')"
      v-bind="params"
      @input="input"
      :value="value"
    />
    <v-radio-group
      v-if="is('radios')"
      v-bind="params"
      @change="input"
      :value="value">
      <v-radio
        v-for="(opt, i) in options"
        v-bind="opt"
        :key="i"
      />
    </v-radio-group>
  </v-flex>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Number, Array, Object]
    }
  },
  computed: {
    params () {
      let detail = this.detail
      let params = detail.params || {}
      params.label = detail.label
      params.placeholder = detail.placeholder
      params.rules = detail.rules
      params.hint = detail.hint
      params.items = detail.items || detail.options || params.items || []
      params.type = detail.type === 'password' ? 'password' : 'text'
      return params
    },
    options () {
      return this.detail.options || []
    },
    grids () {
      return this.detail.grids || {}
    }
  },
  methods: {
    is (val) {
      return this.detail.type === val
    },
    input (val) {
      this.$emit('input', val)
    }
  }
}
</script>
