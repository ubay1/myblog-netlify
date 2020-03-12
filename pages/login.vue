<template>
  <div>
    <div class="container bg-form">
      <div class="bg-login-head">
        <img class="logoImg-login" src="~/assets/img/logo.png" alt="">
      </div>
      <form @submit.prevent="submit" method="post">
        <div> <br>
          <!-- <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small> <small> -->
          <input class="bg-white h-11 px-5 pr-10 rounded-full text-sm focus:outline-none form-email" type="text"
            v-model="form.email" placeholder="Enter email" name="email" required='true'>

          <div class="relative text-gray-600">
            <input :type="passwordFieldType" v-model="form.password" placeholder="Enter Password" name="password"
              class="bg-white h-10 px-5 rounded-full text-sm focus:outline-none" required='true'>
            <button type="button" class="absolute right-0 top-0 mt-3 mr-4" @click="show_password">
              <font-awesome-icon :icon="['fas', icon]" style="font-size:20px;" />
            </button>
          </div>

          <div class="forgot-pass">
            <nuxt-link to="/forgot_password">Lupa kata sandi ?</nuxt-link>
          </div>

          <button type="submit" :disabled="btnsubmit" class="btn btn-primary btn-login">
            <span v-show="showtext_btn">Masuk </span>
            <img v-show="showloader" src="loading_send.gif" class="img_loader" alt="">
          </button>

          <div class="register">
            <nuxt-link to="/register">Daftar akun baru</nuxt-link>
          </div>
          {{accessToken}}
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
  import nuxtStorage from 'nuxt-storage';

  library.add(faUserSecret)

  export default {
    // middleware: 'iflogin',
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
          fcm_token: uuid.v4()
        },
        passwordFieldType: 'password',
        icon: 'eye-slash',
        error: null,
        showloader: false,
        btnsubmit: false,
        showtext_btn: true
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

        await axios.post(process.env.DEV_URL + 'user/login_user', formData)
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

                  location.replace('/')
                  // this.$router.push('/')
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
      }
    },
  }

</script>

<style>
  @media (max-width:992px) {
    .bg-form {
      margin: 0px auto;
      width: 100% !important;
    }
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    height: auto !important;
  }

  .bg-form {
    margin: 0px auto;
    width: 40%;
    padding: 20px;
    ;
  }

  .bg-login-head {
    display: flex;
    justify-content: center;
  }

  .logoImg-login {
    width: 50%;
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

  @media only screen and (max-width: 600px) {
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
  }

</style>
