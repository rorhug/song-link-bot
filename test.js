// import { getSongLinkData } from './data'

const data = require("./data")

data.getSongLinkData("https://open.spotify.com/track/5e1PnfGxdnHT4CjJ440iba?si=xqWQVqupRWqmGm4DgSjLQw").then(console.log).catch(console.log)