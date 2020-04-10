<template>
  <div>
    <div>
      <div class="header-create-lelang">
        <div>
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-create-lelang" @click="back()"/>
        </div>
        <div class="text-header-create-lelang">Cara membuat lelang</div>
      </div>
    </div>
    <div class="main-create-lelang">
      <div class="judul-create">
        <div>
          <img v-lazy="'img/info2.png'" :key="'img/info2.png'" style="width:100px;">
        </div>
        <div><b>Tata Cara Lelang</b></div>
      </div>
      <div class="cara">
        <div class='judul'>Langkah ke-1</div>
        <div class='isi'> Pilih produk HOT yang akan kamu lelang. </div>
      </div>
      <div class="cara">
        <div class='judul'>Langkah ke-2</div>
        <div class='isi'> Pilih produk SLOW/Tambahan move berdasarkan jumlah yang ditentukan pada produk Hot yang dipilih. </div>
      </div>
      <div class="cara">
        <div class='judul'>Langkah ke-3</div>
        <div class='isi'> Pilih produk FAST/Lanjutan move berdasarkan jumlah yang ditentukan pada produk Hot yang dipilih. </div>
      </div>
      <div class="cara">
        <div class='judul'>Langkah ke-4</div>
        <div class='isi'> Lelang akan otomatis terpublish pada saat kamu membayar deposit yang sudah ditentukan </div>
      </div>
    </div>

    <div class="bg-button-lanjut">
      <button class="btn-lanjut" @click="goto_hot()">Lanjut</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // middleware: 'iflogin',
  data() {
    return {
      accessToken : '',
      token: ''
    }
  },
  methods: {
    back(){
      window.history.back()
    },
    goto_hot(){
      this.$router.push('/create_lot/hot')
    }
  },
  mounted() {
    if (process.client) {
      var aa = localStorage.getItem('lelangoApp');

      if(aa == null){
        this.$router.push('/login');
      } else{
        this.accessTokens = JSON.parse(aa).authh.accessToken;
        if(JSON.parse(aa).authh.userData == ''){
          this.$router.push('/login');
        } else {
          this.token = JSON.parse(aa).authh.userData.user.token.access_token;
        }
      }
    }
  },
}
</script>

<style lang="scss">
  @media (min-width:481px){
    .header-create-lelang{
      font-weight:bold;
      width: 480px;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;

      .icon-header-create-lelang{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-create-lelang{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 20px;
      }
    }

    .main-create-lelang{
      width: 480px;
      margin: auto;
      .judul-create {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:column;
        margin-bottom : 20px;
      }
      .cara{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: self-start;
        padding: 10px;
        background: aliceblue;
        border-left: 4px solid #00aeef;
        margin: 10px;
        box-shadow: 0px 2px 2px lightgrey;
        .judul{
          font-weight:bold;
        }
        .isi{
          text-align:justify;
        }
      }
    }

    .bg-button-lanjut {
      width:480px;
      margin:auto;
      padding: 10px;
      button.btn-lanjut {
        background: #00aeef;
        width: 100%;
        color: #fff;
        padding: 8px;
        box-shadow: 0px 2px 2px lightgrey;
        border-radius: 20px;
      }
    }
  }

  @media (max-width:480px){
    .header-create-lelang{
      font-weight:bold;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;

      .icon-header-create-lelang{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-create-lelang{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 20px;
      }
    }

    .main-create-lelang{
      width: auto;
      .judul-create {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:column;
        margin-bottom : 20px;
      }
      .cara{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: self-start;
        padding: 10px;
        background: aliceblue;
        border-left: 4px solid #00aeef;
        margin: 10px;
        box-shadow: 0px 2px 2px lightgrey;
        .judul{
          font-weight:bold;
        }
        .isi{
          text-align:justify;
        }
      }
    }

    .bg-button-lanjut {
      padding: 10px;
      button.btn-lanjut {
        background: #00aeef;
        width: 100%;
        color: #fff;
        padding: 8px;
        box-shadow: 0px 2px 2px lightgrey;
        border-radius: 20px;
      }
    }
  }
</style>
