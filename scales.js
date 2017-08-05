const scales = {},
    yMin = height - padding.bottom,
    yMax = margin.top,
    xMin = padding.left,
    xMax = width - padding.right;

// Area configuration
const areaMin = d3.min(countries, d => isAreaDefined(d, d.area, 0));
const areaMax = d3.max(countries, d => d.area);
const areaScale = d3.scaleLinear().domain([areaMin, areaMax]);
// Y-axis
scales.yarea = areaScale.copy().range([yMin, yMax]);
// X-axis
scales.xarea = areaScale.copy().range([xMin, xMax]);
// Additional formatting
const areaFormat = d3.format(',.5r');

// Country Name Length configuration
const countryNameLengthMin = d3.min(countries, d => d.name.common.length);
const countryNameLengthMax = d3.max(countries, d => d.name.common.length);
const countryNameLengthScale = d3
    .scaleLinear()
    .domain([countryNameLengthMin - 0.1 * countryNameLengthMin, countryNameLengthMax]);
// Y-axis
scales.yname = countryNameLengthScale.copy().range([yMin, yMax]);
// X-axis
scales.xname = countryNameLengthScale.copy().range([xMin, xMax]);

// Calling Code configuration
const callingCodeMin = d3.min(countries, d => getCallingCode(d));
const callingCodeMax = d3.max(countries, d => getCallingCode(d));
const callingCodeScale = d3.scaleLinear().domain([callingCodeMin, callingCodeMax]);
// Y-axis
scales.ycalling = callingCodeScale.copy().range([yMin, yMax]);
// X-axis
scales.xcalling = callingCodeScale.copy().range([xMin, xMax]);

// Number of Languages configuration
const languageMin = d3.min(countries, d => Object.keys(d.languages).length);
const languageMax = d3.max(countries, d => Object.keys(d.languages).length);
const languageScale = d3.scaleLinear().domain([languageMin, languageMax]);
// Y-axis
scales.ylanguage = languageScale.copy().range([yMin, yMax]);
// X-axis
scales.xlanguage = languageScale.copy().range([xMin, xMax]);

// Latitude configuration
const latitudeMin = d3.min(countries, d => d.latlng[0]);
const latitudeMax = d3.max(countries, d => d.latlng[0]);
const latitudeScale = d3.scaleLinear().domain([latitudeMin, latitudeMax]);
// Y-axis
scales.ylatitude = latitudeScale.copy().range([yMin, yMax]);
// X-axis
scales.xlatitude = latitudeScale.copy().range([xMin, xMax]);

// Longitude configuration
const longitudeMin = d3.min(countries, d => d.latlng[1]);
const longitudeMax = d3.max(countries, d => d.latlng[1]);
const longitudeScale = d3.scaleLinear().domain([longitudeMin, longitudeMax]);
// Y-axis
scales.ylongitude = longitudeScale.copy().range([yMin, yMax]);
// X-axis
scales.xlongitude = longitudeScale.copy().range([xMin, xMax]);
