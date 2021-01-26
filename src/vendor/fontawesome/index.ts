import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {faFacebookSquare}  from '@fortawesome/free-brands-svg-icons'

library.add(faFacebookSquare)


Vue.component('fa-icon', FontAwesomeIcon)