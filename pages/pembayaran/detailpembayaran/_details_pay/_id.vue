<template>
  <div>
    <Header :judul='judul'/>

    <div class="main-pilih-detail-pembayaran">
      <div class="txt-tagihan-awal">
        Bayar tagihan pertama <b>Rp. 300.000</b>
      </div>

      <div class="bg-txt-description-tagihan">
        <div class="txt-description-tagihan" v-if="nama_bank == 'BCA Virtual Account'">
          <div>
            {{nama_bank}}
          </div>
          <div>
            <img :src="this.baseURL+'images/banks/bca.png'" alt="" class="img-text-description">
          </div>
        </div>
        <div class="txt-description-tagihan" v-else>
          <div>
            {{nama_bank}}
          </div>
          <div>
            <img :src="this.baseURL+'images/banks/bni.png'" alt="" class="img-text-description">
          </div>
        </div>
        <detail-desc :namabank="nama_bank"/>
      </div>
    </div>

    <div class="footer-join-lot" v-if="nama_bank == 'BCA Virtual Account'">
      <button class="btn-join-lot" @click="create_va_bca()">
        <font-awesome-icon :icon="['fas', 'money-bill-alt']" style="margin-right:10px;"/>
        Bayar
      </button>
    </div>
    <div class="footer-join-lot" v-else>
      <button class="btn-join-lot" @click="create_va_bni()">
        <font-awesome-icon :icon="['fas', 'money-bill-alt']" style="margin-right:10px;"/>
        Bayar
      </button>
    </div>
  </div>
</template>

<script>
import DetailDesc from '../../detail_description'
import Header from '~/components/Headers/Header_two'

export default {
  components:{
    'detail-desc' : DetailDesc,
    Header
  },
  data() {
    return {
      id_user   : '',
      token : '',
      id_lelang    : this.$route.params.id,
      nama_bank : this.$route.params.details_pay,
      logo : '',
      baseURL : process.env.URL,
      devAPI : process.env.DEV_API,
      judul : 'Detail pembayaran',
    }
  },
  methods: {
    back(){
      window.history.back()
    },
    create_va_bca(){
      this.$swal({
        title: '',
        text: 'Apakah anda yakin ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lanjut',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.value) {
          const config = {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            data: {
              tipe:"join",
              id_lelang:this.id_lelang,
              id_user:this.id_user,
              harga:"300000",
              nama_bank:"bni",
              tanggal_menang:""
            }
          };

          this.$axios.post(this.devAPI + 'va/create_va_bca', [], config)
          .then(response => {
            if(response.data.success == true){
              this.$swal({
                icon: 'success',
                title: '',
                text: response.data.message,
              }).then((result)=>{
                if(result.value){
                  this.$router.push('/riwayat_lelang');
                }
              })
            }
          });
        }
      })
    },
    create_va_bni(){
      this.$swal({
        title: '',
        text: 'Apakah anda yakin ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lanjut',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.value) {
          const config = {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            data: {
              tipe:this.$store.getters['authh/tipe_pembayaran'],
              id_lelang:this.id_lelang,
              id_user:this.id_user,
              harga:"300000",
              nama_bank:"bni",
              tanggal_menang:""
            }
          };

          this.$axios.post(this.devAPI + 'va/create_va_bni', [], config)
          .then(response => {
            if(response.data.success == true){
              this.$swal({
                icon: 'success',
                title: '',
                text: response.data.message,
              }).then((result)=>{
                if(result.value){
                  this.$store.commit('authh/removetipe_pembayaran')
                  this.$store.commit('authh/removeallhot')
                  this.$store.commit('authh/removeallfast')
                  this.$store.commit('authh/removeallslow')
                  this.$store.commit('authh/removealltotalfast')
                  this.$store.commit('authh/removealltotalslow')
                  this.$store.commit('authh/removeallwarehouse')
                  this.$router.push('/riwayat_lelang');
                }
              })
            }
          });
        }
      })
    }
  },
  mounted() {
    if(process.client){
      var aa = localStorage.getItem('lelangoApp');
      var cekakses = JSON.parse(aa).authh.accessToken;

      // cek adakah akses atau adakah key localstorage dengan nama lelangoApp
      if(aa == null || cekakses == false){
        this.$router.push('/login');
      } else{
        this.token   = JSON.parse(aa).authh.userData.user.token.access_token;
        // console.log(this.token )
        this.id_user = JSON.parse(aa).authh.userData.user.id;
      }
    }
  },
}
</script>

