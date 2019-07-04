import Alert from './alert'
import Prompt from './prompt'
import Confirm from './confirm'
import Snackbar from './snackbar'
import Loading from './loading'

// import {
//   Vuetify,
//   VDialog,
//   VToolbar,
//   VDivider,
//   VSpacer,
//   VCard,
//   VIcon
// } from 'vuetify'

function Install (Vue, options = {}) {

  Vue.use(Alert, options.alert)
  Vue.use(Prompt, options.prompt)
  Vue.use(Confirm, options.confirm)
  Vue.use(Snackbar, options.snackbar)
  Vue.use(Loading, options.loading)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Install)
}

export default Install