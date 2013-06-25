var stream = document.querySelector("#globalContainer");
var working = false;

function filter(){

    if(localStorage.getItem("disabled"))
        return;

    var stories = stream.querySelectorAll(".shareRedesignVideo iframe");
    var comments = stream.querySelectorAll(".uiVideoThumbParentExpanded iframe");
    working = true;
    for(var i=0; i < stories.length; i++){
        var story = stories[i];
        attach(story.parentNode);
    }
    for(var i=0; i < comments.length; i++){
        var story = comments[i];
        attach(story.parentNode);
    }
    working = false;

}

function attach(story){
    if(story.classList.contains("videoSticker_verified"))
        return;

    story.classList.add("videoSticker_verified");

    var closeButton = document.createElement("div")
    closeButton.innerHTML = "X";
    closeButton.classList.add("videoSticker_close");
    story.appendChild(closeButton);
    attachToggle(story, closeButton);
    orderVideos();
}

function attachToggle(story, button){
    button.addEventListener("click", function(){
        story.classList.toggle("videoSticker");
        orderVideos();
    })
}

function orderVideos(){
    var stories = stream.querySelectorAll(".videoSticker");

    for(var i=0; i < stories.length; i++){
        var story = stories[stories.length - 1 - i];
        stories[stories.length - 1 - i].setAttribute("video-order", i + "");
    }
}

if(stream){

    filter();

    stream.addEventListener("DOMNodeInserted", function (ev) {
        if(!working)
            filter();
    }, false);
}