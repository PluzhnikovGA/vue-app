<template>
  <li class="cart__order">
      <h3>{{ item.product.title }}</h3>
      <b>{{ totalPrice | numberFormat }} ₽</b>
      <span>Артикул: {{ item.product.id }}</span>
    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  filters: { numberFormat },
  computed: {
    totalPrice() {
      console.log(this.item);
      return this.item.price * this.item.quantity;
    },
  },
};
</script>
