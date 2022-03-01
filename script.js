window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchVal = document.getElementById('search-val');
    const artistName = document.getElementById('artist-name');
    const songName = document.getElementById('song-name');
    const lyrics = document.getElementById('lyrics');
     searchButton.addEventListener('click', ()=> {
        fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${searchVal.value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
                "x-rapidapi-key": "2a9aae5c1amsha9e13aee0976f6fp1f0b0ejsnc0f3c37e3f27"
            }
        })
        .then(res => res.json())
        .then(data => {
            artistName.appendChild(document.createTextNode(data.response.hits[0].result.artist_names))
            songName.appendChild(document.createTextNode(data.response.hits[0].result.title))
            console.log(data.response.hits[0].result)
            //
        })
     })
})