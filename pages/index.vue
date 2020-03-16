<template>
  <div>
      <Header />
      <div class="main">
        <client-only placeholder="sedang memuat ...">
        <carousel :perPage=1 :autoplay=true paginationColor="#f5bd22" paginationActiveColor='#00aeef' :paginationEnabled=false :loop=true>
          <slide v-for="(item, index) in banner" :key="index">
            <progressive-img style="border-radius:20px;" :src="baseURL+item.picture[0]" :placeholder="baseURL+item.picture[0]" />
            <div class="text-banner">
              <h4>{{item.title}}</h4>
              <h5>{{item.description}}</h5>
            </div>
          </slide>
        </carousel>
        </client-only>

        <div v-if="accessToken == false">
          <div class="bg-mainTerkini">
            <span class="text-main">Lelang terkini</span>
            <div>
              <div class="bg-card-mainTerkini">
                <div class="card-mainTerkini" v-for="(item, index) in lelangterbaru" :key="index">
                  <div class="harga-lelang">
                    <small><small>Harga lot</small></small> {{item.format_bid}}
                  </div>
                  <span>
                    <img class="img-list-lelang" :src="baseURL+item.picture[0]" >
                  </span>
                  <div class="nama-lot">
                    {{item.nama}}
                  </div>
                  <div class="lot-expired">
                    <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
                  </div>
                  <button @click="moveToDetailLelang(item.id)" class="btn-detail">Detail
                    Lelang
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-mainTerlaris">
            <span class="text-main">Lelang terlaris</span>
            <div>
              <div class="bg-card-mainTerlaris">
                <div class="card-mainTerlaris" v-for="(item, index) in lelangterlaris" :key="index">
                  <div class="harga-lelang">
                    <small>Harga lot</small> {{item.format_bid}}
                  </div>
                  <span>
                    <img class="img-list-lelang" :src="baseURL+item.picture[0]" >
                  </span>
                  <div class="nama-lot">
                    {{item.nama}}
                  </div>
                  <div class="lot-expired">
                    <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
                  </div>
                  <button @click="moveToDetailLelang(item.id)" class="btn-detail">Detail
                    Lelang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-mainTerkini">
            <span class="text-main">Lelang terkini</span>
            <div>
              <div class="bg-card-mainTerkini">
                <div class="card-mainTerkini">
                  ini card lelang terkini
                </div>
              </div>
            </div>
          </div>

          <div class="bg-mainTerlaris">
            <span class="text-main">Lelang terlaris</span>
            <div>
              <div class="bg-card-mainTerlaris">
                <div class="card-mainTerlaris">
                  ini card lelang terlaris
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-mainTipslelango">
          <span class="text-main">Tips dari lelango</span>
            <div class="bg-card-mainTipslelango">
            <div class="card-mainTipslelango" v-for="(item, index) in tipslelango" :key="index">
              <img style="border-radius:20px;" :src="baseURL+item.thumbnail"/>
                <div class="text-tips">
                  <h4 class="text-tips-title">{{item.title}}</h4>
                  <h5 class="text-tips-descrip">{{_.truncate(item.description, {'length': 135})}}</h5>
                </div>
            </div>
            </div>
            <!-- <client-only>
            <carousel :perPage=1 :navigationEnabled=false :paginationEnabled=true paginationColor="#f5bd22" paginationActiveColor='#00aeef'>
              <slide v-for="(item, index) in tipslelango" :key="index">
                <progressive-img style="border-radius:20px;" :src="baseURL+item.thumbnail" :placeholder="baseURL+item.thumbnail" />
                <div class="text-tips">
                  <h4 class="text-tips-title">{{item.title}}</h4>
                  <h5 class="text-tips-descrip">{{_.truncate(item.description, {'length': 135})}}</h5>
                </div>
              </slide>
            </carousel>
            </client-only> -->
        </div>
      </div>
      <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import axios from 'axios'
import {mapState, mapGetters} from 'vuex'
import moment from 'moment'
import Timer from './partial_home/timer'
import Tips from './partial_home/tips'

export default {
  data() {
    return {
      banner: [],
      lelangterbaru: [],
      lelangterlaris: [],
      tipslelango: [],
      lelang_expired : [],
      baseURL: process.env.URL,
      now : moment(),
      transOption: {
          day: "",
          hours: "",
          minutes: "",
          seconds: "",
          expired: "",
          running: "",
          upcoming: "",
          status: {
            expired: "Selesai",
            running: "",
            upcoming: "Akan Datang"
          }
      },
    }
  },
  // middleware:'iflogin',
  computed: mapGetters({
      accessToken : 'authh/accessToken',
  }),
  components: {
    Header, Footer,
    'timer': Timer,
  },
  methods: {
    logout(){
       this.$store.dispatch('authh/logout').then(() => {
          console.log('success logout');
          window.localStorage.removeItem('vuex');
          this.$router.push('/login')
          // location.replace('/login')
        }).catch((err) => {
          console.log(err);
        })
    },
    getCaraousel() {
			axios.get(process.env.DEV_API + "user/getBanner")
				.then(response => {
          this.banner = response.data.data;
				});
    },
    getLelangTerbaru() {
			axios.get(process.env.DEV_API + "user/lot")
				.then(response => {
          // console.log(response)
          this.lelangterbaru = response.data.data.data;

          for (let i = 0; i < this.lelangterbaru.length; i++) {
            this.lelang_expired.push(this.lelangterbaru[i].expired_at)
          }
          // console.log(this.lelang_expired);
				});
    },
    getLelangTerlaris() {
			axios.get(process.env.DEV_API + "user/lot_terlaris")
				.then(response => {
          // console.log(response)
          this.lelangterlaris = response.data.data.data;

          for (let i = 0; i < this.lelangterlaris.length; i++) {
            this.lelang_expired.push(this.lelangterlaris[i].expired_at)
          }
          // console.log(this.lelang_expired);
				});
    },
    getTipsLelang() {
			axios.get(process.env.DEV_API + "user/getBlog")
				.then(response => {
          // console.log(response)
          this.tipslelango = response.data.data;
				});
		},
  },
  created(){
    this.getCaraousel(),
    this.getLelangTerbaru(),
    this.getLelangTerlaris(),
    this.getTipsLelang()
  }
}
</script>

