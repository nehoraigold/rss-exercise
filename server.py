from bottle import run, route, static_file
import feedparser
import json


@route('/get_feed', method="GET")
def get_feed_dict():
    feed = feedparser.parse("https://www.videogamer.com/rss/allupdates.xml")
    title = feed["feed"]["title"]
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
