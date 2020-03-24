export default function ({store, redirect }) {
  // Jika user terautentikasi
  console.log(store.getters['authh/accessToken']); // false
  if (store.getters['authh/accessToken'] != false) {
		return redirect('/')
  }
}
