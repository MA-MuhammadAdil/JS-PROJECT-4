 



let accesKey = "q4XUiUMHddiptgzxBkGXTI6Bb_jQRqhTVRoQFIcXggU";

let formElement = document.querySelector("form");
let inpElement = document.querySelector("#search-inp");
let searchResult = document.querySelector(".search-results");
let showmore = document.querySelector("#show-more-btn");

let inpData = "";
let page = 1;

async function searchimage() {
    inpData = inpElement.value;

    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${inpData}&client_id=${accesKey}`;
    let response = await fetch(url);
    let data = await response.json();

    let results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        let imageWapper = document.createElement('div');
        imageWapper.classList.add("search-result");

        let img = document.createElement('img');
        img.src = result.urls.small;  
        img.alt = result.alt_description;

        let imgLink = document.createElement('a');
        imgLink.href = result.links.html;   
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imageWapper.appendChild(img);
        imageWapper.appendChild(imgLink);
        searchResult.appendChild(imageWapper); 
    });

    page++;

    if (page > 1) {
        showmore.style.display = "block";   
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchimage();
});

showmore.addEventListener("click", () => {
    searchimage();
});
