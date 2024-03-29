import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// Brands
import {
  faFacebookSquare,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

// Solid
import {
  faSpinner,
  faSearch,
  faCog,
  faSyncAlt,
  faBorderAll,
  faTv,
  faUserTag,
  faEllipsisH,
  faTimes,
  faHeart as faHeartSolid,
  faCameraRetro,
  faHome,
  faChevronLeft,
  faCheckCircle,
  faExclamation,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

//Regular
import {
  faUser,
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile,
  faPlusSquare
} from '@fortawesome/free-regular-svg-icons'

library.add(
  // Brands
  faFacebookSquare,
  faInstagram,

  // Solid
  faSpinner,
  faSearch,
  faCog,
  faSyncAlt,
  faBorderAll,
  faTv,
  faUserTag,
  faEllipsisH,
  faTimes,
  faHeartSolid,
  faCameraRetro,
  faHome,
  faPlusSquare,
  faChevronLeft,
  faCheckCircle,
  faExclamation,
  faExclamationTriangle,

  // Regular
  faUser,
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile
)

Vue.component('fa-icon', FontAwesomeIcon)
