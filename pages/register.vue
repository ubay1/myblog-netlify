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
            v-model="form.name" placeholder="Enter name" name="name" required='true'>

          <input class="bg-white text-gray-600 h-11 px-5 pr-10 rounded-full text-sm focus:outline-none form-email" type="text"
            v-model="form.email" placeholder="Enter email" name="email" required='true'>

          <div class="relative text-gray-600">
            <input :type="passwordFieldType" v-model="form.password" placeholder="Enter Password" name="password"
              class="bg-white h-10 px-5 rounded-full text-sm focus:outline-none" required='true'>
            <button type="button" class="absolute right-0 top-0 btn-show-password" style="" @click="show_password_daftar()">
              <font-awesome-icon :icon="['fas', icon]" style="font-size:20px; width:20px;" />
            </button>
          </div>

          <div class="relative text-gray-600">
            <input :type="passwordFieldType2" v-model="form.repassword" placeholder="Enter Password" name="password"
              class="bg-white h-10 px-5 rounded-full text-sm focus:outline-none form-password" required='true'>
            <button type="button" class="absolute right-0 top-0 btn-show-password" style="" @click="show_repassword_daftar()">
              <font-awesome-icon :icon="['fas', icon2]" style="font-size:20px; width:20px;" />
            </button>
          </div>

          <button type="submit" :disabled="btnsubmit_daftar" class="btn btn-primary btn-login">
            <span v-show="showtext_btn_daftar">Daftar </span>
            <img v-show="showloader_daftar" src="loading_send.gif" class="img_loader" alt="">
          </button>

          <div class="register">
            <nuxt-link to="/login">Sudah punya akun</nuxt-link>
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
          name: '',
          email: '',
          password: '',
          repassword: '',
        },
        passwordFieldType: 'password',
        passwordFieldType2: 'password',
        icon: 'eye-slash',
        icon2: 'eye-slash',
        error: null,
        showloader_daftar: false,
        btnsubmit_daftar: false,
        showtext_btn_daftar: true
      }
    },
    methods: {
      async submit() {
        this.showloader_daftar = !this.showloader_daftar;
        this.btnsubmit_daftar = !this.btnsubmit_daftar;
        this.showtext_btn_daftar = !this.showtext_btn_daftar;
        var formData = {
          nama: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.repassword,
        }

        await this.$axios.post(process.env.DEV_API + 'user/register', formData)
          .then(response => {
            switch (response.data.success) {
              case false:
                this.showloader_daftar = !this.showloader_daftar;
                this.btnsubmit_daftar = !this.btnsubmit_daftar;
                this.showtext_btn_daftar = !this.showtext_btn_daftar;

                this.$toasted.show(response.data.message, {
                  theme: "bubblee",
                  position: "top-center",
                  duration : 5000
                });

                break;

              case true:
                this.showloader_daftar = !this.showloader_daftar;
                this.btnsubmit_daftar = !this.btnsubmit_daftar;
                this.showtext_btn_daftar = !this.showtext_btn_daftar;
                this.form.name = '';
                this.form.email = '';
                this.form.password = '';
                this.form.repassword = '';

                this.$toasted.show(response.data.message, {
                  theme: "bubble",
                  position: "top-center",
                  duration : 5000
                });

                break;

              default:
                break;
            }
          })
          .catch(function (err) {
            console.log(err)
          });
      },
      show_password_daftar() {
        this.passwordFieldType = this.passwordFieldType == 'password' ? 'text' : 'password';
        this.icon = this.icon == 'eye-slash' ? 'eye' : 'eye-slash';
      },
      show_repassword_daftar() {
        this.passwordFieldType2 = this.passwordFieldType2 == 'password' ? 'text' : 'password';
        this.icon2 = this.icon2 == 'eye-slash' ? 'eye' : 'eye-slash';
      }
    },
  }

</script>

<style lang="scss">
  @media(min-width:280px) and (max-width:480px){
    .btn-show-password{
      width: 20%; height: 100%; border-radius: 0px 100px 100px 0px; display: flex; justify-content: center;
    }

    .form-password{
      width:80%; border-radius: 100px 0px 0px 100px;
    }
  }

  @media (min-width:481px){
    .btn-show-password{
      width: 10%; height: 100%; border-radius: 0px 100px 100px 0px; display: flex; justify-content: center;
    }

    .form-password{
      width:90%; border-radius: 100px 0px 0px 100px;
    }
  }
</style>
