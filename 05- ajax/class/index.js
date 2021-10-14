const display = document.querySelector('.display')
const searchBar = document.querySelector('.search-bar')
const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', () => {
    fetchPokemon(searchBar.value)
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fetchPokemon(searchBar.value)
})

const fetchPokemon = async (pokemon) => {
    try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    const d = res.data
    const [n, h, w, i, t] = [d.name, d.height, d.weight, d.sprites.front_default, d.types[0].type.name]
    // display.append(h.textContent, w.textContent, i)
    display.append( 
    createElement(n, 'div', d),
    createElement(h, 'div', d),
    createElement(w, 'div', d),
    createElement(t, 'div'),
    createElement(i, 'img', d))
    } catch (error) {
    display.textContent = '' // In case of a pokemon already appearing on the page, this deletes it from display
    console.log(error);
    alert('Wrong pokemon name/number \nTry again');
    }
}
// fetchPokemon('charizard')
function createElement (pokemonData, typeOfElement, apiData) {
    let property
    for (const key in apiData) {
        if (apiData[key] === pokemonData) property = key[0].toUpperCase() + key.slice(1)
    }
    if (!property) property = 'Types'
    display.textContent = ''
    const element = document.createElement(typeOfElement)
    if (typeOfElement === 'img') {
        element.src = pokemonData
    } else {
        element.textContent = `${property}: ${pokemonData}`
    }
    return element
}