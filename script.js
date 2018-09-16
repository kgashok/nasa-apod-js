/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// prints "hi" in the browser's dev tools console
console.log('hi');
// how can you capture the output of the console to HTML? 
// http://j.mp/htmlConsole
var nasaurl = "https://api.nasa.gov/planetary/apod?api_key=";
var key="fsIHc9OGpk3nYHIeZa3mZUm2FdX4yDzSybKHkbUG";
nasaurl +=key+"&";
//var url = nasaurl;
//
// This re-routing is the only way I get interact with the 
// Python Flask application server running on nasa-apod.flask.glitch.me 
//
//
// However, if I go directly (using the URL below), I get the following Mixed Content Error
//
//    Mixed Content: The page at 'https://nasamix.glitch.me/' was loaded over HTTPS, 
//    but requested an insecure XMLHttpRequest endpoint 
//   'http://nasa-apod-flask.glitch.me/v1/apod/?date=2018-09-14&'. 
//   This request has been blocked; the content must be served over HTTPS.
//
// Should I do something on nasa-apo-flask app? What should I do? 
// Or is there something I need to do on the client? 
// ** PLEASE HELP **
var gnurl = "https://cors.io/?http://nasa-apod-flask.glitch.me/v1/apod?";
//var gnurl = "https://nasa-apod-flask.glitch.me/v1/apod?";
//var gnurl = "https://cors.io/?https://apod.nasa.gov/apod/ap180911.html";
var url = gnurl;
//var key = process.env.NASA_KEY
console.log("key: " + key);
//var utc = new Date().toJSON().slice(0,10); //.replace(/-/g,'/');
//console.log("date: " + utc);
//var date ="date=2018-09-11"
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_getdate
// move it to EST time, that way, yesterday need not be calculated? 
let today = new Date();
let date = today;
date.setDate(today.getUTCDate()-1 ); // depending upon time of day, it may revert to yesterday
let dateString = date.toISOString().slice(0, 10);
console.log("date " + dateString);
/*dateString = new Date().toLocaleString('en-KOR', { timeZone: "America/New_York" })
                       .slice(0,9)
                       .replace(/( \.)/g,'-')
                       .split("-")
                       //.reverse()
                       .join("-");
*/
//dateString="2018-09-06";
url += "date="+dateString+"&";
console.log("url " + url); 
//var url = nasaurl+key+"&"+"&"+"count=5";
//var url = "https://api.nasa.gov/planetary/apod?api_key=NASA_KEY";
$.ajax({
  type: "GET",
  url: url,
  success: function(result){
    // if I use the Flask APOD service, I am getting
    // back text (and not a JSON object)
    if (url.indexOf('api.nasa.gov') == -1)
      result = $.parseJSON(result);
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
      $("#apod_img_id").attr("src", result.url);
    }
    $("#reqObject").text(url);
    $("#returnObject").text(JSON.stringify(result, null, 4));  
    $("#apod_explanation").text(result.explanation);
    $("#apod_title").text(result.title);
  },
  error: function (XMLHttpRequest, textStatus, errorThrown) {
    alert("Request: " + 
          XMLHttpRequest.toString() + 
          "\n\nStatus: " + 
          textStatus + 
          "\n\nError: " + errorThrown
         );
  }
});
