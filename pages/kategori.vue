<template>
  <div>
    <Header :judul='judul' :search='search'/>
    <div class="grid-kategori">
      <div v-for="(item, index) in listcategory" :key="index" class="grid-item" @click="detail_kategori(item.id, item.category_name)">
          <img v-lazy="baseURL + item.category_picture" :key="baseURL + item.category_picture" alt="img-kategori">
          <div>
            {{item.category_name}}
          </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Headers/Header_one'
import Footer from '~/components/Footer'
import axios from 'axios'

export default {
  components:{
    Header,
    Footer
  },
  data() {
    return {
      judul : 'kategori',
      search: 'category',
      listcategory : [],
      baseURL : process.env.URL
    }
  },
  methods: {
    getListCategory() {
			axios.get(process.env.DEV_API + "user/category")
				.then(response => {
          this.listcategory = response.data.data;
				});
    },
    detail_kategori(id, name){
      this.$router.push('/kategoris/'+name+'/'+id)
    }
  },
  created() {
    this.getListCategory();
  },
}
</script>


<style lang="scss">
  @media(min-width:481px){
    .header-kategori {
      width: 480px;
      margin: auto;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0px 0px 2px 0px lightgrey;
      .text-header-kategori {
        font-weight: bold;
        color: #00aeef;
      }
    }

    .grid-kategori{
      width: 480px;
      margin: auto;
      margin-bottom: 70px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto auto;
      justify-content: space-around;
      -webkit-box-align: center;
      align-items: center;
      grid-row-gap: 40px;

      .grid-item{
        cursor:pointer;
        height: 100px;
        width: 100px;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-size: 14px;
        // border: 1px solid lightblue;
        img{
          width: auto;
          height: 50%;
        }
      }
    }
  }

  @media(min-width:321px) and (max-width:480px){
    .header-kategori {
      margin: auto;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      align-items: baseline;
      .text-header-kategori {
        font-size: 20px;
        font-weight: bold;
        color: #00aeef;
      }
    }
    .grid-kategori{
      margin-bottom: 70px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto auto;
      justify-content: space-around;
      -webkit-box-align: center;
      align-items: center;
      width: auto;
      grid-row-gap: 40px;

      .grid-item{
        cursor:pointer;
        height: 100px;
        width: 100px;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-size: 14px;
        // border: 1px solid lightblue;
        img{
          width: auto;
          height: 50%;
        }
      }
    }
  }

  @media(min-width:280px) and (max-width:320px){
    .header-kategori {
      margin: auto;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      align-items: baseline;
      .text-header-kategori {
        font-size: 20px;
        font-weight: bold;
        color: #00aeef;
      }
    }

    .grid-kategori{
      margin-bottom: 70px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-around;
      -webkit-box-align: center;
      align-items: center;
      width: auto;
      grid-row-gap: 40px;

      .grid-item{
        height: 100px;
        width: 100px;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-size: 14px;
        // border: 1px solid lightblue;
        img{
          width: auto;
          height: 50%;
        }
      }
    }
  }
</style>
