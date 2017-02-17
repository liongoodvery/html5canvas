
<script type='text/javascript' src='graph.js'></script>
<script type='text/javascript' src='astar.js'></script>
<script type='text/javascript'>
    var graph = new Graph([
        [1,1,1,1],
        [0,1,1,0],
        [0,0,1,1]
    ]);
    var start = graph.nodes[0][0];
    var end = graph.nodes[1][2];
    var result = astar.search(graph.nodes, start, end);
    // result is an array containing the shortest path

    var resultWithDiagonals = astar.search(graph.nodes, start, end, true);
    // result now searches diagonal neighbors as well

    // Weight can easily be added by increasing the values within the graph, and where 0 is infinite (a wall)
    var graphWithWeight = new Graph([
        [1,1,2,30],
        [0,4,1.3,0],
        [0,0,5,1]
    ]);
    var startWithWeight = graphWithWeight.nodes[0][0];
    var endWithWeight = graphWithWeight.nodes[1][2];
    var resultWithWeight = astar.search(graphWithWeight.nodes, startWithWeight, endWithWeight);

    // resultWithWeight is an array containing the shortest path taking into account the weight of a node
</script>