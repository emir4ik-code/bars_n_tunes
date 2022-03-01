window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchVal = document.getElementById('search-val').value
     searchButton.addEventListener('click', ()=> console.log(document.getElementById('search-val').value))
})