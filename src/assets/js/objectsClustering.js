export function getClustersAPI() {
  //loads clusters of meteorites from API by lat and lng
  //clustering to rectangles, number given by gridDensity
  var APIBaseUrl = "https://data.nasa.gov/resource/gh4g-9sfh.json";
  var AppToken = "HPAC32pmEmvpcMVl7ERlkV1xr";
  var gridDensity = 20;
  var bins = new Array(gridDensity * gridDensity);
  var globLatMin = -90.0;
  var globLngMin = -180.0;
  var latRange = 180.0;
  var lngRange = 360.0;
  var latStep = latRange / gridDensity;
  var lngStep = lngRange / gridDensity;

  for (let latIdx = 0; latIdx < gridDensity; latIdx++) {
    for (let lngIdx = 0; lngIdx < gridDensity; lngIdx++) {
      let latMin = globLatMin + latIdx * latStep;
      let latMax = globLatMin + (latIdx + 1) * latStep;
      let lngMin = globLngMin + lngIdx * lngStep;
      let lngMax = globLngMin + (lngIdx + 1) * lngStep;

      bins[latIdx + gridDensity * lngIdx] = {
        position: {
          //rectangle center
          lat: latMin + (latMax - latMin) / 2,
          lng: lngMin + (lngMax - lngMin) / 2,
        },
        objects: getBoundedAreaObjects(APIBaseUrl, AppToken, latMin, latMax, lngMin, lngMax),
        polygon: [
          //rectangle corners
          { lat: latMin, lng: lngMax },
          { lat: latMin, lng: lngMin },
          { lat: latMax, lng: lngMin },
          { lat: latMax, lng: lngMax },
        ],
      };
    }
  }
  return bins;
}

async function getBoundedAreaObjects(baseUrl, appToken, latMin, latMax, lngMin, lngMax) {
  //load meteorites within the given rectangle from API --> returns promise
  try {
    let response = await fetch(
      baseUrl +
        "?$$app_token=" +
        appToken +
        "&$where=within_polygon(geolocation, 'MULTIPOLYGON (((" +
        lngMin +
        " " +
        latMin +
        ", " +
        lngMin +
        " " +
        latMax +
        ", " +
        lngMax +
        " " +
        latMax +
        ", " +
        lngMax +
        " " +
        latMin +
        ", " +
        lngMin +
        " " +
        latMin +
        ")))')"
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error.response);
    return [];
  }
}
