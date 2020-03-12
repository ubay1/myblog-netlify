<template>
  <div>
    <div class="footer">
      <div class="navbar-home">
        <nuxt-link to="/" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'home']" class="iconmenuFooter"/>
          <span class="text-menuFooter">Beranda</span>
        </nuxt-link>
        <nuxt-link to="/" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'th-large']" class="iconmenuFooter"/>
          <span class="text-menuFooter">Kategori</span>
        </nuxt-link>
        <nuxt-link to="/" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'star']" class="iconmenuFooter"/>
          <span class="text-menuFooter">Favorit</span>
        </nuxt-link>
        <nuxt-link to="/" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'bell']" class="iconmenuFooter"/>
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
  .iconmenuFooter{
    color: rgb(0, 174, 239);
    font-size: 20px;
  }
  .text-menuFooter{
    font-size: 12px;
    color: #1a1a1a;
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
  .iconmenuFooter{
    color: rgb(0, 174, 239);
    font-size: 20px;
  }
  .text-menuFooter{
    font-size: 12px;
    color: #1a1a1a;
    line-height: 16px;
    margin-top: 8px;
  }
}
</style>
