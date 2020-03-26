<template>
  <div class="data-kategori">
    <div v-for="(item, index) in listcategory" :key="index">
      <div class="image">
        <img :src="baseURL + item.category_picture" alt="">
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import axios from 'axios'

export default {
  components:{
    Footer
  },
  data() {
    return {
      listcategory : [],
      baseURL : process.env.URL
    }
  },
  methods: {
    getListCategory() {
			axios.get(process.env.DEV_API + "user/category")
				.then(response => {
          // console.log(response)
          this.listcategory = response.data.data;
				});
    },
  },
  created() {
    this.getListCategory();
  },
}
</script>


<style lang="scss">
  @media(max-width:480px){
    .data-kategori{
      margin-bottom: 20px;
      display: flex;
      height: 100vh;
      flex-direction: column;
      flex-wrap: wrap;

      div{
        .image{
          width: 100px;;
        }
      }
    }
  }
</style>
