var API_KEY = "AIzaSyCIdIQyYV8uccJaWXbUv8RjA_c2H9yCThw";

//original idea was to write a getThumbnails function that called getYoutubeData that actually made the API request.
//However, because of how callback functions work, we have to call the function with the getJSON call first, then
//manipulate the data in the callback

//this way, we have a chain of functions called in order. Would it be better to save the data from youtube as a global object? 
//the problem then might trying to use the object before the call succeeds.

//This is called when the user clicks submit
function performSearch(searchTerm){
	var query = {
		part: "snippet",
		key: API_KEY,
		q: searchTerm
	}
	$.getJSON("https://www.googleapis.com/youtube/v3/search", query, makeArray);
}

function makeArray(data){
	var array = [];
	for (var i = 0; i < data.items.length; i++){
		var url = data.items[i].snippet.thumbnails.high.url;
		array.push(url);
	}
	displayThumbnails(array);
}

//This is where images are added to the HTML
function displayThumbnails(arrayOfURLs){
	var imgStart = "<img src='";
	var imgEnd = "'>"
	var images = "";
	//create a string of all image results
	arrayOfURLs.map(function(a){
		images += imgStart + a + imgEnd;
	});
	//write string of image results to the DOM
	$(".results").html(images);
}


//Submit listener for form
$("form").submit(function(e){
	e.preventDefault();
	var searchTerm = $(this).find("#searchTerm").val();
	performSearch(searchTerm);
	});
