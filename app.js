var dataUrl = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";


var w = 900, h = 600;
var svg = d3.select("#graph").append("svg").attr("width", w).attr("height", h);

d3.json(dataUrl, function(error, data){
    if(error){
        console.error(error);
    } else {
        var force = d3.layout
                      .force()
                      .nodes(data.nodes)
                      .links(data.links)
                      .size([w, h])
                      .linkDistance(50)
                      .charge(-100).start(); //repel each other
                     
    
        var edges = svg.selectAll(".link")
                       .data(data.links)
                       .enter()
                       .append("line")
                       .style("stroke", "#ccc")
                       .style("stroke-width", 1);
        

        
        var nodes = d3.select("#flags").selectAll('.node').data(data.nodes).enter().append('img')
                      .attr('class', function (d) {
                          return 'flag flag-' + d.code;
                          })
                       .on("mouseover", function(d){                           
                           var xPosition = d3.event.pageX;
                           var yPosition = d3.event.pageY + 14;
                           var countryName = $("#name");
                           countryName.html("<div>" + d.country + "</div>");
                           countryName.css({left:xPosition, top: yPosition, display:"block"});                        
                       }).on("mouseout", function(){
                           var countryName = $("#name");
                           countryName.css("display", "none")
                       })
                      .call(force.drag);




        
        force.on("tick", function(){
            edges.attr("x1", function(d) { return d.source.x; })
                 .attr("y1", function(d) { return d.source.y; })
                 .attr("x2", function(d) { return d.target.x; })
                 .attr("y2", function(d) { return d.target.y; });

          nodes.style('top',function(d){return d.y + 'px'})
               .style('left',function(d){return d.x -6 + 'px'})
        });
    }
})




var colors = d3.scale.category10();

