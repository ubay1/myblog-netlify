<template>
  <div>
    <div v-if="accessToken == false">
      <div class="header-user">
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/>
      </div>
        Anda Belum Login, silahkan login klik dibawah ini..
    </div>
    <div v-else>
      <div class="header-user">
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/>
        <button @click="logout()" class="text-black bg-yellow-400 p-1 rounded shadow-md">Logout</button>
      </div>
    </div>
    <div class="main-user">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // middleware: 'iflogin',
  data() {
    return {
      accessToken : '',
      token: ''
    }
  },
  methods: {
    back(){
      this.$router.push('/');
    },
    async logout() {
        await axios.post(
          process.env.DEV_API + 'user/logout',
          {
            Headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+this.token
            }
          })
          .then(response => {
            switch (response.data.success) {
              case false:
                this.$toasted.show(response.data.message, {
                  theme: "bubblee",
                  position: "top-center",
                  duration : 5000
                });

                console.log(response);

                this.$store.dispatch('authh/logout', response.data).then(() => {
                  console.log('success is false');
                }).catch((err) => {
                  console.log(err);
                })
                break;

              case true:
                console.log(response);
                this.$store.dispatch('authh/logout', response.data).then(() => {
                  console.log('response true')
                  location.replace('/')
                }).catch((err) => {
                  console.log(err)
                })
                break;

              default:
                break;
            }
          })
          .catch(function (err) {
            console.log(err)
          });
      },
  },
  created() {
    if (process.client) {
      var aa = localStorage.getItem('lelangoApp');
      this.accessToken = JSON.parse(aa).authh.accessToken;
      this.token = JSON.parse(aa).authh.userData.user.token.access_token
    }
  },
}
</script>

<style lang="scss">
  @media (min-width:481px){
    .header-user{
      width: 481px;
      margin: auto;
      background: linear-gradient(145deg, #00baff, #009dd7);
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-header-detail{
        color: #ffffff;
        font-size:18px;
        width:22px;
      }
    }

    .main-user{
      width: 481px;
      margin-bottom: 90px;
    }
  }

  @media (max-width:480px){
    .header-user{
      width: 480px;
      margin: auto;
      background: linear-gradient(145deg, #00baff, #009dd7);
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-header-detail{
        color: #ffffff;
        font-size:18px;
        width:22px;
      }
    }

    .main-user{
      width: 480px;
      margin-bottom: 90px;
    }
  }
</style>
