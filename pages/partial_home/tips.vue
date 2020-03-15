<template>
  <div>
    <swiper :options="swiperTips">
      <div v-for="(item, index) in tips" :key="index">
        <div class="dtl32">
          <img :src="assetsUrl+item.thumbnail" :alt="item.title">
          <div class="dtl">
            <h3>{{item.title}}</h3>
            <p>
            {{
              this._.truncate(item.description, {'length': 135})
            }}
            </p>
            <a href="javascript:void(0)" @click="goTo(item)">Lanjut baca</a>
          </div>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tips: [],
        assetsUrl: process.env.URL,
        swiperTips: {
          grabCursor: true,
          slidesPerView: 3,
          spaceBetween: 30,
          // breakpoints: {
          //   1024: {
          //     slidesPerView: 4,
          //     spaceBetween: 10
          //   },
          //   768: {
          //     slidesPerView: 3,
          //     spaceBetween: 5
          //   },
          //   640: {
          //     slidesPerView: 3,
          //     spaceBetween: 5
          //   },
          //   320: {
          //     slidesPerView: 2,
          //     spaceBetween: 5
          //   }
          // },
        }
      }
    },
    methods: {
      async getTips() {
        let response = await axios.get("user/getBlog")
        if (response.data.success) {
          this.tips = response.data.data
        }
      },
      goTo(data){
        return this.$router.push({
          name: 'tips',
          params: {
            tipsId: data.id
          },
          props: {
            tips: data
          }
        })
      }
    },
    created() {
      this.getTips()
    }
  }
</script>
