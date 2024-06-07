window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const superheroId = urlParams.get('id');
    if (superheroId) {
        getSuperheroDetails(superheroId);
    }
}

async function getSuperheroDetails(superheroId) {
    const apiKey = "481f213d9b914944b0a814c11aa33bd6";
    const url = `https://www.superheroapi.com/api.php/${apiKey}/${superheroId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const superheroData = await response.json();
        displaySuperheroDetails(superheroData);
    } catch (error) {
        console.error(`Error fetching superhero details for ID ${superheroId}: `, error);
        alert(`Error fetching superhero details: ${error.message}`);
    }
}

function displaySuperheroDetails(superheroData) {
    document.getElementById("superheroName").innerText = superheroData.name;
    document.getElementById("intelligence").innerText = superheroData.powerstats.intelligence;
    document.getElementById("strength").innerText = superheroData.powerstats.strength;
    document.getElementById("speed").innerText = superheroData.powerstats.speed;
    document.getElementById("durability").innerText = superheroData.powerstats.durability;
    document.getElementById("power").innerText = superheroData.powerstats.power;
    document.getElementById("combat").innerText = superheroData.powerstats.combat;
    document.getElementById("fullName").innerText = superheroData.biography["full-name"];
    document.getElementById("aliases").innerText = superheroData.biography.aliases.join(", ");
    document.getElementById("placeOfBirth").innerText = superheroData.biography["place-of-birth"];
    document.getElementById("firstAppearance").innerText = superheroData.biography["first-appearance"];
    document.getElementById("occupation").innerText = superheroData.work.occupation;
    document.getElementById("base").innerText = superheroData.work.base;
    document.getElementById("groupAffiliation").innerText = superheroData.connections["group-affiliation"];
    document.getElementById("relatives").innerText = superheroData.connections.relatives;

    document.getElementById("backButton").addEventListener("click", function() {
        goBack();
    });
}

function goBack() {
    window.history.back();
}
