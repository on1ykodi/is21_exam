class App extends Component {
    constructor(options) {
        super(options);
        this.header = new Header({
			id: 'header', 
			parent: this.id, 
			template: template.headerTemplate, 
			callbacks: {
				showGraph2D: () => this.showGraph2D(),
				showGraph3D: () => this.showGraph3D(),
				showCalculator: () => this.showCalculator()
			}
        });
		this.graph2D = new Graph2DComponent({
			id: 'componentGraph2D',
			parent: this.id,
			template: template.graph2DTemplate,
		});
		this.graph3D = new Graph3DComponent({
			id: 'componentGraph3D',
			parent: this.id,
			template: template.graph3DTemplate,
		});
		this.calculator = new CalculatorComponent({
			id: 'componentCalculator',
			parent: this.id,
			template: template.calculatorTemplate,
		});

		this.graph2D.hide();
		this.graph3D.hide();
		this.calculator.hide();
    }
	
    showGraph2D() {
		this.graph2D.show();
		this.graph3D.hide();
		this.calculator.hide();
	}
	showGraph3D() {
		this.graph3D.show();
		this.graph2D.hide();
		this.calculator.hide();
	}
	showCalculator() {
		this.calculator.show();
		this.graph2D.hide();
		this.graph3D.hide();
	}
}