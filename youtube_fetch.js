const videoDiv = document.getElementById('videoDiv')

async function searchVideo(queryString) {
await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${queryString}&key=AIzaSyBsc6n71jOPosg0OQf_Nk4M2HKeb2C8a_E` )
.then(response => response.json())
.then(data => {
const videoLink = `https://www.youtube.com/embed/${data.items[0].id.videoId}`
videoDiv.src = videoLink;
})
}
