$(document).ready(function(){
  $(".centring").on("click",function(){
    
    $(".centring").attr("hidden", true);
    $(".select").attr("hidden", false);
  });

  $(".ion-close-round").on("click",function(){
    $("#txt-box").val("");
    $(".centring").attr("hidden", false);
    $(".select").attr("hidden", true);
    $("#search-icon").attr("hidden",false);
    $(".articles").html("");
    $(".interface").css("top","50%");
  });

  $('#txt-box').on("keypress",function(event){
  
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $("#search-icon").attr("hidden",true);
      $(".interface").css("top","0%");
      var data = $('#txt-box').val();
      data = data.split(" ");
      var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&meta=&generator=search&pilimit=max&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrsearch="
      for(i=0;i<data.length;i++){
        url += data[i];
        if(i!= data.length -1){
          url += "%20";
        }
      }
      url += "&gsrlimit=10"; 
      console.log(url);
      $.ajax({
        url:url,
        dataType:'jsonp',
        
        success: function (dataWegetfromJsonp) {
          var data = dataWegetfromJsonp.query.pages;
          console.log(data);
          var keys = Object.keys(data);
          console.log(keys);
          // var link = "https://en.wikipedia.org/?curid="
          var html = '';
          keys.forEach(function(val){
            console.log(val);
            var title = data[val].title;
            console.log(title);
            var extract = data[val].extract;
            var pageid = data[val].pageid;
            var link = "https://en.wikipedia.org/?curid="
            link = link + pageid;
            html += '<div class="linked"><a href="'
            html+= link;
            html+= '" target="_blank"><div><h3>';
            html+= title;
            html+= '</h3><p>';
            html+= extract;
            html+= '</p></div></a></div>';
          })
          $(".articles").html(html);
        }
      });
    
    }
  });
});
// https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json