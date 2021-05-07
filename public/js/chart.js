let myChart = document.getElementById("myChart").getContext("2d");
let cardValue = document.getElementById("selChart");

cardValue.addEventListener("change", (event) => {
  event.preventDefault();

  fetch("/api/chart", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      data1 = data.yourSales;
      data2 = data.yourDates;

      let useSales = data1.filter(function(val){
        return val !== null;});

      let newdates = data2.map((date) => formatforgraph(date));
      let useDates = newdates.filter(function (val) {
        return val !== null;
      });
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