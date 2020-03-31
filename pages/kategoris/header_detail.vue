<template>
  <div>
    <div class="header-kategori">
      <div class="text-header-kategori">
        {{judul}}
      </div>
      <div class="search-kategori">
        <font-awesome-icon :icon="['fas', 'search']" style="color:rgb(0, 174, 239); font-size:20px; width:20px; !important"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['judul'],
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
