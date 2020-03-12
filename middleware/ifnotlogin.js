export default function ({store, redirect }) {
  // Jika user terautentikasi
  console.log(store.getters['authh/accessToken']); // false
  if (store.getters['authh/accessToken'] == true) {
		return redirect('/')
  } else{
    return redirect('/login')
  }
}
