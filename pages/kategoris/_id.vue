<template>
  <div>
    {{id}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      id: this.$route.params.id,
      baseURL : process.env.URL
    }
  },
  methods: {
    getdetailKategori(){
      axios.get(process.env.DEV_API + "user/getProductCategory?category="+this.id)
			.then(response => {
        console.log(response)
      });
    },
  },
  created() {
    this.getdetailKategori();
  },
}
</script>
