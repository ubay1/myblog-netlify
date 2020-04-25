<template>
    <div class="bg_plusminus">
      <button class="btn_plusminus" @click="decrement">-</button>
      <input disabled :value="plusminus" class="frm_plusminus">
      <button class="btn_plusminus" @click="increment">+</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      plusminus:1
    }
  },
  methods: {

  },
}
</script>

<style lang="scss">
  .bg_plusminus {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    // box-shadow: 0px 2px 4px #b8b7b7;

    button.btn_plusminus {
      background: #00aeef;
      color: #fff;
      font-weight: 500;
      font-size: large;
      padding-left: 10px;
      padding-right: 10px;
    }

    input.frm_plusminus {
      width: 50%;
      text-align: center;
      background: #fff;
      border: 1px solid #00aeef;
    }
  }

  @media(max-width:359px){
    button.btn_plusminus {
      background: linear-gradient(0deg, #00aeef, #2a7fbd);
      color: #fff;
      font-weight: 500;
      font-size: large;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>
