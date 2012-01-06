$(document).ready(function() {
    var searchField = $("#search");
    searchField.keypress(function(event){
        var keyCode = event.keyCode || event.which;
        if (keyCode == 13)
            doSearch();
    });
    searchField.focus();
});

// New comment here
// Another comment here

function doSearch() {
    var searchString = encodeURI(document.getElementById("search").value);
    var tweetList = $("#tweetList");
    tweetList.append("Searching for " + decodeURI(searchString) + "....");
    $.getJSON('http://api.twitter.com/1/search.json?callback=?&q=' + searchString, function(tweets) {
        tweetList.html("");
        $.each(tweets.results, function(i, tweet) {
            tweetList.append("<li>");
            tweetList.append("<img src='" + tweet.profile_image_url + "' />");
            tweetList.append("<a class='user'>" + tweet.from_user + "</a>");
            tweetList.append("<span class='date'> - " + tweet.created_at + "</span><br/>");
            var content = tweet.text;
            content = content.replace(/(http[\w\:/\._\?]*)/g, "<a href='$1' target='_blank'>$1</a>");
            tweetList.append(content);
            tweetList.append("<div style='clear:both'></div>");
            tweetList.append("</li>");
        });
    }).error(function() {
    	tweetList.text("Error loading tweets.");
    });
}
