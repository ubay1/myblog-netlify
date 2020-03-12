export default function ({context, store, redirect }) {
  // Jika user terautentikasi
  console.log(store.getters['authh/accessToken']);
  if (store.getters['authh/accessToken']) {
		return redirect('/login')
  } else{
    return redirect('/')
  }
}
