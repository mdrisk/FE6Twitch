function del(){
  var args = Array.prototype.slice.call(event.target.id)
  element = document.getElementById(event.target.id);
  element = element.parentNode;
  var index = args[6];
  element.parentNode.remove();
  streamlist.splice(index, 1);
  console.log(streamlist);
  populate();
}
var streamlist=["Wasted", "HyperRPG", "GeekandSundry", "Sacriel", "fcc"];
//For-loop to make the API call for each streamer
function populate(){
  document.getElementById("list").innerHTML = "";
  for(var i=0; i<streamlist.length; i++){
  var url="https://wind-bow.glitch.me/twitch-api/streams/"+streamlist[i];

  //append li to HTML
  $("#list").append('<li id "li'+i+'" class="inner_row"><div class="inner"><div id = "indicator'+i+'" class="indicator"></div></div><div class="icon"><a id="link'+i+'" href =""><img id="user_icon'+i+'" class="icon" src="" Alt="Twitch Icon"></a></div><div class="inner inner_row_mid"><div class="twitch_name"><div id="twitch_name'+i+'" class="twitch_name"></div></div><div class="game_title"><div id= "game_title'+i+'" class="game_title"></div></div></div><div class="inner" id="m_container'+i+'"><img id="m_icon'+i+'" onClick = "del()" class="m_icon"  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/ESRB_Everyone.svg" alt="Everyone"></div></li>');

  //AJAX call
  $.ajax({url, async: false,
    success:function(data){

    //**Assign data**

    //If data is null, streamer is offline
    if(data.stream == null){
      $("#game_title"+i).text("Offline");
      $("#indicator"+i).addClass("led-red");
      $("#twitch_name"+i).text(streamlist[i]);
      $("#user_icon"+i).attr("src", "http://res.cloudinary.com/mdrisk/image/upload/v1509456422/no-internet-required-at-all-300x300_kcfjc7.png");
      $("#link"+i).attr("href", "https://www.twitch.tv/"+streamlist[i]);
    }
    else { //The streamer is online
      $("#game_title"+i).text(data.stream.game);
      $("#twitch_name"+i).text(data.stream.channel.name);
      $("#indicator"+i).addClass("led-green");
      $("#user_icon"+i).attr("src", data.stream.channel.logo);
      $("#link"+i).attr("href", data.stream.channel.url);

      //Checks for channel mature rating
      if(data.stream.channel.mature){
        $("#m_icon"+i).attr("src", "https://upload.wikimedia.org/wikipedia/commons/c/cb/ESRB_2013_Mature.svg");
        $("#m_icon"+i).attr("alt","Mature Icon");
      }
    }
   }
  });
}
}
document.addEventListener("DOMContentLoaded", function() {
//Call widthCheck() whenever resized
$(window).resize(function(){
  widthCheck();
});
//This updates CSS to stack certain items and change max width
function widthCheck(){
  if($( document ).width()<750){
    $(".inner_row_mid").css("flex-flow", "column");
    $(".twitch_name").css("max-width","100%");
    $(".twitch_name").css("width","100%");
    $(".twitch_name").css("align-content","flex-start");
  } else {
    $(".inner_row_mid").css("flex-flow", "row");
    $(".twitch_name").css("max-width","100%");
    $(".twitch_name").css("width","auto");
     $(".twitch_name").css("align-content","flex-start");
  }
}
populate();
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var addBtn = document.getElementById("addBtn");
var delBtn = document.getElementById("delBtn");
var formBtn = document.getElementById("formBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
addBtn.onclick = function() {
  modal.style.display = "block";
  document.getElementById("outerForm").reset();
}

formBtn.onclick = function(){
  var nameValue = document.getElementById("form1").value;
  streamlist.push(nameValue);

  console.log(streamlist);
  populate();
  modal.style.display = "none";

}

delBtn.onclick = function(){
  for(var i = 0; i<streamlist.length; i++){
      $("#m_icon"+i).attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsb_LOhEPGj3hajUR-7kM0YXdY8W2bmjbaGlp_s66N7_iqBuPTA");
      $("#m_icon"+i).css("cursor","pointer" );
  }
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

//Calls function to verify and update based on window size
widthCheck();

});
