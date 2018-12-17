var VideoGameFeed = {};

VideoGameFeed.start = function() {
    VideoGameFeed.bindButton();
    VideoGameFeed.getFeed();
}

VideoGameFeed.bindButton = function() {
    $("#refresh-feed").click(VideoGameFeed.getFeed);
}

VideoGameFeed.getFeed = function() {
    var loader = $("<img />").attr('src', 'https://zachariasdayneskc32354.files.wordpress.com/2015/05/loaddding.gif');
    $("#headlines").css('text-align','center').html(loader);
    $.ajax({
        type: "GET",
        url: "http://localhost:7000/get_feed",
        contentType: 'application/json',
        success: function(response) {
            rssObj = JSON.parse(response);
            VideoGameFeed.generateHTML(rssObj);
        },
        error: function(response) {
            console.log('error');
            console.log(response);
        }
    })
}

VideoGameFeed.generateHTML = function(obj) {
    $("#source-name").empty();
    $("#headlines").css('text-align','left').empty();
    $("#source-name").text(obj.title).attr('href', obj.link);
    for (var i = 0; i < obj.entries.length; i++) {
        var entry = obj.entries[i]
        var link = $("<a/>").attr('href', entry.link).text(entry.title)
        var li = $("<li/>").append(link)
        $("#headlines").append(li)
    }
}

VideoGameFeed.start()