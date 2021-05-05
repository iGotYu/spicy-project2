const searchFormHandler = async (event) => {
  event.preventDefault();
  const searchName = document.querySelector("#search").value;
  console.log(searchName);
  location.assign(`/search/${searchName}`);
};

document
  .querySelector(".search-form")
  .addEventListener("submit", searchFormHandler);

saveFunction =>  {
    document.getElementById("saveCard")
  }
  //save fetch data into table
