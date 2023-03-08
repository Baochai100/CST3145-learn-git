<template>
  <div id="app">
    <header>
      <div id="course">
        <h1 v-text="siteName"></h1>
        <input
          type="text"
          placeholder="Search Lessons"
          id="searchBox"
          v-model="SearchResultLesson"
          v-on:keyup="SearchActivated"
        />
        <h3>Sort By</h3>
        <div id="sort">
          <p>
            <input
              type="radio"
              id="subject"
              value="Subject"
              v-model="sort.method"
            />
            <label for="subject">Subject</label>
          </p>
          <p>
            <input
              type="radio"
              id="location"
              value="Location"
              v-model="sort.method"
            />
            <label for="location">Location</label>
          </p>
          <p>
            <input
              type="radio"
              id="price"
              value="Price"
              v-model="sort.method"
            />
            <label for="price">Price</label>
          </p>
          <p>
            <input
              type="radio"
              id="availability"
              value="Availability"
              v-model="sort.method"
            />
            <label for="availability">Availability</label>
          </p>
          <p>
            <input
              type="radio"
              id="ascending"
              value="Ascending"
              v-model="sort.order"
            />
            <label for="ascending">Ascending</label>
          </p>
          <p>
            <input
              type="radio"
              id="dscending"
              value="Descending"
              v-model="sort.order"
            />
            <label for="dscending">Descending</label>
          </p>
        </div>

        <div class="cart" v-if="totalItemInTheCart > 0">
          <button v-on:click="showCheckout">
            {{ totalItemInTheCart }}
            <font-awesome-icon icon="fas fa-shopping-cart" />
            Shopping Cart
          </button>
        </div>

        <div class="cart" v-else>
          <button disabled>
            {{ totalItemInTheCart }}
            <font-awesome-icon icon="fas fa-shopping-cart" />
            Shopping Cart
          </button>
          <button v-if="testConsole" @click="toggleShowTestConsole">
            <font-awesome-icon icon="fas fa-text-height" />
            Test Console
          </button>
        </div>
      </div>

      <div v-if="testConsole && showTestConsole">
        <button @click="saveProductToDB">
          <font-awesome-icon icon="fas fa-save" />
          Test Save a Product to the DB
        </button>
        <button @click="deleteAllCashes">
          <font-awesome-icon icon="fas fa-trash" />
          Delete All Caches
        </button>
        <button @click="reloadPage">
          <font-awesome-icon icon="fas fa-sync" />
          Reload Page
        </button>
        <strong>HTTPS Test:</strong>
        <a v-bind:href="serverURL1" target="_blank">link</a>
        <button @click="unregisterAllServiceWorkers">
          <font-awesome-icon icon="fab fa-uniregistry" />
          Unregister All ServiceWorkers
        </button>
      </div>
    </header>

    <main>
      <br />
      <component
        :is="currentView"
        :sortedProducts="sortedProducts"
        :serverURL="serverURL"
        :cart="cart"
        @add-item-tocart="addItemToCart"
        @add-number-to-cart="addItemToCart"
        @take-item-away="changeSpaceValue"
        @remove-from-cart="RemoveCartItem"
        @delete-from-cart="deleteItemFromCart"
      ></component>
    </main>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import Checkout from "./components/Checkout.vue";
//import products from "./assets/json/products.json";

