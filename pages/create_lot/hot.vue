<template>
  <div>
    <div>
      <Header :judul='judul' :search='search'/>
    </div>

    <v-wait for="load_product_hot">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <div v-if='get_data_hot.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height: 80vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" class="img-kategori">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>
        <div class="grid-produk" :class={margin_grid_bottom_false:margin_grid_false}>
          <div class="produk" v-for="(item, index) in get_data_hot" :key="index"
            :id="`id-${item.id}`"
          >
            <div class="checkme" @click="select_hot(index, item.id, item.hot_slow.slow1, item.hot_slow.slow2, item.stock.warehouse_id)">pilih</div>

            <img alt="image-produk-hot" :src="baseURL+item.picture[0]" v-if="item.picture.length > 1">
            <img alt="image-produk-hot" :src="baseURL+item.picture" v-else>

            <div class="text-product-hot-name">
              {{item.product_name}}
            </div>
            <div class="text-product-warehouse">
              <small>{{item.stock.warehouse.warehouse_name}}</small>
            </div>
            <div class="text_price-hot">
              <b>{{item.price}}</b>
            </div>
          </div>
        </div>
        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
            <div class="text-red" slot="no-more">Produk telah di load semua</div>
            <div class="text-red" slot="no-results">Produk telah di load semua</div>
        </infinite-loading>
      </div>
    </v-wait>

    <div class="bg-button-hot-lanjut">
      <!-- <button @click="goto_slow(dataSelect.idProduct,dataSelect.idWarehouse, dataSelect.totalSlow, dataSelect.totalFast, dataSelect.idProduct)" class="btn_hot_lanjut" :class="{btn_hot_lanjut_active:btn_disable_next}">Lanjut</button> -->
      <button @click="goto_slow()" class="btn_hot_lanjut" :class="{btn_hot_lanjut_active:btn_disable_next}">Lanjut</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Headers/Header_one'

export default {
  // middleware: 'iflogin',
  components:{
    Header
  },
  data() {
    return {
      page : 2,
      lastPage: 0,
      isInit : true,
      judul : 'Pilih Produk Hot',
      search: 'produkhot',
      accessToken : '',
      token: '',
      data_hot : [],
      get_data_hot : [],
      next_page_url : [],
      baseURL : process.env.URL,
      devAPI : process.env.DEV_API,
      dataSelect: {
        idProduct : '',
        totalSlow : '',
        totalFast : '',
        idWarehouse : ''
      },
      btn_disable_next : true,
      margin_grid_false : false,
      checkedProduct : []
    }
  },
  computed: {
    cek_hot(){
      // return this.$store.getters['authh/hot'].length > 0 ? this.$store.commit('authh/removeallhot') : ''
    }
  },
  methods: {
    back(){
      window.history.back()
    },
    async getProductHot(){
      // remove seluruh item yang ada di localstorage key hot
      this.$store.commit('authh/removeallhot')

      this.$wait.start('load_product_hot');

      // console.log(this.fetchHot())

      axios.get(process.env.DEV_API + "user/producttype/1")
			.then(response => {
        console.log(response);
        this.data_hot = response.data.data.data;
        this.next_page_url = response.data.data.next_page_url;
      });

      this.get_data_hot = await new Promise(resolve => {
        setTimeout(() => resolve(this.data_hot), 2000);
      });

      // stop waiting
      this.$wait.end('load_product_hot');
    },
    select_hot(id, id_product, slow, fast, warehouse_id){
        let ell = document.querySelector('#id-'+id_product);

        if (ell.classList.contains('active')) {
          ell.classList.remove('active');
          this.$store.commit('authh/removehot',id_product)
          this.$store.commit('authh/removewarehouse',warehouse_id)
          this.$store.commit('authh/removetotalslow',slow)
          this.$store.commit('authh/removetotalfast',fast)
          this.btn_disable_next = true
          this.margin_grid_false = false

          var index = this.checkedProduct.indexOf(id_product);
          if (index > -1) {
            this.checkedProduct.splice(index, 1);
            this.btn_disable_next = true
            this.margin_grid_false = false
            console.log(this.checkedProduct)
          }
        }else{
          if(this.$store.getters['authh/hot'].length > 0){
            if(this.checkedProduct.length == 0){
              this.$swal({
                title: '',
                text: `data sebelumnya telah dihapus, silahkan pilih lagi`,
                icon: 'info',
                showCancelButton: false,
              })
              this.$store.commit('authh/removeallhot')
              this.$store.commit('authh/removeallwarehouse')
              this.$store.commit('authh/removealltotalslow')
              this.$store.commit('authh/removealltotalfast')
              return false
            }
          }

          if(this.checkedProduct.length >= 1){
            this.$swal({
              title: '',
              text: `hanya bisa pilih 1 product`,
              icon: 'info',
              showCancelButton: false,
            })
            return false
          }else{
            ell.classList.add('active');
            this.checkedProduct.push(id_product)
            this.$store.commit('authh/addhot', id_product)
            this.$store.commit('authh/addwarehouse', warehouse_id)
            this.$store.commit('authh/addtotalslow', slow)
            this.$store.commit('authh/addtotalfast', fast)
            this.btn_disable_next = false
            this.margin_grid_false = true
            console.log(this.checkedProduct)
          }

        }

        // tambahkan ke data, untuk lanjutkan ke slow
        this.dataSelect.idProduct = id_product
        this.dataSelect.totalSlow = slow
        this.dataSelect.totalFast = fast
        this.dataSelect.idWarehouse = warehouse_id

        var data_toslow = {
          warehouse : warehouse_id,
          slow : slow,
          fast : fast
        }

        console.log(data_toslow)
    },
    goto_slow(){
      this.$router.push('/create_lot/slow')
    },
    infiniteHandler: function($state) {
      setTimeout(function () {
        axios.get(process.env.DEV_API + "user/producttype/1?page="+this.page)
        .then(response => {
          console.log(response.data.data.data)
          if (response.data.data.data.length > 0) {
            this.lastPage = response.data.data.last_page;
            response.data.data.data.forEach(message => {
              this.get_data_hot.push(message);
            });
            // console.log(this.page-1)
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
    }
  },
  created() {
    this.$store.commit('authh/removeallhot')
    this.$store.commit('authh/removeallwarehouse')
    this.$store.commit('authh/removealltotalslow')
    this.$store.commit('authh/removealltotalfast')

    this.getProductHot();

  },
  mounted() {
    if (process.client) {
    }
  },
}
</script>

<style lang="scss">

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
            height:140px;
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
</style>
