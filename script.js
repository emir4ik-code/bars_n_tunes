console.log("DOM content loaded is not working")
window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchVal = document.getElementById('search-val');
    const artistName = document.getElementById('artist-name');
    const songName = document.getElementById('song-name');
    const lyrics = document.getElementById('lyrics');
    const albumPic = document.getElementById('albumPic');
    const showVidButton = document.getElementById('showVideo')
    searchButton.addEventListener('click', ()=> {
        //showVidButton.addEventListener('click', () => 
        searchVideo(searchVal.value)
        //)
        console.log("Im here")
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
            artistName.innerText = data.response.hits[0].result.artist_names;
            songName.innerText = data.response.hits[0].result.title;
            albumPic.src = data.response.hits[0].result.header_image_thumbnail_url;
            console.log(data) //.response.hits[0].result
            let songID = data.response.hits[0].result.id;
            lyrics.innerHTML = `
            <button class = "btn btn-primary" id = "showLyrics">Show lyrics Don't Click unless needed lol</button>
            `
            // let showLyrics = document.getElementById("showLyrics");
            //showLyrics.addEventListener('click', () => {
                lyrics.innerHTML = `
                <div class ="d-flex justify-content-center">
                <div class="spinner-grow text-warning mt-5" style="width: 3rem; height: 3rem;"></div>
                </div>
                `
                fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songID}/lyrics`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
                        "x-rapidapi-key": "2a9aae5c1amsha9e13aee0976f6fp1f0b0ejsnc0f3c37e3f27"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    lyrics.innerHTML = data.response.lyrics.lyrics.body.html;
                }); 
           // })
        })
     })
})