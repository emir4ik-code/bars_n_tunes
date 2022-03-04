window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchVal = document.getElementById('search-val');
    const artistName = document.getElementById('artist-name');
    const songName = document.getElementById('song-name');
    const lyrics = document.getElementById('lyrics');
    const albumPic = document.getElementById('albumPic');
    let meaning = document.getElementById('meaning')
    let partOfSpeech = document.getElementById('partOfSpeech')
    let example = document.getElementById('example')
    let theWord = document.getElementById('word')
    searchButton.addEventListener('click', ()=> {

        searchVideo(searchVal.value);
        
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
            let songID = data.response.hits[0].result.id;
            
            //put button here for lyrics if needed 
                
                fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songID}/lyrics`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
                        "x-rapidapi-key": "2a9aae5c1amsha9e13aee0976f6fp1f0b0ejsnc0f3c37e3f27"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.meta.status === 200) {
                        lyrics.innerHTML = data.response.lyrics.lyrics.body.html;

                        var string = document.getElementsByTagName('p')[0].innerHTML;
                        var strippedHtml = string.replace(/<(?!br\s*\/?)[^>]+>/g, '')
                        let lastSTR = strippedHtml.split("<br>").join("3");

                        let lastSTR2 = lastSTR.split("33").join("3");
                        
                        let lastSTR3 = lastSTR2.split("3").join(" 3 ");
                    

                        let punctuationless = lastSTR3.replace(/[.,\/#!$%\^?&\*;:{}=\-_`~]+/g,"");
                        var finalString = punctuationless.replace(/\s{2,}/g," ");
                        //let finalString2 = finalString.replace(/[\[\]']+/g,'')
                        ////let bigArr = qu.split(' 3 ')

                        let text3 = finalString.split(" "); 
                        let result3 = "";
                        text3.forEach(function(char){
                            // Append a new span only if the current char is not a space
                            //if(char !== '3'){
                                result3 += (char.trim() === "") ? "" : "<span class=\"text\">" + char + "</span> ";
                            //}
                        }); 

                        // let h1 = document.getElementById("h1ex")
                        //h1.innerHTML = `${finalString2}`
                        let text4 = result3.split("<span class=\"text\">3</span>"); 
                        let result4 = "";
                        text4.forEach(function(char){
                            // Append a new span only if the current char is not a space
                            result4 += (char.trim() === "") ? "" : "<p>" + char + "</p><br>";
                        }); 
                        //final adding of lyrics
                        lyrics.innerHTML = result4;

                        let elementsList = document.getElementsByClassName("text");

                        for (let item of elementsList) {
                            item.addEventListener("click", function() {
                                //this function does stuff
                                console.log(item.innerText)
                                let word = item.innerText
                                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                                .then(res => res.json())
                                .then(data => {
                                    const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
                                    first.toLocaleUpperCase(locale) + rest.join('')
                                    theWord.innerText = capitalizeFirstLetter(`${data[0].word}`)
                                    partOfSpeech.innerText = data[0].meanings[0].partOfSpeech
                                    meaning.innerText = data[0].meanings[0].definitions[0].definition
                                    if(data[0].meanings[0].definitions[0].example !== undefined){
                                        example.innerText = `Example: ${data[0].meanings[0].definitions[0].example}`
                                    } else {
                                        example.innerText = "Example: Unavailable"
                                    }
                                })
                                .catch(err => console.log(err))
                            });
                        };
                    } else if (data.meta.status === 404) {
                        lyrics.innerHTML = `
                        <h6>Coudn't find lyrics for this song.</h6>
                        `
                    }
                }); 
        })
     })
})