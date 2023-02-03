const fs = require('fs');

const Stop = require('./classes/Stop')

const exportDir = './export';

const exportcsv = require('./utils/exportcsv');

console.log("[BRTGTFS] Program is started")

if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
    console.log("[BRTGTFS] Created export firectory.")
} else console.log("[BRTGTFS] Export folder is found!")

const dir = {
    stops: './input/stops.csv',
    routes: './input/routes.csv',
    shapes: './input/shapes.csv'
}

var stops = [];
var failures = 0

var stopnames = []

try {
    console.log("[BRTGTFS] Reading stops input file")
    const data = fs.readFileSync(dir.stops, 'utf8');
    const stoprows = data.split(/\r?\n/);
    var processed = 0
    stoprows.forEach((row) => {
        processed += 1;
        const stopname = row.split(",")[3];
        stopnames.push(stopname);
        const dubs = stopnames.filter(n => n == stopname).length;
        const suffix = dubs <= 1 ? "" : "-" + dubs;
        const stop = new Stop(row, suffix);
        if (row.length < 5) { failures += 1 };
        if (row.length > 5 && !row.includes("stop_name")) {
            stops.push(stop);
            //console.log("[BRTGTFS] Processing... (" + processed + "/" + stoprows.length + ") " + stop.stop_name + " | " + stop.stop_code)
        }
        if (processed >= stoprows.length - failures) {
            console.log("[BRTGTFS] Processing completed! Now exporting...")
            return exportcsv("stops", stops);
        }
    })
} catch (err) {
    return console.log('[BRTGTFS] Failed to read stops input file.\n' + err)
}

<<<<<<< HEAD

var shapesobj = [];

try {
    console.log("[BRTGTFS] Reading shapes input file")
    const data = String(fs.readFileSync(dir.shapes, 'utf8'));
    const shapes = data.split(',,,,,');
    shapes.shift(); //remove header
    var processed = 0
    shapes.forEach((shape) => {
        processed += 1;
        const shape_points = shape.split('\n');
        var processed_points = 0;
        shape_points.forEach((shape_point) => {
            if (shape_point.length < 10) return;
            processed_points += 1
            const sp = new ShapePoint(shape_point, processed, processed_points);
            return shapesobj.push(sp);
        })
        if (processed >= shapes.length) {
            exportcsv('shapes', shapesobj)
        }
=======
function exportcsv(){
    var toexport = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url\n";
    stops.forEach((stop)=>{
        toexport += Object.keys(stop).map(function(k){return stop[k]}).join(",") + ",,\n";
>>>>>>> e4738b91d4dc811b1b2e16fcf8401d50f1296091
    })
} catch (err) {
    return console.log('[BRTGTFS] Failed to read stops input file.\n' + err)
}

function ShapePoint(row, shape_id, point_number) {
    const sp_data = row.split(',')
    this.shape_id = shape_id;
    const coords = sp_data[1].split(' ');
    this.shape_pt_lat = coords[0];
    this.shape_pt_lon = coords[1];
    this.shape_pt_sequence = point_number;
}

