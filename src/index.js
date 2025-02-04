
const container = document.querySelector(".cards")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

data.map((pokemon) => {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `
        <h2 class="card--title">${capitalizeFirstLetter(pokemon.name)}</h2>
        <img width="256" class="card--img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    `;

    const stats = document.createElement("ul");
    stats.classList.add("card--stats");
    const statTypes = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    statTypes.map((type) => {
        const stat = document.createElement("li");
        stat.innerHTML = `
            <span>${type.toUpperCase()}:</span>
            <span>${pokemon.stats.find((s) => s.stat.name === type).base_stat}</span>
        `;
        stats.appendChild(stat);
    });
    
    card.appendChild(stats);

    container.appendChild(card);
});