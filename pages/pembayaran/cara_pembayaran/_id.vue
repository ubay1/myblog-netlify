<template>
  <div>
    <div>
      <Header :judul='judul'/>
    </div>

    <div class="main-cara-pembayaran">
      <div class="txt-big-pembayaran"> Segera lakukan pembayaran sebelum</div>
      <div class="cara-pembayaran">
        <div class="txt-small-pembayaran mb-5">
          {{parsedate(payment_expired)}}
        </div>
      </div>
    </div>
    <div class="bg_nomor_rekening">
      <span>Transfer ke nomor Virual Account</span>
      <div class="detail_akun" v-for="(item, index) in get_cara_bayar" :key="index">
        <div v-if="item.bank == 'bni'">
          <span>BNI Virtual Account</span>
          <div class="nomor_rekening">
            <img src="~static/img/banks/bni.png" alt="icon-bank" width="100">
            <span>{{nomor_va}}</span>
          </div>
          <hr class="mb-3">
          <span>Jumlah yang harus dibayar</span>
          <div style="color:#00aeef; font-weight:500;">Rp. {{totalharga_reducer}}</div>
        </div>
      </div>
    </div>
    <div class="panduan_bayar">
      <span>Panduan pembayaran</span>
      <div class="row">
         <div class="cols" v-for="(item, index) in get_cara_bayar" :key="index">
            <div class="tabss" v-if="item.bank == 'bni'">
              <div class="tab">
                <input type="checkbox" id="chck1">
                <label class="tab-label" for="chck1">ATM BNI</label>
                <div class="tab-content">
                  <ol class="list_panduan">
                    <li>Masukkan Kartu Anda.</li>
                    <li>Pilih Bahasa.</li>
                    <li>Masukkan PIN ATM Anda.</li>
                    <li>Pilih "Menu Lainnya".</li>
                    <li>Pilih "Transfer".</li>
                    <li>Pilih Jenis rekening yang akan Anda gunakan (Contoh; "Dari Rekening Tabungan").</li>
                    <li>Pilih “Virtual Account Billing”.</li>
                    <li>Masukkan nomor Virtual Account Anda (contoh: 8277087781881441).</li>
                    <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.</li>
                    <li>Konfirmasi, apabila telah sesuai, lanjutkan transaksi.</li>
                    <li>Transaksi Anda telah selesai</li>
                  </ol>
                </div>
              </div>
              <div class="tab">
                <input type="checkbox" id="chck2">
                <label class="tab-label" for="chck2">BNI Mobile</label>
                <div class="tab-content">
                  <ol class="list_panduan">
                    <li>Akses BNI Mobile Banking dari handphone kemudian masukkan user ID dan password.</li>
                    <li>Pilih menu “Transfer". </li>
                    <li>Pilih menu “Virtual Account Billing” kemudian pilih rekening debet. </li>
                    <li>Masukkan nomor Virtual Account Anda (contoh: 8277087781881441) pada menu  “inputbaru”. </li>
                    <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi. </li>
                    <li>Konfirmasi transaksi dan masukkan Password Transaksi. </li>
                    <li>Pembayaran Anda Telah Berhasil. </li>
                  </ol>
                </div>
              </div>
              <div class="tab">
                <input type="checkbox" id="chck3">
                <label class="tab-label" for="chck3">Internet Banking</label>
                <div class="tab-content">
                  <ol class="list_panduan">
                    <li>Akses ibank.bni.co.id</li>
                    <li>Masukkan User ID dan password</li>
                    <li>Klik menu Transfer, lalu pilih “Virtual Account Billing”.</li>
                    <li>Kemudian masukan nomor Virtual Account Anda (contoh: 8277087781881441) yang hendak dibayarkan. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan “Lanjut” </li>
                    <li>Kemudin tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.</li>
                    <li>Masukkan Kode Otentikasi Token.</li>
                    <li>Pembayaran Anda telah berhasil</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Headers/Header_three'
import moment from 'moment'

export default {
  components:{
    Header,
  },
  data() {
    return {
      id : this.$route.params.id,
      token: '',
      list_bank:[],
      devAPI : process.env.DEV_API,
      judul : 'Info pembayaran',
      get_cara_bayar: [],
      payment_expired: '',
      nomor_va : '',
      totalharga : [],
      totalharga_reducer : ''
    }
  },
  methods: {
    parsedate(time){
      return moment(time).locale('id').format('Do MMMM YYYY h:mm:ss')
    },
    cara_bayar(){
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };

      this.$axios.get(this.devAPI + 'va/get_va/' + this.$route.params.id, config)
      .then(response => {
        if(response.data.success == true){
          var parse_va = JSON.parse(response.data.va.data)

          this.totalharga.push(response.data.va.harga)
          this.payment_expired = response.data.va.payment_expired
          this.get_cara_bayar.push(response.data.va)
          this.nomor_va = parse_va.virtual_account

          // number format
          function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          }
          // total harga dengan reduce
          var reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.totalharga_reducer = formatNumber(this.totalharga.reduce(reducer));
        } else{
          return this.$router.push('/riwayat_lelang')
        }
      });
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
        this.token = JSON.parse(aa).authh.userData.user.token.access_token;
        this.cara_bayar()
      }
    }
  },
}
</script>

