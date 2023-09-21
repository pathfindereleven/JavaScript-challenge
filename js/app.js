const url = d3.select("q").text()
function s() {   
    d3.json(url).then(function(d){
        (d.names).forEach((i) => {(d3.select('#se')).append("option").text(i).property("value", i)}); b(d.names[0])})} ;        
function b(x) {           
    d3.json(url).then((d) => { 
        let n = (d.metadata).filter(r => r.id == x); d3.select("#sa").html("");         
        Object.entries(n[0]).forEach(([k,v]) => { d3.select("#sa").append("h5").text(`${k}: ${v}`)}); 
        let m = (d.samples).filter(r => r.id == x); let y = m[0].otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();     
        let z = m[0].sample_values.slice(0,10).reverse(); let p = m[0].otu_labels.slice(0,10).reverse(); let t = {x: z, y: y, text: p, type: "bar", orientation: "h" };                                       
        let u= {x:m[0].otu_ids, y: m[0].sample_values, text: m[0].otu_labels, mode: "markers",marker: {size: m[0].sample_values, color: m[0].otu_ids, colorscale: "Earth"} }; 
        let l = {title: "Bacteria Count", hovermode: "closest",xaxis: {title: "OTU ID"}}; Plotly.newPlot("bubble", [u], l); Plotly.newPlot("bar", [t])})}; s();   
  


