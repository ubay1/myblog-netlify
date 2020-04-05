<template>
  <div>
    <div class="header-detail-bidding">
      <div>
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail-bidding" @click="back()"/>
      </div>
      <div class="text-header-detail-bidding">10 bidder tertinggi</div>
    </div>

    <div class="mb-5 bg-main-detail-bidding">
      <div class="main-detail-bidding" v-for="(item, index) in user_bidding" :key="index">
        <div class="detail-bidding">
          <div class="no">
            {{index+1}}.
          </div>
          <div class="nama-user">
            {{item.user.name}}
          </div>
          <div class="harga_bidding">
            {{item.format_price}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id_lot : this.$route.params.id,
      token : '',
      user_bidding : [],
      devAPI : process.env.DEV_API
    }
  },
  methods: {
    back(){
      window.history.back();
    },
    getbidding(){
      this.$axios.get(this.devAPI + 'user/lot_tertinggi/'+this.id_lot)
      .then(response => {
        if(response.data.success == true){
          this.user_bidding = response.data.data;
        }
      })
    }
  },
  mounted() {
    this.getbidding()
  },
}
</script>

<style lang="scss">
  @media(min-width:481px){
    .header-detail-bidding{
      width: 480px;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;

      .icon-header-detail-bidding{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-detail-bidding{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .bg-main-detail-bidding{
      width: 480px;
      margin: auto;
      .main-detail-bidding {
        border: 1px solid lightgrey;
        margin-left: 5px;
        margin-right: 5px;

        .detail-bidding {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px;
        }
      }
    }
  }

  @media(max-width:480px){
    .header-detail-bidding{
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;

      .icon-header-detail-bidding{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-detail-bidding{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .bg-main-detail-bidding{
      margin: auto;
      .main-detail-bidding {
        border: 1px solid lightgrey;
        margin-left: 5px;
        margin-right: 5px;

        .detail-bidding {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px;
        }
      }
    }
  }
</style>
