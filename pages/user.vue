<template>
  <div>
    <div>
      <div class="header-user">
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-detail" @click="back()"/>
        <button @click="logout()" class="text-black bg-yellow-400 p-1 rounded shadow-md">Logout</button>
      </div>
    </div>
    <div class="main-user">
      <div class="bg-profile">
        <img src="img/profile.png" alt="lelango user">
        <div class="data-profile">
          <b>{{datauser.name}} </b>
        </div>
      </div>

      <div class="bg-data-another">
        <div class="data-another">
          <font-awesome-icon :icon="['fas', 'phone']" style="font-size:20px;"/>
          <span>phone</span>
          <div v-if="datauser.phone_verified_at == null">
            <span>
              <b>{{datauser.phone}}</b>
            </span>
            <button class="btn-verif"><font-awesome-icon :icon="['fas', 'exclamation-circle']" style="font-size:15px;"/> verif phone</button>
          </div>
          <div v-else>
            <span >
              <b>{{datauser.phone}}</b>
            </span>
          </div>
        </div>
        <div class="data-another">
          <font-awesome-icon :icon="['fas', 'address-card']" style="font-size:20px;"/>
            <span>ktp</span>
            <span>
              <b>{{datauser.ktp}}</b>
            </span>
        </div>
        <div class="data-another">
          <font-awesome-icon :icon="['fas', 'address-card']" style="font-size:20px;"/>
            <span>npwp</span>
            <span>
              <b>{{datauser.npwp}}</b>
            </span>
        </div>
      </div>

      <!-- <div class="bg-data-alive">
        <div class="data-alive">
          <table cellpadding="10">
            <tr>
              <td>Alamat</td>
              <td><input type="text" :value="datauser.address" class="form-data-alive"></td>
            </tr>
            <tr>
              <td>Provinsi</td>
              <td><input type="text" :value="datauser.province" class="form-data-alive"></td>
            </tr>
            <tr>
              <td>Kab/Kota</td>
              <td><input type="text" :value="datauser.city" class="form-data-alive"></td>
            </tr>
            <tr>
              <td>Kecamatan</td>
              <td><input type="text" :value="datauser.sub_district" class="form-data-alive"></td>
            </tr>
            <tr>
              <td>Kelurahan</td>
              <td><input type="text" :value="datauser.village" class="form-data-alive"></td>
            </tr>
            <tr>
              <td>Kode pos</td>
              <td><input type="text" :value="datauser.postal_code" class="form-data-alive"></td>
            </tr>
          </table>
        </div>
      </div> -->

      <div class="bg-data-another2">
        <div class="data-another2">
          <span>Ikuti bid</span>
          {{datauser.total_mengikuti_bid}}
        </div>
        <div class="data-another2">
          <span>Total bid</span>
          {{datauser.total_bid}}
        </div>
        <div class="data-another2">
          <span>Bid tertinggi</span>
          {{datauser.bid_tertinggi}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  middleware: 'iflogin',
  data() {
    return {
      accessToken : '',
      token: '',
      idUser: '',
      baseURL: process.env.DEV_API,
      datauser: [],
    }
  },
  methods: {
    back(){
      this.$router.push('/');
    },
    getUser(){
      console.log(this.token)
      const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
      };
      this.$axios.get(this.baseURL+'user/profil'+'/'+this.id, config)
      .then(response => {
        if(response.data.success == true){
          this.datauser = response.data.data
        }else{
          this.datauser = ''
        }
      })
      .catch((err)=>{
        console.log(err)
      });
    },
    logout() {
        const config = {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
        };
        this.$axios.post(this.baseURL + 'user/logout',[],config
        ).then(response => {
          console.log(response)
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
                // location.replace('/')
                this.$router.push('/')
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
      this.token = JSON.parse(aa).authh.userData.user.token.access_token;
      this.id = JSON.parse(aa).authh.userData.user.id;
      console.log(this.id)
      this.getUser();
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
      // margin-bottom: 10px;
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
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin:auto;
      width: 481px;
      margin-bottom: 90px;

      .bg-profile{
        filter: contrast(0.9);
        background-image: url('https://img.freepik.com/free-vector/gadgets-auction_1284-22060.jpg?size=626&ext=jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction:column;
        padding: 10px;
        // margin-bottom:20px;

        img{
          filter: drop-shadow(0px 2px 4px black);
          width:20%;
        }
      }

      .bg-data-another {
          display: flex;
          justify-content: center;
          align-items: center;
          width: -webkit-fill-available;
          // box-shadow: 0px 2px 4px lightgrey;
          margin-bottom:20px;

          .data-another {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding:20px;
              margin:5px;
              box-shadow: 0px 2px 2px lightgrey;

              .btn-verif{
                background: #fb3333;
                color: #fff;
                padding: 5px;
                border-radius: 50px;
                font-size: small;
                box-shadow: 0px 2px 4px rgba(0,0,0,.4);
              }
          }

          span{
            b{
              font-size:small;
              // background:yellow;
            }
          }
      }

      .bg-data-another2{
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: -webkit-fill-available;
        margin-bottom: 20px;
        flex-direction: column;
        padding:10px;
        .data-another2{
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          padding: 20px;
          margin: 5px;
          box-shadow: 0px 2px 2px lightgrey;
          width: 100%;
        }
      }

      .bg-data-alive{
        .data-alive{
          input.form-data-alive {
            border: 1px solid lightgrey;
            border-radius: 10px;
            box-shadow: 0px 2px 2px lightgrey;
          }
        }
      }


      .data-profile{
        color: #000;
        background: #e0e017;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: 0px 2px 6px rgba(0,0,0,.5);

        b{
          padding:10px;
        }
      }
    }
  }

  @media (max-width:480px){
    .header-user{
      width: 480px;
      margin: auto;
      background: linear-gradient(145deg, #00baff, #009dd7);
      // margin-bottom: 10px;
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
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin:auto;
      width: 480px;
      margin-bottom: 90px;

      .bg-profile{
        filter: contrast(0.9);
        background-image: url('https://img.freepik.com/free-vector/gadgets-auction_1284-22060.jpg?size=626&ext=jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction:column;
        padding: 10px;
        // margin-bottom:20px;

        img{
          filter: drop-shadow(0px 2px 4px black);
          width:20%;
        }
      }

      .bg-data-another {
          display: flex;
          justify-content: center;
          align-items: center;
          width: -webkit-fill-available;
          // box-shadow: 0px 2px 4px lightgrey;
          margin-bottom:20px;

          .data-another {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding:20px;
              margin:5px;
              box-shadow: 0px 2px 2px lightgrey;

              .btn-verif{
                background: #fb3333;
                color: #fff;
                padding: 5px;
                border-radius: 50px;
                font-size: small;
                box-shadow: 0px 2px 4px rgba(0,0,0,.4);
              }
          }

          span{
            b{
              font-size:small;
              // background:yellow;
            }
          }
      }

      .bg-data-another2{
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: -webkit-fill-available;
        margin-bottom: 20px;
        flex-direction: column;
        padding:10px;
        .data-another2{
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          padding: 20px;
          margin: 5px;
          box-shadow: 0px 2px 2px lightgrey;
          width: 100%;
        }
      }

      .bg-data-alive{
        .data-alive{
          input.form-data-alive {
            border: 1px solid lightgrey;
            border-radius: 10px;
            box-shadow: 0px 2px 2px lightgrey;
          }
        }
      }

      .data-profile{
        color: #000;
        background: #e0e017;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: 0px 2px 6px rgba(0,0,0,.5);

        b{
          padding:10px;
        }
      }
    }
  }
</style>
