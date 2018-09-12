/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

// how can you capture the output of the console to HTML? 
// http://j.mp/htmlConsole

var nasaurl = "https://api.nasa.gov/planetary/apod?api_key=";
//var key = process.env.NASA_KEY
var key="fsIHc9OGpk3nYHIeZa3mZUm2FdX4yDzSybKHkbUG";


console.log("key: " + key);

//var utc = new Date().toJSON().slice(0,10); //.replace(/-/g,'/');
//console.log("date: " + utc);
//var date ="date=2018-09-11"

let today = new Date().toISOString().slice(0, 10);
var date = today;

var url = nasaurl+key+"&date="+date+"&";
//var url = nasaurl+key+"&"+"&"+"count=5";

//var url = "https://api.nasa.gov/planetary/apod?api_key=NASA_KEY";


$.ajax({
  url: url,
  success: function(result){
  if("copyright" in result) {
    $("#copyright").text("Image Credits: " + result.copyright);
  }
  else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  
  if(result.media_type == "video") {
    $("#apod_img_id").css("display", "none"); 
    $("#apod_vid_id").attr("src", result.url);
  }
  else {
    $("#apod_vid_id").css("display", "none"); 
    $("#apod_img_id").attr("src", result.hdurl);
  }
  $("#reqObject").text(url);
  $("#returnObject").text(JSON.stringify(result, null, 4));  
  $("#apod_explanation").text(result.explanation);
  $("#apod_title").text(result.title);
}
});