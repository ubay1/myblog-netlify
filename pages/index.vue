<template>
  <div>
      <Header />
      <div class="main">

        <client-only placeholder="sedang memuat ...">
        <carousel :perPage=1 :autoplay=true paginationColor="#f5bd22" paginationActiveColor='#00aeef' :loop=true>
          <slide v-for="(item, index) in banner" :key="index">
            <progressive-img alt='img-carousel' :src="baseURL+item.picture[0]" :placeholder="baseURL+item.picture[0]" />
            <div class="text-banner">
              <h4>{{item.title}}</h4>
              <h5>{{item.description}}</h5>
            </div>
          </slide>
        </carousel>
        </client-only>


        <div v-if="filterAccessToken == true">
          <div class="bg-mainTerkini">
            <div class="text-main">
              <div>  Lelang terkini</div>
              <nuxt-link to="partial_home/lelang_terbaru_all" class="lihat-semua">
                Lihat semua
              </nuxt-link>
            </div>
            <div>
              <div class="bg-card-mainTerkini">
                <div class="card-mainTerkini" v-for="(item, index) in filterLelangTerbaru" :key="index">
                  <div class="harga-lelang">
                     {{item.format_bid}}
                  </div>
                  <button @click="save_favorit(item.id)" class="btn-favorit" v-if="item.is_favorite == false">
                    <span >
                      <font-awesome-icon :icon="['fas', 'star']" :class="{activeFavorit: is_favorite}" class="icon-favorit" style="width:25px; font-size:20px; filter: drop-shadow(0px 1px 1px #8e8a8a);"/>
                    </span>
                  </button>
                  <button @click="save_favorit(item.id)" class="btn-favorit" v-else>
                    <span>
                      <font-awesome-icon :icon="['fas', 'star']" class="icon-favorit" style="width:25px; font-size:20px; filter: drop-shadow(0px 1px 1px #8e8a8a); color:#00aeef;"/>
                    </span>
                  </button>
                  <span>
                    <img alt="image-lot-terbaru" class="img-list-lelang" :src="baseURL+item.picture[0]" >
                  </span>
                  <div class="nama-lot">
                    {{item.nama}}
                  </div>
                  <div class="lot-expired">
                    <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
                  </div>
                  <button @click="detailLelang(item.id)" class="btn-detail">Detail
                    Lelang
                  </button>
                  <div class="ext"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-mainTerlaris">
            <div class="text-main">
              <div>  Lelang terlaris </div>
              <nuxt-link to="partial_home/lelang_terlaris_all" class="lihat-semua"> Lihat semua</nuxt-link>
            </div>
            <div>
              <div class="bg-card-mainTerlaris">
                <div class="card-mainTerlaris" v-for="(item, index) in filterLelangTerlaris" :key="index">
                  <div class="harga-lelang">
                     {{item.format_bid}}
                  </div>
                  <button @click="save_favorit(item.id)" class="btn-favorit" v-if="item.is_favorite == false">
                    <span >
                      <font-awesome-icon :icon="['fas', 'star']" :class="{activeFavorit: is_favorite}" class="icon-favorit" style="width:25px; font-size:20px; filter: drop-shadow(0px 1px 1px #8e8a8a);"/>
                    </span>
                  </button>
                  <button @click="save_favorit(item.id)" class="btn-favorit" v-else>
                    <span>
                      <font-awesome-icon :icon="['fas', 'star']" class="icon-favorit" style="width:25px; font-size:20px; filter: drop-shadow(0px 1px 1px #8e8a8a); color:#00aeef;"/>
                    </span>
                  </button>
                  <span>
                    <img alt="img-lot-terlaris" class="img-list-lelang" :src="baseURL+item.picture[0]" >
                  </span>
                  <div class="nama-lot">
                    Lot-{{item.id}}
                  </div>
                  <div class="lot-expired">
                    <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
                  </div>
                  <button @click="detailLelang(item.id)" class="btn-detail">Detail
                    Lelang
                  </button>
                  <div class="ext"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-mainTerkini">
            <div class="text-main">
              <div>  Lelang terkini </div>
              <nuxt-link to="partial_home/lelang_terbaru_all" class="lihat-semua">
                Lihat semua
              </nuxt-link>
            </div>
            <div>
              <div class="bg-card-mainTerkini">
                <div class="card-mainTerkini" v-for="(item, index) in filterLelangTerbaru" :key="index">
                  <div class="harga-lelang">
                     {{item.format_bid}}
                  </div>
                  <span>
                    <img alt="img-lot-terbaru" class="img-list-lelang" :src="baseURL+item.picture[0]" >
                  </span>
                  <div class="nama-lot">
                    {{item.nama}}
                  </div>
                  <div class="lot-expired">
                    <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
                  </div>
                  <button @click="detailLelang(item.id)" class="btn-detail">Detail
                    Lelang
                  </button>
                  <div class="ext"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-mainTerlaris">
            <div class="text-main">
              <div>  Lelang terlaris </div>
              <nuxt-link to="partial_home/lelang_terlaris_all" class="lihat-semua"> Lihat semua</nuxt-link>
            </div>
            <div>
              <div class="bg-card-mainTerlaris">
                <div class="card-mainTerlaris" v-for="(item, index) in filterLelangTerlaris" :key="index">
                  <div class="harga-lelang">
                     {{item.format_bid}}
                  </div>
                  <span>
                    <img alt="img-lot-terlaris" class="img-list-lelang" :src="baseURL+item.picture[0]" >
                  </span>
                  <div class="nama-lot">
                    Lot-{{item.id}}
                  </div>
                  <div class="lot-expired">
                    <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
                  </div>
                  <button @click="detailLelang(item.id)" class="btn-detail">Detail
                    Lelang
                  </button>
                  <div class="ext"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- {{filterAccessToken}} -->
        <div class="bg-mainTipslelango">
          <div class="text-main">
            <div>  Tips dari lelango </div>
          </div>
            <div class="bg-card-mainTipslelango">
            <div class="card-mainTipslelango" v-for="(item, index) in tipslelango" :key="index">
              <img alt="img-tips-lelango" style="border-radius:20px; margin-bottom: -20px;" :src="baseURL+item.thumbnail"/>
                <div class="text-tips">
                  <h4 class="text-tips-title">{{item.title}}</h4>
                  <h5 class="text-tips-descrip">{{_.truncate(item.description, {'length': 135})}}</h5>
                  <button @click="detailBlog(item.thumbnail,item.title, item.description)" class="btn-tips-lelang">Lihat selengkapnya</button>
                </div>
                <div class="ext"></div>
            </div>
            </div>
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
import DetailBlog from './partial_blog/blog'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

