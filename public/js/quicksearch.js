document.querySelector("#quickSearch").addEventListener("submit", event=> {
event.preventDefault();
const searchName = document.querySelector("input[type=search]").value;
document.location.replace(`/search/${searchName}`);
});