var dataURL = "https://randomuser.me/api/?results=53";
var userData = [];

let currentPage = 1;
let rows = 10;

async function DisplayPage(rowsPerPage, page) {
    await getData();

    const userElement = document.querySelector('.contact-list');
    var wrapper = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let displayedUsers = userData.slice(start, end);

    
    const headerElement = document.querySelector('.page-header');
    var header = "";
    header += `<h2>Contacts</h2>`;
    header += `<h3>Total: ${userData.length}</h3>`;

    headerElement.innerHTML = header;

    console.log(userData);

    for (let i = 0; i < displayedUsers.length; i++) {
        let user = displayedUsers[i];

        wrapper += `<li class="contact-item cf">`;
        wrapper += `<div class="contact-details">`;
        wrapper += `<img class="avatar" src="${user.picture.thumbnail}">`;
        wrapper += `<h3>${user.name.first} ${user.name.last}</h3>`;
        wrapper += `<span class="email">${user.email}</span>`;
        wrapper += `</div>`;
        wrapper += `<div class="joined-details">`;
        wrapper += `<span class="date">${user.registered.date.substring(0, 10)}</span>`;
        wrapper += `</div>`;
        wrapper += `</li>`;
    }

    userElement.innerHTML = wrapper;

}

async function getData() {
    const response = await fetch(dataURL);
    const data = await response.json();
    userData = data.results;
}

async function Pagination(rowsPerPage) {
    await getData();
    const paginationElement = document.querySelector('.pagination');
    var wrapper = "";
    wrapper += "<ul>";

    let pageCount = Math.ceil(userData.length / rowsPerPage);
    for(let i = 1; i <= pageCount; i++){
        wrapper += `<li><a onclick="DisplayPage(${rowsPerPage}, ${i})">${i}</a></li>`;
    }
    wrapper += "</ul>";
    paginationElement.innerHTML = wrapper;
}

DisplayPage(rows, currentPage);
Pagination(rows);
