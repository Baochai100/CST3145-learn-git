let products = [
  {
    id: 1,
    siteName: "After School Club",
    subject: "Math",
    location: "London",
    price: 100,
    path: "math.png",
    space: 5,
  },
  {
    id: 2,
    siteName: "After School Club",
    subject: "Math",
    location: "Oxford",
    price: "100",
    path: "math.png",
    space: 5,
  },
  {
    id: 3,
    siteName: "After School Club",
    subject: "Chinese",
    location: "London",
    price: "100",
    path: "chinese.png",
    space: 5,
  },
  {
    id: 4,
    siteName: "After School Club",
    subject: "English",
    location: "London",
    price: 200,
    path: "english.png",
    space: 5,
  },
  {
    id: 5,
    siteName: "After School Club",
    subject: "English",
    location: "London",
    price: 100,
    path: "english.png",
    space: 5,
  },
  {
    id: 6,
    siteName: "After School Club",
    subject: "Piano",
    location: "London",
    price: 100,
    path: "piano.png",
    space: 5,
  },
  {
    id: 7,
    siteName: "After School Club",
    subject: "Music",
    location: "London",
    price: 100,
    path: "music.png",
    space: 5,
  },

  {
    id: 8,
    siteName: "After School Club",
    subject: "Chinese",
    location: "Brighton",
    price: 100,
    path: "chinese.png",
    space: 5,
  },
  {
    id: 9,
    siteName: "After School Club",
    subject: "Piano",
    location: "Brighton",
    price: 80,
    path: "piano.png",
    space: 5,
  },
  {
    id: 10,
    siteName: "After School Club",
    subject: "Music",
    location: "London",
    price: 30,
    path: "music.png",
    space: 5,
  },
];

function lettersOnly(input) {
  var letter = /[^a-z]/gi;
  input.value = input.value.replace(letter, "");
}

function numbersOnly(input) {
  var number = /[^0-9]/gi;
  input.value = input.value.replace(number, "");
}

function checkInput() {
  const inputName = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  if ((inputName && phone) === "") {
    document.getElementById("checkOut").disabled = true;
  } else {
    document.getElementById("checkOut").disabled = false;
  }
}
