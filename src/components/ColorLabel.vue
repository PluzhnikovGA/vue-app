<template>
  <label class="colors__label">
    <input class="colors__radio sr-only" v-bind:name="productId"
    type="radio" v-bind:value="this.color.id">
    <span class="colors__value"
    v-bind:style="[{ backgroundColor: this.color.code }, {border: '1px solid #000' }]">
    </span>
  </label>
</template>

<script>

export default {
  props: ['color', 'productId'],
};
</script>
