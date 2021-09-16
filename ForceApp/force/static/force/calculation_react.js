class CalcInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_friction: 0.15,
            Xcoord: -3,
            Ycoord: 4,
            a: 3,
            b: 5,
            plunger_friction: 0.15,
            springStiff: 4.1,
            freeLen: 10.7,
            springLen: 8.9,
            plungerFric: 0,
            N: 100,
            FN: 10,
        };
    }
    render() {
        return (


            <div className="root">

                <h2>Choose Contact:</h2>
                <div id="contact_key">Save Contact as: </div>
                <input type="text" required id="contact_key"/>
                <button id="save_contact_btn" className="btn btn-success btn-sm">Save</button>
                <button id="delete_contact_btn" className="btn btn-success btn-sm">Delete</button>
                <select id="contacts">
                    <option value="0" defaultValue>Unknown</option>
                </select>
                <div>Friction in contact: </div>
                <input id="contact_friction" type="number" step="0.01" min="0" onChange={this.updateContactFriction} value={this.state.contact_friction} required/>
                <div>X coordinate: </div>
                <input id="contact_Xcoord" type="number" step="0.1" onChange={this.updateXcoord} value={this.state.Xcoord} required/>
                <div>Y coordinate: </div>
                <input id="contact_Ycoord" type="number" step="0.1" onChange={this.updateYcoord} value={this.state.Ycoord} required />
            


                <h2>Choose Plunger:</h2>
                <div id="plunger_key">Save Plunger as: </div>
                <input type="text" required id="plunger_key"/>
                <button id="save_plunger_btn" className="btn btn-success btn-sm">Save</button>
                <button id="delete_plunger_btn" className="btn btn-success btn-sm">Delete</button>
                <select id="plungers">
                    <option value="0" defaultValue>Unknown</option>
                </select>
                <div>Distance A: </div>
                <input id="plunger_a" type="number" step="0.1" min="0" onChange={this.updateA} value={this.state.a} required/>
                <div>Distance B: </div>
                <input id="plunger_b" type="number" step="0.1" min="0" onChange={this.updateB} value={this.state.b} required/>
                <div>Friction in plunger: </div>
                <input id="plunger_friction" type="number" step="0.01" min="0" onChange={this.updatePlungerFriction} value={this.state.plunger_friction} required />
            


                <h2>Choose Spring:</h2>
                <div id="spring_key">Save Spring as: </div>
                <input type="text" required id="spring_key"/>
                <button id="save_spring_btn" className="btn btn-success btn-sm">Save</button>
                <button id="delete_spring_btn" className="btn btn-success btn-sm">Delete</button>
                <select id="springs">
                    <option value="0" defaultValue>Unknown</option>
                </select>
                <div>Spring Stiffness: </div>
                <input id="spring_springStiff" type="number" step="0.1" min="0" onChange={this.updateSpringStiff} value={this.state.springStiff} required/>
                <div>Free length: </div>
                <input id="spring_freeLen" type="number" step="0.1" min="0" onChange={this.updateFreeLen} value={this.state.freeLen} required/>
                <div>Spring length: </div>
                <input id="spring_springLen" type="number" step="0.1" min="0" onChange={this.updateSpringLen} value={this.state.springLen} required />
            


                <h2>Choose Angles:</h2>
                <div id="angles_key">Save Angles as: </div>
                <input type="text" required id="angles_key"/>
                <button id="save_angles_btn" className="btn btn-success btn-sm">Save</button>
                <button id="delete_angles_btn" className="btn btn-success btn-sm">Delete</button>
                <select id="angles">
                    <option value="0" defaultValue>Unknown</option>
                </select>
                <div>Direction of plunger friction forces: </div>
                <input id="angles_plungerFric" type="number" step="180" min="0" max="180" onChange={this.updatePlungerFric} value={this.state.plungerFric} required/>
                <div>Direction of normal reaction force: </div>
                <input id="angles_N" type="number" step="0.1" min="90" max="270" onChange={this.updateN} value={this.state.N} required/>
                <div>Direction of normal reaction friction force: </div>
                <input id="angles_FN" type="number" step="0.1" min="0" onChange={this.updateFN} value={this.state.FN} required />

                <h2>Choose Variables:</h2>
                <select name="variables" id="variables" onChange={this.addOption}>
                    <option value="0" defaultValue>Unknown</option>
                </select>
                <button id="delete_variables_btn" className="btn btn-success btn-sm">Delete</button>
                <button id="save_variables_btn" className="btn btn-success btn-sm">Save</button>

            </div>
        );
    }

    componentDidMount() {

        document.querySelector('#contact_Xcoord').value = this.state.Xcoord;
        document.querySelector('#contact_Ycoord').value = this.state.Ycoord;
        document.querySelector('#plunger_b').value = this.state.b;
        document.querySelector('#plunger_a').value = this.state.a;
        
        unread_emails();

        let select = document.querySelector('#variables');

        let opt1 = document.createElement('option');
        let opt2 = document.createElement('option');
        let opt3 = document.createElement('option');

        opt1.value = 1;
        opt2.value = 2;
        opt3.value = 3;

        opt1.innerHTML = 'Option 1';
        opt2.innerHTML = 'Option 2';
        opt3.innerHTML = 'Option 3';

        select.appendChild(opt1);
        select.appendChild(opt2);
        select.appendChild(opt3);

    }
    addOption() {
        console.log('Option was changed!')
    }

    updateContactFriction = (event) => {unread_emails(); 
        this.setState({
            contact_friction: event.target.value,
        })        
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
        this.state.a, this.state.b);
    }

    updateXcoord = (event) => {unread_emails(); 
        this.setState({
            Xcoord: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, event.target.value, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }

    updateYcoord = (event) => {unread_emails(); 
        this.setState({
            Ycoord: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, event.target.value,
            this.state.a, this.state.b);
            
    }

    updateA = (event) => {unread_emails(); 
        this.setState({
            a: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            event.target.value, this.state.b);
    
    }

    updateB = (event) => {unread_emails(); 
        this.setState({
            b: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, event.target.value);
    
    }

    updatePlungerFriction = (event) => {unread_emails(); 
        this.setState({
            plunger_friction: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }

    updateSpringStiff = (event) => {unread_emails(); 
        this.setState({
            springStiff: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }
    updateFreeLen = (event) => {unread_emails(); 
        this.setState({
            freeLen: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }
    updateSpringLen = (event) => {unread_emails(); 
        this.setState({
            springLen: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }

    updatePlungerFric = (event) => {unread_emails(); 
        this.setState({
            plungerFric: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }
    updateN = (event) => {unread_emails(); 
        this.setState({
            N: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }
    updateFN = (event) => {unread_emails(); 
        this.setState({
            FN: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);
            
    }
}

let reactInputInstance = ReactDOM.render(<CalcInput />, document.querySelector('#calc_input'));

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d');


let scale = 0.8;
let coord = {X: 0, Y: 0}
let mouse = {X: 0, Y: 0}
let pos   = {X: 0, Y: 0}

// initial box size in mm
let mm = 1;

draw_initialization();

// function checked() {
//     if (document.querySelector(`#new_angles`).style.display === 'none') {
//         document.querySelector(`#new_angles`).style.display = 'block';
//         document.querySelector(`#save_angles_btn`).style.display = 'block';

//         document.querySelector(`input#id_angles_key`).value = '';
//         if (document.querySelector(`input#id_plungerFric:checked`)) {
//             document.querySelector(`input#id_plungerFric:checked`).checked = false;
//         }
//         if (document.querySelector(`input#id_FN:checked`)) {
//             document.querySelector(`input#id_FN:checked`).checked = false;
//         }
//         document.querySelector(`input#id_N`).value = '';

// }


    