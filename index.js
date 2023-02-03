const fs = require('fs');

const Stop = require('./classes/Stop')

console.log("[BRTGTFS] Program is started")

const exportDir = './export'

if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
    console.log("[BRTGTFS] Created export firectory.")
} else console.log("[BRTGTFS] Export folder is found!")

const dir = {
    stops: './input/stops.csv'
}

var stops = [];
var failures = 0

try {
    console.log("[BRTGTFS] Reading stops input file")
    const data = fs.readFileSync(dir.stops, 'utf8');
    const stoprows = data.split(/\r?\n/);
    var processed = 0
    stoprows.forEach((row) => {
        processed += 1;
        const stop = new Stop(row);
        if (row.length < 5) { failures += 1 };
        if (row.length > 5 && !row.includes("stop_name")) {
            stops.push(stop);
            console.log("[BRTGTFS] Processing... (" + processed + "/" + stoprows.length + ") " + stop.stop_name + " | " + stop.stop_code)
        }
        if (processed >= stoprows.length - failures) {
            console.log("[BRTGTFS] Processing completed! Now exporting...")
            return exportcsv();
        }
    })
} catch (err) {
    return console.log('[BRTGTFS] Failed to read stops input file.\n' + err)
}

function exportcsv(){
    var toexport = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url\n";
    stops.forEach((stop)=>{
        toexport += Object.keys(stop).map(function(k){return stop[k]}).join(",") + ",,\n";
    })
    fs.writeFile(exportDir+"/stops.txt", toexport, { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("[BRTGTFS] Exported near the program to 'export/stops.txt'");
    });
}

