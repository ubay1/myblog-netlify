<template>
<div>
    <div class="header-detail">
      <div><font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/></div>
      <div class="text-header-lot">Lot-{{id}}</div>
      <div class="text-header-penawaran">{{filter_penawaran}} Penawaran</div>
    </div>

    <div v-if="lelang_data_product.length == 0">
      <div class="main-detail">
        <!-- <notfound/> -->
      </div>
    </div>

    <div v-else>
      <div class="bg-card-list-data-detail">
        <!-- ketika klik lain, akan dihandle bagian ini -->
        <div v-if="productid.length != 0">
          <div v-if="productid.product.type.type_name == 'hot'">
            <div class="text-type-hot">
              {{productid.product.type.type_name}}
            </div>
          </div>
          <div v-else-if="productid.product.type.type_name == 'slow'">
            <div class="text-type-slow">
              {{productid.product.type.type_name}}
            </div>
          </div>
          <div v-else>
            <div class="text-type-fast">
              {{productid.product.type.type_name}}
            </div>
          </div>
          <img :src="baseURL+productid.product.pictures[0]" alt="img-list-detail">
        </div>

        <!-- pembukaan awal, akan dihandle oleh bagian ini -->
        <div v-else>
          <div v-if="lelang_product_awal[0].product.type.type_name == 'hot'">
            <div class="text-type-hot">
              {{lelang_product_awal[0].product.type.type_name}}
            </div>
          </div>
          <div v-else-if="lelang_product_awal[0].product.type.type_name == 'slow'">
            <div class="text-type-slow">
              {{lelang_product_awal[0].product.type.type_name}}
            </div>
          </div>
          <div v-else>
            <div class="text-type-fast">
              {{lelang_product_awal[0].product.type.type_name}}
            </div>
          </div>
           <img :src="baseURL+lelang_product_awal[0].product.pictures[0]" alt="">
        </div>

      </div>

      <div class="bg-card-list-data">
        <div class="card-list-data" :id="item.id" v-for="(item, index) in lelang_data_product" :key="index">
          <img alt="img-list-data" style="border-radius:20px; cursor:pointer;" @click="getid(index)" :src="baseURL+item.picture[0]"/>
          <div class="ext"></div>
        </div>
      </div>

      <hr class="mb-3 mt-4">

      <div class="bg-card-list-data-detail-text mb-3">
        <!-- ketika klik lain, akan dihandle bagian ini -->
        <div v-if="productid.length != 0">
          <table class="sm:bg-white rounded-lg">
            <tr>
              <td class="p-2"><b>Nama Produk</b></td>
              <td class="">:</td>
              <td class="p-2">{{productid.product.product_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Kategori Produk</b></td>
              <td class="">:</td>
              <td class="p-2">{{productid.product.category.category_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Harga Satuan</b></td>
              <td class="">:</td>
              <td class="p-2">{{productid.product.format_price}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Tipe</b></td>
              <td class="">:</td>
              <td class="p-2">{{productid.product.type.type_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Deskripsi</b></td>
              <td class="">:</td>
              <td class="p-2">{{productid.product.description}}</td>
            </tr>
          </table>
        </div>

        <!-- pembukaan awal, akan dihandle oleh bagian ini -->
        <div v-else>
          <table class="sm:bg-white rounded-lg">
            <tr>
              <td class="p-2"><b>Nama Produk</b></td>
              <td class="">:</td>
              <td class="p-2">{{lelang_product_awal[0].product.product_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Kategori Produk</b></td>
              <td class="">:</td>
              <td class="p-2">{{lelang_product_awal[0].product.category.category_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Harga Satuan</b></td>
              <td class="">:</td>
              <td class="p-2">{{lelang_product_awal[0].product.format_price}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Tipe</b></td>
              <td class="">:</td>
              <td class="p-2">{{lelang_product_awal[0].product.type.type_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Deskripsi</b></td>
              <td class="">:</td>
              <td class="p-2">{{lelang_product_awal[0].product.description}}</td>
            </tr>
          </table>
        </div>
      </div>

      <hr class="mb-5">

      <div>

      </div>

      <div v-if="filter_lelang_data_bid.length == 0">
        <div class="bg-penawaran-tertinggi">
            <div class="text-penawaran-tertinggi">Penawaran Tertinggi</div>
            <timer :starttime="now" :endtime="lelang_data_lot.expired_at" :trans="transOption" />
        </div>
        <div class="user-penawar-tertinggi">
          <div>
            Harga awal
          </div>
          <button class="nilai-penawaran-tertinggi">{{lelang_data_lot.bid_price}}
            <font-awesome-icon :icon="['fas', 'chevron-right']" style="width:14; font-size:14;"/>
          </button>
        </div>
        <div class="footer-bidding">
          <button class="btn-join-bid" @click="join_lot(id)">
            <img src="~/static/img/img_auction.png" alt="img-bidding" style="width:20px; margin-right:10px;">
            Ikuti Lelang
          </button>
        </div>
      </div>
      <div v-else>
        <div class="bg-penawaran-tertinggi">
            <div class="text-penawaran-tertinggi">Penawaran Tertinggi</div>
            <timer :starttime="now" :endtime="lelang_data_lot.expired_at" :trans="transOption" />
        </div>
        <div class="user-penawar-tertinggi">
            <div v-for="(item, index) in filter_user_penawar_tertinggi" :key="index">
              {{item.user.name}}
            </div>
            <button @click='detail_bidding(lelang_data_lot.id)' class="nilai-penawaran-tertinggi">{{filter_bid_tertinggi2}}
              <font-awesome-icon :icon="['fas', 'chevron-right']" style="width:14; font-size:14;"/>
            </button>
        </div>
        <div class="footer-bidding">
          <button class="btn-join-bid" @click="join_lot(id)">
            <img src="~/static/img/img_auction.png" alt="img-bidding" style="width:20px; margin-right:10px;">
            Ikuti Lelang
          </button>
        </div>
      </div>
    </div>

    <!-- modal -->
    <modal name="hello-world">
      <div class="bg-modal-lot">
        <div>
          <img :src="baseURL+lelang_data_lot.picture" style="width: 70px; box-shadow: 0px 2px 2px lightgrey;">
        </div>
        <div class="bg-text-modal-lot">
          <div><b>Lot-{{id}}</b></div>
          <div v-if="filter_lelang_data_bid.length == 0">
            <small>Bid Tertinggi : {{filter_bid_tertinggi}}</small>
          </div>
          <div v-else>
            <small>Bid Tertinggi : {{filter_bid_tertinggi2}}</small>
          </div>
          <small>Syarat dan ketentuan berlaku</small>
        </div>
      </div>
      <hr>
      <div class="bg-form-bidding">
        <form method="post" @submit.prevent="pay_bidding">
          <input class="bg-white text-gray-600 h-11 px-5 pr-10 rounded-full text-sm focus:outline-none form-bidding" type="text" v-model="form.bidding" placeholder="Masukan jumlah bid" name="bidding" required='true'>

          <button type="submit" :disabled="btnsubmit" class="btn-form-bidding mb-4">
            <span v-show="showtext_btn">Ajukan penawaran </span>
            <img v-show="showloader" src="~/static/loading_send.gif" style="width:20px;" alt="">
          </button>
        </form>
      </div>
    </modal>
</div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import Timer from '../partial_home/timer'

  export default {
    components:{
      'timer': Timer,
    },
    data() {
      return {
        id: this.$route.params.id,
        token : '',
        lelang_data_lot:[],
        lelang_data_bid:[],
        user_penawar_tertinggi : [],
        lelang_data_lotdetail : [],
        lelang_data_product: [],
        productid: [],
        lelang_product_awal: [],
        baseURL: process.env.URL,
        devAPI : process.env.DEV_API,
        form:{
          bidding:''
        },
        showloader: false,
        btnsubmit: false,
        showtext_btn: true,
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
      filter_lelang_data_bid(){
        return this.lelang_data_bid;
      },
      filter_bid_tertinggi(){
        return this.lelang_data_lot.bid_price;
      },
      filter_bid_tertinggi2(){
        return this.lelang_data_bid[0].format_price;
      },
      filter_penawaran(){
        return this.lelang_data_lot.total_bidder;
      },
      filter_user_penawar_tertinggi(){
        return this.lelang_data_bid.slice(0,1);
      }
    },
    methods: {
      getdetaillelang(){
        const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
        axios.get(this.devAPI + "user/lot/"+this.id, [])
          .then(response => {
            this.lelang_data_lot = response.data.lot;
            this.lelang_data_bid = response.data.bid;
            this.lelang_data_lotdetail = response.data.lot_detail;

            for (let i = 0; i<this.lelang_data_lotdetail.length; i++) {
              this.lelang_data_product.push({
                id: this.lelang_data_lotdetail[i].product.id,
                picture: JSON.parse(this.lelang_data_lotdetail[i].product.picture)
              });
            }
            // mengambil data pertama, untuk ditampilkan diawal
            this.lelang_product_awal.push(this.lelang_data_lotdetail[0])
            // console.log(this.lelang_data_lot)
        });
      },
      back(){
        this.$router.push('/');
      },
      getid(id){
        this.productid = this.lelang_data_lotdetail[id]
      },
      join_lot(id){
        const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        };
        axios.get(this.devAPI + "user/join_lot/"+this.id, config)
        .then(response => {
          console.log(response.data.success);
          if(response.data.success == true){
            this.$modal.show('hello-world');
          } else if(response.data.success == false && response.data.statuscode == 4004){
            this.$swal({
              title: '',
              text: response.data.message,
              icon: 'warning',
              showCancelButton: false,
            })
          } else if(response.data.success == false && response.data.statuscode == 4002){
            this.$swal({
              title: '',
              text: response.data.message,
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Bayar',
              cancelButtonText: 'Batal',
            }).then((result) => {
              if (result.value) {
                return this.$router.push('/pembayaran/'+this.id)
              }
            })
          }
        });
      },
      pay_bidding(){
        // jika data bid == 0
        if(this.lelang_data_bid.length == 0){
          this.showloader = !this.showloader;
          this.btnsubmit = !this.btnsubmit;
          this.showtext_btn = !this.showtext_btn;

          if(this.form.bidding <= this.lelang_data_lot.original_bid_price){
            this.$toasted.show('tidak boleh kecil atau sama dengan dari harga bid sekarang', {
              theme: "bubbles",
              position: "top-center",
              duration : 5000
            });

            this.showloader = !this.showloader;
            this.btnsubmit = !this.btnsubmit;
            this.showtext_btn = !this.showtext_btn;

            return false;
          } else{
            var formData = {
              hargabid: this.form.bidding,
            }
            const config = {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            };
            this.$axios.post(this.devAPI+'user/pay_bidding/'+this.id, formData, config)
            .then(response=>{
              console.log(response);

              if(response.data.success == true){
                this.$toasted.show(response.data.message, {
                  theme: "bubble",
                  position: "top-center",
                  duration : 5000
                });

                this.getdetaillelang();
                this.form.bidding = '';

                this.showloader = !this.showloader;
                this.btnsubmit = !this.btnsubmit;
                this.showtext_btn = !this.showtext_btn;
              }

            })
          }
        }
        else{
          this.showloader = !this.showloader;
          this.btnsubmit = !this.btnsubmit;
          this.showtext_btn = !this.showtext_btn;

          if(this.form.bidding <= this.lelang_data_bid[0].amount){
            this.$toasted.show('tidak boleh kecil atau sama dengan dari harga bid sekarang', {
              theme: "bubbles",
              position: "top-center",
              duration : 5000
            });

            this.showloader = !this.showloader;
            this.btnsubmit = !this.btnsubmit;
            this.showtext_btn = !this.showtext_btn;

            return false;
          } else {
            var formData = {
              hargabid: this.form.bidding,
            }
            const config = {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            };
            this.$axios.post(this.devAPI+'user/pay_bidding/'+this.id, formData, config)
            .then(response=>{
              console.log(response);

              if(response.data.success == true){
                this.$toasted.show(response.data.message, {
                  theme: "bubble",
                  position: "top-center",
                  duration : 5000
                });

                this.getdetaillelang();
                this.form.bidding = '';

                this.showloader = !this.showloader;
                this.btnsubmit = !this.btnsubmit;
                this.showtext_btn = !this.showtext_btn;
              }

            })
          }
        }
      },
      detail_bidding(id){
        this.$router.push('/details/detail_bidding/'+id)
      }
    },
    created() {

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
          this.getdetaillelang()
        }
      }
    },
  }
</script>

<style>

/* timer */
  .countdown{
    display: flex !important;
    justify-content: space-around !important;
    margin-bottom: 0px !important;
  }
  .day, .hour, .min, .sec {
    padding: 5px !important;
    text-align: center !important;
  }
  span.number{
    background: linear-gradient(145deg, #fffb3f, #decc2e);
    padding-right: 5px;
    padding-left: 5px;
    font-size: small !important;
    border-radius: 5px;
  }

  .format{
    font-size: 70% !important;;
  }
/* end timer */

/* modal */
.v--modal-overlay .v--modal-box {
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  bottom: 0px !important;
  top: unset !important;
  left: 0px !important;
  width: 100% !important;
  height: auto !important;
  margin: auto !important;
}

.bg-modal-lot {
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
}

.bg-form-bidding{
  margin: 10px;
}
.form-bidding {
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px lightgrey;
  border-radius: 0px;
}

.btn-form-bidding {
  background-color: rgb(0, 159, 225);
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 2px 4px lightgrey;
  border-radius: 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}

/* end modal */

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

@media(min-width: 481px){

  /* modal */
  .v--modal-overlay .v--modal-box {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    bottom: 0px !important;
    top: 220px !important;
    left: 0px !important;
    width: 480px !important;
    height: auto !important;
    margin: auto !important;
  }

  .bg-modal-lot {
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: left;
    align-items: center;
  }

  .bg-text-modal-lot {
    margin-left: 20px;
  }
  /* end modal */

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .header-detail{
    width: 481px;
    margin: auto;
    /* background: linear-gradient(145deg, #00baff, #009dd7); */
    color:#00aeef;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon-header-detail{
    color: #00aeef;
    /* position: relative; */
    /* left: -8em; */
    font-size:18px;
    width:22px;
  }
  .text-header-lot{
    color: #00aeef;
    /* font-weight: bold; */
  }
  .text-header-penawaran{
    color: #1ddc72;
    /* font-weight: bold; */
  }

  .main-detail{
    width: 480px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: -2em;
    padding-left: 20px;
    padding-right: 20px;
  }

  .bg-card-list-data{
    display: -webkit-box;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    overflow-x: hidden;
  }
  .bg-card-list-data:hover{
    overflow-x: scroll;
  }
  .card-list-data{
    width: 60px;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 0px 4px 4px lightgrey;
  }
  .bg-card-list-data-detail{
    display: -webkit-box;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 8em;
    padding-right: 8em;
  }
  .text-type-hot {
    background: #F44336;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .text-type-slow{
    background: #1ddc72;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .text-type-fast{
    background: #00aeef;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .bg-card-list-data-detail-text{
    display: -webkit-box;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left:30px;
    padding-right:30px;
    margin-bottom:20px;
  }
  .p-2{
    width:50%;
  }
  .ext {
    position: relative;
    left: 100%;
    width: 30px;
    height: 1px;
  }

  hr{
    width: 480px;
    margin: auto;;
  }

  .bg-penawaran-tertinggi{
    align-items:center;
    display: flex;
    justify-content:space-between;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom:20px;
    font-weight:bold;
  }

  .user-penawar-tertinggi {
    width: 480px;;
    margin: auto;
    margin-bottom: 100px;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
  }


  .nilai-penawaran-tertinggi{
    display: flex;
    align-items: center;
  }

  .footer-bidding{
    list-style-type: none;
    display: inline-block;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    font-weight: 600;
    line-height: 13px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    max-width: 480px;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%);
    z-index: 2;
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    /* border-width: 1px 0px 0px; */
    border-image: initial;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    padding: 10px;
    /* border-top: 1px solid rgb(222, 222, 222);
    box-shadow: 0px 0px 2px 0px lightgrey; */
    margin: 0px;
  }

  .btn-join-bid{
    background: #00aeef;
    padding: 6px;
    width: 100%;
    border-radius: 50px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px #bdbcbc;
  }

}

@media(min-width:320px) and (max-width: 480px){
  /* width */
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .header-detail{
    width: auto;
    margin: auto;
    /* background: linear-gradient(145deg, #00baff, #009dd7); */
    color:#00aeef;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon-header-detail{
    color: #00aeef;
    /* position: relative; */
    /* left: -8em; */
    font-size:18px;
    width:22px;
  }
  .text-header-lot{
    color: #00aeef;
    /* font-weight: bold; */
  }
  .text-header-penawaran{
    color: #1ddc72;
    /* font-weight: bold; */
  }

  .main-detail{
    width: auto;
    margin: auto;
    margin-top: 10px;
    margin-bottom: -2em;
    padding-left: 20px;
    padding-right: 20px;
  }
  .bg-card-list-data{
    display: -webkit-box;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    overflow-x: hidden;
  }
  .bg-card-list-data:hover{
    overflow-x: scroll;
  }
  .card-list-data{
    width: 60px;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 0px 4px 4px lightgrey;
  }
  .bg-card-list-data-detail{
    display: -webkit-box;
    width: 200px;
    margin: auto;
    margin-top: 10px;
    /* padding-left: 5em;
    padding-right: 5em; */
  }
  .text-type-hot {
    background: #F44336;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .text-type-slow{
    background: #1ddc72;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .text-type-fast{
    background: #00aeef;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .bg-card-list-data-detail-text{
    display: -webkit-box;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left:30px;
    padding-right:30px;
    margin-bottom:20px;
  }
  .p-2{
    width:50%;
  }
  .ext {
    position: relative;
    left: 100%;
    width: 30px;
    height: 1px;
  }

  .bg-penawaran-tertinggi{
    align-items:center;
    display: flex;
    justify-content:space-between;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom:20px;
    font-weight:bold;
  }

  .user-penawar-tertinggi {
    margin-bottom: 100px;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
  }

  .nilai-penawaran-tertinggi{
    display: flex;
    align-items: center;
  }

  .footer-bidding{
    list-style-type: none;
    display: inline-block;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    font-weight: 600;
    line-height: 13px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    max-width: 100%;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%);
    z-index: 2;
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    /* border-width: 1px 0px 0px; */
    border-image: initial;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    padding: 10px;
    /* border-top: 1px solid rgb(222, 222, 222);
    box-shadow: 0px 0px 2px 0px lightgrey; */
    margin: 0px;
  }

  .btn-join-bid{
    background: #00aeef;
    padding: 6px;
    width: 100%;
    border-radius: 50px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px #bdbcbc;
  }

}

@media(min-width:0px) and (max-width:319px){
  /* width */
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .header-detail{
    width: auto;
    margin: auto;
    /* background: linear-gradient(145deg, #00baff, #009dd7); */
    color:#00aeef;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon-header-detail{
    color: #00aeef;
    /* position: relative; */
    /* left: -8em; */
    font-size:18px;
    width:22px;
  }
  .text-header-lot{
    color: #00aeef;
    /* font-weight: bold; */
  }
  .text-header-penawaran{
    color: #1ddc72;
    /* font-weight: bold; */
  }

  .main-detail{
    width: auto;
    margin: auto;
    margin-top: 10px;
    margin-bottom: -2em;
    padding-left: 20px;
    padding-right: 20px;
  }
  .bg-card-list-data{
    display: -webkit-box;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 20px;
    overflow-x: hidden;
  }
  .bg-card-list-data:hover{
    overflow-x: scroll;
  }
  .card-list-data{
    width: 60px;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 0px 4px 4px lightgrey;
  }
  .bg-card-list-data-detail{
    display: -webkit-box;
    width: 160px;
    margin: auto;
    margin-top: 10px;
    /* padding-left: 4em;
    padding-right: 4em; */
  }
  .text-type-hot {
    background: #F44336;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .text-type-slow{
    background: #1ddc72;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .text-type-fast{
    background: #00aeef;
    position: absolute;
    padding: 5px;
    color: #ffffff;
    box-shadow: 0px 2px 4px #8e8686;
  }
  .bg-card-list-data-detail-text{
    display: -webkit-box;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left:30px;
    padding-right:30px;
    margin-bottom:20px;
  }
  .p-2{
    width:50%;
  }
  .ext {
    position: relative;
    left: 100%;
    width: 30px;
    height: 1px;
  }

  .bg-penawaran-tertinggi{
    align-items:center;
    display: flex;
    justify-content:space-between;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom:20px;
    font-weight:bold;
  }

  .user-penawar-tertinggi {
    margin-bottom: 100px;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
  }


  .nilai-penawaran-tertinggi{
    display: flex;
    align-items: center;
  }

  .footer-bidding{
    list-style-type: none;
    display: inline-block;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    font-weight: 600;
    line-height: 13px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    max-width: 100%;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%);
    z-index: 2;
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    /* border-width: 1px 0px 0px; */
    border-image: initial;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    padding: 10px;
    /* border-top: 1px solid rgb(222, 222, 222);
    box-shadow: 0px 0px 2px 0px lightgrey; */
    margin: 0px;
  }

  .btn-join-bid{
    background: #00aeef;
    padding: 6px;
    width: 100%;
    border-radius: 50px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px #bdbcbc;
  }
}
</style>
