<template>
  <div>
    <div class="header">
      <div class="logoSearchHeader">
        <img class="logoImg" src="~/assets/img/logo.png" alt="">
        <font-awesome-icon :icon="['fas', 'search']" style="color:rgb(0, 174, 239); font-size:20px;"/>
      </div>
      <div class="menuHeader">
        <button class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'box-open']" class="iconmenuHeader"/>
          <span class="text-menuHeader">buat <br> lelang</span>
        </button>
        <button class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'fire-alt']" class="iconmenuHeader"/>
          <span class="text-menuHeader">lelang <br> terkini</span>
        </button>
        <button class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'history']" class="iconmenuHeader"/>
          <span class="text-menuHeader">riwayat <br> lelang</span>
        </button>
        <button class="menuHeader1">
          <font-awesome-icon :icon="['fas', 'user-alt']" class="iconmenuHeader"/>
          <span class="text-menuHeader">info <br> akun</span>
        </button>
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

@media(min-width: 479px){
  .header{
    position: relative;
    top: 0;
    width: 100%;
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
    height: 80px;
  }
  .menuHeader{
    background: rgb(0, 174, 239);
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
  }
  .iconmenuHeader{
    color: #fff;
    font-size: 25px;
  }
  .text-menuHeader{
    font-size: 14px;
    color: #fff;
    line-height: 16px;
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
    height: 80px;
  }
  .menuHeader{
    background: rgb(0, 174, 239);
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
  }
  .iconmenuHeader{
    color: #fff;
    font-size: 25px;
  }
  .text-menuHeader{
    font-size: 14px;
    color: #fff;
    line-height: 16px;
    margin-top: 8px;
  }
}
</style>
