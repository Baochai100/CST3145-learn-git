<template>
  <div>
    <h1>Welcome to the checkout page</h1>
    <div class="checkoutContainer">
      <div
        v-for="item in sortedProducts"
        v-if="cartId.includes(item.id)"
        class="container"
      >
        <img v-bind:src="serverURL + item.path" />
        <p>Subject: {{ item.subject }}</p>
        <p>Location: {{ item.location }}</p>
        <p>Price: {{ item.price }}</p>
        <p>Space: {{ CartedItemSpacesCount(item.id) }}</p>
        <!-- <button v-on:click="deleteItemFromCart(item),addSpaceValue(item)">Remove</button> -->
        <button v-on:click="removeItem(item)">Remove</button>
      </div>

      <div class="information">
        <h2>Enter Your Information</h2>

        <form id="form" action="/" method="GET" onkeyup="checkInput()">
          <div>
            <label for="name">Name</label>
            <input
              v-model.trim="order.name"
              id="nameLetter"
              name="name"
              type="text"
              required
              onkeyup="lettersOnly(this)"
            />
          </div>
          <div>
            <label for="phone">Phone</label>
            <input
              v-model.number="order.phoneNumber"
              id="phone"
              name="phone"
              type="number"
              required
              onkeyup="numbersOnly(this)"
            />
          </div>
          <!-- <button id="checkOut" type="button" v-on:click="submitOrder && updateProducts">Check Out</button> -->
          <button id="checkOut" type="button" v-on:click="submitOrder">
            Check Out
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Checkout",
  props: ["sortedProducts", "serverURL", "cart"],
  data() {
    return {
      cartId: this.cart.map((item) => item.id),
      order: {
        name: " ",
        phoneNumber: " ",
      },
    };
  },

  methods: {
    CartedItemSpacesCount(id) {
      let count = 0;
      for (let i = 0; i < this.cartId.length; i++) {
        if (this.cartId[i] === id) {
          count++;
        }
      }
      return count;
    },
    RemoveCartItem: function (product) {
      this.$emit("remove-from-cart", product);
    },
    deleteItemFromCart: function (product) {
      this.$emit("delete-from-cart", product);
    },
    removeItem: function (item) {
      const index = this.cart.findIndex((product) => product.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.cartId = this.cart.map((item) => item.id);
      }
      this.$emit("remove-from-cart", item);
    },
    submitOrder() {
      const newOrder = {
        name: course.order.name,
        phone: course.order.phoneNumber,
        lessonId: course.cart.map((item) => item._id),
        // "lessonId":this.cartId[i],
        space: course.cart.map((item) => 5 - item.space),
      };
      fetch(
        "https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/collections/orders",
        {
          method: "POST", //set the HTTP method as "POST"
          headers: {
            "Content-Type": "application/json", //set the data type as JSON
          },
          body: JSON.stringify(newOrder), //need  the JSON
        }
      ).then(function (response) {
        response.json().then(function (json) {
          alert("Success: " + json.acknowledged);
          console.log("Success: " + json.acknowledged);
          course.orders.push(newOrder);
        });
      });

      const convertIntToHexString = (num) => {
        let hexString = num.toString(16);
        while (hexString.length < 24) {
          hexString = "0" + hexString;
        }
        return hexString;
      };

      for (let i = 0; i < course.cart.length; i++) {
        const productsUpdate = {
          lessonId: convertIntToHexString(course.cart[i]._id),
          space: course.cart[i].space,
        };
        fetch(
          `https://lesson-env.eba-dn8ginxr.eu-west-2.elasticbeanstalk.com/collections/products/${productsUpdate.lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productsUpdate),
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(
              "Successfully updated document with lessonId:",
              lessonId
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }

      alert(
        "Order submitted and user account has been registered, Successfully!"
      );
    },
  },
};
</script>
