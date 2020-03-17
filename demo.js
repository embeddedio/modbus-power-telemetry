const   db      = require('./api/db').initDb();
        moment  = require('moment'); 


setInterval(generateData,10000)



function generateData(){
    let data = {
        date_at:moment().format('YYYY-MM-DD'),
        time_at:moment().format('HH:mm:ss'),
        frequency:aleaData(50,52),
        v1:aleaData(219,240),
        v2:aleaData(220,244),
        v3:aleaData(222,244),
        i1:aleaData(5,40),
        i2:aleaData(15,40),
        i3:aleaData(10,40),
        p1:aleaData(1,20), 
        p2:aleaData(4,25),
        p3:aleaData(4,10),
        q1:aleaData(1,7),
        q2:aleaData(1,10),
        q3:aleaData(1,15),
        s1:aleaData(1,11),
        s2:aleaData(1,16),
        s3:aleaData(1,10),
    }

    db.History.insert(data, function(err, result) {if(err) console.log(err)});


}


function aleaData(min,max){
    return Math.random() * max | min;
}


