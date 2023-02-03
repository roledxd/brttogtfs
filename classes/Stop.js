module.exports = function Stop(row, suffix){
    const stopdata = row.split(",");
    this.stop_id = gen_id(suffix);
    this.stop_code = gen_id(suffix);
    this.stop_name = stopdata[3];
    this.stop_desc = stopdata[8];
    const coords = String(stopdata[4]).split(" ");
    this.stop_lat = typeof coords !== 'undefined' ? coords[0] : "";
    this.stop_lon = typeof coords !== 'undefined' ? coords[1] : "";
    this.location_type = 0;

    function gen_id(suffix){
        return String(stopdata[3]).toLowerCase().replace(/\//, '').replace(/\s+/g, '') + suffix;
    }
}