export default {
  name: "App",
  data() {
    return {
      siteName: "After School Club",
      cart: [],
      cartId: [],
      currentView: ProductList,
      testConsole: true,
      showTestConsole: false,
      SearchResultLesson: null,
      sort: {
        method: "Subject",
        order: "Ascending",
      },
      //serverURL: "",
      serverURL:
        "https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/",

      //products: products,
      products: [],
      //serverURL1: "http://localhost:3000/collections/products",
      serverURL1:
        "https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/collections/products",
    };
  },

  components: { ProductList, Checkout },
  created: function () {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
    let course = this;
    fetch(this.serverURL1).then(function (response) {
      response.json().then(function (json) {
        //alert(json);
        //console.log(json);
        course.products = json;
      });
    });
  },
  methods: {
    addItemToCart: function (product) {
      if (product.space > 0) {
        this.cart.push(product);
        this.cartId.push(product.id);
      }
    },

    changeSpaceValue: function (product) {
      if (product.space > 0) {
        product.space -= 1;
      }
    },

    RemoveCartItem(product) {
      for (let i = 0; i < this.cartId.length; i++) {
        if (this.cartId[i] == product.id) {
          this.cartId.splice(i, 1);
          product.space += 1;
          return;
        }
      }
    },
    deleteItemFromCart: function (product) {
      this.cart.pop(product);
    },

    showCheckout() {
      if (this.currentView === ProductList) {
        this.currentView = Checkout;
      } else {
        this.currentView = ProductList;
      }
    },

    toggleShowTestConsole() {
      this.showTestConsole = !this.showTestConsole;
    },
    SearchActivated: function () {
      this.SearchItemsView = true;
      if (this.SearchResultLesson == "" || null) {
        this.SearchItemsView = false;
      } else {
        fetch(
          "https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/collections/products/search/" +
            this.SearchResultLesson
        ).then(function (response) {
          response.json().then(function (json) {
            course.searchResults = json;
          });
        });
      }
    },
    saveProductToDB() {
      const newProduct = {
        _id: "63c7b24b9e028fa31b59dfc5",
        id: 1,
        siteName: "After School Club",
        subject: "Math",
        location: "London",
        price: 100,
        path: "math.png",
        space: 5,
      };
      //set the url to your server and route
      //fetch("http://localhost:3000/collections/products", {
      fetch(
        "https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/collections/products",
        {
          method: "POST", //set the HTTP method as "POST"
          headers: {
            "Content-Type": "application/json", //set the data type as JSON
          },
          body: JSON.stringify(newProduct), //need  the JSON
        }
      ).then(function (response) {
        response.json().then(function (json) {
          alert("Success: " + json.acknowledged);
          console.log("Success: " + json.acknowledged);
          course.products.push(newProduct);
        });
      });
    },

    deleteAllCashes() {
      caches.keys().then(function (names) {
        for (let name of names) {
          caches.delete(name);
        }
      });
      console.log("All Caches Deleted");
    },
    reloadPage() {
      window.location.reload();
    },
    unregisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      console.log("ServiceWorkers Unregistered");
    },
  },
  computed: {
    totalItemInTheCart: function () {
      return this.cart.length || "";
    },
    sortedProducts() {
      let compare;
      if (this.sort.method == "Subject") {
        if (this.sort.order == "Ascending") {
          compare = function (a, b) {
            if (a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
            if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
            return 0;
          };
        }
        if (this.sort.order == "Descending") {
          compare = function (a, b) {
            if (a.subject.toLowerCase() > b.subject.toLowerCase()) return -1;
            if (a.subject.toLowerCase() < b.subject.toLowerCase()) return 1;
            return 0;
          };
        }
      }
      if (this.sort.method == "Location") {
        if (this.sort.order == "Ascending") {
          compare = function (a, b) {
            if (a.location.toLowerCase() > b.location.toLowerCase()) return 1;
            if (a.location.toLowerCase() < b.location.toLowerCase()) return -1;
            return 0;
          };
        }
        if (this.sort.order == "Descending") {
          compare = function (a, b) {
            if (a.location.toLowerCase() > b.location.toLowerCase()) return -1;
            if (a.location.toLowerCase() < b.location.toLowerCase()) return 1;
            return 0;
          };
        }
      }
      if (this.sort.method == "Price") {
        if (this.sort.order == "Ascending") {
          compare = function (a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
          };
        }
        if (this.sort.order == "Descending") {
          compare = function (a, b) {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          };
        }
      } else if (this.sort.method == "Availability") {
        if (this.sort.order == "Ascending") {
          compare = function (a, b) {
            if (a.space > b.space) return 1;
            if (a.space < b.space) return -1;
            return 0;
          };
        }
        if (this.sort.order == "Descending") {
          compare = function (a, b) {
            if (a.space > b.space) return -1;
            if (a.space < b.space) return 1;
            return 0;
          };
        }
      }
      return this.products.sort(compare);
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