export default {
  data() {
    return {
      accessTokens : '',
      token : '',
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
      // icon_favorit: true,
      is_favorite : false
    }
  },
  // middleware:'iflogin',
  computed: {
    filterAccessToken(){
      console.log('ehey '+this.$store.getters['authh/accessToken'])
      return this.accessTokens = this.$store.getters['authh/accessToken'];
    },
    filterLelangTerbaru(){
      return this.lelangterbaru.slice(0,5);
    },
    filterLelangTerlaris(){
      return this.lelangterlaris.slice(0,3);
    }
  },
  components: {
    Header, Footer,
    'timer': Timer,
    'detail-blog': 'DetailBLog'
  },
  props:['id'],
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
    getLot() {
			axios.get(process.env.DEV_API + "user/lot")
				.then(response => {
          // console.log(response.data.data.data)
          if(response.data.data.data == null){
            this.lelangterbaru = []
          }else{
            this.lelangterbaru = response.data.data.data;

            for (let i = 0; i < this.lelangterbaru.length; i++) {
              this.lelang_expired.push(this.lelangterbaru[i].expired_at)
            }
          }
				});
    },
    getLotAuth(){
      const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
      axios.get(process.env.DEV_API + "user/get_lot_auth", config)
				.then(response => {
          if(response.data.data.data == null){
            this.lelangterbaru = []
          }else{
            this.lelangterbaru = response.data.data.data;

            for (let i = 0; i < this.lelangterbaru.length; i++) {
              this.lelang_expired.push(this.lelangterbaru[i].expired_at)
            }
          }
				});
    },
    getLelangTerlaris() {
			axios.get(process.env.DEV_API + "user/lot_terlaris")
				.then(response => {
          // console.log(response.data.success)
          if(response.data.success == false){
            this.lelangterlaris = [];
          }else{
            this.lelangterlaris = response.data.data.data;
            for (let i = 0; i < this.lelangterlaris.length; i++) {
              this.lelang_expired.push(this.lelangterlaris[i].expired_at)
            }
          }
          // console.log(this.lelang_expired);
				});
    },
    getLelangTerlarisAuth() {
      const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
			axios.get(process.env.DEV_API + "user/lot_terlaris_auth", config)
				.then(response => {
          // console.log(response.data.success)
          if(response.data.success == false){
            this.lelangterlaris = [];
          }else{
            this.lelangterlaris = response.data.data.data;
            for (let i = 0; i < this.lelangterlaris.length; i++) {
              this.lelang_expired.push(this.lelangterlaris[i].expired_at)
            }
          }
          // console.log(this.lelang_expired);
				});
    },
    save_favorit(id){
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };
      this.$axios.post(process.env.DEV_API + "user/save_lot_favorit/"+id, [], config)
      .then(response => {
        console.log(response.data.success)
        if(response.data.success == true){
          this.$toasted.show(response.data.message, {
            theme: "bubble",
            position: "top-center",
            duration : 5000
          });
          this.getLotAuth();
          this.getLelangTerlarisAuth();
        }else{
          this.$toasted.show(response.data.message, {
            theme: "bubbles",
            position: "top-center",
            duration : 5000
          });
        }
      });
    },
    getTipsLelang() {
			axios.get(process.env.DEV_API + "user/getBlog")
				.then(response => {
          // console.log(response)
          this.tipslelango = response.data.data;
				});
    },
    detailLelang(id){
      this.$router.push('/details/'+id)
    },
    detailBlog(image, title, description){
      const data = {
            title: title,
            image: image,
            description: description
        }
      this.$router.push({
        name:'partial_blog-blog',
        params: data,
      })
    }
  },
  created(){
    this.getCaraousel(),
    this.getTipsLelang()
  },
  mounted() {
    if(process.client){
      var aa = localStorage.getItem('lelangoApp');
      // var cekakses = JSON.parse(aa).authh.accessToken;

      // cek adakah akses atau adakah key localstorage dengan nama lelangoApp
      if(aa == null){
        this.getLot();
        this.getLelangTerlaris();
      } else{
        this.token = JSON.parse(aa).authh.userData.user.token.access_token;
        this.getLotAuth();
        this.getLelangTerlarisAuth();
      }
    }
  },
}
</script>

