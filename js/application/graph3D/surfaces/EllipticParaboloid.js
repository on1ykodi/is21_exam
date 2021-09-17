Surface.prototype.EllipticParaboloid = (count = 20, p = 2, q = 2) => {
    const points = [];
    const edges = [];
    const polygones = [];
    

    const PI2 = Math.PI * 2;
    const da = PI2 / count;

    //add points
    for(let z = -count; z <= count; z++){
        const r = Math.sqrt(z)
        for(let a = 0; a < PI2; a += da){
            points.push(new Point(
                r * Math.cos(a),
                r * Math.sin(a),
                z
            ));
        }
    }
   // add edges
    for(let i = 0; i < points.length; i++){
        if(points[i + 1] && (i + 1) % count !== 0){
            edges.push(new Edge(i, i + 1));
    } else {
        edges.push(new Edge(i, i + 1 - count));
    }
    if(points[i + count]){
        edges.push(new Edge(i, i + count));
        }
    }
  //  add polygones
    for(let i = 0; i < points.length; i++){
        if(points[i + 1 + count] && (i + 1) % count !== 0){
            polygones.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count

            ]));
        } else {
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
            }
        }
    }

    /*let j = 0;
    for(let n = 0; n < count; n++ ) {
        j+=30;
        for (let i = 0; i < polygones.length; i++) {
            polygones[i].color = {r: j + i + 5, g: j - i + 10, b: 200}
        }
    }*/

    for (let i = 0; i < polygones.length; i++) {
        const index = polygones[i].points[0];

        let frac = points[index].z / 5;
        polygones[i].color = {r: 0, g: 255 * frac, b: 255 * frac}
    }


    

    return new Subject(points, edges, polygones);
}