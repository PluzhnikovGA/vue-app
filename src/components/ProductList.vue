<template>
  <ul class="catalog__list">

    <ProductItem v-for="product in products" v-bind:key="product.id"
    v-bind:product="product" />

  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>
