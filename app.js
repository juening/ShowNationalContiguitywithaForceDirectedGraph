var dataUrl = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";


var w = 900, h = 600;
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

d3.json(dataUrl, function(error, data){
    if(error){
        console.error(error);
    } else {
        var force = d3.layout
                      .force()
                      .nodes(data.nodes)
                      .links(data.links)
                      .size([w, h])
                      .linkDistance([50])
                      .charge([-100]) //repel each other
                      .start();
    
        var edges = svg.selectAll("line")
                       .data(data.links)
                       .enter()
                       .append("line")
                       .style("stroke", "#ccc")
                       .style("stroke-width", 1);
        
        var nodes = svg.selectAll("circle")
                       .data(data.nodes)
                       .enter()
                       .append("circle")
                       .attr("r", 10)
                       .style("fill", function(d, i){return colors(i);})
                       .call(force.drag);//enable drag and drop
        
        force.on("tick", function(){
            edges.attr("x1", function(d) { return d.source.x; })
                 .attr("y1", function(d) { return d.source.y; })
                 .attr("x2", function(d) { return d.target.x; })
                 .attr("y2", function(d) { return d.target.y; });

            nodes.attr("cx", function(d) { return d.x; })
                 .attr("cy", function(d) { return d.y; });
        });
    }
})




var colors = d3.scale.category10();

