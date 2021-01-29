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
  faUserTag,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'

//Regular
import { faUser, faBookmark, faComment, faHeart, faPaperPlane, faSmile } from '@fortawesome/free-regular-svg-icons'

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
  faEllipsisH,
  
  // Regular
  faUser,
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile
)

Vue.component('fa-icon', FontAwesomeIcon)
