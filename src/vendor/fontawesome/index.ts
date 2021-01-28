import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// Brands
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

// Solid
import {
  faSpinner,
  faSearch,
  faCog,
  faSyncAlt,
  faBorderAll,
  faTv,
  faUserTag
} from '@fortawesome/free-solid-svg-icons'

//Regular
import { faUser, faBookmark } from '@fortawesome/free-regular-svg-icons'

library.add(
  // Brands
  faFacebookSquare,
  // Solid
  faSpinner,
  faSearch,
  faCog,
  faSyncAlt,
  faBorderAll,
  faTv,
  faUserTag,
  // Regular
  faUser,
  faBookmark
)

Vue.component('fa-icon', FontAwesomeIcon)
