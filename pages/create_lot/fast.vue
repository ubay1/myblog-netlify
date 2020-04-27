<template>
  <div>
    <div>
      <Header :judul='judul'/>
    </div>

    <v-wait for="load_product_fast">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <!-- {{get_data_fast.length}} -->
      <div v-if='get_data_fast.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>

        <div v-if="checkedProduct.length == 0" class="cart-empty">
          <img src="~static/img/emptycart.png" alt="">
          belum ada product yang dipilih
        </div>

        <div v-else class="cart-empty">
          <img src="~static/img/cartfull.png" alt="">

          <div class="bg_imgcart">
            <img v-for="(item, index) in img_product" :key="index" :src="baseURL+item" alt="img-produk" class="imgcart">
            <div class="ext"></div>
          </div>

        </div>

        <div class="grid-produk" :class={margin_grid_bottom_false:margin_grid_false}>
          <div class="produk" v-for="(item, index) in get_data_fast" :key="index"
            :id="`id-${item.product.id}`"
          >
            <div class="checkme" @click="select_fast(item.product.id, item.product.product_name, item.product.picture[0])">pilih</div>

            <img :src="baseURL+item.product.picture[0]" alt="img-produk" >
            <div class="text-product-hot-name">
              {{item.product.product_name}}
            </div>

            <!-- jika ada id di dalam array checked, maka tampilkan plusminus -->
            <div class="bg_plusminus" v-if="checkedProduct.includes(item.product.id)" :id="`${item.product.id}`">
              <button class="btn_plusminus" @click="decrement(item.product.id, item.product.picture[0])">-</button>
              <!-- <input disabled :value="plusminus" class="frm_plusminus"> -->
              <button class="btn_plusminus" @click="increment(item.product.id, item.product.picture[0])">+</button>
            </div>

            <div class="text-product-warehouse">
              <small>{{item.product.stock.warehouse.warehouse_name}}</small>
            </div>
            <div class="text_price-hot">
              <b>{{item.product.price}}</b>
            </div>
          </div>
        </div>
      </div>
    </v-wait>

    <div class="bg-button-hot-lanjut">
      <button @click="goto_detail()" class="btn_hot_lanjut" :class="{btn_slow_lanjut_active:btn_disable_next}">Lanjut</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Headers/Header_two'
import PrettyCheck from 'pretty-checkbox-vue/check'
import btnPlusMinus from './btn_plusminus'

export default {
  components:{
    Header,
    'btn-plus-minus' : btnPlusMinus,
    'p-check':PrettyCheck,

  },
  data() {
    return {
      id_product_hot : this.$store.getters['authh/hot'],
      warehouse_id : this.$store.getters['authh/warehouse'],
      slow : this.$store.getters['authh/totalslow'],
      fast : this.$store.getters['authh/totalfast'],
      judul : `Pilih Produk Fast ${this.$store.getters['authh/totalfast']} buah`,
      // search: 'produkfast',
      accessToken : '',
      token: '',
      data_fast : [],
      lot_data_fast : [],
      get_data_fast : [],
      baseURL : process.env.URL,
      devAPI : process.env.DEV_API,
      btn_disable_next : true,
      margin_grid_false : false,
      checkedProduct : [],
      img_product: [],
      isActive: false,
      isSelect:false,
      plusminus:[],
    }
  },
  computed: {

  },
   methods: {
    back(){
      window.history.back()
    },
    async getProductFast(){
      this.$wait.start('load_product_fast');

      axios.get(process.env.DEV_API + "user/producttype/3")
			.then(response => {
        this.data_fast = response.data.data.data;
        // get product where warehouse
        for (let i = 0; i<this.data_fast.length; i++) {
          if(response.data.data.data[i].stock.warehouse_id == this.warehouse_id){
            this.lot_data_fast.push({
              product: response.data.data.data[i]
            })
          }
        }
        // console.log(this.lot_data_fast)
      });

      this.get_data_fast = await new Promise(resolve => {
        setTimeout(() => resolve(this.lot_data_fast), 2000);
      });

      // stop waiting
      this.$wait.end('load_product_fast');
    },
    select_fast(id, product_name, picture){
      let ell = document.querySelector('#id-'+id);

      // jika data telah aktif, lalu ingin dinonaktifkan.. maka hapus data dari array
      if (ell.classList.contains('active')) {
        ell.classList.remove('active');

        var index = this.checkedProduct.indexOf(id);
        if (index > -1) {
          this.checkedProduct.splice(index, 1);
          this.img_product.splice(index,1)
          this.btn_disable_next = true
          this.margin_grid_false = false
          this.$store.commit('authh/removefast',id)
        }
      }else{
        // jika telah pilih product, lalu klik refresh, lalu coba pilih product lagi.
        // akan tampil alert ini
        if(this.$store.getters['authh/fast'].length > 0){
          if(this.checkedProduct.length == 0){
            this.$swal({
              title: '',
              text: `data sebelumnya telah dihapus, silahkan pilih lagi`,
              icon: 'info',
              showCancelButton: false,
            })
            this.$store.commit('authh/removeallfast')
            return false
          }
        }

        if(this.checkedProduct.length >= this.fast){
          this.$swal({
              title: '',
              text: `hanya bisa pilih ${this.fast} product`,
              icon: 'info',
              showCancelButton: false,
            })
          return false
        }
        else{
          ell.classList.add('active');
          this.checkedProduct.push(id)
          this.img_product.push(picture)
          this.$store.commit('authh/addfast', id)

          // jika yang diceklist telah sama, maka tampilkan btn next
          if(this.checkedProduct.length == this.fast){
            this.btn_disable_next = false
            this.margin_grid_false = true
          }

          console.log(this.checkedProduct);
        }
      }
    },
    increment(id, picture){
      if(this.checkedProduct.length >= this.fast){
        this.$swal({
          title: '',
          text: `hanya bisa pilih ${this.fast} product`,
          icon: 'info',
          showCancelButton: false,
        })
        return false
      }

      this.plusminus+= 1
      this.checkedProduct.push(id)
      this.$store.commit('authh/addfast', id)
      this.img_product.push(picture)
      // jika yang diceklist telah sama, maka tampilkan btn next
      if(this.checkedProduct.length == this.fast){
        this.btn_disable_next = false
        this.margin_grid_false = true
      }

      console.log(this.checkedProduct);
    },
    decrement(id, picture){
      this.plusminus -= 1
      var index = this.checkedProduct.indexOf(id);
      if (index > -1) {
        this.checkedProduct.splice(index, 1);
        this.img_product.splice(index, 1);
        this.$store.commit('authh/removefast',id)
        this.btn_disable_next = true
        this.margin_grid_false = false
      }
    },
    goto_detail(){
      // console.log('%c Detail Lelang ', 'background:#000; color:#fff; font-size:20px; padding:5px;');
      // console.table([this.$store.getters['authh/hot'],this.$store.getters['authh/slow'],this.$store.getters['authh/fast']])
      this.$router.push('/create_lot/create_detail')
    }
  },
  created() {
    this.getProductFast();
    // this.$bus.$on("changeValue", (val)=> {
    //   this.checkedProduct.push(val);
    //   console.log('triggered ' + val)
    //   console.log(this.checkedProduct);
    // });
  },
}
</script>

<style lang="scss">
  @import '~pretty-checkbox/src/pretty-checkbox.scss';

  @media (min-width:481px){
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
  }

  @media (max-width:480px){
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
      margin-bottom: 0px;
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
      margin-bottom: 0px;
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
      margin-bottom: 0px;
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
