const width = 1000;
const height = 600;
const padding = {
    top: 10,
    right: 0,
    bottom: 100,
    left: 80
};
const margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 10
};
const areaFormat = d3.format(',.5r');
const areaMin = d3.min(countries, d => isAreaDefined(d, d.area, 0));
const areaMax = d3.max(countries, d => d.area);
