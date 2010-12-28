var http = require('http');

var locationCache = {};

var LocationsMetric = {
  name: 'Location',
  initialData: {location: []},
  interval: 500,
  ignoreOnEmpty: true, // don't send any data if we don't get any hits

  incrementCallback: function(view) {
    var remoteAddress,
      metric = this,
      host = "api.ipinfodb.com",
      client = http.createClient(80, host);

    if(view.env.ip === "127.0.0.1") {
      remoteAddress = "";
    } else {
      remoteAddress = view.env.ip;
    }

    if(locationCache[remoteAddress]) {
      metric.data.location.push(locationCache[remoteAddress]);
      return;
    }

    client.on('error', function(exception) {
      console.log("IP Lookup exception for: " + remoteAddress);
      console.log(JSON.stringify(exception, null, 2));
    });

	var key = "cfcd0f9a97985c7363de4e68d568a969f71b6e94531855e05cc81d62c97aa2ba"
    //var request = client.request("GET", "/v2/ip_query.php?key=" + key + "&ip=" + remoteAddress + "&timezone=false", {host: host});

    //request.end();

    /*request.on('response', function(resp) {
      var buffer = '';

      resp.on('data', function(chunk) { buffer += chunk; });
      resp.on('end', function() {
        var lat, lon, city;

        if(resp.statusCode < 300) {
          lat = /<Latitude>([0-9\.\-]+)<\/Latitude>/.exec(buffer);
          lon = /<Longitude>([0-9\.\-]+)<\/Longitude>/.exec(buffer);
          city = /<City>(.*)<\/City>/.exec(buffer);
        }

        var location = {
          latitude: lat ? lat[1] : 0,
          longitude: lon ? lon[1] : 0,
          city: city ? city[1] : "Unknown"
        };

        locationCache[remoteAddress] = location;

        metric.data.location.push(location);
      });
    });*/
  }
}

for (var i in LocationsMetric)
  exports[i] = LocationsMetric[i];
