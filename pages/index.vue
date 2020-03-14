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
                    Harga lot {{item.format_bid}}
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
                <div class="card-mainTerlaris">
                  ini card lelang terlaris
                </div>
              </div>
            </div>
          </div>

          <div class="bg-mainTipslelango">
            <span class="text-main">Tips dari lelango</span>
            <div>
              <div class="bg-card-mainTipslelango">
                <div class="card-mainTipslelango">
                  ini card lelang terlaris
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

          <div class="bg-mainTipslelango">
            <span class="text-main">Tips dari lelango</span>
            <div>
              <div class="bg-card-mainTipslelango">
                <div class="card-mainTipslelango">
                  ini card lelang terlaris
                </div>
                <button @click='logout' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </div>
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

export default {
  data() {
    return {
      banner: [],
      lelangterbaru: [],
      lelangterlaris: [],
      tipsLelango: [],
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
    'timer': Timer
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
          console.log(response)
          this.lelangterbaru = response.data.data.data;

          for (let i = 0; i < this.lelangterbaru.length; i++) {
            this.lelang_expired.push(this.lelangterbaru[i].expired_at)
          }
          console.log(this.lelang_expired);
				});
		},
  },
  created(){
    this.getCaraousel(),
    this.getLelangTerbaru()
  }
}
</script>

<style>


@media(min-width: 479px){
  .main{
    margin-bottom: 90px;
  }
  .VueCarousel{
    width: 480px; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 20px; padding-right:20px;
  }
  .harga-lelang{
    font-size: 80%;
    background: #00aeef;
    padding: 3px;
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

  .bg-card-mainTerkini, .bg-card-mainTerlaris, .bg-card-mainTipslelango{
    background: #ffffff;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    display: flex;
  }

  .card-mainTerkini, .card-mainTerlaris, .card-mainTipslelango{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
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
  font-size: 80%;
}
}

@media(max-width: 480px){
  .main{
    margin-bottom: 90px;
    width: 480px;
  }
  .VueCarousel{
    width: 480px; margin: auto; margin-top: 10px; margin-bottom: -2em; padding-left: 20px; padding-right:20px;
  }
  .harga-lelang{
    font-size: 80%;
    background: #00aeef;
    padding: 3px;
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
    display: flex;
  }

  .card-mainTerkini, .card-mainTerlaris, .card-mainTipslelango{
    background: #ffffff;
    box-shadow: 0px 2px 4px lightgrey;
    margin: 10px;
    border-radius: 10px;
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
  font-size: 80%;
}
}

</style>
