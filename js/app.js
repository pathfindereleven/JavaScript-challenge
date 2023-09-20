const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function startup() {   
    d3.json(url).then(function(data){
        (data.names).forEach((name) => {(d3.select('#selDataset')).append("option").text(name).property("value", name)}); // populate drop down menu
        build_func(data.names[0])})} ;  // use first value for defualt display
function build_func(x) {           // build function
    d3.json(url).then((data) => { // pull data
        let match = (data.metadata).filter(result => result.id == x);
        d3.select("#sample-metadata").html("");         // clear demo panel
        Object.entries(match[0]).forEach(([key,value]) => { d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)});  // append data by key value pair to demogrphics, end demographics portion start bar portion
        let match1 = (data.samples).filter(result => result.id == x);   // match data to drop down selected id  
        let ybar = match1[0].otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();   // select top 10
        let xbar = match1[0].sample_values.slice(0,10).reverse();                    // select top 10
        let labels_bar = match1[0].otu_labels.slice(0,10).reverse();                  // select top 10
        let trace1 = {x: xbar, y: ybar, text: labels_bar, type: "bar", orientation: "h" };  // build trace for bar chart
        Plotly.newPlot("bar", [trace1])  // end bar portion start bubble
        let trace2= {x:match1[0].otu_ids, y: match1[0].sample_values, text: match1[0].otu_labels, mode: "markers",marker: {size: match1[0].sample_values, color: match1[0].otu_ids, colorscale: "Earth"} }; // buble trace
        let layout = {title: "Bacteria Count", hovermode: "closest",xaxis: {title: "OTU ID"}};
        Plotly.newPlot("bubble", [trace2], layout)})};   // plot bubble chart
startup();  // change option function changed to build_func in html


