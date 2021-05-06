// const Connecter = require("../../models/Connecter");


// let grades = Connecter.findAll({
//   attributes: { include: ['grade'] }
// });
// console.log(grades)

// let sales = Connecter.findAll({
//   attributes: { include: ['sale'] }
// });
// console.log(sales)

let myChart = document.getElementById("myChart").getContext("2d");
let cardValue = document.getElementById("cardValue");

let data1 = [];
let data2 = [];

let pokemonChart = new Chart(myChart, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
      label: "Collection Profit",
      data: data1,
      backgroundColor: "pink",
      borderColor: "yellow",
    },
    {
      label: "Collection Value",
      data: data2,
      backgroundColor: "salmon",
      borderColor: "aqua",
    }
  ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Pokedex Collection Chart",
      },
    },
    layout: {
      padding: 40,
    },
  },
});