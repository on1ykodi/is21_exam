//гиперболический параболоид
Surface.prototype.hyperbolicParaboloid = (count = 20, p = 2, q = 2) => {
    const points = [];
    const edges = [];
    const polygones = [];
    
    const LEFT = -10;
    const RIGHT = 10;
    const step = (RIGHT - LEFT) / count;
    //add points
    for(let x = LEFT; x < RIGHT; x += step){
        for(let y = LEFT; y < RIGHT; y+= step){
            points.push(new Point(
                x,
                (x ** 2 / p - y ** 2 / q) / 2,
                y
            ));
        }
    }
    //add edges
    for(let i = 0; i < points.length; i++){
        if(points[i + 1] && (i + 1) % count !== 0){
            edges.push(new Edge(i, i + 1));
    }
    if(points[i + count]){
        edges.push(new Edge(i, i + count));
        }
    }
    //add polygones
    for(let i = 0; i < points.length; i++){
        if(points[i + 1 + count] && (i + 1) % count !== 0){
            polygones.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count

            ]));
        }
    }
    return new Subject(points, edges, polygones);
}