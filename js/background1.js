$(function(){
    console.log('hello');
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var width = $(window).width() - margin.left - margin.right;
    var height = $(window).height() - margin.top - margin.bottom;

    var randomX = d3.random.normal(width / 2, 80),
        randomY = d3.random.normal(height / 2, 80),
        points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

    var color = d3.scale.linear()
        .domain([0, 20])
        .range(["white", "steelblue"])
        .interpolate(d3.interpolateLab);

    var hexbin = d3.hexbin()
        .size([width, height])
        .radius(20);

    var x = d3.scale.identity()
        .domain([0, width]);

    var y = d3.scale.linear()
        .domain([0, height])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(6, -height);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(6, -width);

    var svg = d3.select("#projects").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("class", "mesh")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("clip-path", "url(#clip)")
      .selectAll(".hexagon")
        .data(hexbin(points))
      .enter().append("path")
        .attr("class", "hexagon")
        .attr("d", hexbin.hexagon())
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .style("fill", function(d) { return color(d.length); });

    $('#projects').height( $(window).height());

});