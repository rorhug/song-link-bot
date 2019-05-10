const cheerio = require('cheerio')
const _ = require('lodash')

const axios = require('axios')

// const findServiceByPrefix = prefix => {
  
// }


const serviceKeys = [
  "AUTOMATED_LINK::spotify", //: {url: "https://open.spotify.com/track/0tuyRRho8rxU0doHEt95sX", appUrl: "spotify:track:0tuyRRho8rxU0doHEt95sX", displayName: "Spotify", platform: "spotify", entityNodeUniqueId: "SPOTIFY_SONG::0tuyRRho8rxU0doHEt95sX", …}
  "AUTOMATED_LINK::appleMusic", //: {url: "https://geo.itunes.apple.com/us/album/sunset-dub/1…0732?i=1439860925&uo=4&app=music&ls=1&at=1000lHKX", displayName: "Apple Music", platform: "appleMusic", entityNodeUniqueId: "ITUNES_SONG::1439860925", nodeType: "AUTOMATED_LINK", …}
  "AUTOMATED_LINK::soundcloud",
  // "AUTOMATED_LINK::amazonMusic" //: {url: "https://music.amazon.com/albums/B07JM9LQDZ?trackAsin=B07JLYP8Y5&do=play", displayName: "Amazon Music", platform: "amazonMusic", entityNodeUniqueId: "AMAZON_SONG::B07JLYP8Y5", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::amazonStore" //: {url: "https://www.amazon.com/Sunset-Dub/dp/B07JLYP8Y5?Su…camp=2025&creative=165953&creativeASIN=B07JLYP8Y5", displayName: "Amazon", platform: "amazonStore", entityNodeUniqueId: "AMAZON_SONG::B07JLYP8Y5", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::deezer" //: {url: "https://www.deezer.com/track/572465162", displayName: "Deezer", platform: "deezer", entityNodeUniqueId: "DEEZER_SONG::572465162", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::google" //: {url: "https://play.google.com/music/m/T3nemen2cdn7hmcfs2crgkgeawm?signup_if_needed=1", displayName: "Google", platform: "google", entityNodeUniqueId: "GOOGLE_SONG::T3nemen2cdn7hmcfs2crgkgeawm", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::googleStore" //: {url: "https://play.google.com/store/music/album?id=B52lz…e6sw5kiyhqmy&tid=song-T3nemen2cdn7hmcfs2crgkgeawm", displayName: "Google Play", platform: "googleStore", entityNodeUniqueId: "GOOGLE_SONG::T3nemen2cdn7hmcfs2crgkgeawm", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::itunes" //: {url: "https://geo.itunes.apple.com/us/album/sunset-dub/1…732?i=1439860925&uo=4&app=itunes&ls=1&at=1000lHKX", displayName: "iTunes", platform: "itunes", entityNodeUniqueId: "ITUNES_SONG::1439860925", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::napster" //: {url: "http://napster.com/artist/art.14514799/album/alb.333648951/track/tra.333648972", displayName: "Napster", platform: "napster", entityNodeUniqueId: "NAPSTER_SONG::tra.333648972", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::pandora", //: {displayName: "Pandora", platform: "pandora", nodeType: "AUTOMATED_LINK", nodeUniqueProperty: "platform", nodeUniqueValue: "pandora", …}
  "AUTOMATED_LINK::soundcloud", //: {displayName: "SoundCloud", platform: "soundcloud", nodeType: "AUTOMATED_LINK", nodeUniqueProperty: "platform", nodeUniqueValue: "soundcloud", …}
  // "AUTOMATED_LINK::spinrilla", //: {displayName: "Spinrilla", platform: "spinrilla", nodeType: "AUTOMATED_LINK", nodeUniqueProperty: "platform", nodeUniqueValue: "spinrilla", …}
  // "AUTOMATED_LINK::tidal", //: {url: "https://listen.tidal.com/track/97172786", displayName: "TIDAL", platform: "tidal", entityNodeUniqueId: "TIDAL_SONG::97172786", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::yandex", //: {url: "https://music.yandex.ru/track/44230709", displayName: "Yandex", platform: "yandex", entityNodeUniqueId: "YANDEX_SONG::44230709", nodeType: "AUTOMATED_LINK", …}
  "AUTOMATED_LINK::youtube", //: {url: "https://www.youtube.com/watch?v=4InZqVRMa8k", displayName: "YouTube", platform: "youtube", entityNodeUniqueId: "YOUTUBE_VIDEO::4InZqVRMa8k", nodeType: "AUTOMATED_LINK", …}
  // "AUTOMATED_LINK::youtubeMusic", //: {url: "https://music.youtube.com/watch?v=4InZqVRMa8k", displayName: "YouTube Music", platform: "youtubeMusic", entityNodeUniqueId: "YOUTUBE_VIDEO::4InZqVRMa8k", nodeType: "AUTOMATED_LINK", …}

  // "AUTOMATED_SECTION::BUY" //: {nodeType: "AUTOMATED_SECTION", nodeUniqueProperty: "name", nodeUniqueValue: "BUY", name: "BUY", displayName: "BUY", …}
  // "AUTOMATED_SECTION::LISTEN" //: {nodeType: "AUTOMATED_SECTION", nodeUniqueProperty: "name", nodeUniqueValue: "LISTEN", name: "LISTEN", displayName: "LISTEN", …}
  // "AUTOMATED_SECTION::YOUTUBE_EMBED" //: {nodeType: "AUTOMATED_SECTION", nodeUniqueProperty: "name", nodeUniqueValue: "YOUTUBE_EMBED", name: "YOUTUBE_EMBED", displayName: "YOUTUBE EMBED", …}

  // "DEEZER_SONG::572465162" //: {duration: 306000, discNumber: 1, listenUrl: "https://www.deezer.com/track/572465162", trackNumber: 9, artistName: "Break", …}
  // "GOOGLE_SONG::T3nemen2cdn7hmcfs2crgkgeawm" //: {entity: "GOOGLE_SONG", id: "T3nemen2cdn7hmcfs2crgkgeawm", title: "Sunset Dub", artistName: "Break", thumbnailUrl: "https://lh3.googleusercontent.com/KOtcsFVl25ke0qPh…Ycq03TCOHGMRTPbkQFA_3cnebPALCtizcVDzMhs0-t0JqxI-A", …}
  // "ITUNES_SONG::1439860925" //: {entity: "ITUNES_SONG", id: "1439860925", country: "US", title: "Sunset Dub", artistName: "Break", …}
  // "NAPSTER_SONG::tra.333648972" //: {entity: "NAPSTER_SONG", id: "tra.333648972", title: "Sunset Dub", artistName: "Break", thumbnailUrl: "https://direct.rhapsody.com/imageserver/images/alb.333648951/385x385.jpeg", …}
  // "SPOTIFY_SONG::0tuyRRho8rxU0doHEt95sX" //: {trackNumber: 9, title: "Sunset Dub", thumbnailWidth: 640, isListenable: true, numTracks: 1, …}
  // "TIDAL_SONG::97172786" //: {entity: "TIDAL_SONG", id: "97172786", title: "Sunset Dub", artistName: "Break", thumbnailUrl: "https://resources.tidal.com/images/d11299f3/351c/4442/a975/359695164b7d/640x640.jpg", …}
  // "YANDEX_SONG::44230709" //: {entity: "YANDEX_SONG", id: "44230709", title: "Sunset Dub", artistName: "Break", thumbnailUrl: "https://avatars.yandex.net/get-music-content/95061/592881a0.a.5924352-1/600x600", …}
  // "YOUTUBE_VIDEO::4InZqVRMa8k" //{entity: "YOUTUBE_VIDEO", id: "4InZqVRMa8k", title: "Break - Sunset Dub", artistName: "Forbidden Frequencies", thumbnailUrl: "https://i.ytimg.com/vi/4InZqVRMa8k/hqdefault.jpg", …}
]


