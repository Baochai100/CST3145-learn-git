<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
</script>

<template>
  <div id="app">
    <header>
      <!-- <h1>After School Club</h1> -->
      <!-- <button v-on:click="showCheckout">
        {{ totalItemInTheCart }}
        <font-awesome-icon icon="fas fa-shopping-cart" />
       
        Shopping Cart
      </button>
      <button v-if="testConsole" @click="toggleShowTestConsole">
        <font-awesome-icon icon="fas fa-text-height" />
  
        Test Console
      </button> -->
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
          <button v-on:click="toggleShowProduct">
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

    <!-- <main>
      <TheWelcome />
    </main> -->
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import Checkout from "./components/Checkout.vue";

export default {
  name: "App",
  data() {
    return {
      siteName: "After School Club",
      cart: [],
      currentView: ProductList,
      testConsole: true,
      showTestConsole: false,
      SearchResultLesson: null,
      sort: {
        method: "Subject",
        order: "Ascending",
      },
      //serverURL1: "http://localhost:3000/collections/products",
      serverURL1:
        "https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/collections/products",
    };
  },
  components: { ProductList, Checkout },
  methods: {
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
