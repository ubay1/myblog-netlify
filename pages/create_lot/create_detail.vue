<template>
  <div>
    <div>
      <Header :judul='judul'/>
    </div>

    <v-wait for="load_detail_product">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <!-- {{get_data_detail.length}} -->
      <div v-if='get_data_detail.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>

        <div class="grid-produk" :class={margin_grid_bottom_false:margin_grid_false}>
          <div class="produk" v-for="(item, index) in get_data_detail" :key="index"
            :id="`id-${item.product.id}`"
          >
            <img :src="baseURL+item.product.picture[0]" alt="img-produk" >

            <div v-if="item.product.type.type_name == 'hot'">
              <div class="type-kategori" style="background:red; color:#fff;">{{item.product.type.type_name}} </div>
            </div>
            <div v-else-if="item.product.type.type_name == 'slow'">
              <div class="type-kategori" style="background:#4caf50; color:#fff;">tambahan </div>
            </div>
            <div v-else-if="item.product.type.type_name == 'fast'">
              <div class="type-kategori" style="background:#ff9800; color:#fff;">lanjutan </div>
            </div>

            <div class="text-product-hot-name">
              {{item.product.product_name}}
            </div>

            <div class="text-product-warehouse">
              <small>{{item.product.stock.warehouse.warehouse_name}}</small>
            </div>
            <div class="text_price-hot">
              <b>{{item.product.prices}}</b>
            </div>
          </div>
        </div>

        <hr class="">

        <div class="totalharga">
          <div class="text">
            <span><b>Total : </b></span>
            <span><b>Rp. {{filter_totalharga}}</b></span>
          </div>
          <button @click="ajukan_lelang()" class="btn-bayar">Ajukan lelang</button>
        </div>

      </div>
    </v-wait>

  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Headers/Header_three'

