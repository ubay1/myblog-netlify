<template>
  <div>
    <div class="header">
      <div class="logoSearchHeader">
        <img class="logoImg" src="img/logo.png" alt="">
        <font-awesome-icon :icon="['fas', 'search']" style="color:rgb(0, 174, 239); font-size:22px; width:22px; !important"/>
      </div>
      <div class="menuHeader">
        <nuxt-link to="/buat_lelang" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'box-open']" class="iconmenuHeader"/>
          <span class="text-menuHeader">buat <br> lelang</span>
        </nuxt-link>
        <nuxt-link to="/" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'fire-alt']" class="iconmenuHeader"/>
          <span class="text-menuHeader">lelang <br> terkini</span>
        </nuxt-link>
        <nuxt-link to="/riwayat_lelang" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'history']" class="iconmenuHeader"/>
          <span class="text-menuHeader">riwayat <br> lelang</span>
        </nuxt-link>
        <nuxt-link to="user" class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'user-alt']" class="iconmenuHeader"/>
          <span class="text-menuHeader">info <br> akun</span>
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

@media(min-width: 481px){
  .header{
    position: relative;
    top: 0;
    width: 100%;
  }
  .logoSearchHeader{
    display: flex;
    width: 481px;
    margin: auto;
    background: white;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    padding-left: 20px;
  }
  .logoImg{
    max-width: 100%;
    height: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .menuHeader{
    background: linear-gradient(145deg, #00baff, #009dd7);
    width:460px;
    margin: auto;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .menuHeader1{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    text-align: center;
  }
  .iconmenuHeader{
    color: #fff;
    font-size: 25px !important;
    width:25px !important;
  }
  .text-menuHeader{
    /* font-size: 14px; */
    color: #fff;
    line-height: 1.2;
    margin-top: 8px;
  }
}

@media(max-width: 480px){
  .header{
    position: relative;
    top: 0;
    width: 480px;
  }
  .logoSearchHeader{
    display: flex;
    width: 480px;
    margin: auto;
    background: white;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    padding-left: 20px;
  }
  .logoImg{
    max-width: 100%;
    height: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .menuHeader{
    background: linear-gradient(145deg, #00baff, #009dd7);
    width:100%;
    margin: auto;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 0px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .menuHeader1{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    text-align: center;
  }
  .iconmenuHeader{
    color: #fff;
    font-size: 25px !important;
    width:25px !important;
  }
  .text-menuHeader{
    /* font-size: 14px; */
    color: #fff;
    line-height: 1.2;
    margin-top: 8px;
  }
}
</style>
