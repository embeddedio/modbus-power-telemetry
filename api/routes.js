const   _           = require('lodash'),
        path        = require('path'),
        fs          = require('fs'),
        moment      = require('moment'),
        serialPort  = require('serialport');

let     listUsbPorts = [];

let settingsPath = path.resolve('./api/settings.json');

module.exports = function(app,isBuild){


app.get('/', function (req, res) {
    //if(!isBuild) res.sendFile(__dirname+'/public/index.html');
    //if(isBuild) res.sendFile(__dirname+'/public/index.html');
    isBuild ? res.sendFile(path.resolve('./build/index.html')) : res.sendFile(__dirname+'/public/index.html')
})



// READ SETTINGS
function readSettings(){
    return JSON.parse(fs.readFileSync(settingsPath))
}


// GET  HISTORY DATA
app.post('/api/history', function (req, res) {
    let db  = require('./db').initDb();

    let {from, to} = moment().format('YYYY-MM-DD');
    if(req.body.from )  from = moment(new Date(req.body.from)).format('YYYY-MM-DD')
    if(req.body.to )    to = moment(new Date(req.body.to)).format('YYYY-MM-DD')

    db.History.find({date_at:{$gte:from,$lte:to} }).sort( { date_at: -1, time_at: -1 } ).toArray(function(err, result) {
        if(err) throw err
            res.json(result)
    })
})

// GET USB Serial PORT NAME
app.get('/api/serial-port', function (req, res) {
    let list = [];
    serialPort.list(function (err, ports) {
        ports.forEach(function (port) {
            if(port.pnpId && port.vendorId && port.productId && port.comName) 
            list.push(port.comName)
            
        });
        res.json(list)
        listUsbPorts = list;

    });
})

// GET SETTINGS
app.get('/api/settings', function (req, res) {
    let settings = readSettings();
    res.json(settings)   
})

// UPDATE SETTINGS
app.post('/api/settings', function (req, res) {
    if(req.body){
        let data = JSON.stringify(req.body)
        console.log('XXX--> ',data)

        fs.writeFileSync(settingsPath, data);      
        readSettings()
    }
    res.json(req.body)
})




// GET  DASHBOARD DATA
app.get('/api/dashboard', function (req, res) {
    let now = moment().format('YYYY-MM-DD')
    let db  = require('./db').initDb();

    db.History.find({date_at:now}).sort('_id').toArray(function(err, result) {
  
           let i = 0;
           let hours = [];
           let oldHour = null;
           let data = {p:[],q:[],s:[]};
           let history = [];
           let totalValues = {p:[],q:[],s:[],i:[]};
           let sumValues = {sumI:0,sumP:0,sumQ:0,sumS:0};
           function loop(){
                if(result && i<result.length){
                    let item = result[i];                    
                    let hour = item.time_at.split(':')[0];

                    if(i>result.length-11) history.push(item)
                    
                    if (hours.indexOf(hour) === -1) hours.push(hour);
                    if(!oldHour) oldHour = hour

                    if(oldHour != hour){

                        let avgP = Number((totalValues.p.reduce((a,b) => a + b, 0) / totalValues.p.length).toFixed(2));
                        let avgQ = Number((totalValues.q.reduce((a,b) => a + b, 0) / totalValues.q.length).toFixed(2));
                        let avgS = Number((totalValues.s.reduce((a,b) => a + b, 0) / totalValues.s.length).toFixed(2));
                                                
                        data.p.push(avgP)
                        data.q.push(avgQ)
                        data.s.push(avgS)
                                               
                        sumValues.sumI = Number((sumValues.sumI + (totalValues.i.reduce((a,b) => a + b, 0))).toFixed(2))
                        sumValues.sumP = Number((sumValues.sumP + (totalValues.p.reduce((a,b) => a + b, 0))).toFixed(2))
                        sumValues.sumQ = Number((sumValues.sumQ + (totalValues.q.reduce((a,b) => a + b, 0))).toFixed(2))
                        sumValues.sumS = Number((sumValues.sumS + (totalValues.s.reduce((a,b) => a + b, 0))).toFixed(2))

                        totalValues = {p:[],q:[],s:[],i:[]}
                        oldHour = hour

                    }
                    
                    totalValues.i.push((item.i1 + item.i2 + item.i3)/3); 
                    totalValues.p.push((item.p1 + item.p2 + item.p3)/3);
                    totalValues.q.push((item.q1 + item.q2 + item.q3)/3);
                    totalValues.s.push((item.s1 + item.s2 + item.s3)/3); 
                    
                    
                    if(i==result.length-1){ 
                        let avgP = Number((totalValues.p.reduce((a,b) => a + b, 0) / totalValues.p.length).toFixed(2));
                        let avgQ = Number((totalValues.q.reduce((a,b) => a + b, 0) / totalValues.q.length).toFixed(2));
                        let avgS = Number((totalValues.s.reduce((a,b) => a + b, 0) / totalValues.s.length).toFixed(2));
                        data.p.push(avgP)
                        data.q.push(avgQ)
                        data.s.push(avgS)                                         

                        sumValues.sumI = Number((sumValues.sumI + (totalValues.i.reduce((a,b) => a + b, 0))).toFixed(2))
                        sumValues.sumP = Number((sumValues.sumP + (totalValues.p.reduce((a,b) => a + b, 0))).toFixed(2))
                        sumValues.sumQ = Number((sumValues.sumQ + (totalValues.q.reduce((a,b) => a + b, 0))).toFixed(2))
                        sumValues.sumS = Number((sumValues.sumS + (totalValues.s.reduce((a,b) => a + b, 0))).toFixed(2))
                    }

                    i++;
                    loop();
                }else{
                    res.json({top:sumValues,history:history,graph:{hours:hours,data:data}})
                }
           }
           return loop();

    })
    
})

}


