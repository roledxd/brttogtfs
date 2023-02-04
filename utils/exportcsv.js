const exportDir = './export';

const fs = require('fs');

module.exports = function exportcsv(type, content) {
    var export_content;
    var export_name;
    var export_array = content;
    switch (type) {
        case "stops":
            export_content = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon\n";
            export_name = "stops.txt";
            break;
        case "agency":
            export_content = "agency_id,agency_name,agency_url,agency_timezone\n";
            export_name = "agency.txt";
            break;
        case "routes":
            export_content = "route_id,agency_id,route_short_name,route_long_name,route_type\n";
            export_name = "routes.txt";
            break;
        case "shapes":
            export_content = "shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence\n";
            export_name = "shapes.txt";
            break;
    }
    export_array.forEach((stop) => {
        export_content += Object.keys(stop).map(function (k) { return stop[k] }).join(",") + "\n";
    })
    fs.writeFile(exportDir + "/" + export_name, export_content, { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("[BRTGTFS] Exported " + type + " near the program to 'export/" + type + ".txt'");
    });
}