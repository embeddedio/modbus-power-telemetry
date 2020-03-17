const modbus = require("modbus-stream"),
      path   = require('path'),
      moment = require('moment'),
      fs     = require('fs');


exports.initModbus = function(){
    let settingsPath = path.resolve('./api/settings.json');
    
    let settings = JSON.parse(fs.readFileSync(settingsPath))

    setInterval(readModbusRegister,settings.refresh*1000)
    async function readModbusRegister(){
        
        let i =0;
        let promiseData = await Promise.all([
            initBus(settings,settings.modbusCodes.frequency),
            initBus(settings,settings.modbusCodes.v1),
            initBus(settings,settings.modbusCodes.v1),
            initBus(settings,settings.modbusCodes.v1),
            initBus(settings,settings.modbusCodes.i1),
            initBus(settings,settings.modbusCodes.i2),
            initBus(settings,settings.modbusCodes.i3),
            initBus(settings,settings.modbusCodes.p1),
            initBus(settings,settings.modbusCodes.p2),
            initBus(settings,settings.modbusCodes.p3),
            initBus(settings,settings.modbusCodes.q1),
            initBus(settings,settings.modbusCodes.q2),
            initBus(settings,settings.modbusCodes.q3),
            initBus(settings,settings.modbusCodes.s1),
            initBus(settings,settings.modbusCodes.s2),
            initBus(settings,settings.modbusCodes.s3)
        ]);

        let data =  {
            date_at:moment().format('YYYY-MM-DD'),
            time_at:moment().format('HH:mm:ss'),
            frequency: promiseData[0],
            v1: promiseData[1],
            v2: promiseData[2],
            v3: promiseData[3],
            i1: promiseData[4],
            i2: promiseData[5],
            i3: promiseData[6],
            p1: promiseData[7],
            p2: promiseData[8],
            p3: promiseData[9],
            q1: promiseData[10],
            q2: promiseData[11],
            q3: promiseData[12],
            s1: promiseData[13],
            s2: promiseData[14],
            s3: promiseData[15]
        }        
        saveData(data)
    }
    

}


function initBus(settings,add){
    return new Promise(resolve => {
        modbus.serial.connect(settings.usb, {
            baudRate : 9600,
            dataBits : 8,
            stopBits : 1,
            retry    : 1000,
            slaveId  : settings.modbusCodes.address,
            parity   : "none",
            debug    : "automaton-123"
        }, (err, connection) => {
            if (err) throw err;
            connection.readHoldingRegisters({ address: add, quantity: 2}, (err, res) =>{
                if (err != null){
                    throw err;
                }
                else{
                    let buffer = res.response.data;
                    let hex = buffer[1].toString('hex');
                    let num = parseInt(buffer[1].toString("hex"), 16)
                    console.log('address: ',theAdresse,' -->   hex: ', hex,' -->   Value: ', num);
                    resolve(num)
                }
            });            
        })
    });

}







function saveData(data){
    let db = require('./db').initDb();
        db.History.insert(data, function(err, result) {if(err) console.log ('error', err)});


}