<style>

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #dadada;
  border-radius: 50px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 50px;
}

 .toasted.bubble {
    background: rgb(0, 159, 225) !important;
  }

  .toasted.bubbles {
    min-height: 38px;
    line-height: 1.1em;
    background-color: #f83c3c;
    padding: 0 20px;
    font-size: 15px;
    font-weight: 300;
    color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
  }

button:focus {
    outline: none;
}

@media(min-width: 481px){
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }
  .main{
    margin-bottom: 90px;
  }
  .VueCarousel{
    z-index: 1;
    width: 480px; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 20px; padding-right:20px;
  }
  .progressive-image{
    border-radius:20px;
    position:relative;
    overflow:hidden;
    width:100%;
    display:inline-block;
  }
  .harga-lelang{
    font-size: 14px;
    background: linear-gradient(145deg, #00baff, #009dd7);
    padding: 10px;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
    color: #fff;
  }
  .btn-favorit{
    position: relative;
    float: right;
    padding: 10px;
  }
  .icon-favorit{
    color: #b9b8b8;
  }
  .activeFavorit{
    color:#00aeef;
  }
  .img-list-lelang{
    width: 150px;
    padding:10px;
    margin: auto;
  }
  .bg-mainTerkini, .bg-mainTerlaris{
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .text-main{
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
  }

  .lihat-semua{
    color: #00aeef;
    padding-right: 20px;;
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

  .bg-card-mainTerkini:hover, .bg-card-mainTerlaris:hover{
    overflow-x: scroll;
  }

  .card-mainTerkini, .card-mainTerlaris{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
    width: 200px;
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
    height: 0%;
    width: 300px;
    margin: 10px;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 2px 4px lightgrey;
  }

  .ext {
    position: relative;
    left: 100%;
    width: 30px;
    height: 1px;
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
    background: linear-gradient(145deg, #00baff, #009dd7);
    color: #fff;
    padding: 4px;
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    font-size: 16px;
  }

  .text-tips h4.text-tips-title{
    background: linear-gradient(145deg, #00baff, #009dd7);
    color: #fff;
    padding: 5px;
    position: relative;
    /* top: -30px; */
    z-index: 2;
    font-size: 14px;
    white-space: nowrap;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text-tips h5.text-tips-descrip{
    position: relative;
    /* top: -30px; */
    z-index: 2;
    font-size: 14px;
    padding: 5px;
  }

  .btn-tips-lelang{
    position: relative;
    z-index: 2;
    font-size: 14px;
    padding: 5px;
    color: #0d92c3;
    /* background: aliceblue; */
    width:100%;
  }

  .VueCarousel-navigation{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VueCarousel-navigation-button[data-v-453ad8cd]{
    position: unset !important;
  }
  .VueCarousel-dot-container{
    margin-top: -70px !important;
    display: block !important;
  }
}

@media(max-width: 480px){
  /* width */
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .main{
    width: auto;
    margin-bottom: 90px;
  }
  .VueCarousel{
    z-index: 1;
    width: auto; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 20px; padding-right:20px;
  }
  .progressive-image{
    border-radius:20px;
    max-width:1000px;
    position:relative;
    overflow:hidden;
    width:100%;
    display:inline-block;
  }
  .harga-lelang{
    font-size: 14px;
    background: linear-gradient(145deg, #00baff, #009dd7);
    padding: 10px;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
    color: #fff;
  }
  .btn-favorit{
    position: relative;
    float: right;
    padding: 10px;
  }
  .icon-favorit{
    color: #b9b8b8;
  }
  .activeFavorit{
    color:#00aeef;
  }
  .img-list-lelang{
    width: 150px;
    padding:10px;
    margin: auto;
  }

  .bg-mainTerkini, .bg-mainTerlaris, .bg-mainTipslelango{
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .text-main{
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
  }

  .lihat-semua{
    color: #00aeef;
    padding-right: 20px;;
  }

  .bg-card-mainTerkini, .bg-card-mainTerlaris{
    background: #ffffff;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    display: -webkit-box;
    overflow-x: hidden;
  }

   .bg-card-mainTerkini:hover, .bg-card-mainTerlaris:hover{
     overflow-x: scroll;
   }

  .card-mainTerkini, .card-mainTerlaris{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
    width: 200px;
  }

  .bg-card-mainTipslelango{
    display: -webkit-box;
    width: auto;
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
    height: 0%;
    width: 300px;
    margin: 10px;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 2px 4px lightgrey;
  }

  .ext {
    position: relative;
    left: 100%;
    width: 30px;
    height: 1px;
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
    background: linear-gradient(145deg, #00baff, #009dd7);
    color: #fff;
    padding: 4px;
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    font-size: 16px;
  }

  .text-tips h4.text-tips-title{
    background: linear-gradient(145deg, #00baff, #009dd7);
    color: #fff;
    padding: 5px;
    position: relative;
    /* top: -30px; */
    z-index: 2;
    font-size: 14px;
    white-space: nowrap;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text-tips h5.text-tips-descrip{
    position: relative;
    /* top: -30px; */
    z-index: 2;
    font-size: 14px;
    padding: 5px;
  }

  .btn-tips-lelang{
    position: relative;
    z-index: 2;
    font-size: 14px;
    padding: 5px;
    color: #0d92c3;
    /* background: aliceblue; */
    width:100%;
  }

  .VueCarousel-navigation{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VueCarousel-navigation-button[data-v-453ad8cd]{
    position: unset !important;
  }
  .VueCarousel-dot-container{
    margin-top: -70px !important;
    display: block !important;
  }
}

@media(min-width:0px) and (max-width:319px){
  /* width */
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .main{
    width: auto;
    margin-bottom: 90px;
  }
  .VueCarousel{
    z-index: 1;
    width: auto; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 0px; padding-right: 0px;
    display: none;
  }
  .progressive-image{
    border-radius:0px;
    position:relative;
    overflow:hidden;
    width:100%;
    display:inline-block;
  }
  .harga-lelang{
    font-size: 14px;
    background: linear-gradient(145deg, #00baff, #009dd7);
    padding: 10px;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
    color: #fff;
  }
  .btn-favorit{
    position: relative;
    float: right;
    padding: 10px;
  }
  .icon-favorit{
    color: #b9b8b8;
  }
  .activeFavorit{
    color:#00aeef;
  }
  .img-list-lelang{
    width: 150px;
    padding:10px;
    margin: auto;
  }

  .bg-mainTerkini, .bg-mainTerlaris, .bg-mainTipslelango{
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .text-main{
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
  }

  .lihat-semua{
    color: #00aeef;
    padding-right: 20px;;
  }

  .bg-card-mainTerkini, .bg-card-mainTerlaris{
    background: #ffffff;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    display: -webkit-box;
    overflow-x: hidden;
  }

   .bg-card-mainTerkini:hover, .bg-card-mainTerlaris:hover{
     overflow-x: scroll;
   }

  .card-mainTerkini, .card-mainTerlaris{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
    width: 200px;
  }

  .bg-card-mainTipslelango{
    display: -webkit-box;
    width: auto;
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
    height: 0%;
    width: 300px;
    margin: 10px;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 2px 4px lightgrey;
  }

  .ext {
    position: relative;
    left: 100%;
    width: 30px;
    height: 1px;
  }

  .client-only-placeholder{
    text-align:center;
  }
  .text-banner{
    background: rgba(0,0,0,.6);
    position: relative;
    bottom: 63px;
    z-index: 1;
    border-radius: 0px 0px 0px 0px;
    text-align: center;
    color: #fff;
    padding: 5px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: small;
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
    background: linear-gradient(145deg, #00baff, #009dd7);
    color: #fff;
    padding: 4px;
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    font-size: 16px;
  }

  .text-tips h4.text-tips-title{
    background: linear-gradient(145deg, #00baff, #009dd7);
    color: #fff;
    padding: 5px;
    position: relative;
    /* top: -30px; */
    z-index: 2;
    font-size: 14px;
    white-space: nowrap;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text-tips h5.text-tips-descrip{
    position: relative;
    /* top: -30px; */
    z-index: 2;
    font-size: 14px;
    padding: 5px;
  }

  .btn-tips-lelang{
    position: relative;
    z-index: 2;
    font-size: 14px;
    padding: 5px;
    color: #0d92c3;
    /* background: aliceblue; */
    width:100%;
  }

  .VueCarousel-navigation{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .VueCarousel-navigation-button[data-v-453ad8cd]{
    position: unset !important;
  }
  .VueCarousel-dot-container{
    margin-top: -70px !important;
    display: block !important;
  }
}


</style>
