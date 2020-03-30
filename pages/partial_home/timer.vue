<template>
  <div>
    <small v-if="statusType !== 'expired'">berakhir dalam</small>
    <small v-if="statusType == 'expired'">lelang berakhir</small>
    <div class="countdown" v-show="statusType !== 'expired'">
      <div class="day">
        <span class="number">{{ days }}</span>
        <div class="format">hari</div>
      </div>
      <div class="hour">
        <span class="number">{{ hours }}</span>
        <div class="format">jam</div>
      </div>
      <div class="min">
        <span class="number">{{ minutes }}</span>
        <div class="format">menit</div>
      </div>
      <div class="sec">
        <span class="number">{{ seconds }}</span>
        <div class="format">detik</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['starttime', 'endtime', 'trans'],
    data() {
      return {
        timer: "",
        wordString: {},
        start: "",
        end: "",
        interval: "",
        days: "",
        minutes: "",
        hours: "",
        seconds: "",
        message: "",
        statusType: "",
        statusText: "",
      }
    },
    computed: {
      startTime() {
        return this.starttime
      },
      endTime() {
        return this.endtime
      },
      option() {
        return this.trans
      }
    },
    created() {
      this.wordString = this.option
    },
    mounted() {
      this.start = new Date(this.startTime).getTime()
      this.end = new Date(this.endTime).getTime()
      // Update the count down every 1 second
      this.timerCount(this.start, this.end)
      this.interval = setInterval(() => {
        this.timerCount(this.start, this.end)
      }, 1000)
    },
    methods: {
      timerCount: function (start, end) {
        // Get todays date and time
        var now = new Date().getTime()

        // Find the distance between now an the count down date
        var distance = start - now
        var passTime = end - now

        if (distance < 0 && passTime < 0) {
          this.message = this.wordString.expired
          this.statusType = "expired"
          this.statusText = this.wordString.status.expired
          clearInterval(this.interval)
          return

        } else if (distance < 0 && passTime > 0) {
          this.calcTime(passTime)
          this.message = this.wordString.running
          this.statusType = "running"
          this.statusText = this.wordString.status.running

        } else if (distance > 0 && passTime > 0) {
          this.calcTime(distance)
          this.message = this.wordString.upcoming
          this.statusType = "upcoming"
          this.statusText = this.wordString.status.upcoming
        }
      },
      calcTime: function (dist) {
        // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(dist / (1000 * 60 * 60 * 24))
        // this.hours = Math.floor(dist / (1000 * 60 * 60))
        this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))
        this.seconds = Math.floor((dist % (1000 * 60)) / 1000)
      }
    }
  }
</script>

<style>
  .countdown{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  span.number{
    background: linear-gradient(145deg, #fffb3f, #decc2e);
    padding-right: 5px;
    padding-left: 5px;
    /* box-shadow: 1px 2px 1px #dadad6, -1px -2px 1px #f3f3f3; */
    border-radius: 5px;
  }

  .format{
    font-size: 80%;;
  }
</style>
