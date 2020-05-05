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
        <div class="tab">
          <nuxt-link to="/riwayat_lelang">
            <div class="tab-method">
              <img src="~static/img/riwayat/all.png" alt="">
              <span>Semua</span>
            </div>
          </nuxt-link>
        </div>
        <div class="tab">
          <nuxt-link to="/riwayat/pembayaran">
            <div class="tab-method">
              <img src="~static/img/riwayat/method.png" alt="">
              <span>Pembayaran</span>
            </div>
          </nuxt-link>
        </div>
        <div class="tab">
          <nuxt-link to="/riwayat/aktif">
            <div class="tab-method">
              <img src="~static/img/riwayat/active.png" alt="">
              <span>Lelang Aktif</span>
            </div>
          </nuxt-link>
        </div>
        <div class="tab">
          <nuxt-link to="/riwayat/batal">
            <div class="tab-method">
              <img src="~static/img/riwayat/gagal.png" alt="">
              <span>Lelang Dibatalkan</span>
            </div>
          </nuxt-link>
        </div>
        <div class="tab">
          <nuxt-link to="/riwayat/selesai">
            <div class="tab-method">
              <img src="~static/img/riwayat/finish.png" alt="">
              <span>Lelang Selesai</span>
            </div>
          </nuxt-link>
        </div>
        <div class="ext"></div>
      </div>

      <div v-if='filter_status.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height: 80vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" class="img-kategori">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>
        <div v-for="(item, index) in filter_status" :key="index" class="bg_status_lot">
          <div class="status_menunggu_bayar" v-if="item[0].bidtertinggi.bid_status == 'menunggu pembayaran'">
            <div class="bg_button_cancel">
              menunggu pembayaran
              <button class="btn_cancel" @click="update_va(index, 2,item[0].lot.id)">Batalkan Transaksi</button>
            </div>
          </div>
          <div class="status_lot_aktif" v-if="item[0].bidtertinggi.bid_status == 'lelang aktif'">
            lelang aktif
          </div>
          <div class="status_lot_pembayaran" v-else-if="item[0].bidtertinggi.bid_status == 'pilih metode pembayaran'">
            <div class="bg_button_cancel">
              pilih metode pembayaran
              <button class="btn_cancel" @click="update_va(index, 1,item[0].lot.id)">Batalkan Transaksi</button>
            </div>
          </div>
          <div class="status_lot_menang" v-else-if="item[0].bidtertinggi.bid_status == 'menang lelang'">
            <div class="img_winner">
              <img src="img/winner.png" alt="">
              menang lelang
            </div>
          </div>
          <div class="status_lot_kalah" v-else-if="item[0].bidtertinggi.bid_status == 'lelang selesai'">
            <div class="img_lose">
              <img src="img/lose.png" alt="">
              kalah lelang
            </div>
          </div>
          <div class="status_lot_gagal" v-else-if="item[0].bidtertinggi.bid_status == 'gagal melakukan pembayaran'">
            gagal melakukan pembayaran
          </div>

          <div class="main_status_lot">
            <div class="lot_id">
              <small>LOT ID</small>
              <div>{{item[0].lot.id}}</div>
            </div>
            <div v-if="item[0].bidtertinggi.bid_status == 'pilih metode pembayaran' || item[0].bidtertinggi.bid_status == 'gagal melakukan pembayaran' || item[0].bidtertinggi.bid_status == 'menunggu pembayaran'">
              <div class="waktu_berakhir">
                <small>LELANG DIBUAT</small>
                <div>{{parsedate(item[0].lot.created_at)}}</div>
              </div>
            </div>
            <div v-else>
              <div class="waktu_berakhir">
                <small>LELANG BERAKHIR</small>
                <div>{{parsedate(item[0].lot.jadwal_lelang)}}</div>
              </div>
            </div>
            <div class="warehouse">
              <small>WAREHOUSE</small>
              <div>{{item[0].lot.warehouse.warehouse_name}}</div>
            </div>
            <div class="harga">
              <small>HARGA</small>
              <div>{{item[0].lot.bid_price}}</div>
            </div>
          </div>
          <div v-if="item[0].bidtertinggi.bid_status == 'lelang aktif'">
            <div class="bg_button_aktif">
              <button class="btn_detail" @click="detailLelang(item[0].lot.id)">Detail</button>
            </div>
          </div>
          <div v-else-if="item[0].bidtertinggi.bid_status == 'lelang selesai'">
            <div class="bg_button_kalah">
              <button class="btn_detail" @click="detailLelang(item[0].lot.id)">Detail</button>
            </div>
          </div>
          <div v-else-if="item[0].bidtertinggi.bid_status == 'menang lelang'">
            <div class="bg_button_menang">
              <button class="btn_detail" @click="detailLelang(item[0].lot.id)">Detail</button>
            </div>
          </div>
          <div v-else-if="item[0].bidtertinggi.bid_status == 'pilih metode pembayaran'">
            <div class="bg_button_pembayaran">
              <button class="btn_pilih_metode" @click="bayar_lelang(item[0].lot.id)" >Pilih Pembayaran</button>
            </div>
          </div>
          <div v-else-if="item[0].bidtertinggi.bid_status == 'menunggu pembayaran'">
            <div class="bg_button_menunggu">
              <button class="btn_menunggu" @click="cara_bayar(item[0].lot.id)">cara pembayaran</button>
            </div>
          </div>
        </div>

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
import moment from 'moment'

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
      hashid: '',
      datalot: [],
      databid_tertinggi: [],
      devAPI : process.env.DEV_API,
    }
  },
  computed: {
    filter_status(){
      return this.get_data_status_lelang;
    }
  },
  methods: {
    parsedate(time){
      return moment(time).locale('id').format('Do MMMM YYYY')
    },
    back(){
      this.$router.push('/');
    },
    async get_status() {
      this.$wait.start('load_status_lelang');

      this.$axios.get( process.env.DEV_API+`user/status_lot/${this.hashid}/3`)
      .then(response => {
        // console.log(response.data.data[0].lot);
        for (let i=0; i<response.data.data.length; i++) {
          this.data_status_lelang.push([response.data.data[i]])
        }
        // this.data_status_lelang.push(response.data.data);
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
        axios.get(process.env.DEV_API+`user/status_lot/${this.hashid}/3?page=`+this.page)
        .then(response => {
          if (response.data.data.length > 0) {
            this.lastPage = response.data.data.last_page;
              for (let i=0; i<response.data.data.length; i++) {
                this.get_data_status_lelang.push([response.data.data[i]])
              }
            console.log(this.get_data_status_lelang)
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
    },
    update_va(index, status, lot_id){
      this.get_data_status_lelang.splice(index,1);

      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters['authh/userData'].user.token.access_token}`
        },
        data: {
          tipe_status_lot:status,
          lot_id:lot_id
        }
      };

      this.$axios.post(this.devAPI + 'va/update_va', [], config)
      .then(response => {
        if(response.data.success == true){
            this.$toasted.show(response.data.message, {
              theme: "bubble",
              position: "top-center",
              duration : 5000
            });
          }else{
            this.$toasted.show(response.data.message, {
              theme: "bubbles",
              position: "top-center",
              duration : 5000
            });
          }
      })
      .catch(function (err) {
        console.log(err)
      });
    },
    bayar_lelang(id){
      this.$store.commit('authh/tipe_pembayaran', 'create')
      return this.$router.push('/pembayaran/'+id)
    },
    cara_bayar(lot_id){
      this.$router.push('/pembayaran/cara_pembayaran/'+lot_id)
    },
    detailLelang(id){
      this.$router.push('/details/'+id)
    },
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

  .text-red {
    color: #c30303;
    font-size: small;
    margin-bottom: 10px;
    display: none;
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

  @media (min-width:481px){
    .tabs{
      background: #ffffff;
      width: 480px;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 20px;
      display: -webkit-box;
      overflow-x: hidden;

      .tab{
        padding-left: 10px;
        padding-right: 10px;


        .tab-method{
          display: flex;
          align-items: center;

          img{
            width: 25px;
            margin-right: 5px;
          }
        }
      }

      .ext{
        position: relative;
        left: 0%;
        width: 10px;
        height: 1px;
      }
    }

    .tabs:hover{
      overflow-x: scroll;
    }

    .exact-active-link {
      color: #00aeef;
      font-weight: 500;
    }

    .bg_status_lot{
      width: 480px;
      margin: auto;
      box-shadow: 0px 2px 4px lightgrey;
      margin-top: 20px;
      margin-bottom: 20px;

      .status_menunggu_bayar{
        background: #ffc107c2;
        color: #000;
        margin-top: 10px;
        padding: 10px;
        text-align: center;
      }
      .status_lot_aktif {
        background: #00aeef;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
      }
      .status_lot_pembayaran {
        background: #3dd682;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
      }
      .status_lot_menang {
        background: #607D8B;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;
        .img_winner {
          display: flex;
          justify-content: center;
          align-items: center;

          img{
            width: 7%;
          }
        }
      }
      .status_lot_kalah {
        background: #607D8B;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
        .img_lose {
          display: flex;
          justify-content: center;
          align-items: center;

          img{
            width: 7%;
          }
        }
      }
      .status_lot_gagal {
        background: #fc0404b3;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
      }

      .main_status_lot {
        display: flex;
        justify-content: space-between;
        padding: 20px;

        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          small{
            font-size: 70%;
            color:darkgrey;
          }
        }
      }

      .bg_button_aktif {
        text-align: center;
        margin: auto;
        padding-bottom: 10px;

        button.btn_detail {
          // font-weight: 500;
          background: #00aeef;
          color: #fff;
          padding: 5px;
          box-shadow: 0px 2px 3px lightgrey;
          width: 30%;
        }
      }

      .bg_button_kalah {
        text-align: center;
        margin: auto;
        padding-bottom: 10px;

        button.btn_detail {
          // font-weight: 500;
          background: #607D8B;
          color: #fff;
          padding: 5px;
          box-shadow: 0px 2px 3px lightgrey;
          width: 30%;
        }
      }

      .bg_button_menang {
        text-align: center;
        margin: auto;
        padding-bottom: 10px;

        button.btn_detail {
          // font-weight: 500;
          background: #607D8B;
          color: #fff;
          padding: 5px;
          box-shadow: 0px 2px 3px lightgrey;
          width: 30%;
        }
      }

      .bg_button_cancel {
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
        button.btn_cancel {
          // font-weight: 500;
          background: rgb(253, 78, 78);
          color: #fff;
          padding: 3px;
        }
      }
      .bg_button_pembayaran {
        padding-bottom: 10px;
        text-align:center;
        button.btn_pilih_metode {
            // font-weight: 500;
            background: #3dd682;
            color: #fff;
            padding: 3px;
            box-shadow: 0px 2px 3px lightgrey;
            // font-size: 90%;
            width: 30%;
        }
      }

      .bg_button_menunggu{
        padding-bottom: 10px;
        text-align:center;
        button.btn_menunggu {
            // font-weight: 500;
            background: #ffc107c2;
            color: #000;
            padding: 3px;
            box-shadow: 0px 2px 3px lightgrey;
            // font-size: 90%;
            width: 30%;
        }
      }
    }
  }

  @media (max-width:480px){
    .tabs{
      background: #ffffff;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 20px;
      display: -webkit-box;
      overflow-x: hidden;

      .tab{
        padding-left: 10px;
        padding-right: 10px;


        .tab-method{
          display: flex;
          align-items: center;

          img{
            width: 25px;
            margin-right: 5px;
          }
        }
      }

      .ext{
        position: relative;
        left: 0%;
        width: 10px;
        height: 1px;
      }
    }

    .tabs:hover{
      overflow-x: scroll;
    }

    .exact-active-link {
      color: #00aeef;
      font-weight: 500;
    }

    .bg_status_lot{
      margin: auto;
      box-shadow: 0px 2px 4px lightgrey;
      margin-top: 20px;
      font-size: 14px;;
      margin-bottom: 20px;

      .status_menunggu_bayar{
        background: #ffc107c2;
        color: #000;
        margin-top: 10px;
        padding: 10px;
        text-align: center;
      }
      .status_lot_aktif {
        background: #00aeef;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
      }
      .status_lot_pembayaran {
        background: #3dd682;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
      }
      .status_lot_menang {
        background: #607D8B;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;
        .img_winner {
          display: flex;
          justify-content: center;
          align-items: center;

          img{
            width: 7%;
          }
        }
      }
      .status_lot_kalah {
        background: #607D8B;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
        .img_lose {
          display: flex;
          justify-content: center;
          align-items: center;

          img{
            width: 7%;
          }
        }
      }
      .status_lot_gagal {
        background: #fc0404b3;
        color:#fff;
        margin-top: 10px;
        padding:10px;
        text-align: center;;
      }

      .main_status_lot {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          small{
            font-size: 70%;
            color:darkgrey;
          }
        }
      }

      .bg_button_aktif {
        text-align: center;
        margin: auto;
        padding-bottom: 10px;

        button.btn_detail {
          // font-weight: 500;
          background: #00aeef;
          color: #fff;
          padding: 5px;
          box-shadow: 0px 2px 3px lightgrey;
          width: 30%;
        }
      }

      .bg_button_kalah {
        text-align: center;
        margin: auto;
        padding-bottom: 10px;

        button.btn_detail {
          // font-weight: 500;
          background: #607D8B;
          color: #fff;
          padding: 5px;
          box-shadow: 0px 2px 3px lightgrey;
          width: 30%;
        }
      }

      .bg_button_menang {
        text-align: center;
        margin: auto;
        padding-bottom: 10px;

        button.btn_detail {
          // font-weight: 500;
          background: #607D8B;
          color: #fff;
          padding: 5px;
          box-shadow: 0px 2px 3px lightgrey;
          width: 30%;
        }
      }

      .bg_button_cancel {
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
        button.btn_cancel {
          // font-weight: 500;
          background: rgb(253, 78, 78);
          color: #fff;
          padding: 3px;
        }
      }
      .bg_button_pembayaran {
        padding-bottom: 10px;
        text-align:center;
        button.btn_pilih_metode {
            // font-weight: 500;
            background: #3dd682;
            color: #fff;
            padding: 3px;
            box-shadow: 0px 2px 3px lightgrey;
            // font-size: 90%;
            width: 50%;
        }
      }

      .bg_button_menunggu{
        padding-bottom: 10px;
        text-align:center;
        button.btn_menunggu {
            // font-weight: 500;
            background: #ffc107c2;
            color: #000;
            padding: 3px;
            box-shadow: 0px 2px 3px lightgrey;
            // font-size: 90%;
            width: 50%;
        }
      }
    }
  }
</style>
