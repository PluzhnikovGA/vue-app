<!-- eslint-disable vue/no-parsing-error -->
<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img v-bind:src="product.image" v-bind:alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" v-bind:key="color.id">
          <ColorLabel v-bind:color="color" v-bind:product-id="product.id" />
        </li>
      </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ColorLabel from './ColorLabel.vue';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  components: { ColorLabel },
};
</script>
