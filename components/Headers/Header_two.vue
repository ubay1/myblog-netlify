<template>
  <div>
    <div class="header-two">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-two" @click="back()"/>
      <div class="text-header-two">
        {{judul}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['judul'],
  methods: {
    back(){
      // window.history.back()
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
  @media(min-width:481px){
    .header-two {
      font-weight:bold;
      width: 480px;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      box-shadow: 0px 0px 2px 0px lightgrey;
      .text-header-two {
        font-weight: bold;
        color: #00aeef;
        padding-left: 20px;
        font-size: 20px;
      }
      .icon-header-two{
        color: #00aeef;
        font-size:18px;
        width:20px;
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
    .header-two {
      font-weight:bold;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      box-shadow: 0px 0px 2px 0px lightgrey;
      .text-header-two {
        font-weight: bold;
        color: #00aeef;
        padding-left: 20px;
        font-size: 20px;
        width: 320px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // text-align: center;;
      }
      .icon-header-two{
        color: #00aeef;
        font-size:18px;
        width:20px;
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

  @media(min-width:0px) and (max-width:320px){
    .header-two {
      font-weight:bold;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      box-shadow: 0px 0px 2px 0px lightgrey;
      .text-header-two {
        font-weight: bold;
        color: #00aeef;
        padding-left: 20px;
        font-size: 20px;
        width: 280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // text-align: center;;
      }
      .icon-header-two{
        color: #00aeef;
        font-size:18px;
        width:20px;
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
