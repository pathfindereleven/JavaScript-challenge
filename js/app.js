//deffine url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function startup() {  
    var menu = d3.select('#selDataset');  
    d3.json(url).then(function(data){
        var names = data.names;
        names.forEach((name) => {menu.append("option").text(name).property("value", name)}); // populate drop down menu
        build_func(names[0])});  // use first value for defualt display
} ;
function build_func(x) {           // build function
    d3.json(url).then((data) => { // pull data
        let metadata = data.metadata;
        let match = metadata.filter(result => result.id == x);
        // make demographics panel
        Object.entries(match[0]).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`); // append data by key value pair to demogrphics
        }); // end demographics portion start bar portion
        let match1 = (data.samples).filter(result => result.id == x);   // match data to drop down selected id
        let otu_ids1 = match1[0].otu_ids;
        let otu_labels1 = match1[0].otu_labels;
        let sample_values1 = match1[0].sample_values;
        let ybar = otu_ids1.slice(0,10).map(id => `OTU ${id}`).reverse();   // select top 10
        let xbar = sample_values1.slice(0,10).reverse();                    // select top 10
        let labels_bar = otu_labels1.slice(0,10).reverse();                  // select top 10
        let trace1 = {x: xbar, y: ybar, text: labels_bar, type: "bar", orientation: "h" };  // build trace for bar chart
        Plotly.newPlot("bar", [trace1])
        // end bar portion start bubble
        let trace2= {     /// build trace for bubble chart
            x: otu_ids1,
            y: sample_values1,
            text: otu_labels1,
            mode: "markers",
            marker: {size: sample_values1, color: otu_ids1, colorscale: "Earth"} };
        let layout = {title: "Bacteria Count", hovermode: "closest",xaxis: {title: "OTU ID"}};
        Plotly.newPlot("bubble", [trace2], layout)});   // plot bubble chart
};
startup();   //(note the change options fuction in the html has been changed to the build function for effeciancy)