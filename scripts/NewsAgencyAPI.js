const API_KEY = "8f940ac94eb04ac6b1b891d7c0977a90";

function loadDataForNavBar() {
    $.get('https://newsapi.org/v2/top-headlines/sources?apiKey=' + API_KEY, function (data, status) {
        renderNavBar(data);
    });
}

function renderSourceNews(sourceId) {
    $.get(`https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${API_KEY}`, function (data, status) {
        renderNewsData(data);
    });
}

function renderForNewsSearching(queryId) {
    $.get(`https://newsapi.org/v2/everything?q=${queryId}&sortBy=publishedAt&apiKey=${API_KEY}`, function (data, status) {
        renderNewsData(data);
    });
}

function renderNavBar(data) {
    const navElement = $(".list-group");
    navElement.html('');
    for (let idx = 0; idx < data.sources.length; idx++) {
        navElement.append(`
            <a href="javascript:void(0)" 
            class="list-group-item list-group-item-action ${idx === 0 ? 'active' : ''}"
            onclick="renderMainNewsWithNavBar('${data.sources[idx].id}', this);">
                ${data.sources[idx].name}
            </a>`
        )
    }
}

function renderMainNewsWithNavBar(sourceId, currentNode) {
    const aElement = $(".list-group-item");
    aElement.removeClass("active");
    $(currentNode).addClass("active");
    renderSourceNews(sourceId);
}

function renderNewsData(data) {
    const cardElement = $("#main-row");
    cardElement.html('');

    for (let idx = 0; idx < data.articles.length; idx++) {
        const publishPieces = data.articles[idx].publishedAt.split('T');
        if (data.articles[idx].content !== '[Removed]') {
            cardElement.append(`
            <div class="col-12 col-md-3 col-sm-6">
                    <div class="card">
                        <img src="${data.articles[idx].urlToImage}"
                             class="card-img-top" alt="pic1">
                        <div class="card-body">
                            <h5 class="card-title">${data.articles[idx].title}</h5>
                            <p class="card-text">${data.articles[idx].description}</p>
                            <small class="publishPieces01">${publishPieces[0]}</small>
                            <small class="publishPieces02">${publishPieces[1].slice(0, 8)}</small>
                            <a href="${data.articles[idx].url}" class="btn btn-primary">Go to the site</a>
                        </div>
                    </div>
                </div>
        `);
        }
    }
    return cardElement;
}

function searchForNewsController(event) {
    event.preventDefault();
    const query = $('#search-input').val().trim();

    if (query === '') {
        console.log('Search input is empty.');
    } else {
        console.log('Search query:', query);
    }

    renderForNewsSearching(query);
}

// main();
loadDataForNavBar();
renderSourceNews('abc-news');


// function shortenText(text, wordLimit) {
//     const words = text.trim().split(' ');
//     if (words.length > wordLimit) {
//         return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return text;
// }
//
// function wrapIntoTwoLines(text){
//     let textArr = text.split('T');
//     for (let char of textArr) {
//         return char;
//     }
// }

