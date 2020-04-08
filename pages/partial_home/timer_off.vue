<template>
  <div class="bg-timer">
    <div class="countdown-off">
      <div class="day">
        <span class="number-off">0</span>
        <div class="format-off">hari</div>
      </div>
      <div class="hour">
        <span class="number-off">0</span>
        <div class="format-off">jam</div>
      </div>
      <div class="min">
        <span class="number-off">0</span>
        <div class="format-off">menit</div>
      </div>
      <div class="sec">
        <span class="number-off">0</span>
        <div class="format-off">detik</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    }
  }
</script>

<style>
  .countdown-off{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  span.number-off{
    background: linear-gradient(145deg, #a1a1a1, #707070);
    padding-right: 5px;
    padding-left: 5px;
    /* box-shadow: 1px 2px 1px #dadad6, -1px -2px 1px #f3f3f3; */
    border-radius: 5px;
  }

  .format-off{
    font-size: 70%;;
  }
</style>
