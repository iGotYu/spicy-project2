let myChart = document.getElementById("myChart").getContext("2d");
let cardValue = document.getElementById("selChart");

let data1 = [];
let data2 = [];
cardValue.addEventListener("change", (event) => {
  event.preventDefault();

  fetch("/api/chart", {
    method: "GET",
  }).then((res)=>res.json()).then((data) => {
   // console.log(data);
   data1 =data.yourSales;
   data2 = data.yourDates;
   //console.log(data2);
   let newdates = data2.map(date => formatforgraph(date));
   //console.log(data1);
   //console.log(newdates);
   //const newtimes = data2.map(date=> format_for_graph(date));
   let pokemonChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: newdates,
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "Aug",
      //   "Sept",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ],
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


  });
});


function formatforgraph (date) {
  if(date){
  let formattedate = "";
  let thedates = date.split("-");
  let theday = thedates[2].split('T');
  formattedate += thedates[0] + '-' + thedates[1] + '-' + theday[0];
   return formattedate;
  }
  else {
    return date;
  }
};