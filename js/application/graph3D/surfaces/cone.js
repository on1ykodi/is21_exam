Surface.prototype.cone = (count = 10) => {
    const points = [];
    const edges = [];
    const polygones = [];
    const PI2 = Math.PI * 2;
    const da = PI2 / count;

    //add points
    for (let z = -count; z <= count; z++) {
        const r = Math.sqrt(z * z);
        for (let a = 0; a < PI2; a += da) {
            points.push(new Point(
                r * Math.cos(a),
                r * Math.sin(a),
                z
            ));
        }
    }

    //add edges
    for(let i = 0; i < points.length; i++) {
        //horiz edges
        if (points[i + 1]) {
            if ((i+1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        //vertic edges
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }

    //add polygones
    for (let i =0; i < points.length; i++) {
        if ((i+1) % count === 0 ) {
            if(points[i + count]) {
                polygones.push(
                    new Polygon([
                        i,
                        i + 1 - count,
                        i + 1,
                        i + count
                    ])
                );
            }
        } else {
            if (points[i + count + 1]) {
                polygones.push(
                    new Polygon([
                        i,
                        i + 1,
                        i + 1 + count,
                        i + count
                    ])
                );
            }
        }
    }

    return new Subject(points, edges, polygones);
}