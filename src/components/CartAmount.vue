<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" v-on:click="minusProduct"
      :disabled="productAmount <= 1">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" :value="productAmount"
      v-on:input="inputAmount">

      <button type="button" aria-label="Добавить один товар" v-on:click="plusProduct">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
</template>

<script>
export default {
  props: { productAmount: { required: true } },
  methods: {
    inputAmount(payload) {
      const value = Number(payload.target.value);

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(value) || value < 0) {
        this.$emit('update:productAmount', 0);
        // eslint-disable-next-line no-param-reassign
        payload.target.value = 0;
      } else {
        this.$emit('update:productAmount', Number(payload.target.value));
      }
    },
    plusProduct() {
      this.$emit('update:productAmount', this.productAmount + 1);
    },
    minusProduct() {
      this.$emit('update:productAmount', this.productAmount - 1);
    },
  },
};
</script>
