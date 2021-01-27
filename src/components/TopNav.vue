<template>
  <nav class="main-nav">
    <div class="nav-content mx-auto">
      <div class="logo"><h1>Instagram</h1></div>
      <div class="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          class="search-input"
        />

        <fa-icon icon="search" class="icon"></fa-icon>
      </div>
      <div class="action-buttons">
        <img :src="require('@/assets/img/home.svg')" alt="" class="icon" />
        <img :src="require('@/assets/img/message.svg')" alt="" class="icon" />
        <img :src="require('@/assets/img/compass.svg')" alt="" class="icon" />
        <img :src="require('@/assets/img/heart.svg')" alt="" class="icon" />
        <img
          :src="require('@/assets/img/user-pic-placeholder.jpg')"
          alt=""
          class="user-pic"
          :class="{'dropdown-open': showProfileDropdown}"
          @click="showProfileDropdown = !showProfileDropdown"
        />

        <div class="profile-dropdown" :class="{show: showProfileDropdown}">
            <div class="arrow"></div>
          <div class="item">
            <div class="icon-column">
              <fa-icon class="fa-fw" :icon="['far', 'user']"></fa-icon>
            </div>
            <div class="text">Profile</div>
          </div>
          <div class="item">
            <div class="icon-column">
              <fa-icon class="fa-fw" :icon="['far', 'bookmark']"></fa-icon>
            </div>
            <div class="text">Saved</div>
          </div>
          <div class="item">
            <div class="icon-column">
              <fa-icon class="fa-fw" icon="cog"></fa-icon>
            </div>
            <div class="text">Settings</div>
          </div>
          <div class="item">
            <div class="icon-column">
              <fa-icon class="fa-fw" icon="sync-alt"></fa-icon>
            </div>
            <div class="text">Switch Accounts</div>
          </div>
          </div>
        </div>
        <!-- <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>landing page, home, house, building, web</title><path d="M21.8,6.78,13.68,1.49a3.1,3.1,0,0,0-3.36,0L2.2,6.78A2.46,2.46,0,0,0,1,8.84V23h9V17.43h4V23h9V8.84A2.46,2.46,0,0,0,21.8,6.78ZM21,21H16V15.43H8V21H3V8.84a.49.49,0,0,1,.26-.39l8.12-5.29a1.14,1.14,0,0,1,1.18,0l8.12,5.29a.49.49,0,0,1,.26.39Z"/></svg> -->
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class TopNav extends Vue {
  showProfileDropdown = false
}
</script>

<style lang="scss" scoped>
.main-nav {
  height: 54px;
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid rgb(219, 219, 219);
  display: grid;
  align-items: center;
}

.nav-content {
  width: 975px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 5rem;
  align-items: center;
}

.search-container {
  position: relative;
  padding: 0 3rem;
  .icon {
    position: absolute;
    top: 50%;
    left: 4rem;
    transform: translateY(-50%);
    color: mix(#000, #fff, 30%);
  }
}

.search-input {
  padding: 0.5rem 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid mix(#000, #fff, 20%);
  background-color: mix(#000, #fff, 5%);
  border-radius: 3px;
  font-size: 0.9rem;
  width: 100%;
}

.action-buttons {
  justify-self: end;
  display: grid;
  grid-template-columns: repeat(5, 25px);
  column-gap: 2rem;
  align-items: center;
  position: relative;
  .icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .user-pic {
    border-radius: 50%;
    width: 27px;
    height: 27px;
    cursor: pointer;
    border: 2px solid transparent;

    &.dropdown-open {
      border-color: #000;
    }
  }
}

.profile-dropdown {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 150%;
  right: -0.5rem;
  width: 225px;
  transform: translateY(-10px);
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;

  &.show {
    transform: translateY(0px);
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  }

  .item {
    display: grid;
    grid-template-columns: 25px auto;
    padding: 0.75rem;
    cursor: pointer;

    &:hover {
      background-color: mix(#000, #fff, 3%);
    }
  }

  .arrow {
    display: none;
    position: absolute;
    top: -0.5rem;
    right: 0.8rem;
    background-color: #fff;
    width: 15px;
    height: 15px;
    transform: rotateZ(45deg);
  }
}
</style>