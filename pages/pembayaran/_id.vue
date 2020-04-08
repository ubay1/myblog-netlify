<template>
  <div>
    <div class="header-pilih-pembayaran">
      <div>
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-pilih-pembayaran" @click="back()"/>
      </div>
      <div class="text-header-pilih-pembayaran">Pilih metode pembayaran</div>
    </div>

    <div class="main-pilih-pembayaran">
      <div class="txt-big-pembayaran"> Bayar menggunakan Virtual Account </div>
      <div class="txt-small-pembayaran mb-5"> <small>Pilih virtual account yang anda gunakan</small>
      </div>

      <div class="pilih-metode" v-for="(item, index) in list_bank" :key="index" @click="detail_pembayaran(item.bank)">
        <div>
          <img :src="item.logo" alt="logo-bank" style="width:80px;">
        </div>
        <div class="bg-txt-nama-bank">
          <div class="txt-nama-bank">
            <b>{{item.bank}}</b>
          </div>
          <div class="txt-description-bank">
            <small>{{item.text}}</small>
          </div>
        </div>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="icon-header-pilih-pembayaran"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id : this.$route.params.id,
      token: '',
      list_bank:[],
      devAPI : process.env.DEV_API
    }
  },
  methods: {
    back(){
      window.history.back()
    },
    getlistva(){
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };
      this.$axios.get(this.devAPI+"va/get_list_va", config)
      .then(response => {
        // console.log(response)
        if(response.data.success == true){
          this.list_bank = response.data.data;
        }
      })
    },
    detail_pembayaran(nama){
      this.$router.push('/pembayaran/detailpembayaran/'+nama+'/'+this.id);
    }
  },
  mounted() {
    if(process.client){
      var aa = localStorage.getItem('lelangoApp');
      var cekakses = JSON.parse(aa).authh.accessToken;

      // cek adakah akses atau adakah key localstorage dengan nama lelangoApp
      if(aa == null || cekakses == false){
        this.$router.push('/login');
      } else{
        this.token = JSON.parse(aa).authh.userData.user.token.access_token;
        this.getlistva()
      }
    }
  },
}
</script>

<style lang="scss">
  @media(min-width:481px){
    .header-pilih-pembayaran{
      font-weight: bold;
      text-align: center;
      margin: auto;
      width: 480px;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;

      .icon-header-pilih-pembayaran{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-pilih-pembayaran{
        color: #00aeef;
        white-space: nowrap;
        width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .main-pilih-pembayaran{
      margin: auto;
      width: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.6;
      .pilih-metode{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid lightgrey;
        width: 100%;
      }
      .bg-txt-nama-bank{
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }

  @media(max-width:480px){
    .header-pilih-pembayaran{
      font-weight: bold;
      text-align: center;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;

      .icon-header-pilih-pembayaran{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-pilih-pembayaran{
        color: #00aeef;
        white-space: nowrap;
        width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .main-pilih-pembayaran{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.6;
      .pilih-metode{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid lightgrey;
        width: 100%;
      }
      .bg-txt-nama-bank{
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }
</style>
