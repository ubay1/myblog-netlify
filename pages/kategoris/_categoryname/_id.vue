<template>
  <div>
    <header-detail :judul="categoryname"/>
    <v-wait for="load_kategori_detail">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <div v-if='get_data.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>
        <div class="grid-kategori-detail">
          <div v-for="(item, index) in get_data" :key="index" class="kategori-detail">
            <img :src="baseURL+item.picture[0]" alt="img-header-detail-kategori">
            <div class="text-product-name">
              {{item.product_name}}
            </div>
            <div class="text_price">
              <b>{{item.price}}</b>
            </div>
          </div>
        </div>
      </div>
    </v-wait>

    <!-- <client-only placeholder="sedang memuat ...">
      <div v-if="get_data.length != 0" >
        <div class="grid-kategori-detail">
          <div v-for="(item, index) in data_all" :key="index" class="kategori-detail">
            <img :src="baseURL+item.picture[0]" alt="img-header-detail-kategori">
            <div class="text_price">
              <b>{{item.price}}</b>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="display:flex; flex-direction:column; align-items:center;">
          <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto;">
          <div>Data Tidak Ditemukan</div>
        </div>
      </div>
    </client-only> -->
  </div>
</template>

<script>
import axios from 'axios'
import HeaderDetail from '../header_detail'

export default {
  components:{
    'header-detail':HeaderDetail
  },
  data() {
    return {
      id: this.$route.params.id,
      categoryname: this.$route.params.categoryname,
      baseURL : process.env.URL,
      data_all: [],
      get_data : [],
    }
  },
  methods: {
    async getdetailKategori(){
      this.$wait.start('load_kategori_detail');

      axios.get(process.env.DEV_API + "user/getProductCategory?category="+this.id)
			.then(response => {
        this.data_all = response.data.data;
      });

      this.get_data = await new Promise(resolve => {
        setTimeout(() => resolve(this.data_all), 2000);
      });

      // stop waiting
      this.$wait.end('load_kategori_detail');
    },
  },
  created() {
    this.getdetailKategori();
  },
}
</script>

<style lang="scss">
  @media(min-width:481px){
    .grid-kategori-detail{
      width: 480px;
      margin: auto;
      margin-bottom: 70px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .kategori-detail{
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

          .text-product-name {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding:10px;
          }

          .text_price {
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
    .grid-kategori-detail{
      margin: auto;
      margin-bottom: 0px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .kategori-detail{
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

          .text-product-name {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding:10px;
          }

          .text_price {
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
    .grid-kategori-detail{
      margin: auto;
      margin-bottom: 0px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto;
      align-items: center;
      padding: 20px;
      grid-gap: 20px;
      .kategori-detail{
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

          .text-product-name {
            white-space: nowrap;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding:10px;
          }

          .text_price {
              width: 100%;
              background: linear-gradient(145deg, #00baff, #009dd7);
              color: #fff;
              border-radius: 0px 0px 10px 10px;
              padding: 5px;
          }
      }
    }
  }
</style>
