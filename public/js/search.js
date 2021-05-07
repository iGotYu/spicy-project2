//this script will be used on the advanced search page, take the data from the form and place it in the url to call the appropriate get route
const searchFormHandler = async (event) => {
  event.preventDefault();
  const searchName = document.querySelector("#search").value;
  const searchType = document.querySelector("#cardSubType").value;
 location.assign(`/search/${searchName}/${searchType}`);
};

document
  .querySelector(".search-form")
  .addEventListener("submit", searchFormHandler);

saveFunction =>  {
    document.getElementById("saveCard")
  }