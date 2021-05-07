let myChart = document.getElementById("myChart").getContext("2d");
let cardValue = document.getElementById("selChart");

cardValue.addEventListener("change", (event) => {
  event.preventDefault();

  fetch("/chart", {
    method: "GET",
  }).then((res) => {
    console.log(res);
    if (res) {
      console.log(res.body);
    } else {
      alert("Save failed!");
    }
  });
});

let grade = document.getElementById("grades");
let sale = document.getElementById("sales");
let date = document.getElementById("dates");
console.log(grade)
console.log(sale)
console.log(date)

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
      },
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
