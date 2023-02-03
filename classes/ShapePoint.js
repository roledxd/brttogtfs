module.exports = function ShapePoint(row, shape_id, point_number) {
    const sp_data = row.split(',')
    this.shape_id = shape_id;
    const coords = sp_data[1].split(' ');
    this.shape_pt_lat = coords[0];
    this.shape_pt_lon = coords[1];
    this.shape_pt_sequence = point_number;
}