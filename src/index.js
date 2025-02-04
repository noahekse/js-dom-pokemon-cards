
const container = document.querySelector(".cards")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

data.map((pokemon) => {
    const card = document.createElement("li");
    card.classList.add("card");

    let clickCount = 0;
    let spriteLinks = [];
    if (pokemon.sprites.front_default) {
        spriteLinks.push(pokemon.sprites.front_default);
    }
    spriteLinks = spriteLinks.concat(Object.values(pokemon.sprites).filter(link => typeof link === 'string' && link.startsWith('http') && link !== pokemon.sprites.front_default));
    
    card.innerHTML = `
    <h2 class="card--title">${capitalizeFirstLetter(pokemon.name)}</h2>
    <img width="256" class="card--img" src="${spriteLinks[0]}" alt="${pokemon.name}" />
`;

    const imgElement = card.querySelector(".card--img");

    card.addEventListener("click", () => {
        clickCount = (clickCount + 1) % spriteLinks.length;
        imgElement.src = spriteLinks[clickCount];
    });


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


    const generations = Object.keys(pokemon.game_indices.reduce((acc, game) => {
        const generation = game.version.name.split('-')[0];
        acc[generation] = true;
        return acc;
    }, {})).join(', ');

    const generationsHeader = document.createElement("h4");
    generationsHeader.textContent = "Generations:";
    const generationsSpan = document.createElement("span");
    generationsSpan.classList.add("card--generations");
    generationsSpan.textContent = generations;

    const generationsDiv = document.createElement("div");
    generationsDiv.classList.add("card--generations-container");
    generationsDiv.appendChild(generationsSpan);

    card.appendChild(generationsHeader)
    card.appendChild(generationsDiv);
    

    container.appendChild(card);
});