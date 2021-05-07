//this script will get called on the graph page to render the users sale data
let myChart = document.getElementById("myChart").getContext("2d");
let cardValue = document.getElementById("selChart");

//listen for changes on the dropdown menu and then generate a chart
cardValue.addEventListener("change", (event) => {
  event.preventDefault();

  //fetch the user data we need from the api/chart route
  fetch("/api/chart", {
    method: "GET",
  })
  //parse the data so we can get just the information we need
    .then((res) => res.json())
    .then((data) => {
      data1 = data.yourSales;
      data2 = data.yourDates;
      //remove any null values for cards that have not been sold yet
      let useSales = data1.filter(function(val){
        return val !== null;});
      
      let newdates = data2.map((date) => formatforgraph(date));
      let useDates = newdates.filter(function (val) {
        return val !== null;
      });

      //create the chart with users data
      let pokemonChart = new Chart(myChart, {
        type: "line",
        data: {
          labels: useDates,
          datasets: [
            {
              label: "Collection Profit",
              data: useSales,
              backgroundColor: "#27a8c2",
              borderColor: "#f3d607",
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

//format the dates of each pokemon sale to be more legible
function formatforgraph(date) {
  if (date) {
    let formattedate = "";
    let thedates = date.split("-");
    let theday = thedates[2].split("T");
    formattedate += thedates[0] + "-" + thedates[1] + "-" + theday[0];
    return formattedate;
  } else {
    return date;
  }
}