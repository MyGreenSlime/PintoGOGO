const DBname = process.env.DBNAME || localhost
const DBport = process.env.DBNAME || 27017
const databasePinto = "mongodb://"+DBname+":"+DBport+"/PintoGOGO"
module.exports = {
    databaseURI: databasePinto,
    secretOrkey: 'yoursecret'
}