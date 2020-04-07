<template>
  <div>
    <div>
      <div class="header-favorit">
        <div>
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-favorit" @click="back()"/>
        </div>
        <div class="text-header-favorit">Lelang Favorit</div>
        <font-awesome-icon :icon="['fas', 'search']" class="icon-header-favorit" @click="back()"/>
      </div>
    </div>
    <div class="main-favorit">
      <div class="grid-lelang-all-favorit">
        <div v-for="(item, index) in dataFavorit" :key="index" class="lelang-all-favorit">
          <div v-if="new Date(item.lot.expired_at).getTime() < new Date(now.format('YYYY-MM-DD HH:mm:ss')).getTime()">
            <div class="harga-lelang">
              <!-- <small>Harga lot</small>  -->
              {{item.lot.format_bid}}
            </div>
            <div class="bg-btn-favaorit">
              <button class="btn-favorit" @click="delete_favorit(item.lot.id)">
                <span>
                  <font-awesome-icon :icon="['fas', 'trash']" class="icon-favorit" style="width:25px; font-size:20px; color:#f44336;"/>
                </span>
              </button>
              <span>
                <img alt="img-lot-terbaru" class="img-list-lelang-all-favorit" :src="baseURL+item.lot.picture[0]" >
              </span>
            </div>
            <div class="nama-lot-lelang-all-favorit">
              {{item.lot.nama}}
            </div>
            <div class="lot-expired-lelang-all-favorit">
              lelang telah berakhir !!
            </div>
            <button @click="detailLelang(item.lot.id)" class="btn-detail">Detail
              Lelang
            </button>
          </div>
          <div v-else>
            <div class="harga-lelang">
              <!-- <small>Harga lot</small>  -->
              {{item.lot.format_bid}}
            </div>
            <div class="bg-btn-favaorit">
              <button class="btn-favorit" @click="delete_favorit(item.lot.id)">
                <span>
                  <font-awesome-icon :icon="['fas', 'trash']" class="icon-favorit" style="width:25px; font-size:20px; color:#f44336;"/>
                </span>
              </button>
              <span>
                <img alt="img-lot-terbaru" class="img-list-lelang-all-favorit" :src="baseURL+item.lot.picture[0]" >
              </span>
            </div>
            <div class="nama-lot-lelang-all-favorit">
              {{item.lot.nama}}
            </div>
            <div class="lot-expired-lelang-all-favorit">
              <timer :starttime="now" :endtime="item.lot.expired_at" :trans="transOption" />
            </div>
            <button @click="detailLelang(item.lot.id)" class="btn-detail">Detail
              Lelang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import Timer from './partial_home/timer'

export default {
  // middleware: 'iflogin',
  components:{
    'timer': Timer,
  },
  data() {
    return {
      accessToken : '',
      token: '',
      baseURL : process.env.URL,
      devAPI : process.env.DEV_API,
      dataFavorit : [],
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
  methods: {
    back(){
      window.history.back()
    },
    getFavorit(){
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };

      this.$axios.get(this.devAPI+`user/get_lot_favorit`, config)
      .then(response => {
        // console.log(response.data.success);
        if(response.data.success == true){
          this.dataFavorit = response.data.data.data;
        }
      })

    },
    detailLelang(id){
      this.$router.push('/details/'+id)
    },
    delete_favorit(id){
      const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
        this.$axios.post(this.devAPI + "user/delete_lot_favorit/"+id, [], config)
        .then(response => {
          console.log(response.data.success)
          if(response.data.success == true){
            this.$toasted.show(response.data.message, {
              theme: "bubble",
              position: "top-center",
              duration : 5000
            });
            this.getFavorit();
          }else{
            this.$toasted.show(response.data.message, {
              theme: "bubbles",
              position: "top-center",
              duration : 5000
            });
          }
        });
    }
  },
  mounted() {
    if (process.client) {
      var aa = localStorage.getItem('lelangoApp');
      var cekakses =  JSON.parse(aa).authh.accessToken;

      if(aa == null || cekakses == false){
        this.$router.push('/login');
      } else{
        this.accessTokens = JSON.parse(aa).authh.accessToken;
        if(JSON.parse(aa).authh.userData == ''){
          this.$router.push('/login');
        } else {
          this.token = JSON.parse(aa).authh.userData.user.token.access_token;
        }

        this.getFavorit();
      }
    }
  },
}
</script>

<style lang="scss">
  @media (min-width:481px){
    .header-favorit{
      width: 480px;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-header-favorit{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-favorit{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .main-favorit{
      width: 480px;
      margin: auto;
    }
  }

  @media (max-width:480px){
    .header-favorit{
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-header-favorit{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-favorit{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .main-favorit{
      width: auto;
    }
  }

  @media(min-width:481px){
    .grid-lelang-all-favorit{
      width: 480px;
      margin: auto;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .lelang-all-favorit{
          cursor:pointer;
          // height: 50%;
          // width: 50%;
          // display: -webkit-box;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // flex-direction: column;
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
            // display: flex;
            // flex-direction: row-reverse;
            position: relative;
            .btn-favorit{
              position: absolute;
              float: none;
              right: 0px;
              padding:10px;
            }
            .icon-favorit{
              color: #b9b8b8;
            }

            .img-list-lelang-all-favorit{
              width: 150px;
              padding:10px;
              margin: auto;
            }
          }

          .nama-lot-lelang-all-favorit{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
          .lot-expired-lelang-all-favorit{
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
    .grid-lelang-all-favorit{
      margin: auto;
      margin-bottom: 0px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .lelang-all-favorit{
          cursor:pointer;
          // height: 50%;
          // width: 50%;
          // display: -webkit-box;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // flex-direction: column;
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
            // display: flex;
            // flex-direction: row-reverse;
            position: relative;
            .btn-favorit{
              position: absolute;
              float: none;
              right: 0px;
              padding:10px;
            }
            .icon-favorit{
              color: #b9b8b8;
            }

            .img-list-lelang-all-favorit{
              width: 100px;
              height: auto;
              padding:10px;
              margin: auto;
            }
          }

          .nama-lot-lelang-all-favorit{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
          .lot-expired-lelang-all-favorit{
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
    .grid-lelang-all-favorit{
      margin: auto;
      margin-bottom: 0px;
      display: grid;
      grid-template-columns: auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .lelang-all-favorit{
          cursor:pointer;
          // height: 50%;
          // width: 50%;
          // display: -webkit-box;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // flex-direction: column;
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
            // display: flex;
            // flex-direction: row-reverse;
            position: relative;
            .btn-favorit{
              position: absolute;
              // float: none;
              right: 0px;
              padding:10px;
            }
            .icon-favorit{
              color: #b9b8b8;
            }

            .img-list-lelang-all-favorit{
              width: 150px;
              padding:10px;
              margin: auto;
            }
          }

          .nama-lot-lelang-all-favorit{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
          .lot-expired-lelang-all-favorit{
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
