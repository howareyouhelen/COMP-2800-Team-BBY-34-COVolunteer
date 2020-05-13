//   // Draw a line showing the straight distance between the geopoints
function geopoint_distance(pt1, pt2) {
    // console.log(pt1)
    // console.log(pt2)
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = pt1._lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = pt2._lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (pt2._long - pt1._long) * (Math.PI/180); // Radian difference (longitudes)
    
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d * 1.60934; //convert from miles to km
}