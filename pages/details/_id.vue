<template>
<div>
    <div class="header-detail">
      <div><font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/></div>
      <div class="text-header-lot">Lot-{{id}}</div>
      <div class="text-header-penawaran">{{lelang_data_lot.total_bidder}} Penawaran</div>
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

      <div v-if="lelang_data_bid.length == 0">
        <div class="bg-penawaran-tertinggi">
            <div class="text-penawaran-tertinggi">Penawaran Tertinggi</div>
            <div class="nilai-penawaran-tertinggi"><small>Belum ada Bidding</small>
              <font-awesome-icon :icon="['fas', 'chevron-right']" style="width:14; font-size:14;" @click="getbidtertinggi()"/>
            </div>
        </div>
        <div class="footer-bidding">
          <button class="btn-join-bid">
            <img src="~/static/img/img_auction.png" alt="img-bidding" style="width:20px; margin-right:10px;">
            Ikuti Lelang
          </button>
        </div>
      </div>
      <div v-else>
        <div class="bg-penawaran-tertinggi">
            <div class="text-penawaran-tertinggi">Penawaran Tertinggi</div>
            <div class="nilai-penawaran-tertinggi">{{lelang_product_awal[0].product.format_price}}
              <font-awesome-icon :icon="['fas', 'chevron-right']" style="width:14; font-size:14;" @click="getbidtertinggi()"/>
            </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import axios from 'axios'
  import Notfound from '../404'

  export default {
    components:{
      'notfound':Notfound
    },
    data() {
      return {
        id: this.$route.params.id,
        lelang_data_lot:[],
        lelang_data_bid:[],
        lelang_data_lotdetail : [],
        lelang_data_product: [],
        productid: [],
        lelang_product_awal: [],
        baseURL: process.env.URL
      }
    },
    methods: {
      getdetaillelang(){
        axios.get(process.env.DEV_API + "user/lot/"+this.id)
          .then(response => {
            this.lelang_data_lot = response.data.lot;
            this.lelang_data_bid = response.data.bid;
            this.lelang_data_lotdetail = response.data.lot_detail;
            for (let i = 0; i<this.lelang_data_lotdetail.length; i++) {
              this.lelang_data_product.push({id: this.lelang_data_lotdetail[i].product.id, picture: JSON.parse(this.lelang_data_lotdetail[i].product.picture)});
            }
            this.lelang_product_awal.push(this.lelang_data_lotdetail[0])
        });
      },
      back(){
        this.$router.push('/');
      },
      getid(id){
        this.productid = this.lelang_data_lotdetail[id]
      },
    },
    created() {
      this.getdetaillelang()
    },
    // props: ['id']
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

@media(min-width: 481px){
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
    display: flex;
    justify-content:space-between;
    width: 480px;
    margin: auto;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom:100px;
    font-weight:bold;
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
    display: flex;
    justify-content:space-between;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom:100px;
    font-weight:bold;
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
    display: flex;
    justify-content:space-between;
    width: auto;
    margin: auto;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom:100px;
    font-weight:bold;
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
