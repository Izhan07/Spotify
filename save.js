/*let fg= async(url)=>{
    let gt = await fetch(`${url}.json`);
let data= await gt.json();
let hamna=new Audio(data[4].path);
//hamna.play();
console.log(gt)


}
*/
let songs = ""
let arr =[];
let backward_btn = document.querySelector("#backward");
let ply_btn = document.querySelector("#ply-btn");
let forward_btn = document.querySelector("#forward");
let hamna = new Audio();
let playlists = document.querySelector(".Playlists").getElementsByTagName("ul")[0]
let cards = document.querySelectorAll(".card");
Array.from(cards).forEach(e=>{
e.addEventListener("click",evl=>{
   let name = (evl.currentTarget.dataset);
   let BaseUrl = name.folder
   
   let fetchSongs = async(BaseUrl)=>{
    let url = await fetch(`${BaseUrl}.json`)
   let  response = await url.json();
    
    main(response)
    
    
   }
   fetchSongs(BaseUrl)
  
   
})
})
function main(response){
     songs = response;
    let path;
    let name;
    playlists.innerHTML=""
    
    for(songNames of songs){
       name = songNames.name;
       path = songNames.path;
    playlists.innerHTML= playlists.innerHTML + `<li data-file="${path}">
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
         hamna.src=(e.currentTarget.dataset.file)
        hamna.play();
      })
  })
  

}
function plySongs(hamna, ply_btn,) {
    ply_btn.addEventListener("click", () => {
        if (ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-play"></i>')) {
            hamna.pause();
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        }else if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            hamna.play();
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
    });
}
plySongs(hamna,ply_btn)
function forward  (hamna,backward_btn,forward_btn){
    backward_btn.addEventListener("click",()=>{
        for(songNames of songs){
           arr.push(songNames.path);
            
        }
        let url = hamna.src;
        let filenameWithDirectory = decodeURIComponent(url.substring(url.lastIndexOf("/") + 1));
        let directoryPath = decodeURIComponent(url.substring(22, url.lastIndexOf("/") + 1));
        let fullPath = directoryPath + filenameWithDirectory;
        let index = arr.indexOf(fullPath);
        console.log(index)
        if(index !== 0){
            
            hamna.src=(arr[index-1])
            hamna.play()
        }
        if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
       
        
     })
     forward_btn.addEventListener("click",()=>{
        for(songNames of songs){
           arr.push(songNames.path);
            
        }
        let url = hamna.src;
        let filenameWithDirectory = decodeURIComponent(url.substring(url.lastIndexOf("/") + 1));
        let directoryPath = decodeURIComponent(url.substring(22, url.lastIndexOf("/") + 1));
        let fullPath = directoryPath + filenameWithDirectory;
        let index = arr.indexOf(fullPath);
        if((index+1) < arr.length){
         hamna.src=(arr[index+1])
            hamna.play()
        }
        if(ply_btn.innerHTML.includes('<i class="fa-regular fa-circle-pause"></i>')){
            ply_btn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            
        }
     })
    
     


}
 forward(hamna,backward_btn,forward_btn);
 




    
