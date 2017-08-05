const scales = {},
    yMin = height - 2 * padding.bottom,
    yMax = 0,
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
