module.exports = function Stop(row){
    const stopdata = row.split(",");
    this.stop_id = gen_id();
    this.stop_code = gen_id();
    this.stop_name = stopdata[3];
    this.stop_desc = stopdata[8];
    const coords = String(stopdata[4]).split(" ");
    this.stop_lat = typeof coords !== 'undefined' ? coords[0] : "";
    this.stop_lon = typeof coords !== 'undefined' ? coords[1] : "";
    this.location_type = 0;

    function gen_id(){
        const c = String(stopdata[4]).split(" ");
        const lat = c[0].slice(-3);
        return String(stopdata[3]).toUpperCase().replace(/\//, '').replace(/\s+/g, '') + "-" + lat;
    }
}