export default {
  components:{
    Header,

  },
  data() {
    return {
      id_product_hot : this.$store.getters['authh/hot'],
      warehouse_id : this.$store.getters['authh/warehouse'],
      slow : this.$store.getters['authh/totalslow'],
      fast : this.$store.getters['authh/totalfast'],
      judul : `Detail Product`,
      // search: 'detailproduk',
      accessToken : '',
      token: '',
      data_detail : [],
      lot_data_detail : [],
      get_data_detail : [],
      baseURL : process.env.URL,
      devAPI : process.env.DEV_API,
      btn_disable_next : true,
      margin_grid_false : false,
      isActive: false,
      isSelect:false,
      totalharga : [],
      totalharga_reducer : ''
    }
  },
  computed: {
    filter_totalharga(){
      return this.totalharga_reducer;
    }
  },
   methods: {
    back(){
      window.history.back()
    },
    async getDetailProduct(){
      this.$wait.start('load_detail_product');

      var detail_hot = this.$store.getters['authh/hot'];
      var detail_slow = this.$store.getters['authh/slow'];
      var detail_fast = this.$store.getters['authh/fast'];
      // var concat_detail = ([...new Set([...detail_hot ,...detail_slow,...detail_fast])]);
      var concat1 = detail_hot.concat(detail_slow);
      var concat_detail = concat1.concat(detail_fast);
      console.log(concat_detail) // [3,9,9,12,12]

      // number format
      function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

      axios.get(process.env.DEV_API + "user/getAllProduct")
			.then(response => {
        // this.data_detail = response.data.data;

        for (let i = 0; i<response.data.data.length; i++) {
          for(let j = 0; j<concat_detail.length; j++){
            if(response.data.data[i].id == concat_detail[j]){
              this.lot_data_detail.push({
                product: response.data.data[i]
              })

              this.totalharga.push(response.data.data[i].price)
            }
          }
        }

        console.log(this.lot_data_detail)

        // total harga dengan reduce
        var reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.totalharga_reducer = formatNumber(this.totalharga.reduce(reducer));
      });

      this.get_data_detail = await new Promise(resolve => {
        setTimeout(() => resolve(this.lot_data_detail), 2000);
      });

      // stop waiting
      this.$wait.end('load_detail_product');
    },
    ajukan_lelang(){
      console.log('%c Ajukan Lelang ', 'background:#000; color:#fff; font-size:20px; padding:5px;');

      // console.log(this.$store.getters['authh/hot'])

      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters['authh/userData'].user.token.access_token}`
        },
        data: {
          id   : this.$store.getters['authh/userData'].user.id,
          hot  : this.$store.getters['authh/hot'],
          slow1: this.$store.getters['authh/slow'],
          slow2: this.$store.getters['authh/fast'],
          platform: "web"
        }
      };

      this.$axios.post(this.devAPI + 'user/loting', [], config)
      .then(response => {
        if(response.data.success == true){
          this.$swal({
            title: '',
            text: response.data.message,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Bayar',
            cancelButtonText: 'Batal',
          }).then((result)=>{
            if(result.value){
              this.$store.commit('authh/tipe_pembayaran', 'create')
              return this.$router.push('/pembayaran/'+response.data.data.id)
            }else{
              return this.$router.push('/riwayat_lelang')
            }
          })
        }
      });
    }
  },
  created() {
    this.getDetailProduct();
  },
}
</script>

<style lang="scss">

  .type-kategori {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 5px;
    border-radius: 10px 0px 0px 0px;
    box-shadow: 0px 2px 4px lightgrey;
  }

  @media (min-width:481px){
    hr{
      width:480px;
      margin: auto;;
    }
    .bg-button-hot-lanjut {
      width:480px;
      margin:auto;
      // padding: 10px;
      button.btn_hot_lanjut {
        background: #00aeef;
        width: 480px;
        color: #fff;
        padding: 8px;
        box-shadow: 0px 2px 2px lightgrey;
        border-radius: 0px;
        position: fixed;
        bottom: 0;
      }
    }

    .totalharga{
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
      border-width: 1px 0px 0px;
      border-image: initial;
      transition: all 0.35s ease 0s;
      text-decoration: none;
      padding: 10px;
      border-top: 1px solid rgb(222, 222, 222);
      box-shadow: 0px 0px 2px 0px lightgrey;
      margin: 0px;

      .text{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .btn-bayar{
        background: #00aeef;
        color: #fff;
        font-weight: 600;
        padding: 10px;
        width: 100%;
        margin-top: 20px;
      }
    }
  }

  @media (max-width:480px){
    .totalharga{
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
      // max-width: 480px;
      position: fixed;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%);
      z-index: 2;
      font-size: 1em;
      background-color: rgb(255, 255, 255);
      border-width: 1px 0px 0px;
      border-image: initial;
      transition: all 0.35s ease 0s;
      text-decoration: none;
      padding: 10px;
      border-top: 1px solid rgb(222, 222, 222);
      box-shadow: 0px 0px 2px 0px lightgrey;
      margin: 0px;

      .text{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .btn-bayar{
        background: #00aeef;
        color: #fff;
        font-weight: 600;
        padding: 10px;
        width: 100%;
        margin-top: 20px;
      }
    }

    .bg-button-hot-lanjut {
      // padding: 10px;
      button.btn_hot_lanjut {
        background: #00aeef;
        width: 100%;
        color: #fff;
        padding: 8px;
        box-shadow: 0px 2px 2px lightgrey;
        border-radius: 0px;
        position: fixed;
        bottom: 0;
      }
    }
  }

  @media(min-width:481px){
    .grid-produk{
      width: 480px;
      margin: auto;
      margin-bottom: 80px !important;
      // margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .produk{
          position: relative;
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

          .text-product-hot-name {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            // padding:10px;
          }

          .text-product-warehouse {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding:10px;
            font-weight: 700;
          }

          .text_price-hot {
              width: 100%;
              background: linear-gradient(145deg, #00baff, #009dd7);
              color: #fff;
              border-radius: 0px 0px 10px 10px;
              padding: 5px;
          }
      }
    }
  }

  @media(min-width:360px) and (max-width: 480px){
    .grid-produk{
      margin: auto;
      margin-bottom: 80px !important;
      // margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .produk{
          position: relative;
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

          .text-product-hot-name {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            // padding:10px;
          }

          .text-product-warehouse {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding:10px;
            font-weight: 700;
          }

          .text_price-hot {
              width: 100%;
              background: linear-gradient(145deg, #00baff, #009dd7);
              color: #fff;
              border-radius: 0px 0px 10px 10px;
              padding: 5px;
          }
      }
    }
  }

  @media(max-width: 359px){
    .grid-produk{
      margin: auto;
      margin-bottom: 80px !important;
      // margin-top: 20px;
      display: grid;
      grid-template-columns: auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .produk{
          position: relative;
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

          .text-product-hot-name {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            // padding:10px;
          }

          .text-product-warehouse {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding:10px;
            font-weight: 700;
          }

          .text_price-hot {
              width: 100%;
              background: linear-gradient(145deg, #00baff, #009dd7);
              color: #fff;
              border-radius: 0px 0px 10px 10px;
              padding: 5px;
          }
      }
    }
  }

  .checkme {
    background: #00aeef;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    padding: 5px;
    color: #fff;
    font-weight: 500;
  }

  .produk.active{
    border: 3px solid #00aeef;
    border-radius: 13px;
  }

  .btn_hot_lanjut_active{
    display: none;
  }

  .margin_grid_bottom_false{
    margin-bottom: 40px;
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

  .text-red {
    color: #c30303;
    font-size: small;
    margin-bottom: 10px;
    display: none;
  }

  .btn_slow_lanjut_active{
    display: none;
  }

  .produk.active{
    border: 3px solid #00aeef;
    border-radius: 13px;
  }


  @media (min-width:481px){
    .cart-empty{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: small;

      img{
        width: 150px;
      }


      .bg_imgcart {
        display: -webkit-box;
        width: 480px;
        margin: auto;
        margin-top: 10px;
        padding-left: 20px;
        overflow-x: scroll;
        img{
          width: 150px;
          padding: 5px;
        }
        .ext {
          position: relative;
          left: 0%;
          width: 30px;
          height: 1px;
        }
      }
    }
  }

  @media (max-width:480px){
    .cart-empty{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: small;

      img{
        width: 150px;
      }


      .bg_imgcart {
        display: -webkit-box;
        margin: auto;
        margin-top: 10px;
        padding-left: 20px;
        overflow-x: scroll;
        img{
          width: 150px;
          padding: 5px;
        }
        .ext {
          position: relative;
          left: 0;
          width: 30px;
          height: 1px;
        }
      }
    }
  }

</style>
