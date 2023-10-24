<template>
      <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a href="#" class="pagination__link pagination__link--arrow"
        v-bind:class="{'pagination__link--disabled': page === 1}"
        v-on:click.prevent="pageDown(page)"
        aria-label="Предыдущая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>

      <li class="pagination__item" v-for="pageNumber in pages" v-bind:key="pageNumber">
        <a href="#" class="pagination__link"
        v-bind:class="{'pagination__link--current': pageNumber === page}"
        v-on:click.prevent="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>

      <li class="pagination__item">
        <a href="#" class="pagination__link pagination__link--arrow"
        v-bind:class="{'pagination__link--disabled': page === pages}"
        v-on:click.prevent="pageUp(page)"
        v-bind:disable="page === pages"
        aria-label="Следующая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    pageUp(page) {
      if (page !== this.pages) {
        this.$emit('update:pageUp', page + 1);
      }
    },
    pageDown(page) {
      if (page !== 1) {
        this.$emit('update:pageDown', page - 1);
      }
    },
  },
};
</script>