<style>

/* width */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #dadada;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media(max-width: 480px){
  .main{
    width: 480px;
    margin-bottom: 90px;
  }
  .VueCarousel{
    width: 480px; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 20px; padding-right:20px;
  }
  .harga-lelang{
    font-size: 14px;
    background: #00aeef;
    padding: 10px;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
    color: #fff;
  }
  .img-list-lelang{
    width: 150px;
    padding-right: 20px;
    padding-left: 20px;
  }

  .bg-mainTerkini, .bg-mainTerlaris, .bg-mainTipslelango{
    margin-bottom: 20px;
  }
  .text-main{
    font-weight: bold;
    display: flex;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
  }

  .bg-card-mainTerkini, .bg-card-mainTerlaris{
    background: #ffffff;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    display: -webkit-box;
    overflow-x: hidden;
  }

  .card-mainTerkini, .card-mainTerlaris{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
  }

  .bg-card-mainTipslelango{
    display: -webkit-box;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    overflow-x: hidden;
  }
  .bg-card-mainTipslelango:hover{
    overflow-x: scroll;
  }
  .card-mainTipslelango{
    /* flex: 0 0 auto; */
    width: 70%;
    margin: 10px;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 2px 4px lightgrey;
  }

  .client-only-placeholder{
    text-align:center;
  }
  .text-banner{
    background: rgba(0,0,0,.6);
    position: relative;
    bottom: 63px;
    z-index: 1;
    border-radius: 0px 0px 20px 20px;
    text-align: center;
    color: #fff;
    padding: 5px;
  }
  .nama-lot{
    text-align: center;
      font-weight: bold;
      font-size: 14px;
  }
  .lot-expired{
    text-align: center;
    font-size: 14px;
  }

  .btn-detail{
    background: #00aeef;
    color: #fff;
    padding: 4px;
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    font-size: 16px;
  }

  .text-tips h4.text-tips-title{
    background: rgb(10, 169, 228);
    color: #fff;
    padding: 5px;
    position: relative;
    top: -30px;
    z-index: 2;
    font-size: 14px;
  }
  .text-tips h5.text-tips-descrip{
    position: relative;
    top: -30px;
    z-index: 2;
    font-size: 14px;
    padding: 5px;
  }

  .VueCarousel-navigation{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VueCarousel-navigation-button[data-v-453ad8cd]{
    position: unset !important;
  }
  .VueCarousel-dot-container[data-v-438fd353]{
    margin-top: -40px !important;
  }
}

@media(min-width: 481px){
  .main{
    margin-bottom: 90px;
  }
  .VueCarousel{
    width: 480px; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 20px; padding-right:20px;
  }
  .harga-lelang{
    font-size: 14px;
    background: #00aeef;
    padding: 10px;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
    color: #fff;
  }
  .img-list-lelang{
    width: 150px;
    padding-right: 20px;
    padding-left: 20px;
  }
  .bg-mainTerkini, .bg-mainTerlaris{
    margin-bottom: 20px;
  }
  .text-main{
    font-weight: bold;
    display: flex;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
  }

  .bg-card-mainTerkini, .bg-card-mainTerlaris{
    background: #ffffff;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    display: -webkit-box;
    overflow-x: scroll;
  }

  /* .bg-card-mainTerkini:hover, .bg-card-mainTerlaris:hover{
    overflow-x: scroll;
  } */

  .card-mainTerkini, .card-mainTerlaris{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
  }

  .bg-card-mainTipslelango{
    display: -webkit-box;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    overflow-x: scroll;
  }
  /* .bg-card-mainTipslelango:hover{
    overflow-x: scroll;
  } */
  .card-mainTipslelango{
    /* flex: 0 0 auto; */
    width: 70%;
    margin: 10px;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 2px 4px lightgrey;
  }

  .client-only-placeholder{
    text-align:center;
  }
  .text-banner{
    background: rgba(0,0,0,.6);
    position: relative;
    bottom: 63px;
    z-index: 1;
    border-radius: 0px 0px 20px 20px;
    text-align: center;
    color: #fff;
    padding: 5px;
  }
  .nama-lot{
    text-align: center;
      font-weight: bold;
      font-size: 14px;
  }
  .lot-expired{
    text-align: center;
    font-size: 14px;
  }

  .btn-detail{
    background: #00aeef;
    color: #fff;
    padding: 4px;
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    font-size: 16px;
  }

  .text-tips h4.text-tips-title{
    background: rgb(10, 169, 228);
    color: #fff;
    padding: 5px;
    position: relative;
    top: -30px;
    z-index: 2;
    font-size: 14px;
  }
  .text-tips h5.text-tips-descrip{
    position: relative;
    top: -30px;
    z-index: 2;
    font-size: 14px;
    padding: 5px;
  }

  .VueCarousel-navigation{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VueCarousel-navigation-button[data-v-453ad8cd]{
    position: unset !important;
  }
  .VueCarousel-dot-container[data-v-438fd353]{
    margin-top: -40px !important;
  }
}

</style>
