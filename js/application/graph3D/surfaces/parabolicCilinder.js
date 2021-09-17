Surface.prototype.parabolicCilinder = (x = 0, y = 0, z = 0, a = -2, b = 2, h = 8, count = 15) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPoints() {
        const step = (b - a) / (count - 1);
        for (let pz = 0; pz <= h; pz += h / (count - 1)) {
            for (let px = a; px <= b; px += step) {
                points.push(new Point(x + px, y + px ** 2, z + pz));
            }
        }
    }

    function createEdges() {
        for (let i = 0; i < points.length; ++i) {
            if ((i+1) % count != 0) {
                edges.push(new Edge(i, i+1));
            }
        }

        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count - 1; ++j) {
                edges.push(new Edge(i + j * count, i + (j+1) * count));
            }
        }
    }

    function createPolygons() {
        for (let i = 0; i < count - 1; ++i) {
            for (let j = 0; j < count - 1; ++j) {
                polygones.push(new Polygon([
                    i * count + j,
                    (i + 1) * count + j, 
                    (i + 1) * count + (j + 1),
                    i * count + (j + 1),
                ]));
            }
        }

    /*    for (let i = 0; i < polygones.length; ++i)
        {
            const n = Math.floor(i / 2);
            const level = Math.floor(i / (count - 1));
            if (i % 3 == 0) {
                polygones[i].color = { r: 255, g: 255, b: 255 };
        } else {
            polygones[i].color = {r:0,g:0,b:0}
        }
    }*/
}
for (let i = 0; i < polygones.length; ++i) {
    const a = Math.floor(i / pointCount);
    if ((Math.floor(i / 2) + Math.floor(a / 2)) % 2 == 0) {
    polygones[i].color = {r: 255, g: 255, b: 255};
    }
    else {
    polygones[i].color = {r: 0, g: 0, b: 0};
    }
    }

    createPoints();
    createEdges();
    createPolygons();
    return new Subject(points, edges, polygones);
};