<style lang="scss">
  @media(min-width:481px){
    .header-pilih-detail-pembayaran{
      font-weight: bold;
      margin: auto;
      width: 480px;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;

      .icon-header-pilih-detail-pembayaran{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-pilih-detail-pembayaran{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .main-pilih-detail-pembayaran{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.6;
      margin: auto;
      width: 480px;
      .txt-tagihan-awal{
        border: 1px solid lightgrey;
        padding: 5px;
        box-shadow: 0px 2px 2px lightgrey;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .bg-txt-description-tagihan{
        border: 1px solid lightgrey;
        margin-top: 20px;
        box-shadow: 0px 2px 2px lightgrey;
        .txt-description-tagihan{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid lightgrey;
          padding: 10px;
          width: 100%;
          .img-text-description{
            width: 80px;
          }
        }
      }

    }
    .footer-join-lot{
      list-style-type: none;
      display: inline-block;
      border-right-style: initial;
      border-bottom-style: initial;
      border-left-style: initial;
      border-right-color: initial;
      border-bottom-color: initial;
      border-left-color: initial;
      font-weight: 600;
      line-height: 13px;
      text-align: center;
      vertical-align: middle;
      width: 100%;
      max-width: 480px;
      position: fixed;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%);
      z-index: 2;
      font-size: 1em;
      background-color: rgb(255, 255, 255);
      /* border-width: 1px 0px 0px; */
      border-image: initial;
      transition: all 0.35s ease 0s;
      text-decoration: none;
      padding: 10px;
      /* border-top: 1px solid rgb(222, 222, 222);
      box-shadow: 0px 0px 2px 0px lightgrey; */
      margin: 0px;

      .btn-join-lot{
        background: #00aeef;
        padding: 10px;
        width: 100%;
        // border-radius: 50px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        justify-content: center;
        // align-items: center;
        box-shadow: 0px 2px 4px #bdbcbc;
      }
    }
  }

  @media(max-width:480px){
    .header-pilih-detail-pembayaran{
      font-weight: bold;
      margin: auto;
      /* background: linear-gradient(145deg, #00baff, #009dd7); */
      color:#00aeef;
      margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;

      .icon-header-pilih-detail-pembayaran{
        color: #00aeef;
        /* position: relative; */
        /* left: -8em; */
        font-size:18px;
        width:22px;
      }

      .text-header-pilih-detail-pembayaran{
        color: #00aeef;
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .main-pilih-detail-pembayaran{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.6;
      padding-left: 10px;
      padding-right: 10px;
      .txt-tagihan-awal{
        border: 1px solid lightgrey;
        padding: 5px;
        box-shadow: 0px 2px 2px lightgrey;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .bg-txt-description-tagihan{
        border: 1px solid lightgrey;
        margin-top: 20px;
        box-shadow: 0px 2px 2px lightgrey;
        .txt-description-tagihan{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid lightgrey;
          padding: 10px;
          width: 100%;
          .img-text-description{
            width: 80px;
          }
        }
      }

    }
    .footer-join-lot{
      list-style-type: none;
      display: inline-block;
      border-right-style: initial;
      border-bottom-style: initial;
      border-left-style: initial;
      border-right-color: initial;
      border-bottom-color: initial;
      border-left-color: initial;
      font-weight: 600;
      line-height: 13px;
      text-align: center;
      vertical-align: middle;
      width: 100%;
      max-width: 480px;
      position: fixed;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%);
      z-index: 2;
      font-size: 1em;
      background-color: rgb(255, 255, 255);
      /* border-width: 1px 0px 0px; */
      border-image: initial;
      transition: all 0.35s ease 0s;
      text-decoration: none;
      padding: 10px;
      /* border-top: 1px solid rgb(222, 222, 222);
      box-shadow: 0px 0px 2px 0px lightgrey; */
      margin: 0px;

      .btn-join-lot{
        background: #00aeef;
        padding: 10px;
        width: 100%;
        // border-radius: 50px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        justify-content: center;
        // align-items: center;
        box-shadow: 0px 2px 4px #bdbcbc;
      }
    }
  }
</style>
