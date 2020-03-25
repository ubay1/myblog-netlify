<template>
  <div>
    <div class="header-detail-blog">
      <div>
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/>
      </div>
      <div style="position: relative; left: -40%; color:#fff; font-weight:bold;">
        Tips Lelango
      </div>
    </div>
    <div class="detail-blog">
      <img :src="baseURL+this.$route.params.image" alt="image-blog">
      <div class="title-detail-blog">
        {{this.$route.params.title}}
      </div>
      <div class="description-detail-blog">
        {{this.$route.params.description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseURL : process.env.URL
    }
  },
  methods: {
    back(){
      this.$router.push('/');
    },
  },
  created() {

  },
}
</script>

<style lang="scss">

@media (min-width:481px){
  .header-detail-blog{
    width: 481px;
    margin: auto;
    background: linear-gradient(145deg, #00baff, #009dd7);
    padding: 10px;
    // box-shadow: 0px 2px 6px rgba(150, 144, 144, 0.4);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: -10px;
    z-index: 2;
    position: relative;
    .icon-header-detail{
      color: #ffffff;
      /* position: relative; */
      /* left: -8em; */
      font-size:18px;
      width:22px;
    }
  }
  .detail-blog{
    width: 481px;
    margin: auto;
    .title-detail-blog{
      background: linear-gradient(145deg, #00baff, #009dd7);
      color: white;
      padding: 10px;
    }
    .description-detail-blog{
      padding: 10px;
      line-height: 1.6;
      text-align: justify;
      text-indent: 30px;
      font-size: 15px;
    }
  }
}

@media (max-width:480px){
  .header-detail-blog{
    width: auto;
    margin: auto;
    background: linear-gradient(145deg, #00baff, #009dd7);
    padding: 10px;
    // box-shadow: 0px 2px 6px rgba(150, 144, 144, 0.4);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: -10px;
    z-index: 2;
    position: relative;
    .icon-header-detail{
      color: #ffffff;
      /* position: relative; */
      /* left: -8em; */
      font-size:18px;
      width:22px;
    }
  }
  .detail-blog{
    width: auto;
    margin: auto;
    .title-detail-blog{
      background: linear-gradient(145deg, #00baff, #009dd7);
      color: white;
      padding: 10px;
    }
    .description-detail-blog{
      padding: 10px;
      line-height: 1.6;
      text-align: justify;
      text-indent: 30px;
      font-size: 15px;
    }
  }
}
</style>
