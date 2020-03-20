<template>
<div>
    <div class="header-detail">
      <div><font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/></div>
      <div class="text-header-detail">Lot-{{id}}</div>
    </div>

    <div v-if="productdetail.length == 0">
      <div class="main-detail">
        <!-- <img :src="baseURL+JSON.parse(lelangdetail.lot_detail[0].product.picture)[0]" > -->
        {{lelangdetail}}
      </div>
    </div>

    <div v-else>
      <div class="bg-card-list-data-detail">
        <div v-if="productid.length != 0">
          <img :src="baseURL+productid.product.pictures[0]" alt="">
        </div>
        <div v-else>
           <img :src="baseURL+productidawal[0].product.pictures[0]" alt="">
        </div>
      </div>
      <div class="bg-card-list-data">
        <div class="card-list-data" :id="item.id" v-for="(item, index) in productdetail" :key="index">
          <img style="border-radius:20px; cursor:pointer;" @click="getid(index)" :src="baseURL+item.picture[0]"/>
        </div>
      </div>
      <div class="bg-card-list-data-detail-text mb-3">
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
        <div v-else>
          <table class="sm:bg-white rounded-lg">
            <tr>
              <td class="p-2"><b>Nama Produk</b></td>
              <td class="">:</td>
              <td class="p-2">{{productidawal[0].product.product_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Kategori Produk</b></td>
              <td class="">:</td>
              <td class="p-2">{{productidawal[0].product.category.category_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Harga Satuan</b></td>
              <td class="">:</td>
              <td class="p-2">{{productidawal[0].product.format_price}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Tipe</b></td>
              <td class="">:</td>
              <td class="p-2">{{productidawal[0].product.type.type_name}}</td>
            </tr>
            <tr>
              <td class="p-2"><b>Deskripsi</b></td>
              <td class="">:</td>
              <td class="p-2">{{productidawal[0].product.description}}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>


    <!-- {{lelangdetail}} -->
</div>
</template>

<script>
import axios from 'axios'

export default {
  components:{

  },
  data() {
    return {
      id: this.$route.params.id,
      databid: '',
      lelangdetail : '',
      productdetail: [],
      productid: [],
      productidawal: [],
      baseURL: process.env.URL
    }
  },
  methods: {
    getdetaillelang(){
      axios.get(process.env.DEV_API + "user/lot/"+this.id)
				.then(response => {
          this.lelangdetail = response.data.lot_detail;
          for (let i = 0; i<this.lelangdetail.length; i++) {
            this.productdetail.push({id: this.lelangdetail[i].product.id, picture: JSON.parse(this.lelangdetail[i].product.picture)});
          }
          this.productidawal.push(this.lelangdetail[0])
      });
    },
    back(){
      this.$router.push('/');
    },
    getid(id){
      this.productid = this.lelangdetail[id]
    },
  },
  created() {
    this.getdetaillelang()
  },
  // props: ['id']
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
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
  .header-detail{
    width: 481px;
    margin: auto;
    background: rgb(0, 174, 239);
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-header-detail{
    color: #ffffff;
    position: relative;
    left: -12em;
  }
  .text-header-detail{
    color: #ffffff;
    font-weight: bold;
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
    width: 20%;
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
}

@media(max-width: 480px){
  .header-detail{
    width: 480px;
    margin: auto;
    background: rgb(0, 174, 239);
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0px 2px 6px lightgrey;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-header-detail{
    color: #ffffff;
    position: relative;
    left: -12em;
  }
  .text-header-detail{
    color: #ffffff;
    font-weight: bold;
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
    width: 20%;
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
}
</style>
