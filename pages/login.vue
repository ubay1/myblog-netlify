<template>
  <div>
    <div class="container bg-form">
      <div class="bg-login-head">
        <img class="logoImg-login" src="logo.jpg" alt="">
      </div>
      <form @submit.prevent="submit" method="post">
        <div> <br>
          <!-- <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small> <small> -->
          <input class="bg-white text-gray-600 h-11 px-5 pr-10 rounded-full text-sm focus:outline-none form-email" type="text"
            v-model="form.email" placeholder="Enter email" name="email" required='true'>

          <div class="relative text-gray-600">
            <input :type="passwordFieldType" v-model="form.password" placeholder="Enter Password" name="password"
              class="bg-white h-10 px-5 rounded-full text-sm focus:outline-none form-password" required='true'
              style=''
            >
            <button type="button" class="absolute right-0 top-0 btn-show-password" style="" @click="show_password">
              <font-awesome-icon :icon="['fas', icon]" style="font-size:20px; width:20px;" />
            </button>
          </div>

          <div class="forgot-pass">
            <nuxt-link to="/lupa_sandi">Lupa kata sandi ?</nuxt-link>
          </div>

          <button type="submit" :disabled="btnsubmit" class="btn btn-primary btn-login">
            <span v-show="showtext_btn">Masuk </span>
            <img v-show="showloader" src="loading_send.gif" class="img_loader" alt="">
          </button>

          <div class="register">
            <nuxt-link to="/">Ke Beranda</nuxt-link>
            <nuxt-link to="/register">Daftar akun baru</nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  import {uuid} from 'vue-uuid';
  import axios from 'axios';
  import firebase from 'firebase/app'

  library.add(faUserSecret)

  export default {
    middleware: 'ifnotlogin',
    computed: mapGetters({
      accessToken : 'authh/accessToken',
    }),
    components: {},
    data() {
      return {
        form: {
          email: '',
          password: '',
          platform: 'web',
          fcm_token : ''
          // fcm_token: uuid.v4()
        },
        passwordFieldType: 'password',
        icon: 'eye-slash',
        error: null,
        showloader: false,
        btnsubmit: false,
        showtext_btn: true,
      }
    },
    methods: {
      async submit() {
        this.showloader = !this.showloader;
        this.btnsubmit = !this.btnsubmit;
        this.showtext_btn = !this.showtext_btn;
        var formData = {
          email: this.form.email,
          password: this.form.password,
          platform: this.form.platform,
          fcm_token: this.form.fcm_token,
        }

        await this.$axios.post(process.env.DEV_API + 'user/login_user', formData)
          .then(response => {
            switch (response.data.success) {
              case false:
                this.showloader = !this.showloader;
                this.btnsubmit = !this.btnsubmit;
                this.showtext_btn = !this.showtext_btn;

                this.$toasted.show(response.data.message, {
                  theme: "bubblee",
                  position: "top-center",
                  duration : 5000
                });

                // console.log(response);

                this.$store.dispatch('authh/login', response.data).then(() => {
                  console.log('success is false');
                }).catch((err) => {
                  console.log(err);
                })

                break;

              case true:
                this.showloader = !this.showloader;
                this.btnsubmit = !this.btnsubmit;
                this.showtext_btn = !this.showtext_btn;
                console.log(response);
                this.$store.dispatch('authh/login', response.data).then(() => {
                  console.log('response true')

                  // location.replace('/')
                  this.$router.push('/')
                  // redirect('/')
                }).catch((err) => {
                  console.log(err)
                })

                // this.$router.push('/');
                break;

              default:
                break;
            }
          })
          .catch(function (err) {
            console.log(err)
          });
      },
      show_password() {
        this.passwordFieldType = this.passwordFieldType == 'password' ? 'text' : 'password';
        this.icon = this.icon == 'eye-slash' ? 'eye' : 'eye-slash';
      },
      async getDeviceToken() {

        let currentToken
        try {
          const permission = await Notification.requestPermission()
          try {
            currentToken = await this.$fireMess.getToken()
          } catch (e) {
            console.error('An error occurred while retrieving token. ', e)
            this.idToken = ''
          }
          if (currentToken) {
            console.log('Current Token : ', currentToken)
            this.form.fcm_token = currentToken
          } else {
            // Show permission request.
            console.info(
              'No Instance ID token available. Request permission to generate one.'
            )
            // Show permission UI.
            //updateUIForPushPermissionRequired();
            this.form.fcm_token = ''
          }
          this.permissionGranted = permission === 'granted'
        } catch (e) {
          console.error(e)
          return
        }
      }
    },
    mounted() {
      this.getDeviceToken()
    },
  }

</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    height: auto !important;
  }

  .bg-login-head {
    display: flex;
    justify-content: center;
  }

  /* Full-width input fields */
  .text-gray-600 {
    width: 100%;
    margin: 20px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px lightgrey;
    border-radius: 20px;
  }

  .form-email {
    width: 100%;
    padding: 10px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px lightgrey;
    border-radius: 20px;
  }

  .forgot-pass {
    float: right;
    ;
    color: rgb(0, 159, 225);
    font-weight: bold;
  }

  /* Set a style for all buttons */
  .btn-login {
    background-color: rgb(0, 159, 225);
    color: white;
    padding: 10px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    box-shadow: 0px 2px 4px lightgrey;
    border-radius: 20px;
    display: flex;
    justify-content: center;
  }

  .btn-login:hover {
    opacity: 0.8;
  }

  .img_loader {
    width: 20px;
  }

  .register {
    color: rgb(0, 159, 225);
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }

  .toasted.bubble {
    background: rgb(0, 159, 225) !important;
  }

  .toasted.bubblee {
    border-radius: 30px;
    min-height: 38px;
    line-height: 1.1em;
    background-color: #f83c3c;
    padding: 0 20px;
    font-size: 15px;
    font-weight: 300;
    color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
  }

  .text-gray-600{
    margin:10px 0 !important;
  }

  @media (min-width:280px) and (max-width:480px) {
    .bg-form {
      height: 100vh;
      margin: auto;
      width: 100% !important;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .toasted-container .toasted:first-child {
      margin-top: 0;
    }

    .toasted-container .toasted {
      border-radius: 0;
    }

    .toasted.bubblee {
      min-height: 38px;
      line-height: 1.1em;
      background-color: #f83c3c;
      padding: 0 20px;
      font-size: 15px;
      font-weight: 300;
      color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    }

    .btn-show-password{
      width: 20%; height: 100%; border-radius: 0px 100px 100px 0px; display: flex; justify-content: center;
    }

    .form-password{
      width:80%; border-radius: 100px 0px 0px 100px;
    }
  }

  @media(min-width:481px){
    .bg-form {
      height: 100vh;
      margin: auto;
      width: 100% !important;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .btn-show-password{
      width: 10%; height: 100%; border-radius: 0px 100px 100px 0px; display: flex; justify-content: center;
    }

    .form-password{
      width:90%; border-radius: 100px 0px 0px 100px;
    }
  }


  /* logo */
  @media(min-width: 992px){
    .logoImg-login {
      width: 30%;
    }
  }

  @media(min-width: 768px) and (max-width: 991px){
    .logoImg-login {
      width: 40%;
    }
  }

  @media (min-width:600px) and (max-width: 767px){
    .logoImg-login {
      width: 50%;
    }
  }

  @media (min-width:320px) and (max-width: 599px){
    .logoImg-login {
      width: 60%;
    }
  }

  @media (min-width:280px) and (max-width: 319px){
    .logoImg-login {
      width: 70%;
    }
  }

</style>
