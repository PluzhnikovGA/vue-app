<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProducts }} товар (-а, -ов)
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              title="ФИО"
              :error="formError.name"
              placeholder="Введите ваше полное имя" />

            <BaseFormText
              v-model="formData.address"
              title="Адрес доставки"
              :error="formError.address"
              placeholder="Введите ваш адрес" />

            <BaseFormText
              v-model="formData.phone"
              title="Телефон"
              type="tel"
              :error="formError.phone"
              placeholder="Введите ваш телефон" />

            <BaseFormText
              v-model="formData.email"
              title="Email"
              type="email"
              :error="formError.email"
              placeholder="Введите ваш Email" />

            <BaseFormTextarea
              title="Комментарий к заказу"
              v-model="formData.comment"
              :error="formError.comment"
              placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                  name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <CartOrderList v-bind:items="productsData" />

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого:
              <b>{{ totalProducts }}</b>
              товар (-а, -ов) на сумму
              <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit"
            v-if="totalProducts > 0">
            Оформить заказ
          </button>
          <div v-if="formLoading">your request is being processed</div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import CartOrderList from '@/components/CartOrderList.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formLoading: false,
    };
  },
  components: { BaseFormText, BaseFormTextarea, CartOrderList },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formLoading = true;

      setTimeout(() => {
        axios
          .post(`${API_BASE_URL}api/orders`, {
            ...this.formData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          })
          .then((response) => {
            this.$store.commit('resetCart');
            this.$store.commit('updataOrderInfo', response.data);
            this.$router.push({
              name: 'orderInfo',
              params: {
                id: response.data.id,
              },
            });
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
          .finally(
            this.formLoading = false,
          );
      }, 5000);
    },
  },
  computed: {
    ...mapGetters({
      totalProducts: 'cartTotalProducts',
      totalPrice: 'cartTotalPrice',
      productsData: 'cartProductsData',
    }),
  },
  filters: { numberFormat },
};
</script>
