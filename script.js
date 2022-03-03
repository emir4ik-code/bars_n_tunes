window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchVal = document.getElementById('search-val');
    const artistName = document.getElementById('artist-name');
    const songName = document.getElementById('song-name');
    const lyrics = document.getElementById('lyrics');
    searchButton.addEventListener('click', ()=> {
        let songURL = `https://genius.p.rapidapi.com`
    fetch(`${songURL}/search?q=${searchVal.value}`, {
        "method": "GET",
        "headers": {
                "x-rapidapi-host": "genius.p.rapidapi.com",
                "x-rapidapi-key": "0ec80dfd79msh7c35ec95a8e90d2p1b759bjsnd562ff3fa42c"
            }
        })
        .then(res => res.json())
        .then(data => {
            artistName.appendChild(document.createTextNode(data.response.hits[0].result.artist_names))
            songName.appendChild(document.createTextNode(data.response.hits[0].result.title))
            console.log(data) //.response.hits[0].result
            let songID = data.response.hits[0].result.id;
            let showLyrics = document.createElement("button");
            showLyrics.setAttribute('class', 'btn btn-primary');
            showLyrics.innerText = "Show Lyrics Don't Click unless needed lol";
            lyrics.appendChild(showLyrics);
            showLyrics.addEventListener('click', () => {
                fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songID}/lyrics`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
                        "x-rapidapi-key": "2a9aae5c1amsha9e13aee0976f6fp1f0b0ejsnc0f3c37e3f27"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    lyrics.innerHTML = data.response.lyrics.lyrics.body.html;
                }); 
            })
        })
     })
})