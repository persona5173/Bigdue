/**
 * Created by jinhyeok on 2018. 1. 22..
 */
var nodes = [];
var edges = [];
var network = null;

var LENGTH_MAIN = 1000,
    LENGTH_SERVER = 100,
    LENGTH_SUB = 100,
    WIDTH_SCALE = 1,
    GREEN = 'green',
    RED = '#C5000B',
    ORANGE = 'orange',
    GRAY = '#6E6E6E',
    BLACK = '#2B1B17';

var options = {
    nodes: {
      scaling: {
        min: 16,
        max: 50
      }
    },
    edges: {
      arrows: {
        to:     {enabled: true, scaleFactor:1, type:'arrow'},
        middle: {enabled: false, scaleFactor:3, type:'arrow'},
        from:   {enabled: false, scaleFactor:3, type:'arrow'}
      },
      color: GRAY,
      smooth: true
    },
    physics:{
      barnesHut:{gravitationalConstant:-30000},
      stabilization: {iterations:2500}
    },
    groups: {
      'switch': {
        shape: 'dot',
        color: '#2B7CE9' // blue
      },
      desktop: {
        shape: 'dot',
        color: "#2B7CE9" // blue
      },
      mobile: {
        shape: 'dot',
        color: "#5A1E5C" // purple
      },
      server: {
        shape: 'dot',
        color: "#C5000B" // red
      },
      internet: {
        shape: 'dot',
        color: "#109618" // green
      }
    }
  };
// get edge
function readEdgeCSV() {
    $.ajax({
        type:'GET',
        url: 'edge.csv',
        async: false,
        dataType: 'text',
      }).done(add_edge);
}
// get node
function readNodeCSV() {
    $.ajax({
        type:'GET',
        url: 'node.csv',
        async: false,
        dataType: 'text',
      }).done(add_node);
}

function add_node(data){
    var reg= /\r?\n|\r/;
    var csv = data.split(reg);
    // Push all the nodes.
    for(var row = 1; row < csv.length; row++){
        var parsed = csv[row].split(',');
        var srcIp = parsed[0];
        var weight = parsed[1];
        console.log(srcIp);
        nodes.push({id: srcIp, label: srcIp, group: 'internet', value: weight});
    }
}

/**
 * Append nodes and edges after parsing the CSV files.
 * @author ryan
 * @param {*} data
 */
function add_edge(data) {
    readNodeCSV() // Create nodes
    var reg= /\r?\n|\r/;
    var csv = data.split(reg);

    // Create edges
    for(var row = 1; row < csv.length; row++) {
        var parsed = csv[row].split(',');
        var sip = parsed[0];
        var dip = parsed[1];
        var wid = parsed[2];
        console.log(wid);
        edges.push({from: sip, to: dip, length: LENGTH_SUB, color: GRAY,
                    fontColor: GRAY, width: wid});
    }
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges
    };
    // Pushes all created data to Chart Library
    network = new vis.Network(container, data, options);
    network.on("stabilizationIterationsDone", function () {
      network.setOptions({
          nodes: {physics: false},
          edges: {physics: false},
      });
  });
}