/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

/********************************************************************
 * STEP 1 
  There are several choices to be considered for the URL from which data 
  must be used to display the astronomical picture of the day 
  
 *******************************************************************
 */
var nasaurl = "https://api.nasa.gov/planetary/apod?api_key=";
var key="fsIHc9OGpk3nYHIeZa3mZUm2FdX4yDzSybKHkbUG";
//console.log("key: " + key);

nasaurl +=key+"&";
//var url = nasaurl;
var gnurl = "https://cors.io/?http://nasa-apod-flask.glitch.me/v1/apod?";
//var gnurl = "https://nasa-apod-flask.glitch.me/v1/apod?";
//var gnurl = "https://cors.io/?https://apod.nasa.gov/apod/ap180911.html";
//var url = nasaurl+key+"count=5";

//var url = gnurl;
var url = "https://api.nasa.gov/planetary/apod?api_key="+key;


/********************************************************************
 * STEP 2 
 Make the AJAX call to and get the data and use it to update several 
 HTML elements in the webpage 
 *******************************************************************
 */

console.log("url " + url); 
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
  // thanks to https://stackoverflow.com/a/5652022/307454
  error: function(jqXHR, textStatus, errorThrown) {  
    if(jqXHR.status && jqXHR.status === 400){
      alert(jqXHR.responseText); 
    } else {
      alert("Something went wrong!");
    }
  }
});


/****************************************************
 * STEP 1.5 
   ENHANCEMENT SUGGESTION 
   Use a date to specify different images fromt the past 
   When an invalid date is used, errors will occur 
   and they need to be handled gracefully
   
   Once you have figured out how you want to form your date 
   string, move the code below to above Step 2 (before the AJAX call)
 ***************************************************
 */
// --------------------------------------
// Different experiments to arrive at the date to use for the API call
//   - none of them are satisfactory 
//
//var utc = new Date().toJSON().slice(0,10); //.replace(/-/g,'/');
//console.log("date: " + utc);
//var date ="date=2018-09-11"
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_getdate
// move it to EST time, that way, yesterday need not be calculated? 
//
/*
dateString = new Date().toLocaleString('en-KOR', { timeZone: "America/New_York" })
                       .slice(0,9)
                       .replace(/( \.)/g,'-')
                       .split("-")
                       //.reverse()
                       .join("-");
*/
let today = new Date();
let date = today;
date.setDate(today.getUTCDate()); // depending upon time of day, it may revert to yesterday
let dateString = date.toISOString().slice(0, 10);
console.log("date " + dateString);
//dateString="2018-09-06";
//url += "date="+dateString+"&";
