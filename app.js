const searchbtn=document.getElementById("search-btn");
searchbtn.addEventListener("click",function(){
document.getElementById("result-area").innerHTML="";
document.getElementById("lyrics-area").innerHTML="";
const songname=document.getElementById("search").value;
console.log(songname);         
fetch(`https://api.lyrics.ovh/suggest/${songname}`)
.then(response => response.json())
.then(data =>{
    const songs=data.data;
    for (let i=0; i<10; i++){
        const song = songs[i];
         const songTitle = song.title;
         const artist = song.artist.name;
         document.getElementById("result-area").innerHTML += 
          `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                    <h3 id="name"class="lyrics-name">${songTitle}</h3>
                    <p class="author lead">Album by <span>${artist}</span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="getLyrics('${artist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                    </div>  
                    </div>`
                }
                })
})

function getLyrics(artist, songTitle){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
    .then(res => res.json())
    .then(lyricsData => {
        const lyrics = lyricsData.lyrics;
        const lyricesDisplay = document.getElementById('lyrics-area');
        if (lyrics === undefined){
            lyricesDisplay.innerHTML = `<h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
                                        <pre class="lyric text-white">Oops!Lyrics not found</pre>`
        } else {
            lyricesDisplay.innerHTML = `<h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
                                    <pre class="lyric text-white">${lyrics}</pre>`
        }
    })
    document.getElementById('result-area').innerHTML = ' '
}

        


        
        
