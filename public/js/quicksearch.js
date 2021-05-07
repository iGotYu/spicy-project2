//this script will listen for submissions from the quick search bar, and change the url to the search term to call the GET route
document.querySelector("#quickSearch").addEventListener("submit", event=> {
event.preventDefault();
const searchName = document.querySelector("input[type=search]").value;
document.location.replace(`/search/${searchName}`);
});