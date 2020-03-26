<template>
  <div>
    <div>
      <div class="header-user">
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon-header-user" @click="back()"/>
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
          <span>Email</span>
          <span >
              <b>{{datauser.email}}</b>
          </span>
        </div>
        <div class="data-another">
          <!-- <font-awesome-icon :icon="['fas', 'phone']" style=" width:20px;"/> -->
          <span>Nomor HP</span>
          <div v-if="datauser.phone == null" style="color: #d61212;" class="flex-data">
            <span>
              <b> belum ada</b>
            </span>
            <button class="btn-tambah-phone">Tambah</button>
          </div>
          <div v-else>
            <div v-if="datauser.phone_verified_at == null" class="flex-data">
              <span>
                <b>{{datauser.phone}}</b>
              </span>
              <button class="btn-verif"> verif phone</button>
            </div>
            <div v-else class="flex-data">
              <span>
                <b>{{datauser.phone}}</b>
              </span>
              <div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" style=" width:20px;;"/>
              </div>
            </div>
          </div>
        </div>
        <div class="data-another">
            <span>KTP</span>
            <div v-if="datauser.ktp == null" style="color: #d61212;" class="flex-data">
              <span>
                <b> belum ada</b>
              </span>
              <button class="btn-tambah-phone">Tambah</button>
            </div>
            <div v-else class="flex-data">
              <span >
                <b>{{datauser.ktp}}</b>
              </span>
              <div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" style=" width:20px;;"/>
              </div>
            </div>
        </div>
        <div class="data-another">
            <span>NPWP</span>
            <div v-if="datauser.npwp == null" style="color: #d61212;" class="flex-data">
              <span>
                <b> belum ada</b>
              </span>
              <button class="btn-tambah-phone">Tambah</button>
            </div>
            <div v-else class="flex-data">
              <span >
                <b>{{datauser.npwp}}</b>
              </span>
              <div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" style=" width:20px;;"/>
              </div>
            </div>
        </div>
        <div class="data-another">
            <span>Data Rekening</span>
            <div v-if="databank.success == false" style="color: #d61212;" class="flex-data">
              <span>
                <b> belum ada</b>
              </span>
              <button class="btn-tambah-phone">Tambah</button>
            </div>
            <div v-else class="flex-data">
              <span >
                <b>{{databank.length}}</b>
              </span>
              <div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" style=" width:20px;;"/>
              </div>
            </div>
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
      databank:[]
    }
  },
  methods: {
    back(){
      this.$router.push('/');
    },
    getUser(){
      // console.log(this.token)
      const config = {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
      };
      this.$axios.get(this.baseURL+'user/profil/'+this.id, config)
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
    async getBankAkun(){
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };
      await this.$axios.get(this.baseURL+'user/get-bank-account', config)
      .then(response => {
        // console.log(response.data.length)
        if(response.data.success == true){
          this.databank = response.data.data
        }else{
          this.databank = response.data
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
      // console.log(this.id)
      this.getUser();
      this.getBankAkun();
    }
  },
  mounted() {
    if(process.client){

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

      .icon-header-user{
        color: #ffffff;
        font-size:18px;
        width:20px;
      }
    }

    .main-user{
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin:auto;
      width: 481px;
      // margin-bottom: 90px;

      .bg-profile{
        filter: contrast(0.9);
        height: 180px;
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
          flex-direction: column;
          align-items: center;
          width: -webkit-fill-available;
          padding:20px;
          // box-shadow: 0px 2px 4px lightgrey;
          // margin-bottom:20px;

          .data-another {
              display: flex;
              width: 100%;
              flex-direction: column;
              // align-items: center;
              padding:20px;
              margin:5px;
              box-shadow: 0px 2px 2px lightgrey;

              .flex-data{
                display: flex;
                align-items: center;
                justify-content: space-between;
              }

              .btn-verif{
                background: #fb3333;
                color: #fff;
                padding: 5px;
                border-radius: 50px;
                // font-size: normal;
                box-shadow: 0px 2px 4px rgba(0,0,0,.4);
              }

              .btn-tambah-phone{
                background: #00aeef;
                color: #fff;
                padding: 5px;
                // border-radius: 50px;
                // font-size: normal;
                box-shadow: 0px 2px 4px rgba(0,0,0,.4);
              }
          }

          span{
            b{
              font-size:normal;
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
      width: auto;
      margin: auto;
      background: linear-gradient(145deg, #00baff, #009dd7);
      // margin-bottom: 10px;
      padding: 10px;
      box-shadow: 0px 2px 6px lightgrey;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-header-user{
        color: #ffffff;
        font-size:18px;
        width:20px;
      }
    }

    .main-user{
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin:auto;
      width: auto;
      // margin-bottom: 90px;

      .bg-profile{
        filter: contrast(0.9);
        height: 180px;
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
          flex-direction: column;
          align-items: center;
          width: -webkit-fill-available;
          padding:10px;
          // box-shadow: 0px 2px 4px lightgrey;
          // margin-bottom:20px;

          .data-another {
              display: flex;
              width: 100%;
              flex-direction: column;
              // align-items: center;
              padding:20px;
              margin:5px;
              box-shadow: 0px 2px 2px lightgrey;

              .flex-data{
                display: flex;
                align-items: center;
                justify-content: space-between;
              }

              .btn-verif{
                background: #fb3333;
                color: #fff;
                padding: 5px;
                border-radius: 50px;
                // font-size: normal;
                box-shadow: 0px 2px 4px rgba(0,0,0,.4);
              }

              .btn-tambah-phone{
                background: #00aeef;
                color: #fff;
                padding: 5px;
                // border-radius: 50px;
                // font-size: normal;
                box-shadow: 0px 2px 4px rgba(0,0,0,.4);
              }
          }

          span{
            b{
              font-size:normal;
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