<style lang="scss">
  @media(min-width:481px){
    .main-cara-pembayaran{
      cursor: pointer;
      margin: auto;
      width: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.6;
      .cara-pembayaran{
        .txt-small-pembayaran {
          text-align: center;
          box-shadow: -3px -3px 7px #efefefb0, 3px 3px 5px rgba(199, 194, 194, 0.692);
          border-radius: 5px;
          background: #00aeef;
          color: #fff;
          padding: 5px;
          font-weight: 500;
        }
      }
    }

    .bg_nomor_rekening{
      width: 480px;
      margin: auto;
      .detail_akun{
        border: 1px solid lightgrey;
        padding: 5px;
        box-shadow: 0px 2px 4px lightgrey;
        .nomor_rekening{
          margin-top: 10px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

        }
      }
    }
    .panduan_bayar{
      padding-top:20px;
      padding-bottom:20px;
      width: 480px;
      margin: auto;
      input {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }
      .row {
        display:flex;
      }
      /* Accordion styles */
      .tabss {
        overflow: hidden;
        // box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
      }
      .tab {
        width: 100%;
        color: #000;
        overflow: hidden;
        &-label {
          display: flex;
          justify-content: space-between;
          padding: 1em;
          background: #fff;
          font-weight: bold;
          cursor: pointer;
          border: 1px solid lightgrey;
          /* Icon */
          &::after {
            content: "\276F";
            width: 1em;
            height: 1em;
            text-align: center;
            transition: all .35s;
          }
        }
        &-content {
          max-height: 0;
          padding: 0 1em;
          color: #000;
          background: white;
          transition: all .35s;
          .list_panduan{
            list-style: square;
            margin: 0;
            padding-left: 10px;
            line-height: 1.6;
          }
        }
        &-close {
          display: flex;
          justify-content: flex-end;
          padding: 1em;
          font-size: 0.75em;
          background: #fff;
          cursor: pointer;
          &:hover {
            background: darken(#fff, 10%);
          }
        }
      }

      // :checked
      input:checked {
        + .tab-label {
          background: darken(#fff, 10%);
          &::after {
            transform: rotate(90deg);
          }
        }
        ~ .tab-content {
          max-height: 100vh;
          padding: 1em;
        }
      }
    }
  }

  @media(max-width:480px){

    .main-cara-pembayaran{
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.6;
      .cara-pembayaran{
        .txt-small-pembayaran {
          text-align: center;
          box-shadow: -3px -3px 7px #efefefb0, 3px 3px 5px rgba(199, 194, 194, 0.692);
          border-radius: 5px;
          background: #00aeef;
          color: #fff;
          padding: 5px;
          font-weight: 500;
        }
      }
    }
    .bg_nomor_rekening{
      margin-left: 10px;
      margin-right: 10px;
      .detail_akun{
        border: 1px solid lightgrey;
        padding: 5px;
        box-shadow: 0px 2px 4px lightgrey;
        .nomor_rekening{
          margin-top: 10px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

        }
      }
    }
    .panduan_bayar{
      margin-top:20px;
      margin-bottom:20px;
      margin-left: 10px;
      margin-right: 10px;
      input {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }
      .row {
        display:flex;
      }
      /* Accordion styles */
      .tabss {
        overflow: hidden;
        // box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
      }
      .tab {
        width: 100%;
        color: #000;
        overflow: hidden;
        &-label {
          display: flex;
          justify-content: space-between;
          padding: 1em;
          background: #fff;
          font-weight: bold;
          cursor: pointer;
          border: 1px solid lightgrey;
          /* Icon */
          &::after {
            content: "\276F";
            width: 1em;
            height: 1em;
            text-align: center;
            transition: all .35s;
          }
        }
        &-content {
          max-height: 0;
          padding: 0 1em;
          color: #000;
          background: white;
          transition: all .35s;
          .list_panduan{
            list-style: square;
            margin: 0;
            padding-left: 10px;
            line-height: 1.6;
          }
        }
        &-close {
          display: flex;
          justify-content: flex-end;
          padding: 1em;
          font-size: 0.75em;
          background: #fff;
          cursor: pointer;
          &:hover {
            background: darken(#fff, 10%);
          }
        }
      }

      // :checked
      input:checked {
        + .tab-label {
          background: darken(#fff, 10%);
          &::after {
            transform: rotate(90deg);
          }
        }
        ~ .tab-content {
          max-height: 100vh;
          padding: 1em;
        }
      }
    }
  }
</style>
