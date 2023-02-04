const ShapePoint = require('./classes/ShapePoint')
const exportcsv = require('./utils/exportcsv');
const Route = require('./classes/Route')
const Stop = require('./classes/Stop')
const exportDir = './export';
const fs = require('fs');

const dir = {
    stops: './input/stops.csv',
    routes: './input/routes.csv',
    shapes: './input/shapes.csv',
    agency: './input/agency.json'
}

console.log("[BRTGTFS] Program is started")

if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
    console.log("[BRTGTFS] Created export firectory.")
} else console.log("[BRTGTFS] Export folder is found!")

const agency = JSON.parse(fs.readFileSync(dir.agency));

exportcsv('agency', [agency]);
console.log("[BRTGTFS] Created an agency file")

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
        }
        if (processed >= stoprows.length - failures) {
            return exportcsv("stops", stops);
        }
    })
} catch (err) {
    return console.log('[BRTGTFS] Failed to read stops input file.\n' + err)
}


var shapesobj = [];
var failures = 0;

try {
    console.log("[BRTGTFS] Reading shapes input file")
    const data = String(fs.readFileSync(dir.shapes, 'utf8'));
    const shapes = data.split(',,,,,,');
    var processed = 0
    shapes.forEach((shape) => {
        processed += 1;
        const shape_points = shape.split('\n');
        if(shape_points.length < 10){
            failures += 1;
            processed -= 1;
        };
        var processed_points = 0;
        shape_points.forEach((shape_point) => {
            if (shape_point.length < 10) return;
            processed_points += 1
            const sp = new ShapePoint(shape_point, processed, processed_points);
            if(shape_point.includes('shape_pt_lat')) return processed_points -= 1;
            if(shape_points.length < 10) return;
            return shapesobj.push(sp);
        })
        if (processed >= shapes.length - failures) {
            exportcsv('shapes', shapesobj)
        }
    })
} catch (err) {
    return console.log('[BRTGTFS] Failed to read stops input file.\n' + err)
}

var routesobj = [];
var failures = 0;

try {
    console.log("[BRTGTFS] Reading routes input file")
    const data = String(fs.readFileSync(dir.routes, 'utf8'));
    const routes = data.split('\r\n');
    var processed = 0
    routes.forEach((route) => {
        if(route.length < 5) return;
        if(route.includes("route_id")) return;
        processed += 1;
        routesobj.push(new Route(route, agency));
    })
    exportcsv('routes', routesobj)
} catch (err) {
    return console.log('[BRTGTFS] Failed to read stops input file.\n' + err)
}