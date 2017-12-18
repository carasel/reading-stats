const createBarChart = function(dataset) {
    const width = 600
    const height = 120
    const padding = 2
    const dataset = [
        { author: 'Terry Pratchett', count: 43 },
        { author: 'Alastair Reynolds', count: 10 },
        { author: 'Orson Scott Card', count: 9 },
        { author: 'Arthur C. Clarke', count: 9 },
        { author: 'Iain M. Banks', count: 9 },
        { author: 'Neil Gaiman', count: 8 },
        { author: 'J.K. Rowling', count: 8 },
        { author: 'Eoin Colfer', count: 8 },
        { author: 'Douglas Adams', count: 8 },
        { author: 'Philip Pullman', count: 7 },
        { author: 'Roald Dahl', count: 6 },
        { author: 'Kurt Vonnegut Jr.', count: 6 },
        { author: 'H.G. Wells', count: 5 },
        { author: 'Isaac Asimov', count: 5 },
        { author: 'Anthony Horowitz', count: 5 },
        { author: 'Nick Hornby', count: 5 }
    ]

    d3.select("body").append("svg")
        .attr({
            width: width,
            height: height
        })
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr({
            x: function(data, index) {return index * (width / dataset.length);},
            y: function(data) {return height - (data.count*4);},
            width: width / dataset.length - padding,
            height: function(data) {return data.count*4;}
        });

}