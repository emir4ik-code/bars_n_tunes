// const fetchYoutube = () => {
//     fetch('https://www.googleapis.com/youtube/v3/search?part=snippet')
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

// fetchYoutube();

// function searchByKeyword() {
//     var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});
//     for(var i in results.items) {
//       var item = results.items[i];
//       Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
//     }
//   }

//   searchByKeyword();
const videoDiv = document.getElementById('videoDiv')

async function searchVideo(queryString) {
await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${queryString}&key=AIzaSyDKkscNB4MiuQyoQ7AO4CNLS6KpSaM8EVo` )
.then(response => response.json())
.then(data => {
const videoLink = `https://www.youtube.com/embed/${data.items[0].id.videoId}`
console.log(videoLink)
const videoEmbed = document.createElement('iframe')
videoEmbed.src =  videoLink;
videoEmbed.width = 300;
videoEmbed.height = 200;
videoDiv.appendChild(videoEmbed);
})
}

