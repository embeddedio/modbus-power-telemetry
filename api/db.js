exports.initDb = function(){
    const   Db      = require('tingodb')().Db,
            db      = new Db('./database', {});

    let History = db.collection("history");
    let Settings = db.collection("settings");
    return {db:db,History:History,Settings:Settings}
}


