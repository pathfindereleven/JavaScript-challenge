const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function s() {   
    d3.json(url).then(function(data){
        (data.names).forEach((name) => {(d3.select('#se')).append("option").text(name).property("value", name)}); b(data.names[0])})} ;        
function b(x) {           
    d3.json(url).then((data) => { 
        let n = (data.metadata).filter(result => result.id == x); d3.select("#sa").html("");         
        Object.entries(n[0]).forEach(([key,value]) => { d3.select("#sa").append("h5").text(`${key}: ${value}`)}); 
        let m = (data.samples).filter(result => result.id == x); let y = m[0].otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();     
        let z = m[0].sample_values.slice(0,10).reverse(); let p = m[0].otu_labels.slice(0,10).reverse(); let t = {x: z, y: y, text: p, type: "bar", orientation: "h" };                                       
        let u= {x:m[0].otu_ids, y: m[0].sample_values, text: m[0].otu_labels, mode: "markers",marker: {size: m[0].sample_values, color: m[0].otu_ids, colorscale: "Earth"} }; 
        let l = {title: "Bacteria Count", hovermode: "closest",xaxis: {title: "OTU ID"}}; Plotly.newPlot("bubble", [u], l); Plotly.newPlot("bar", [t])})}; s();   
  


