let currentPage = 1;
const superheroesPerPage = 10;

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
        currentPage = parseInt(pageParam);
    }
    
    await showSuperheroes();
}

async function showSuperheroes() {
    const domElement = document.getElementById("superhero-info");
    let htmlFragments = '';

    const startIndex = (currentPage - 1) * superheroesPerPage + 1;
    const endIndex = startIndex + superheroesPerPage - 1;

    const requests = [];
    for (let i = startIndex; i <= endIndex; i++) {
        requests.push(getSuperheroData(i));
    }

    const results = await Promise.all(requests);
    results.forEach(superheroData => {
        if (superheroData) {
            const html = `
                <div class="superhero-info-item">
                    <h2>${superheroData.name}</h2>
                    <button class="superhero-image-btn" onclick="showSuperheroDetails(${superheroData.id})">
                        <img src="${superheroData.image.url}" alt="${superheroData.name}">
                    </button>
                </div>
            `;
            htmlFragments += html;
        }
    });

    domElement.innerHTML = htmlFragments;

    const currentPageElement = document.getElementById("current-page");
    currentPageElement.textContent = `Page ${currentPage}`;

    updateURL();
}

async function showPrevious() {
    if (currentPage > 1) {
        currentPage--;
        await showSuperheroes();
    }
}

async function showNext() {
    currentPage++;
    await showSuperheroes();
}

async function getSuperheroData(characterId) {
    const apiKey = "481f213d9b914944b0a814c11aa33bd6";
    const url = `https://www.superheroapi.com/api.php/${apiKey}/${characterId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const superheroData = await response.json();
        return superheroData;
    } catch (error) {
        console.error(`Error fetching superhero data for ID ${characterId}: `, error);
        alert(`Error fetching superhero data: ${error.message}`);
        return null;
    }
}

function showSuperheroDetails(superheroId) {
    window.location.href = `/HTML/details.html?id=${superheroId}`;
}

function goToHome() {
    window.location.href = "/HTML";
}

function updateURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage);
    window.history.pushState({ path: url.href }, '', url.href);
}

init();
