const searchFormHandler = async (event) => {
  event.preventDefault();
  const searchName = document.querySelector("#search").value;
  const searchType = document.querySelector("#cardSubType").value;
  // console.log(searchName);
  // console.log(searchType);
 location.assign(`/search/${searchName}/${searchType}`);
};

document
  .querySelector(".search-form")
  .addEventListener("submit", searchFormHandler);

saveFunction =>  {
    document.getElementById("saveCard")
  }
  //save fetch data into table
