
let songs = ""
let cross = document.querySelector("#cross")
let bars = document.querySelector("#bars")
let seekbar = document.querySelector(".seekbar")
let dot = document.querySelector(".dot")
let vol = document.querySelector(".volume i")
let volume = document.querySelector(".volume").getElementsByTagName("input")[0]
let backward_btn = document.querySelector("#backward");
let ply_btn = document.querySelector("#ply-btn");
let forward_btn = document.querySelector("#forward");
let music = new Audio();
let playlists = document.querySelector(".Playlists").getElementsByTagName("ul")[0]

let cards = document.querySelectorAll(".card");
Array.from(cards).forEach(e=>{
e.addEventListener("click",evl=>{
    
   let name = (evl.currentTarget.dataset);
   let BaseUrl = name.folder
   
   let fetchSongs = async(BaseUrl)=>{
    let url = await fetch(`${BaseUrl}.json`)
    let response = await url.json();
    
    main(response)
    
    
   }
   fetchSongs(BaseUrl)
  
   
})
})
function main(response){
    let arr = []
    songs = response;
    let paths;
    let name;
    playlists.innerHTML = ""
    for(songNames of songs){
       name = songNames.name;
       paths = songNames.path;
    playlists.innerHTML= playlists.innerHTML + `<li data-file="${paths}">
    <i class="fa-solid fa-music" style="color: white;"></i>
    <div class="name">${name} </div>
    <div class="play">
        <p> Play Now</P>
        <i class="fa-regular fa-circle-play" style="color:white"></i>
    </div>
</li>`;

    }
   
    
  Array.from(document.querySelector(".Playlists").getElementsByTagName("li")).forEach(e=>{
    
      e.addEventListener("click", (e)=>{
         music.src=(e.currentTarget.dataset.file)
        music.play();
        if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
      })
  })
  

}
function plySongs(music, ply_btn,) {
    ply_btn.addEventListener("click", () => {
        if (ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-play"></i>')) {
            music.pause();
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        }else if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            music.play();
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
    });
}
plySongs(music,ply_btn)

function forward  (music,backward_btn,forward_btn){
    backward_btn.addEventListener("click",()=>{
        arr = []
        for(songNames of songs){
        
           arr.push(songNames.path);
            
        }
        let url = music.src;
        let filenameWithDirectory = decodeURIComponent(url.substring(url.lastIndexOf("/") + 1));
        let directoryPath = decodeURIComponent(url.substring(22, url.lastIndexOf("/") + 1));
        let fullPath = directoryPath + filenameWithDirectory;
        let index = arr.indexOf(fullPath);
        if(index !== 0){
            
            music.src=arr[index-1]
            music.play()
        }
        if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
       
        
     })
     forward_btn.addEventListener("click",()=>{
         arr = [] 
        for(songNames of songs){
           arr.push(songNames.path);
            
        }
        let url = music.src;
        let filenameWithDirectory = decodeURIComponent(url.substring(url.lastIndexOf("/") + 1));
        let directoryPath = decodeURIComponent(url.substring(22, url.lastIndexOf("/") + 1));
        let fullPath = directoryPath + filenameWithDirectory;
        let index = arr.indexOf(fullPath);
        if((index+1) < arr.length){
         music.src=(arr[index+1])
            music.play()
        }
        if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
     })
    
     


}
forward  (music,backward_btn,forward_btn)

volume.addEventListener("change", (e)=>{
    music.volume=parseInt(e.target.value)/100
})

music.addEventListener("timeupdate", ()=>{
   
    dot.style.left = (music.currentTime /music.duration )*100+ "%";
})

seekbar.addEventListener("click", (e)=>{
    console.log(e.offsetX/e.target.getBoundingClientRect().width)*100;
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
    dot.style.left = ((e.offsetX/e.target.getBoundingClientRect().width)*100)+"%"
    music.currentTime = ((music.duration)*percent)/100;

})
bars.addEventListener("click", ()=>{
    document.querySelector(".left-main-container").style.left = 0;
    })
    cross.addEventListener("click", ()=>{
        document.querySelector(".left-main-container").style.left = - 100 +"%";
    })
    



    
