// import { getSongLinkData } from './data'

const data = require("./data")

data.getSongLinkData("https://open.spotify.com/track/5e1PnfGxdnHT4CjJ440iba?si=JxJmbnDARdSLHAvFTD8WAQ").then(console.log).catch(console.log)