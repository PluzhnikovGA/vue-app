<template>
  <ul class="cart__orders">
    <CartOrder class="cart__order" v-for="item in items" v-bind:key="item.id"
    v-bind:item="item" />
  </ul>
</template>

<script>
import CartOrder from '@/components/CartOrder.vue';

export default {
  props: ['items'],
  components: { CartOrder },
};
</script>
