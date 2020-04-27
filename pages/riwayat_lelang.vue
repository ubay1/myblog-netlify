<template>
  <div>
    <div>
      <Header :judul="judul"/>
    </div>

    <v-wait for="load_status_lelang">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <div class="tabs">
        <div class="tab">Semua</div>
        <div class="tab">Pembayaran</div>
        <div class="tab">Lelang Aktif</div>
        <div class="tab">Lelang Dibatalkan</div>
        <div class="tab">Lelang Selesai</div>
      </div>
      <div v-if='get_data_status_lelang.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height: 80vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" class="img-kategori">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>
        {{get_data_status_lelang}}
        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
            <div class="text-red" slot="no-more">Produk telah di load semua</div>
            <div class="text-red" slot="no-results">Produk telah di load semua</div>
        </infinite-loading>
      </div>
    </v-wait>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Headers/Header_two'

export default {
  // middleware: 'iflogin',
  components:{
    Header
  },
  data() {
    return {
      page : 2,
      lastPage: 0,
      data_status_lelang : [],
      get_data_status_lelang : [],
      next_page_url : [],
      judul : 'Riwayat lelang',
      accessToken : '',
      token: '',
      hashid: ''
    }
  },
  methods: {
    back(){
      this.$router.push('/');
    },
    async get_status() {
      this.$wait.start('load_status_lelang');

      this.$axios.get( process.env.DEV_API+`user/status_lot/${this.hashid}/0`)
      .then(response => {
        this.data_status_lelang.push(response.data.data);
        this.next_page_url.push(response.data.data.next_page_url);
        console.log(this.data_status_lelang)
      })
      .catch(function (err) {
        console.log(err)
      });

      this.get_data_status_lelang = await new Promise(resolve => {
        setTimeout(() => resolve(this.data_status_lelang), 2000);
      });

      // stop waiting
      this.$wait.end('load_status_lelang');
    },
    infiniteHandler: function($state) {
      setTimeout(function () {
        axios.get(process.env.DEV_API+`user/status_lot/${this.hashid}/0?page=`+this.page)
        .then(response => {
          console.log(response.data.data)
          if (response.data.data.length > 0) {
            this.lastPage = response.data.data.last_page;
            response.data.data.forEach(message => {
              this.get_data_status_lelang.push(message);
            });
            // console.log(this.page-1)
            if (this.page == this.lastPage) {
              console.log(`%c finish `, 'background:#000; color:green;');
              $state.complete();
            }
            this.page += 1;
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          // console.log(err)
        })
      }.bind(this), 1000);
    }
  },
  created(){
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
          this.hashid = JSON.parse(aa).authh.userData.user.id;
        }
      }
    }
    this.get_status()
  },
  mounted() {
  },
}
</script>

<style lang="scss">

</style>