// const LINK_PATTERNS = [
//   "https://geo.itunes.apple.com/",
//   "https://itunes.apple.com/",
//   "https://www.youtube.com/",
// ]
// const isValidLink = link => _.some(LINK_PATTERNS, pattern => pattern.test(link))

const getSongLinkData = (link) => {
  return axios.get(
    `https://song.link/${link}`,
    {
      maxRedirects: 2
    }
  ).then(response => {
    // if(response.status === 200) { console.log(response); throw "Page was a redirect" }
    console.log(`Link: ${link}`)
    const page = cheerio.load(response.data)
    const scriptElement = page("script#initialState")
    const scriptContent = scriptElement.get()[0].children[0].data

    const data = JSON.parse(scriptContent)

    // const findServiceByPrefix(data, "SPOTIFY")

    const services = data.songlink.nodesByUniqueId


    return serviceKeys.map(key => {
      let service = services[key]
      if (service && service.url) {
        let name = _.last(key.split("::"))
        if (!name) {
          console.log(name, service.url)
        }
        return `${name} ${service.url}`
      }
    }).join("\n")
  })
  // .catch(e => {
  //   console.log("ERROR")
  // })

  // axios.get('https://dev.to/aurelkurtula')
  //   .then((response) => {
  //       if(response.status === 200) {
  //           const html = response.data;
  //           const $ = cheerio.load(html); 
  //           let devtoList = [];
  //           $('.single-article').each(function(i, elem) {
  //               devtoList[i] = {
  //                   title: $(this).find('h3').text().trim(),
  //                   url: $(this).children('.index-article-link').attr('href'),
  //                   tags: $(this).find('.tags').text().split('#')
  //                         .map(tag =>tag.trim())
  //                         .filter(function(n){ return n != "" })
  //               }      
  //           });
  //   }
}//, (error) => console.log(err) );


module.exports = { getSongLinkData }