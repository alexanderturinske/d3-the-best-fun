// Area configuration
const areaMin = d3.min(countries, d => isAreaDefined(d, d.area, 0));
const areaMax = d3.max(countries, d => d.area);
const areaScale = d3.scaleLinear().domain([areaMin, areaMax]).range([height - 2 * padding.bottom, padding.top]);
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

// Define svg
let svg = d3
    .select('body')
    .append('svg')
    .classed('area vs graph', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Set title
let title = svg.append('text');

title
    .attr('x', (width + margin.left + margin.right) / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Country Area vs Country Name Character Length');

// Set y-axis
let yAxis = svg.append('g');

yAxis.attr('transform', `translate(${padding.left}, ${padding.bottom})`).call(d3.axisLeft(areaScale).ticks(20));

let yAxisLabel = svg.append('text');

yAxisLabel
    .attr('class', 'y label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text('area (square miles)');

// Set x-axis
let xAxis = svg.append('g');

xAxis
    .attr('transform', `translate(0, ${height - padding.bottom})`)
    .call(d3.axisBottom(countryNameLengthScale).ticks(30));

let xAxisLabel = svg.append('text');

xAxisLabel
    .attr('class', 'x label')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height - padding.bottom + 40)
    .text('# of characters in the common country name');

// Define circles
let circles = svg.selectAll('circle').data(countries).enter().append('circle');

// Define tooltip
var tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

// Set circles
circles
    .attr('cy', d => areaScale(d.area) + padding.bottom)
    .attr('cx', d => countryNameLengthScale(d.name.common.length))
    .attr('r', 5)
    // .attr('fill', d => colorScale(partisanScore(d)))
    .on('mouseover', d => console.log(`${d.name.common}.length = ${d.name.common.length}`));

// Set tooltip behavior
circles
    .on('mouseover', function(d) {
        tooltipDiv.html(`<p>${d.name.common}</p><p>${areaFormat(d.area)} sq mi</p>`);
        var width = parseInt(tooltipDiv.style('width'));
        var height = parseInt(tooltipDiv.style('height'));
        tooltipDiv
            .style('left', `${d3.event.pageX - width / 2 - 10}px`)
            .style('top', `${d3.event.pageY - height - 20}px`)
            .style('opacity', 1);
    })
    .on('mouseout', function() {
        tooltipDiv.style('opacity', 0).style('left', '-1000px');
    });

setTimeout(updateData, 1000);

let t = d3.transition().duration(100);

function updateData() {
    circles.transition(t).attr('cx', d => callingCodeScale(getCallingCode(d)));
    xAxis.transition(t).call(d3.axisBottom(callingCodeScale).ticks(20));
    title.transition(t).text('Country Area vs Calling Code');
    xAxisLabel.transition(t).text('calling code');
}

// Other ideas
// Transition to:
// Area vs Latitude
// Area vs Longitude
// Area vs Calling Code
// Area vs Number of languages spoken

// Other graph ideas
// Number of languages by Country Name Length
// Latitude vs Longitude

// Information
// Number of languages
// Object.keys(d).length
// Latitude
// d.latlng[0]
// Longitude
// d.latlng[1]
// Calling Code
// parseInt(d.callingCode[0])
