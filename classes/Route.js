module.exports = function Stop(row, agency) {
    const routedata = row.split(",");
    this.route_id = routedata[0];
    this.agency_id = agency.agency_id;
    this.route_short_name = routedata[1].split("-")[1];
    this.route_long_name = routedata[1].replace("-", " - ");
    this.route_type = getRouteType(routedata[3]);
    this.route_dessc = routedata[2];

    function getRouteType(transport) {
        switch (transport) {
            case "tram":
                return 0;
            case "subway":
                return 1;
            case "rail":
                return 2;
            case "bus":
                return 3;
            default:
                return 3;
        }
    }
}