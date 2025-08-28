const creatureNameID = "https://rpg-creature-api.freecodecamp.rocks/api/creature/{name-or-id}";


const searchbtn = document.getElementById("search-button");
const input = document.getElementById("search-input");

//stats to be replaced//
const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

searchbtn.addEventListener("click", () => {
    const userInput = input.value.trim(); // normalize input

    const url = creatureNameID.replace("{name-or-id}", userInput);
    fetchData(url);
} );

const fetchData = async (url) => {
    try{
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) throw new Error("Not found"); // handle API error
    
        nameEl.textContent = data.name.toUpperCase(); 
        idEl.textContent = `#${data.id}`;
        weightEl.textContent = `Weight: ${data.weight}`;
        heightEl.textContent = `Height: ${data.height}`;

        hpEl.textContent = data.stats.find(stat => stat.name === "hp").base_stat;
        attackEl.textContent = data.stats.find(stat => stat.name === "attack").base_stat;
        defenseEl.textContent = data.stats.find(stat => stat.name === "defense").base_stat;
        specialAttackEl.textContent = data.stats.find(stat => stat.name === "special-attack").base_stat;
        specialDefenseEl.textContent = data.stats.find(stat => stat.name === "special-defense").base_stat;
        speedEl.textContent = data.stats.find(stat => stat.name === "speed").base_stat;

        //using different one for types because some creatures have multiple types//
        typesEl.textContent = "";
        data.types.forEach(typeObj => {
            const typeDiv = document.createElement("div");
            typeDiv.textContent = typeObj.name.toUpperCase();
            typesEl.appendChild(typeDiv);
        })
     } catch (err) {
        alert("Creature not found");
        console.error(err);
    }


};



