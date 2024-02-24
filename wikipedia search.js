let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultEl.appendChild(resultItemEl);
    // 2.anchor Title--result-title
    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.target = "_blank";
    titleElement.textContent = title;
    titleElement.classList.add("result-title");
    resultItemEl.appendChild(titleElement);

    //3.title-break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //4.anchor url ---result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //5.line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //6.paragraph-description----line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}




function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}


searchInputEl.addEventListener("keydown", searchWikipedia);