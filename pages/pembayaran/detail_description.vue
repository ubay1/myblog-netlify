<template>
  <div>
    <ul class="list-detail-pembayaran-description">
      <li>Transaksi ini akan otomatis menggantikan tagihan {{namabank}} yang belum dibayar</li>
      <li>Dapatkan kode pembayaran setelah klik Bayar</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['namabank'],
}
</script>

<style lang="scss">
  .list-detail-pembayaran-description{
    li{
      margin-left: 30px;
      list-style: disc;
    }
  }
</style>
