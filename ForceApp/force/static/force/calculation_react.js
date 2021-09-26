class CalcInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_friction: 0.15,
            Xcoord: 1,
            Ycoord: 1,

            a: 1,
            b: 1,
            plunger_friction: 0.15,

            springStiff: 4.1,
            freeLen: 10.7,
            springLen: 8.9,

            plungerFric: "0",
            N: 120,
            FN: '+',

            contact_status: 0,
            plunger_status: 0,
            spring_status: 0,
            angles_status: 0,
            variables_status: 0,
        };
    }
    render() {
        return (


            <div className="root">

                <h2>Choose Contact:</h2>
                <input type="text" id="contact_key"/>
                <button id="save_contact_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickContactSave}>Save</button>
                <button id="delete_contact_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickContactDelete}>Delete</button>
                <button id="edit_contact_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickContactEdit}>Save edited</button>
                <select id="contact" onChange={this.chooseContactOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <div>Friction in contact: </div>
                <input id="contact_friction" type="number" step="0.01" min="0" onChange={this.updateContactFriction} value={this.state.contact_friction}/>
                <div>X coordinate: </div>
                <input id="contact_Xcoord" type="number" step="0.1" onChange={this.updateXcoord} value={this.state.Xcoord}/>
                <div>Y coordinate: </div>
                <input id="contact_Ycoord" type="number" step="0.1" onChange={this.updateYcoord} value={this.state.Ycoord}/>
            


                <h2>Choose Plunger:</h2>
                <input type="text" id="plunger_key"/>
                <button id="save_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerSave}>Save</button>
                <button id="delete_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerDelete}>Delete</button>
                <button id="edit_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerEdit}>Save edited</button>

                <select id="plunger" onChange={this.choosePlungerOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <div>Distance A: </div>
                <input id="plunger_a" type="number" step="0.1" min="0" onChange={this.updateA} value={this.state.a}/>
                <div>Distance B: </div>
                <input id="plunger_b" type="number" step="0.1" min="0" onChange={this.updateB} value={this.state.b}/>
                <div>Friction in plunger: </div>
                <input id="plunger_friction" type="number" step="0.01" min="0" onChange={this.updatePlungerFriction} value={this.state.plunger_friction}/>
            


                <h2>Choose Spring:</h2>
                <input type="text" id="spring_key"/>
                <button id="save_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringSave}>Save</button>
                <button id="delete_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringDelete}>Delete</button>
                <button id="edit_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringEdit}>Save edited</button>

                <select id="spring" onChange={this.chooseSpringOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <div>Spring Stiffness: </div>
                <input id="spring_springStiff" type="number" step="0.1" min="0" onChange={this.updateSpringStiff} value={this.state.springStiff}/>
                <div>Free length: </div>
                <input id="spring_freeLen" type="number" step="0.1" min="0" onChange={this.updateFreeLen} value={this.state.freeLen}/>
                <div>Spring length: </div>
                <input id="spring_springLen" type="number" step="0.1" min="0" onChange={this.updateSpringLen} value={this.state.springLen}/>
            


                <h2>Choose Angles:</h2>
                <input type="text" id="angles_key"/>
                <button id="save_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesSave}>Save</button>
                <button id="delete_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesDelete}>Delete</button>
                <button id="edit_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesEdit}>Save edited</button>

                <select id="angles" onChange={this.chooseAnglesOption}>
                    <option value="None" defaultValue>Create</option>
                </select>

                <div>Direction of plunger friction forces: </div>
                <input id="angles_plungerFric0" type="radio" name="PlungerFric" className="form-check-input"
                    value="0" checked={this.state.plungerFric === "0"} onChange={this.updatePlungerFric}/>
                <label htmlFor="angles_plungerFric0">0 deg</label>

                <input id="angles_plungerFric180" type="radio" name="PlungerFric" className="form-check-input"
                    value="180" checked={this.state.plungerFric === "180"} onChange={this.updatePlungerFric}/>
                <label htmlFor="angles_plungerFric180">180 deg</label>

                <div>Direction of normal reaction force: </div>
                <input id="angles_N" type="number" step="1" min="90" max="270" onChange={this.updateN} value={this.state.N}/>
                
                <div>Direction of normal reaction friction force: </div>
                <input id="angles_FNplus" type="radio" name="FN" className="form-check-input"
                    value="+" checked={this.state.FN === "+"} onChange={this.updateFN}/>
                <label htmlFor="angles_FNplus"> + 90 deg</label>

                <input id="angles_FNminus" type="radio" name="FN"className="form-check-input"
                    value="-" checked={this.state.FN === "-"} onChange={this.updateFN}/>
                <label htmlFor="angles_FNminus"> - 90 deg</label>



                <h2>Choose Variables:</h2>
                <input type="text" required id="variables_key"/>
                <select id="variables" onChange={this.chooseVariablesOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <button id="delete_variables_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickVariablesSave}>Delete</button>
                <button id="save_variables_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickVariablesDelete}>Save</button>
                <button id="edit_variables_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickVariablesEdit}>Save edited</button>


            </div>
        );
    }

    hideAlldelete() {
        document.querySelector('#delete_contact_btn').style.display = 'none';
        document.querySelector('#delete_plunger_btn').style.display = 'none';
        document.querySelector('#delete_spring_btn').style.display = 'none';
        document.querySelector('#delete_angles_btn').style.display = 'none';
        document.querySelector('#delete_variables_btn').style.display = 'none';
    }
    showAlldelete() {
        document.querySelector('#delete_contact_btn').style.display = 'flex';
        document.querySelector('#delete_plunger_btn').style.display = 'flex';
        document.querySelector('#delete_spring_btn').style.display = 'flex';
        document.querySelector('#delete_angles_btn').style.display = 'flex';
        document.querySelector('#delete_variables_btn').style.display = 'flex';
    }
//
    hideAllsave() {
        document.querySelector('#save_contact_btn').style.display = 'none';
        document.querySelector('#save_plunger_btn').style.display = 'none';
        document.querySelector('#save_spring_btn').style.display = 'none';
        document.querySelector('#save_angles_btn').style.display = 'none';
        document.querySelector('#save_variables_btn').style.display = 'none';
    }
    showAllsave() {
        document.querySelector('#save_contact_btn').style.display = 'flex';
        document.querySelector('#save_plunger_btn').style.display = 'flex';
        document.querySelector('#save_spring_btn').style.display = 'flex';
        document.querySelector('#save_angles_btn').style.display = 'flex';
        document.querySelector('#save_variables_btn').style.display = 'flex';
    }
//
    hideAlledit() {
        document.querySelector('#edit_contact_btn').style.display = 'none';
        document.querySelector('#edit_plunger_btn').style.display = 'none';
        document.querySelector('#edit_spring_btn').style.display = 'none';
        document.querySelector('#edit_angles_btn').style.display = 'none';
        document.querySelector('#edit_variables_btn').style.display = 'none';
    }
    showAlledit() {
        document.querySelector('#edit_contact_btn').style.display = 'flex';
        document.querySelector('#edit_plunger_btn').style.display = 'flex';
        document.querySelector('#edit_spring_btn').style.display = 'flex';
        document.querySelector('#edit_angles_btn').style.display = 'flex';
        document.querySelector('#edit_variables_btn').style.display = 'flex';
    }
//
    hideAllkey() {
        document.querySelector('#contact_key').style.display = 'none';
        document.querySelector('#plunger_key').style.display = 'none';
        document.querySelector('#spring_key').style.display = 'none';
        document.querySelector('#angles_key').style.display = 'none';
        document.querySelector('#variables_key').style.display = 'none';
    }
    showAllkey() {
        document.querySelector('#contact_key').style.display = 'flex';
        document.querySelector('#plunger_key').style.display = 'flex';
        document.querySelector('#spring_key').style.display = 'flex';
        document.querySelector('#angles_key').style.display = 'flex';
        document.querySelector('#variables_key').style.display = 'flex';
    }
//
    newState(name) {
        document.querySelector(`#delete_${name}_btn`).style.display = 'none';
        document.querySelector(`#save_${name}_btn`).style.display = 'flex';
        document.querySelector(`#${name}_key`).style.display = 'flex';
        document.querySelector(`#edit_${name}_btn`).style.display = 'none';
    }
    activeState(name) {
        document.querySelector(`#delete_${name}_btn`).style.display = 'flex';
        document.querySelector(`#save_${name}_btn`).style.display = 'none';
        document.querySelector(`#${name}_key`).style.display = 'none';
        document.querySelector(`#edit_${name}_btn`).style.display = 'none';
    }
    editState(name) {
        document.querySelector(`#delete_${name}_btn`).style.display = 'flex';
        document.querySelector(`#save_${name}_btn`).style.display = 'none';
        document.querySelector(`#${name}_key`).style.display = 'none';
        document.querySelector(`#edit_${name}_btn`).style.display = 'flex';
    }

    componentDidMount() {

        // document.querySelector('#contact_Xcoord').value = this.state.Xcoord;
        // document.querySelector('#contact_Ycoord').value = this.state.Ycoord;
        // document.querySelector('#plunger_b').value = this.state.b;
        // document.querySelector('#plunger_a').value = this.state.a;
        this.hideAlldelete();
        this.hideAlledit();

        unread_emails();
        let cnt_select = document.querySelector('#contact');
        let plng_select = document.querySelector('#plunger');
        let sprg_select = document.querySelector('#spring');
        let angl_select = document.querySelector('#angles');
        let vrbl_select = document.querySelector('#variables');

        let cnt_options = document.querySelectorAll('.contact_options');
        let plng_options = document.querySelectorAll('.plunger_options');
        let sprg_options = document.querySelectorAll('.spring_options');
        let angl_options = document.querySelectorAll('.angles_options');
        let vrbl_options = document.querySelectorAll('.variables_options');

        cnt_options.forEach(option => {
            cnt_select.appendChild(option);
        })

        plng_options.forEach(option => {
            plng_select.appendChild(option);
        })
        
        sprg_options.forEach(option => {
            sprg_select.appendChild(option);
        })

        angl_options.forEach(option => {
            angl_select.appendChild(option);
        })

        vrbl_options.forEach(option => {
            vrbl_select.appendChild(option)
        })

    }
    chooseContactOption = (event) => {
        parameter(event, "contact")
        .then(result => {

            if (result.var1 === 'unknown' &&
                result.var2 === 'unknown' &&
                result.var3 === 'unknown') {
                this.setState({
                    contact_friction: 0.15,
                    Xcoord: 1,
                    Ycoord: 1,
                    contact_status: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, 1, 1,
                    this.state.a, this.state.b);
                this.newState('contact');

            } else {
                this.setState({
                    contact_friction: result.var1,
                    Xcoord: result.var2,
                    Ycoord: result.var3,
                    contact_status: 1,
                })
                drawRect(ctx, scale, pos.X, pos.Y, result.var2, result.var3,
                    this.state.a, this.state.b);
                this.activeState('contact');

            }
        })
    }

    choosePlungerOption = (event) => {
        parameter(event, "plunger")
        .then(result => {

            if (result.var1 === 'unknown' &&
                result.var2 === 'unknown' &&
                result.var3 === 'unknown') {
                this.setState({
                    a: 1,
                    b: 1,
                    plunger_friction: 0.15,
                    plunger_status: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
                    1, 1);
                this.newState('plunger');
            } else {
                this.setState({
                    a: result.var1,
                    b: result.var2,
                    plunger_friction: result.var3,
                    plunger_status: 1,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
                    result.var1, result.var2);
                this.activeState('plunger');
            }
        })
    }

    chooseSpringOption = (event) => {
        parameter(event, "spring")
        .then(result => {

            if (result.var1 === 'unknown' &&
                result.var2 === 'unknown' &&
                result.var3 === 'unknown') {
                this.setState({
                    springStiff: 4.1,
                    freeLen: 10.7,
                    springLen: 8.9,
                    spring_status: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
                    this.state.a, this.state.b);
                this.newState('spring');
            } else {
                this.setState({
                    springStiff: result.var1,
                    freeLen: result.var2,
                    springLen: result.var3,
                    spring_status: 1,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
                    this.state.a, this.state.b);
                this.activeState('spring');
            }
        })
    }

    chooseAnglesOption = (event) => {
        parameter(event, "angles")
        .then(result => {

            if (result.var1 === 'unknown' &&
                result.var2 === 'unknown' &&
                result.var3 === 'unknown') {
                this.setState({
                    plungerFric: '0',
                    N: 120,
                    FN: '+',
                    angles_status: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
                    this.state.a, this.state.b);
                this.newState('angles');

            } else {
                this.setState({
                    plungerFric: String(result.var1),
                    N: result.var2,
                    angles_status: 1,
                })
                if (result.var3 > result.var2) {
                    this.setState({
                        FN: '+',
                    })
                } else if (result.var3 < result.var2) {
                    this.setState({
                        FN: '-',
                    })
                }

                drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
                    this.state.a, this.state.b);
                this.activeState('angles');
            }
        })
    }

    chooseVariablesOption = (event) => {
        
    }

        /////////////////////////////////////
    updateContactFriction = (event) => {unread_emails(); 
        this.setState({
            contact_friction: event.target.value,
        })        
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
        this.state.a, this.state.b);
        
        if (this.state.contact_status === 0) {
            this.newState('contact');
        } else {
            this.editState('contact');
            this.setState({
                contact_status: 2,
            })   
        }
        
    }

    updateXcoord = (event) => {unread_emails(); 
        this.setState({
            Xcoord: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, event.target.value, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.contact_status === 0) {
            this.newState('contact');
        } else {
            this.editState('contact');
            this.setState({
                contact_status: 2,
            })  
        }
    }

    updateYcoord = (event) => {unread_emails(); 
        this.setState({
            Ycoord: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, event.target.value,
            this.state.a, this.state.b);

        if (this.state.contact_status === 0) {
            this.newState('contact');
        } else {
            this.editState('contact');
            this.setState({
                contact_status: 2,
            })  
        }
    }
        /////////////////////////////////////
    updateA = (event) => {unread_emails(); 
        this.setState({
            a: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            event.target.value, this.state.b);

        if (this.state.plunger_status === 0) {
            this.newState('plunger');
        } else {
            this.editState('plunger');
            this.setState({
                plunger_status: 2,
            })  
        }
    }

    updateB = (event) => {unread_emails(); 
        this.setState({
            b: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, event.target.value);
        if (this.state.plunger_status === 0) {
            this.newState('plunger');
        } else {
            this.editState('plunger');
            this.setState({
                plunger_status: 2,
            })  
        }
    }

    updatePlungerFriction = (event) => {unread_emails(); 
        this.setState({
            plunger_friction: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.plunger_status === 0) {
            this.newState('plunger');
        } else {
            this.editState('plunger');
            this.setState({
                plunger_status: 2,
            })  
        }
    }
        /////////////////////////////////////
    updateSpringStiff = (event) => {unread_emails(); 
        this.setState({
            springStiff: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.spring_status === 0) {
            this.newState('spring');
        } else {
            this.editState('spring');
            this.setState({
                spring_status: 2,
            })  
        }           
    }
    updateFreeLen = (event) => {unread_emails(); 
        this.setState({
            freeLen: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.spring_status === 0) {
            this.newState('spring');
        } else {
            this.editState('spring');
            this.setState({
                spring_status: 2,
            })  
        }            
    }
    updateSpringLen = (event) => {unread_emails(); 
        this.setState({
            springLen: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.spring_status === 0) {
            this.newState('spring');
        } else {
            this.editState('spring');
            this.setState({
                spring_status: 2,
            })  
        }
    }
        /////////////////////////////////////
    updatePlungerFric = (event) => {unread_emails(); 

        this.setState({
            plungerFric: event.target.value,
        })

        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.angles_status === 0) {
            this.newState('angles');
        } else {
            this.editState('angles');
            this.setState({
                angles_status: 2,
            })  
        }
    }
    updateN = (event) => {unread_emails(); 
        this.setState({
            N: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.angles_status === 0) {
            this.newState('angles');
        } else {
            this.editState('angles');
            this.setState({
                angles_status: 2,
            })  
        }
    }
    updateFN = (event) => {unread_emails(); 
        
        this.setState({
            FN: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.Xcoord, this.state.Ycoord,
            this.state.a, this.state.b);

        if (this.state.angles_status === 0) {
            this.newState('angles');
        } else {
            this.editState('angles');
            this.setState({
                angles_status: 2,
            })  
        }
    }
        /////////////////////////////////////

    clickContactSave = () => {
        const select = document.querySelector('#contact');
        post_data(select, 'contact', this.state.contact_friction, this.state.Xcoord, this.state.Ycoord)
        this.activeState('contact');
        this.setState({
            contact_status: 1,
        })  
    }

    clickPlungerSave = () => {
        const select = document.querySelector('#plunger');
        post_data(select, 'plunger', this.state.a, this.state.b, this.state.plunger_friction)
        this.activeState('plunger');
        this.setState({
            plunger_status: 1,
        })  
    }

    clickSpringSave = () => {
        const select = document.querySelector('#spring');
        post_data(select, 'spring', this.state.springStiff, this.state.freeLen, this.state.springLen)
        this.activeState('spring');
        this.setState({
            spring_status: 1,
        })  
    }

    clickAnglesSave = () => {
        const select = document.querySelector('#angles');

        let var1 = null;
        if (this.state.plungerFric === "0") {
            var1 = 0;
        } else if (this.state.plungerFric === "180") {
            var1 = 180;
        }

        let var3 = null
        if (this.state.FN === "+") {
            var3 = parseFloat(this.state.N) + 90;
        } else if (this.state.FN === "-") {
            var3 = parseFloat(this.state.N) - 90;
        }
        
        post_data(select, 'angles', var1, this.state.N, var3)
        this.activeState('angles');
        this.setState({
            angles_status: 1,
        })  
    }

    clickVariablesSave = () => {
        
    }
//
    clickContactDelete = () => {
        const select = document.querySelector('#contact');
        delete_data(select, 'contact');
        this.newState('contact');
        this.setState({
            contact_status: 0,
        })
    }

    clickPlungerDelete = () => {
        const select = document.querySelector('#plunger');
        delete_data(select, 'plunger');
        this.newState('plunger');
        this.setState({
            plunger_status: 0,
        })
    }

    clickSpringDelete = () => {
        const select = document.querySelector('#spring');
        delete_data(select, 'spring');
        this.newState('spring');
        this.setState({
            spring_status: 0,
        })
    }

    clickAnglesDelete = () => {
        const select = document.querySelector('#angles');
        delete_data(select, 'angles');
        this.newState('angles');
        this.setState({
            angles_status: 0,
        })
    }

    clickVariablesDelete = () => {
        
    }
//
    clickContactEdit = () => {
        change_data('contact', this.state.contact_friction, this.state.Xcoord, this.state.Ycoord);
        this.activeState('contact');
        this.setState({
            contact_status: 1,
        })

    }

    clickPlungerEdit = () => {
        change_data('plunger', this.state.a, this.state.b, this.state.plunger_friction);
        this.activeState('plunger');
        this.setState({
            plunger_status: 1,
        })
    }

    clickSpringEdit = () => {
        change_data('spring', this.state.springStiff, this.state.freeLen, this.state.springLen);
        this.activeState('spring');
        this.setState({
            spring_status: 1,
        })
    }

    clickAnglesEdit = () => {

        let var1 = null;
        if (this.state.plungerFric === "0") {
            var1 = 0;
        } else if (this.state.plungerFric === "180") {
            var1 = 180;
        }

        let var3 = null
        if (this.state.FN === "+") {
            var3 = parseFloat(this.state.N) + 90;
        } else if (this.state.FN === "-") {
            var3 = parseFloat(this.state.N) - 90;
        }
        
        change_data('angles', var1, this.state.N, var3);
        this.activeState('angles');
        this.setState({
            angles_status: 1,
        })
    }

    clickVariablesEdit = () => {
        
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


    