// Define svg
let svg = d3
    .select('body')
    .append('svg')
    .classed('graph', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`);

// Set y-axis
let yAxis = svg.append('g');

yAxis.attr('transform', `translate(${padding.left}, ${padding.bottom})`).call(d3.axisLeft(scales.yarea).ticks(20));

let yAxisLabel = svg.append('text');

yAxisLabel
    .attr('class', 'y label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text('area (sq mi)');

// Set x-axis
let xAxis = svg.append('g');

xAxis.attr('transform', `translate(0, ${height - padding.bottom})`).call(d3.axisBottom(scales.xcalling).ticks(30));

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
    .attr('cy', d => scales.yarea(d.area) + padding.bottom)
    .attr('cx', d => scales.xname(d.name.common.length))
    .attr('r', 5);

// Set tooltip behavior
circles
    .on('mouseover', function(d) {
        tooltipDiv.html(`<p>${d.name.common}</p><p>Area: ${areaFormat(d.area)} sq mi</p>`);
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

let t = d3.transition().duration(100);

function updateAxis(e) {
    let axis, axisScale, d3axisScale, label;
    const eleClasses = [...e.classList],
        value = e.value;
    if (eleClasses.indexOf('title__first-select') > -1) {
        axis = yAxis;
        axisScale = d3.axisLeft;
        label = yAxisLabel;
        attr = 'cy';
        axisType = 'y';
    } else {
        axis = xAxis;
        axisScale = d3.axisBottom;
        label = xAxisLabel;
        attr = 'cx';
        axisType = 'x';
    }
    d3axisScale = scales[axisType + value];
    switch (value) {
        case 'language':
            break;
        case 'area':
            break;
        case 'calling':
            circles.transition(t).attr(attr, d => d3axisScale(getCallingCode(d)));
            axis.transition(t).call(axisScale(d3axisScale).ticks(20));
            updateText(label, 'calling code', t);
            break;
        case 'name':
            break;
        case 'latitude':
            break;
        case 'longitude':
            break;
        default:
            break;
    }
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
