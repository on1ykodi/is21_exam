Surface.prototype.OneSheetHyperboloid = (count = 10, color = "#00ff00") => {
    const points = [];
    const edges = [];
    const polygones = [];
    const PI2 = Math.PI * 2;
    const da = PI2 / count;
    polygones.color = "#ffffff";

    //add points
    for (let z = -count; z <= count; z++) {
        const r = Math.sqrt(1 + z * z);
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
    for (let i = 0; i < points.length; i++) {
        if ((i+1) % count === 0 ) {
            if(points[i + count]) {
                polygones.push(
                    new Polygon([
                        i,
                        i + 1 - count,
                        i + 1,
                        i + count
                    ],)
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
        for (let i = 0; i < polygones.length; ++i) {
            const a = Math.floor(i / count);
            if ((Math.floor(i / 2) + Math.floor(a / 2)) % 2 == 0) {
            polygones[i].color = {r: 255, g: 255, b: 255};
            }
            else {
            polygones[i].color = {r: 0, g: 0, b: 0};
            }
            }
        
            
    } 


    return new Subject(points, edges, polygones);
}
