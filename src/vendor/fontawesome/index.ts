import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// Brands
import {faFacebookSquare}  from '@fortawesome/free-brands-svg-icons'

// Solid
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

library.add(faFacebookSquare, faSpinner)


Vue.component('fa-icon', FontAwesomeIcon)