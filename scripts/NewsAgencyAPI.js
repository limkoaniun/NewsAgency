const API_KEY = '8f940ac94eb04ac6b1b891d7c0977a90';

function loadDataForNavBar() {
    $.get('https://newsapi.org/v2/top-headlines/sources?apiKey=' + API_KEY, function (data, status) {
        renderNavBar(data);
    });
}

loadDataForNavBar();


function renderNavBar(data) {
    const navElement = $(".list-group");
    navElement.html('');
    for (let idx = 0; idx < data.sources.length; idx++) {
        navElement.append(`
            <a href="javascript:void(0)" class="list-group-item list-group-item-action ${idx === 0 ? 'active' : ''}"
            data-idx="${idx}"
            onclick="renderMainNewsWithNavBar('${data.sources[idx].url}',${idx})">
                ${data.sources[idx].name}
            </a>
        `
        )
    }
}

function renderMainNewsWithNavBar(url,currIdx) {
    const cardMainElement = $("main");
    cardMainElement.html(url);
    const aElement = $(".list-group-item");
    aElement.removeClass("active");
    $(`.list-group-item[data-idx="${currIdx}"]`).addClass("active");
}
