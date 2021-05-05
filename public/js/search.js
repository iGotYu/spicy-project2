const searchFormHandler = async (event) => {
  event.preventDefault();
  const searchName = document.getElementById("search").value;

  if (searchName) {
    const response = await fetch("search/:name", {
      method: "GET",
    });
    if (response.ok) {
      document.location.replace("/displaysearchcard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".search-form")
  .addEventListener("submit", searchFormHandler);

saveFunction =>  {
    document.getElementById("saveCard")
  }
  //save fetch data into table
