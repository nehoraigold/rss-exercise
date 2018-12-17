from bottle import run, route, static_file, request
import feedparser
import json

feed_options = {
    "VideoGamer": 'https://www.videogamer.com/rss/allupdates.xml',
    "HowToGeek": 'https://feeds.howtogeek.com/HowToGeek',
    "Wired": "http://feeds.wired.com/wired/index"
}


@route('/get_feed_options', method="GET")
def get_feed_options():
    return json.dumps(feed_options)


@route('/get_feed', method="GET")
def get_feed_dict():
    current_feed = request.query["feed"]
    feed = feedparser.parse(feed_options[current_feed])
    title = current_feed
    link = feed["feed"]["link"]
    info = {
        "title": title,
        "link": link,
        "entries": []
    }
    for entry in feed["entries"]:
        new_entry = {
            "title": entry["title"],
            "link": entry["link"]
        }
        info["entries"].append(new_entry)
    return json.dumps(info)


@route('/', method="GET")
def html():
    return static_file('index.html', root='')


@route('/style.css', method="GET")
def css():
    return static_file('style.css', root='')


@route('/logic.js', method="GET")
def js():
    return static_file('logic.js', root='')


def main():
    run(host='localhost', port=7000)


if __name__ == "__main__":
    main()
