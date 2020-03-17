const   path        = require('path'),
        fs          = require('fs'),
        express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser'),
        port        = process.env.PORT || 5000,
        args        = process.argv.slice(2);
  
let isBuild = false;


// INIT Setting JSON FILE
let settingsPath = path.resolve('./api/settings.json');

try {
    if (!fs.existsSync(settingsPath)) {                
        let jsonData = {"usb":"/dev/ttyUSB0","refresh":"15","modbusCodes":{"powerType":"single","address":"15","frequency":"","v1":"2131","v2":"41324","v3":"1241","i1":"213","i2":"42","i3":"124","p1":"423","p2":"1231","p3":"123","q1":"132","q2":"123","q3":"1421","s1":"12321","s2":"214","s3":"13221"}}
        fs.writeFile(settingsPath, JSON.stringify(jsonData), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
} catch(err) {
    console.error(err)
}






// INIT DATABASE
if(args[0] == 'modbus'  || args[1] == 'modbus' ) require('./api/modbus').initModbus();
if(args[0] == 'build' || args[1] == 'build') {
    //require('./api/modbus').initModbus();
    isBuild = true
}


// EXPRESS PARAM
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'))

// INIT EXPRESS ROUTES
require("./api/routes")(app,isBuild);
