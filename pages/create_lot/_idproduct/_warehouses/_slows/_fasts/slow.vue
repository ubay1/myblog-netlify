<template>
  <div>
    <div>
      <Header :judul='judul' :search='search'/>
    </div>

    <v-wait for="load_product_slow">
      <template slot="waiting">
        <div style="display:flex; flex-direction:column; align-items:center; height:50vh; margin:auto;">
          <img src="~/static/loading_send.gif" alt="" width="70" style="margin:100px auto; margin-bottom:10px;">
          <div>sedang memuat data..</div>
        </div>
      </template>
      <!-- {{get_data_slow.length}} -->
      <div v-if='get_data_slow.length == 0'>
        <div style="display:flex; flex-direction:column; align-items:center; height: 70vh;">
            <img src="~/static/img/img_splash.png" alt="img-kategori" style="margin:auto; margin-bottom:10px; width:80%;">
            <div>Data tidak ditemukan</div>
          </div>
      </div>
      <div v-else>
        <div class="grid-produk-hot" :class={margin_grid_bottom_false:margin_grid_false}>
          <div class="produk-hot" v-for="(item, index) in get_data_slow" :key="index"
            :id="`id-${item.product.id}`"
            @click="select_slow(index, item.product.id)"
          >
            <div v-if="dataSelect.idSelect.length == 0">

            </div>
            <div v-else>
              <div v-if="dataSelect.idSelect == index" class="select_product">
                <font-awesome-icon :icon="['fas', 'check']" class="icon-header-create-lelang-hot" style="width: 15px; font-size: 18px; color:#fff;"/>
              </div>
            </div>
            <img :src="baseURL+item.product.picture[0]" alt="img-produk-hot">
            <div class="text-product-hot-name">
              {{item.product.product_name}}
            </div>
            <div class="text_price-hot">
              <b>{{item.product.price}}</b>
            </div>
          </div>
        </div>
      </div>
    </v-wait>

    <div class="bg-button-hot-lanjut">
      <button @click="goto_fast(dataSelect.idWarehouse, dataSelect.totalSlow, dataSelect.totalFast)" class="btn_hot_lanjut" :class="{btn_hot_lanjut_active:btn_disable_next}">Lanjut</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Headers/Header_one'

export default {
  components:{
    Header
  },
  data() {
    return {
      id_product_hot : this.$route.params.idproduct,
      warehouse_id : this.$route.params.warehouses,
      slow : this.$route.params.slows,
      fast : this.$route.params.fasts,
      judul : 'Pilih Produk Slow',
      search: 'produkslow',
      accessToken : '',
      token: '',
      data_slow : [],
      lot_data_slow : [],
      get_data_slow : [],
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
    async getProductSlow(){
      this.$wait.start('load_product_slow');

      axios.get(process.env.DEV_API + "user/producttype/2")
			.then(response => {
        this.data_slow = response.data.data.data;
        for (let i = 0; i<this.data_slow.length; i++) {
          if(response.data.data.data[i].stock.warehouse_id == this.warehouse_id){
            this.lot_data_slow.push({
              product: response.data.data.data[i]
            })
          }
        }
        console.log(this.lot_data_slow)
      });

      this.get_data_slow = await new Promise(resolve => {
        setTimeout(() => resolve(this.lot_data_slow), 2000);
      });

      // stop waiting
      this.$wait.end('load_product_slow');
    },
    select_slow(id, id_product, slow, fast, warehouse_id){
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
    goto_fast(warehouse_id, slow, fast){
      this.$router.push('/create_lot/'+warehouse_id+'/'+slow+'/'+fast+'/slow')
    }
  },
  created() {
    this.getProductSlow();
  },
}
</script>
