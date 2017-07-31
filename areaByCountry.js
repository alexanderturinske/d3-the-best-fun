const areaScale = d3.scaleLinear().domain([areaMin, areaMax]).range([height, padding.bottom]);

const barScale = d3
    .scaleBand()
    .domain(countries.map(d => d.name.common))
    .range([padding.left, width - padding.right])
    .padding(0.1);

// Define svg
d3
    .select('body')
    .append('svg')
    .classed('areabycountry', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

let svg = d3.selectAll('#areabycountry');
// Set title
svg
    .append('text')
    .attr('x', (width + margin.left + margin.right) / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Area by Country Name');

// Define rectangles
let rects = svg.selectAll('rect').data(countries).enter().append('rect');

// Set rectangles
rects
    .attr('width', barScale.bandwidth())
    .attr('height', d => isAreaDefined(d, height - areaScale(d.area), 0))
    .attr('x', d => barScale(d.name.common))
    .attr('y', d => isAreaDefined(d, areaScale(d.area) - padding.bottom + padding.top, 0));

// Set y-axis
svg
    .append('g')
    .attr('transform', `translate(${padding.left}, ${-padding.bottom + padding.top})`)
    .call(d3.axisLeft(areaScale).ticks(20));

// Set x-axis
svg
    .append('g')
    .attr('transform', `translate(0, ${height - padding.bottom + padding.top})`)
    .call(d3.axisBottom(barScale))
    .selectAll('text')
    .attr('transform', `rotate(90) translate(${padding.top}, ${-8 - barScale.bandwidth() / 2})`)
    .attr('text-anchor', 'start');

// Define tooltip
var tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

// Set tooltip behavior
rects
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
