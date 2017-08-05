// Area configuration
const areaMin = d3.min(countries, d => isAreaDefined(d, d.area, 0));
const areaMax = d3.max(countries, d => d.area);
const areaScale = d3.scaleLinear().domain([areaMin, areaMax]).range([height - 2 * padding.bottom, 0]);
const areaFormat = d3.format(',.5r');

// Country Name Length configuration
const countryNameLengthMin = d3.min(countries, d => d.name.common.length);
const countryNameLengthMax = d3.max(countries, d => d.name.common.length);
const countryNameLengthScale = d3
    .scaleLinear()
    .domain([countryNameLengthMin - 0.1 * countryNameLengthMin, countryNameLengthMax])
    .range([padding.left, width - padding.right]);

// Calling Code configuration
const callingCodeMin = d3.min(countries, d => getCallingCode(d));
const callingCodeMax = d3.max(countries, d => getCallingCode(d));
const callingCodeScale = d3
    .scaleLinear()
    .domain([callingCodeMin, callingCodeMax])
    .range([padding.left, width - padding.right]);
