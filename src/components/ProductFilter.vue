<!-- eslint-disable vue/no-mutating-props -->
<template>
  <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" v-on:submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price"
              v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price"
              v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category"
              v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option v-bind:value="category.id" v-for="category in categories"
                v-bind:key="category.id">{{ category.title }}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="color in colors" v-bind:key="color.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                  name="color" v-bind:value="color.id" v-model.number="currentColors">
                  <span class="colors__value" v-bind:style="{ backgroundColor: color.code }">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button"
          v-on:click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColors: 0,

      categoriesData: null,

      colorsData: null,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items.slice(0, -1) : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColors = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColors);
      this.$emit('clear-page');
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}api/productCategories`)
        // eslint-disable-next-line no-return-assign
        .then((response) => this.categoriesData = response.data);
    },
    loadColors() {
      axios.get(`${API_BASE_URL}api/colors`)
        // eslint-disable-next-line no-return-assign
        .then((response) => this.colorsData = response.data);
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
