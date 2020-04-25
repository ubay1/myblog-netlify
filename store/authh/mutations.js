export default{
  auth_request : (state) => {
    state.status = 'loading'
  },
  auth_success: (state, userData) => {
    state.status = 'success'
    state.userData = userData,
    state.accessToken = true
  },
  auth_error : (state) => {
    state.status = 'error'
  },
  logout : (state) => {
    state.accessToken = false
    state.status = ''
    state.userData = ''
  },
  cek_auth: (state) => {
    state.accessToken
  },
  addwarehouse: (state, id) => {
    console.log('add warehouse'+id)
    return state.warehouse.push(id)
  },
  addtotalslow: (state, id) => {
    console.log('add totalslow'+id)
    return state.totalslow.push(id)
  },
  addtotalfast: (state, id) => {
    console.log('add totalfast'+id)
    return state.totalfast.push(id)
  },
  addhot: (state, id) => {
    console.log('add hot id'+id)
    return state.hot.push(id)
  },
  addslow: (state, id) => {
    console.log('add slow id'+id)
    return state.slow.push(id)
  },
  addfast: (state,id) => {
    console.log('add fast id'+id)
    return state.fast.push(id)
  },
  removewarehouse : (state, id) => {
    console.log("remove warehouse")
    var index = state.warehouse.findIndex((element => element == id))
    return state.warehouse.splice(index, 1)
  },
  removetotalslow : (state, id) => {
    console.log("remove totalslow")
    var index = state.totalslow.findIndex((element => element == id))
    return state.totalslow.splice(index, 1)
  },
  removetotalfast : (state, id) => {
    console.log("remove totalfast")
    var index = state.totalfast.findIndex((element => element == id))
    return state.totalfast.splice(index, 1)
  },
  removehot : (state, id) => {
    console.log("remove hot")
    var index = state.hot.findIndex((element => element == id))
    return state.hot.splice(index, 1)
  },
  removeslow : (state, id) => {
    console.log("remove slow")
    var index = state.slow.indexOf(id);
    return state.slow.splice(index, 1);
  },
  removefast : (state, id) => {
    console.log("remove fast")
    var index = state.fast.indexOf(id);
    return state.fast.splice(index, 1);
  },
  removeallwarehouse: (state) => {
    return state.warehouse = []
  },
  removeallhot: (state) => {
    return state.hot = []
  },
  removealltotalslow: (state) => {
    return state.totalslow = []
  },
  removealltotalfast: (state) => {
    return state.totalfast = []
  },
  removeallslow: (state) => {
    return state.slow = []
  },
  removeallfast: (state) => {
    return state.fast = []
  },
  tipe_pembayaran: (state,tipe) => {
    return state.tipe_pembayaran = tipe
  },
  removetipe_pembayaran: (state) => {
    return state.tipe_pembayaran = ""
  },
}
