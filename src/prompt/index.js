import Component from './Component.vue'

class Plugin {

  defaults () {
    return {
      prop: '$prompt'
    }
  }

  install (Vue, options = {}) {
    // merge defaults with options
    this.options = Object.assign({}, this.defaults(), options)

    // creates a instance method that can be used inside of a Vue component
    Vue.prototype[this.options.prop] = this.open(Vue)
  }

  open (vm) {
    return (message, params = {}) => {
      if (typeof message === 'object') {
        params = message
      } else {
        params.message = message
      }

      const Cmp = vm.extend(Component)
      return new Cmp({
        el: document.createElement('div'),
        propsData: params
      })
    }
  }

}

export default new Plugin()
