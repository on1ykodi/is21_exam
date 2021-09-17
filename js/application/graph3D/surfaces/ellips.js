Surface.prototype.ellips = (x = 0, y = 0, z = 0, a = 10, b = 10, c = 10, count = 10) => {
        const points = [];
        const edges = [];
        const polygones = [];
        const PI2 = Math.PI * 2;
        const da = PI2 / count;
        const verticA = Math.PI / count;
        const horizA = 2*Math.PI / count;
    
        //add points
        for (let i = 0; i < count + 1; i++) {
            for (let j = 0; j < count; j++) {
                points.push(
                    new Point(
                        x + a * Math.sin(verticA * i) * Math.cos(horizA * j),
                        y + b * Math.sin(verticA * i) * Math.sin(horizA * j),
                        z + c * Math.cos(verticA* i)
                    )
                );
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