<template>
  <div>
    <h1>Welcome to the product list page</h1>

    <div v-for="product in sortedProducts" class="container">
      <img v-bind:src="serverURL + product.path" />
      <p>Subject: {{ product.subject }}</p>
      <p>Location: {{ product.location }}</p>
      <p>Price: {{ product.price }}</p>
      <p>Space: {{ product.space }}</p>
      <button v-on:click="clickFunction(product)" v-if="canAddToCart(product)">
        <span class="fas fa-cart-plus"></span> Add to the Cart
      </button>

      <button v-else disabled>Add to the Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["sortedProducts", "serverURL", "cart"],
  data() {
    return {};
  },
  methods: {
    canAddToCart(product) {
      return product.space > 0;
    },
    addItemToCart: function (product) {
      if (product.space > 0) {
        this.$emit("add-item-to-cart", product);
        this.$emit("add-number-to-cart", product);
        //this.cartId.push(product.id);
      }
    },

    changeSpaceValue: function (product) {
      if (product.space > 0) {
        this.$emit("take-item-away", product);
        //product.space -= 1;
      }
    },

    clickFunction: function (product) {
      this.addItemToCart(product);
      this.changeSpaceValue(product);
    },
  },
};
</script>
