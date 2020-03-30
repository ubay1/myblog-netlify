<template>
  <div>
    <div class="container bg-form-forgot">
      <div class="bg-login-head">
        <img class="logoImg-login" src="logo.jpg" alt="">
      </div>
      <form @submit.prevent="submit" method="post" class="mt-4">
        <div>
          <input class="bg-white text-gray-600 h-11 px-5 pr-10 rounded-full text-sm focus:outline-none form-email" type="email" v-model="form.email" placeholder="Enter email" name="email" required='true'>

          <button type="submit" :disabled="btnsubmit_forgot" class="btn btn-primary btn-login">
            <span v-show="showtext_btn_forgot">Kirim permintaan lupa password </span>
            <img v-show="showloader_forgot" src="loading_send.gif" class="img_loader" alt="">
          </button>

          <p class='text-sm text-blue-500'>Setelah merubah kata sandi, silahkan cek email anda untuk konfirmasi perubahan kata sandi</p>

          <!-- <div class="register">
            <nuxt-link to="/login">Sudah punya akun</nuxt-link>
          </div> -->
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
          email: '',
        },
        error: null,
        showloader_forgot: false,
        btnsubmit_forgot: false,
        showtext_btn_forgot: true
      }
    },
    methods: {
      async submit() {
        this.showloader_forgot = !this.showloader_forgot;
        this.btnsubmit_forgot = !this.btnsubmit_forgot;
        this.showtext_btn_forgot = !this.showtext_btn_forgot;

        var formData = {
            email: this.form.email
        }

        await this.$axios.post(process.env.DEV_API + 'user/forgot-password', formData)
          .then(response => {
            switch (response.data.success) {
              case false:
                this.showloader_forgot = !this.showloader_forgot;
                this.btnsubmit_forgot = !this.btnsubmit_forgot;
                this.showtext_btn_forgot = !this.showtext_btn_forgot;

                this.$toasted.show(response.data.message, {
                  theme: "bubblee",
                  position: "top-center",
                  duration : 5000
                });

                break;

              case true:
                this.showloader_forgot = !this.showloader_forgot;
                this.btnsubmit_forgot = !this.btnsubmit_forgot;
                this.showtext_btn_forgot = !this.showtext_btn_forgot;
                this.form.email = '';

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
    },
  }

</script>

<style>
    .bg-form-forgot{
        height: 100vh;
        margin: auto;
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>
