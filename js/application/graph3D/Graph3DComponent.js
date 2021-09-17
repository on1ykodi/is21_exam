class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        this.WINDOW = {
            left: -5,
            bottom: -5, 
            width: 10,
            height: 10,
            center: new Point(0, 0, -40),
            camera: new Point(0, 0, -50)
        }
        this.LIGHT = new Light(-20, 2, 40, 32000);
        this.surface = new Surface();
        this.graph2D = new Graph2D({ 
            id: "graph3D", 
            WINDOW: this.WINDOW,
            width: 800,
            height: 600
        });
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.canRotate = false;
        this.subjects = [];
        this.dx = 0;
        this.dy = 0;
        this.addSubjects();
        this.printScene();
    }
    
    addEventListeners() {
        document.getElementById("graph3D").addEventListener("mouseup", () => this.mouseup());
        document.getElementById("graph3D").addEventListener("mousedown", (event) => this.mousedown(event));
        document.getElementById("graph3D").addEventListener("mouseleave", () => this.mouseleave());
        document.getElementById("graph3D").addEventListener("mousemove", (event) => this.mousemove(event));
        document.getElementById("graph3D").addEventListener("wheel", (event) => this.mousewheel(event));
    }

    clear() {
        this.graph2D.clear('#bbb');
    }

    addSubjects() {
        //this.subjects.push(this.surface.cube(-5, -5, 0, 10));
        //this.subjects.push(this.surface.cube(-10, -25, 0, 5));
        //this.subjects.push(this.surface.cube(3, -25, 0, 2.5));
        //this.subjects.push(this.surface.sphere(-16, -10, 0));
        // this.subjects.push(this.surface.ellips());
       //this.subjects.push(this.surface.cone());
       // this.subjects.push(this.surface.hyperbolicParaboloid());
        //this.subjects.push(this.surface.hyperbolicCilinder());
      // this.subjects.push(this.surface.parabolicCilinder());
       // this.subjects.push(this.surface.ellipticCilinder());
        this.subjects.push(this.surface.EllipticParaboloid());
       // this.subjects.push(this.surface.OneSheetHyperboloid());
       // this.subjects.push(this.surface.TwoSheetHyperboloid());
        //this.subjects.push(this.surface.bublik(32, 20));
    }

    printEdges(subject) {
        for (let i = 0; i < subject.edges.length; ++i)
        {
            const edge = subject.edges[i];
            const p1 = subject.points[edge.p1];
            const p2 = subject.points[edge.p2];
            this.graph2D.drawLine(this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2))
        }
    }

    printPoints(subject) {
        for (let i = 0; i < subject.points.length; ++i)
        {
            const point = subject.points[i];
            this.graph2D.drawText(this.graph3D.xs(point), this.graph3D.ys(point), i, 12, 10, -10, "black");
            this.graph2D.drawPoint(this.graph3D.xs(point), this.graph3D.ys(point));
        }
    }

    printScene() {
        this.clear();
        const polygones = [];
        this.subjects.forEach((subject) => { 
            this.graph3D.calcDistance(subject, this.WINDOW.camera, 'distance');
            this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');

            for (let i = 0; i < subject.polygones.length; ++i) {
                const polygon = subject.polygones[i];
                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let {r, g, b} = polygon.color;
                r = Math.round(r * lumen),
                g = Math.round(g * lumen),
                b = Math.round(b * lumen)
                polygones.push({ 
                    points: polygon.points.map((elem, j) => { 
                        return subject.points[polygon.points[j]]; 
                    }),
                    color: polygon.rgbToHex(r, g, b),
                    distance: polygon.distance
                });
            }
        });
        
        // draw polygones
        this.graph3D.sortByArtistAlgorithm(polygones);
        for (let i = 0; i < polygones.length; ++i) {
            const points = polygones[i].points;
            const array = [];
            for (let j = 0; j < points.length; ++j) {
                array.push({
                    x: this.graph3D.xs(points[j]),
                    y: this.graph3D.ys(points[j])
                });
            }
            this.graph2D.drawPolygon(array, polygones[i].color);
        }

        // draw points and edges
        this.subjects.forEach((subject) => {
            this.printEdges(subject);
            //this.printPoints(subject);
        });
    }

    mouseup() {
        this.canRotate = false;
    }

    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    mouseleave() {
        this.canRotate = false;
    }

    mousewheel(event) {
        let moveStep = (event.deltaY > 0) ? -1 : 1;
        this.graph3D.move(0, 0, moveStep, this.WINDOW.camera);
        this.printScene();
    }

    mousemove(event) {
        const deltaX = event.offsetX - this.dx;
        const deltaY = event.offsetY - this.dy;
        if (this.canRotate) {
            const gradus = 2 * Math.PI / 360 * 1;
            this.subjects.forEach((subject) => {
                subject.points.forEach(point => { 
                    const isRightButton = event.buttons & 2;
                    if (isRightButton) {
                        this.graph3D.rotateOz(deltaY * gradus, point);
                    }
                    else {
                        this.graph3D.rotateOy(deltaX * gradus, point);
                        this.graph3D.rotateOx(deltaY * gradus, point);
                    }
                });
            });
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.printScene();
        }
    }
}