export default{
	// getlistagenda: state => state.listAgenda,
	// getstilloading: state => state.isLoading,
	// getstilloading2: state => state.isLoading2,
  // getHelloThere: state => state.hello,
  // isLoggedIn: state => !!state.userData,
  authStatus: state => state.status,
  userData: state => state.userData,
  accessToken: state => state.accessToken,
  warehouse : state => state.warehouse,
  totalslow : state => state.totalslow,
  totalfast : state => state.totalfast,
  hot : state => state.hot,
  slow : state => state.slow,
  fast : state => state.fast,
  tipe_pembayaran: state => state.tipe_pembayaran
}
