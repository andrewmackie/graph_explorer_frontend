import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

/* Call this.$_.lodashFunction() */

Vue.use(VueLodash, { name: '$_', lodash })
