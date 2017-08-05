const defaultProps = {
    yaxis: scales.yarea,
    ytext: strings.axisTitles.area,
    cy: d => scales.yarea(d.area),
    xaxis: scales.xcalling,
    xtext: strings.axisTitles.calling,
    cx: d => scales.xcalling(getCallingCode(d))
};

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

yAxis.attr('transform', `translate(${padding.left}, 0)`).call(d3.axisLeft(defaultProps.yaxis).ticks(20));

let yAxisLabel = svg.append('text');

yAxisLabel
    .attr('class', 'y label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text(defaultProps.ytext);

// Set x-axis
let xAxis = svg.append('g');

xAxis.attr('transform', `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(defaultProps.xaxis).ticks(30));

let xAxisLabel = svg.append('text');

xAxisLabel
    .attr('class', 'x label')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height - margin.bottom + 40)
    .text(defaultProps.xtext);

// Define circles
let circles = svg.selectAll('circle').data(countries).enter().append('circle');

// Define tooltip
var tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

// Set circles
circles.attr('cy', d => defaultProps.cy(d)).attr('cx', d => defaultProps.cx(d)).attr('r', 5);

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
    axis.transition(t).call(axisScale(d3axisScale).ticks(20));
    updateText(label, value, t);
    switch (value) {
        case 'language':
            circles.transition(t).attr(attr, d => d3axisScale(Object.keys(d.languages).length));
            break;
        case 'area':
            circles.transition(t).attr(attr, d => d3axisScale(d.area));
            break;
        case 'calling':
            circles.transition(t).attr(attr, d => d3axisScale(getCallingCode(d)));
            break;
        case 'name':
            circles.transition(t).attr(attr, d => d3axisScale(d.name.common.length));
            break;
        case 'latitude':
            circles.transition(t).attr(attr, d => d3axisScale(d.latlng[0]));
            break;
        case 'longitude':
            circles.transition(t).attr(attr, d => d3axisScale(d.latlng[1]));
            break;
        default:
            circles.transition(t).attr(attr, d => 0);
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
