<template>
  <div>
    <div class="footer">
      <div class="navbar-home">
        <nuxt-link to="/" class="menuFooter">
          <font-awesome-icon :icon="['fas', 'home']" style="width:25px; font-size:20px;"/>
          <span class="text-menuFooter">Beranda</span>
        </nuxt-link>
        <nuxt-link to="/kategori" class="menuFooter">
          <font-awesome-icon :icon="['fas', 'th-large']" style="width:25px; font-size:20px;"/>
          <span class="text-menuFooter">Kategori</span>
        </nuxt-link>
        <nuxt-link to="/favorit" class="menuFooter">
          <font-awesome-icon :icon="['fas', 'star']" style="width:25px; font-size:20px;"/>
          <span class="text-menuFooter">Favorit</span>
        </nuxt-link>
        <nuxt-link to="/notif" class="menuFooter">
          <font-awesome-icon :icon="['fas', 'bell']" style="width:25px; font-size:20px;"/>
          <span class="text-menuFooter">Notif</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

export default {
  data() {
    return {

    };
  },
  components: {
  },
}
</script>

<style>

@media(min-width: 480px){
  .footer{
    list-style-type: none;
    display: inline-block;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    font-weight: 600;
    line-height: 13px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    max-width: 480px;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%);
    z-index: 2;
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    border-width: 1px 0px 0px;
    border-image: initial;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    /* padding: 10px; */
    border-top: 1px solid rgb(222, 222, 222);
    box-shadow: 0px 0px 2px 0px lightgrey;
    margin: 0px;
  }
  .navbar-home{
    display: flex;
    justify-content: space-around;
  }
  .menuFooter{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    color: gainsboro;
  }
  .exact-active-link {
    color: #00aeef;
  }
  /* .iconmenuFooter{
    font-size: 20px !important;
    width: 25px !important;
  } */
  .text-menuFooter{
    font-size: 12px;
    /* color: #1a1a1a; */
    line-height: 16px;
    margin-top: 8px;
  }
}

@media(max-width: 480px){
  .footer{
    list-style-type: none;
    display: inline-block;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    font-weight: 600;
    line-height: 13px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    max-width: 100%;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%);
    z-index: 2;
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    border-width: 1px 0px 0px;
    border-image: initial;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    /* padding: 10px; */
    border-top: 1px solid rgb(222, 222, 222);
    box-shadow: 0px 0px 2px 0px lightgrey;
    margin: 0px;
  }
  .navbar-home{
    display: flex;
    justify-content: space-around;
  }
  .menuFooter{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    color: gainsboro;
  }
  .exact-active-link {
    color: #00aeef;
  }
  /* .iconmenuFooter{
    font-size: 20px !important;
    width: 25px !important;
  } */
  .text-menuFooter{
    font-size: 12px;
    /* color: #1a1a1a; */
    line-height: 16px;
    margin-top: 8px;
  }
}
</style>
