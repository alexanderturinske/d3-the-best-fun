const areaScale = d3.scaleLinear().domain([areaMin, areaMax]).range([height - padding.bottom, padding.top]);

const countryNameLengthMin = d3.min(countries, d => d.name.common.length);
const countryNameLengthMax = d3.max(countries, d => d.name.common.length);
const countryNameLengthScale = d3
    .scaleLinear()
    .domain([countryNameLengthMin - 0.1 * countryNameLengthMin, countryNameLengthMax])
    .range([padding.left, width - padding.right]);

// Define svg
let svg = d3
    .select('body')
    .append('svg')
    .classed('areavscountryname', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Set title
svg
    .append('text')
    .attr('x', (width + margin.left + margin.right) / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Country Area VS Country Name Character Length');

// Set y-axis
svg
    .append('g')
    .attr('transform', `translate(${padding.left}, ${padding.bottom})`)
    .call(d3.axisLeft(areaScale).ticks(20));

// Set x-axis
svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(countryNameLengthScale).ticks(30));

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

// Other ideas
// Area vs Latitude
// Area vs Longitude
// Number of languages vs Area
// Number of languages by Country Name
// Area vs Country Name Character Length
