<template>
  <div>
    <div class="header-lelang-all">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-lelang-all" @click="back()"/>
      <div class="text-header-lelang-all">
        List Lelang Terlaris
      </div>
      <div class="search-lelang-all">
        <font-awesome-icon :icon="['fas', 'search']" class="icon-header-lelang-all"/>
      </div>
    </div>

    <v-wait for="load_all_lot">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <div v-if="filterAccessToken == true">
        <div v-if="datalot.length == 0">
          <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Tidak ada lelang yang aktif</div>
          </div>
        </div>
        <div v-else>
          <div class="grid-lelang-all">
            <div v-for="(item, index) in datalot" :key="index" class="lelang-all">
              <div class="harga-lelang">
                <!-- <small>Harga lot</small>  -->
                {{item.format_bid}}
              </div>
              <div class="bg-btn-favaorit">
                <button class="btn-favorit" @click="save_favorit(item.id)">
                  <span  v-if="item.is_favorite == false">
                    <font-awesome-icon :icon="['fas', 'star']" class="icon-favorit" style="width:25px; font-size:20px; filter: drop-shadow(0px 1px 1px #8e8a8a);"/>
                  </span>
                  <span v-else>
                    <font-awesome-icon :icon="['fas', 'star']" class="icon-favorit" style="width:25px; font-size:20px; filter: drop-shadow(0px 1px 1px #8e8a8a); color:#00aeef;"/>
                  </span>
                </button>
                <span>
                  <img alt="img-lot-terbaru" class="img-list-lelang-all" :src="baseURL+item.picture[0]" >
                </span>
              </div>
              <div class="nama-lot-lelang-all">
                Lot-{{item.id}}
              </div>
              <div class="lot-expired-lelang-all">
                <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
              </div>
              <button @click="detailLelang(item.id)" class="btn-detail">Detail
                Lelang
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="datalot.length == 0">
          <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Tidak ada lelang yang aktif</div>
          </div>
        </div>
        <div class="grid-lelang-all">
            <div v-for="(item, index) in datalot" :key="index" class="lelang-all">
              <div class="harga-lelang">
                <!-- <small>Harga lot</small>  -->
                {{item.format_bid}}
              </div>
              <div class="bg-btn-favaorit">
                <span>
                  <img alt="img-lot-terbaru" class="img-list-lelang-all" :src="baseURL+item.picture[0]" >
                </span>
              </div>
              <div class="nama-lot-lelang-all">
                Lot-{{item.id}}
              </div>
              <div class="lot-expired-lelang-all">
                <timer :starttime="now" :endtime="item.expired_at" :trans="transOption" />
              </div>
              <button @click="detailLelang(item.id)" class="btn-detail">Detail
                Lelang
              </button>
            </div>
          </div>
      </div>
    </v-wait>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import Timer from './timer'

  export default {
    components:{
      'timer': Timer,
    },
    data() {
      return {
        accessTokens : '',
        token : '',
        is_favorite : false,
        lot : [],
        datalot : [],
        baseURL : process.env.URL,
        devAPI  : process.env.DEV_API,
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
    computed: {
      filterAccessToken(){
        console.log('mantap gan '+this.$store.getters['authh/accessToken'])
        return this.accessTokens = this.$store.getters['authh/accessToken'];
      },
      filterDataLot(){
        console.log('mantap gan '+this.$store.getters['authh/accessToken'])
        return this.lot = this.$store.getters['authh/accessToken'];
      },
    },
    methods: {
      back(){
        this.$router.push('/');
      },
      async getLot() {
        this.$wait.start('load_all_lot');

        this.$axios.get(this.devAPI + "user/lot")
        .then(response => {
          console.log(response.data.success)
          if(response.data.success == true){
            this.lot = response.data.data.data
          }else{
            this.lot = response.data
          }

        });


        this.datalot = await new Promise(resolve => {
          setTimeout(() => resolve(this.lot), 3000);
        });

        this.$wait.end('load_all_lot');
      },
      async getLotAuth() {
        this.$wait.start('load_all_lot');

        const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
        this.$axios.get(this.devAPI + "user/lot_terlaris_auth", config)
          .then(response => {
            console.log(response.data.data.data)
            if(response.data.success == true){
              this.lot = response.data.data.data
            }else{
              this.lot = response.data
            }
            // this.lot = response.data.data;
          });

        this.datalot = await new Promise(resolve => {
          setTimeout(() => resolve(this.lot), 3000);
        });

        this.$wait.end('load_all_lot');
      },
      save_favorit(id){
        const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
        this.$axios.post(this.devAPI + "user/save_lot_favorit/"+id, [], config)
        .then(response => {
          console.log(response.data.success)
          if(response.data.success == true){
            this.$toasted.show(response.data.message, {
              theme: "bubble",
              position: "top-center",
              duration : 5000
            });
            this.getLotAuth();
          }else{
            this.$toasted.show(response.data.message, {
              theme: "bubbles",
              position: "top-center",
              duration : 5000
            });
          }
        });
      },
      detailLelang(id){
        this.$router.push('/details/'+id)
      },
    },
    mounted() {
      if(process.client){
        var aa = localStorage.getItem('lelangoApp');
        var cekakses = JSON.parse(aa).authh.accessToken;

        // cek adakah akses atau adakah key localstorage dengan nama lelangoApp
        if(aa == null || cekakses == false){
          this.getLot();
        } else{
          this.token = JSON.parse(aa).authh.userData.user.token.access_token;
          this.getLotAuth();
        }
      }
    },
  }
</script>

<style lang="scss">
  @media(min-width:481px){
    .header-lelang-all {
      // background: linear-gradient(145deg, #00baff, #009dd7);
      width: 480px;
      margin: auto;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0px 0px 2px 0px lightgrey;
      .text-header-lelang-all {
        color: #00aeef;
        font-weight: bold;
      }
      .icon-header-lelang-all{
        color: #00aeef;
        font-size:18px;
        width:20px;
      }
    }
  }

  @media(min-width:321px) and (max-width:480px){
    .header-lelang-all {
      // background: linear-gradient(145deg, #00baff, #009dd7);
      margin: auto;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      align-items: center;
      .text-header-lelang-all {
        color: #00aeef;
        font-size: 20px;
        font-weight: bold;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;;
      }
      .icon-header-lelang-all{
        color: #00aeef;
        font-size:18px;
        width:20px;
      }
    }
  }

  @media(min-width:0px) and (max-width:320px){
    .header-lelang-all {
      // background: linear-gradient(145deg, #00baff, #009dd7);
      margin: auto;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      align-items: center;
      .text-header-lelang-all {
        color: #00aeef;
        font-size: 20px;
        font-weight: bold;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;;
      }
      .icon-header-lelang-all{
        color: #00aeef;
        font-size:18px;
        width:20px;
      }
    }
  }


  @media(min-width:481px){
    .grid-lelang-all{
      width: 480px;
      margin: auto;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .lelang-all{
          cursor:pointer;
          // height: 50%;
          // width: 50%;
          display: -webkit-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0px 2px 4px lightgrey;
          img{
            height: 140px;
            padding: 10px;
          }

          .harga-lelang{
            font-size: 14px;
            background: linear-gradient(145deg, #00baff, #009dd7);
            padding: 10px;
            border-radius: 10px 10px 0px 0px;
            text-align: center;
            color: #fff;
            width:100%;
          }

          .bg-btn-favaorit{
            display: flex;
            flex-direction: row-reverse;
            position: relative;
            .btn-favorit{
              position: absolute;
              float: none;
              right: -30px;
              padding:10px;
            }
            .icon-favorit{
              color: #b9b8b8;
            }

            .img-list-lelang-all{
              width: 150px;
              padding:10px;
              margin: auto;
            }
          }

          .nama-lot-lelang-all{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
          .lot-expired-lelang-all{
            text-align: center;
            width: 100%;
          }

          .countdown{
            display: flex;
            justify-content: space-around;
            margin-bottom: 10px;
            margin-top: 10px;
            span.number{
              background: linear-gradient(145deg, #fffb3f, #decc2e);
              padding-right: 5px;
              padding-left: 5px;
              border-radius: 5px;
            }
            .format{
              font-size: 80%;;
            }
          }

      }
    }
  }

  @media(min-width:360px) and (max-width: 480px){
    .grid-lelang-all{
      margin: auto;
      margin-bottom: 0px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .lelang-all{
          cursor:pointer;
          // height: 50%;
          // width: 50%;
          display: -webkit-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0px 2px 4px lightgrey;
          img{
            height: 140px;
            padding: 10px;
          }

          .harga-lelang{
            font-size: 14px;
            background: linear-gradient(145deg, #00baff, #009dd7);
            padding: 10px;
            border-radius: 10px 10px 0px 0px;
            text-align: center;
            color: #fff;
            width:100%;
          }

          .bg-btn-favaorit{
            display: flex;
            flex-direction: row-reverse;
            position: relative;
            .btn-favorit{
              position: absolute;
              float: none;
              right: -30px;
              padding:10px;
            }
            .icon-favorit{
              color: #b9b8b8;
            }

            .img-list-lelang-all{
              width: 100px;
              height: auto;
              padding:10px;
              margin: auto;
            }
          }

          .nama-lot-lelang-all{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
          .lot-expired-lelang-all{
            text-align: center;
            width: 100%;
          }

          .countdown{
            display: flex;
            justify-content: space-around;
            margin-bottom: 10px;
            margin-top: 10px;
            span.number{
              background: linear-gradient(145deg, #fffb3f, #decc2e);
              padding-right: 5px;
              padding-left: 5px;
              border-radius: 5px;
            }
            .format{
              font-size: 80%;;
            }
          }

      }
    }
  }

  @media(max-width: 359px){
    .grid-lelang-all{
      margin: auto;
      margin-bottom: 0px;
      display: grid;
      grid-template-columns: auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .lelang-all{
          cursor:pointer;
          // height: 50%;
          // width: 50%;
          display: -webkit-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0px 2px 4px lightgrey;
          img{
            height: 140px;
            padding: 10px;
          }

          .harga-lelang{
            font-size: 14px;
            background: linear-gradient(145deg, #00baff, #009dd7);
            padding: 10px;
            border-radius: 10px 10px 0px 0px;
            text-align: center;
            color: #fff;
            width:100%;
          }

          .bg-btn-favaorit{
            display: flex;
            flex-direction: row-reverse;
            position: relative;
            .btn-favorit{
              position: absolute;
              float: none;
              right: -30px;
              padding:10px;
            }
            .icon-favorit{
              color: #b9b8b8;
            }

            .img-list-lelang-all{
              width: 150px;
              padding:10px;
              margin: auto;
            }
          }

          .nama-lot-lelang-all{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
          .lot-expired-lelang-all{
            text-align: center;
            width: 100%;
          }

          .countdown{
            display: flex;
            justify-content: space-around;
            margin-bottom: 10px;
            margin-top: 10px;
            span.number{
              background: linear-gradient(145deg, #fffb3f, #decc2e);
              padding-right: 5px;
              padding-left: 5px;
              border-radius: 5px;
            }
            .format{
              font-size: 80%;;
            }
          }

      }
    }
  }
</style>
