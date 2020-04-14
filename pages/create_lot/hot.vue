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
        <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>
        <div class="grid-produk-hot" :class={margin_grid_bottom_false:margin_grid_false}>
          <div class="produk-hot" v-for="(item, index) in get_data_hot" :key="index"
            :id="`id-${item.id}`"
            @click="select_hot(index, item.id, item.hot_slow.slow1, item.hot_slow.slow2, item.stock.warehouse_id)"
          >
            <div v-if="dataSelect.idSelect.length == 0">

            </div>
            <div v-else>
              <div v-if="dataSelect.idSelect == index" class="select_product">
                <font-awesome-icon :icon="['fas', 'check']" class="icon-header-create-lelang-hot" style="width: 15px; font-size: 18px; color:#fff;"/>
              </div>
            </div>
            <img :src="baseURL+item.picture[0]" alt="img-produk-hot">
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
        <infinite-loading spinner="bubbles" @infinite="infiniteHandler">
            <div class="text-red" slot="no-more">Produk telah di load semua</div>
            <div class="text-red" slot="no-results">Produk telah di load semua</div>
        </infinite-loading>
      </div>
    </v-wait>

    <div class="bg-button-hot-lanjut">
      <button @click="goto_slow(dataSelect.idProduct,dataSelect.idWarehouse, dataSelect.totalSlow, dataSelect.totalFast, dataSelect.idProduct)" class="btn_hot_lanjut" :class="{btn_hot_lanjut_active:btn_disable_next}">Lanjut</button>
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
        idWarehouse : '',
        idSelect : [],
        isSelect:false,
        isDisable: true
      },
      btn_disable_next : true,
      margin_grid_false : false
    }
  },
  methods: {
    back(){
      window.history.back()
    },
    fetchHot(){
      if(this.isInit == true){
        let url = axios.get(process.env.DEV_API + "user/producttype/1")
      }
        let url = axios.get(process.env.DEV_API + "user/producttype/1?page="+this.page)

      return axios.get(url);
    },
    async getProductHot(){
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

        this.dataSelect.idSelect = id
        this.dataSelect.isSelect = !this.dataSelect.isSelect
        this.btn_disable_next = false
        this.margin_grid_false = true
    },
    goto_slow(id_product, warehouse_id, slow, fast,){
      this.$router.push('/create_lot/'+id_product+'/'+warehouse_id+'/'+slow+'/'+fast+'/slow')
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
            if (this.page-1 === this.lastPage) {
              console.log('wkwk')
              this.page = 2;
              $state.complete();
            } else {
              this.page += 1;
            }
            $state.loaded();
            $state.complete();
          } else {
            this.page = 2;
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
    this.getProductHot();
    axios.get(process.env.DEV_API + "user/producttype/1")
      .then(response => {
        if (response.data.data.data.length > 0) {
          this.get_data_hot = response.data.data.data;
          this.isInit = false;
        }else{
          console.log('No users found.');
        }
      })
      .catch(e => console.log(e))
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
    .grid-produk-hot{
      width: 480px;
      margin: auto;
      margin-bottom: 0px;
      // margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .produk-hot{
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
    .grid-produk-hot{
      margin: auto;
      margin-bottom: 0px;
      // margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .produk-hot{
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
    .grid-produk-hot{
      margin: auto;
      margin-bottom: 0px;
      // margin-top: 20px;
      display: grid;
      grid-template-columns: auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .produk-hot{
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

  .select_product{
    background: #00aeef;
    padding: 5px;
    position: absolute;
    left: 0;
    box-shadow: 0px 2px 4px lightgrey;
    border-radius: 10px 0px 0px 0px;
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
  }
</style>
