var RssFeed = {};

RssFeed.start = function() {
    RssFeed.loadFeedOptions();
    RssFeed.bindActions();
    RssFeed.getFeed();
}

RssFeed.loadFeedOptions = function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:7000/get_feed_options",
        contentType: 'application/json',
        success: function(response) {
            RssFeed.generateFeedOptions(JSON.parse(response));
        },
        error: function(response) {
            console.log('error');
            console.log(response);
        }
    })
}

RssFeed.generateFeedOptions = function(obj) {
    var optionsArr = Object.keys(obj);
    RssFeed.currentFeed = optionsArr[0];
    for (var i = 0; i < optionsArr.length; i++) {
        var option = $("<option />").text(optionsArr[i]).attr('value', optionsArr[i]);
        $("#select-feed").append(option);
    }
}

RssFeed.bindActions = function() {
    $("#refresh-feed").click(RssFeed.getFeed);
    $("#select-feed").on('change', RssFeed.changeFeed)
}

RssFeed.getFeed = function() {
    var loader = $("<img />").attr('src', 'https://zachariasdayneskc32354.files.wordpress.com/2015/05/loaddding.gif');
    $("#headlines").css('text-align','center').html(loader);
    $.ajax({
        type: "GET",
        url: `http://localhost:7000/get_feed?feed=${RssFeed.currentFeed === undefined ? "VideoGamer" : RssFeed.currentFeed}`,
        contentType: 'application/json',
        success: function(response) {
            rssObj = JSON.parse(response);
            RssFeed.generateHTML(rssObj);
        },
        error: function(response) {
            console.log('error');
            console.log(response);
        }
    })
}

RssFeed.changeFeed = function() {
    var newFeed = $("#select-feed").val();
    RssFeed.currentFeed = newFeed;
    RssFeed.getFeed();
}

RssFeed.generateHTML = function(obj) {
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

RssFeed.start()