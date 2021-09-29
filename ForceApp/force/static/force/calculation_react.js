class CalcInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mu: 0.15,
            contactCoord_X: 1,
            contactCoord_Y: 1,

            a: 1,
            b: 1,
            f: 0.15,

            springStiff: 4.1,
            freeLen: 10.7,
            springLen: 8.9,

            plungerFric: "0",
            N: 120,
            FN: '+',

            contact_state: 0,
            plunger_state: 0,
            spring_state: 0,
            angles_state: 0,
            variables_state: 0,
        };
    }
    render() {
        const label_style = {
            fontSize: "12px",
        };
        const group_name_style = {
            backgroundColor: "rgb(211 237 255 / 60%)",
            textAlign: "center",
            border: "1px solid grey",
            borderRadius: "5px",
            fontSize: "18px",
            fontStyle: "bold",
        };
        return (
            
            <div className="root">

                <form id="contact_form" className="row g-1 needs-validation" noValidate onSubmit={this.preventSubmit}>
                    
                    <div style={group_name_style} className="col-sm-12 position-relative">Contact group</div>
                    
                    <div className="col-sm-12 position-relative">
                        <input type="text" id="contact_key" className="form-control form-control-sm" placeholder="Contact group name:"/>
                    </div>

                    <div className="col-sm-12 position-relative">
                        <select id="contact" className="form-select form-select-sm" onChange={this.chooseContactOption}>
                            <option value="None" defaultValue>Create new</option>
                        </select>
                    </div>

                    <div className="col-sm-4 position-relative">
                        <label style={label_style} htmlFor="mu" className="form-label">Friction:</label>
                        <input id="mu" className="form-control form-control-sm" type="number" step="0.01" min="0" onChange={this.update_mu} value={this.state.mu}/>
                    </div>
                    
                    <div className="col-sm-4 position-relative">
                        <label style={label_style} htmlFor="contactCoord_X" className="form-label">X coordinate:</label>
                        <input id="contactCoord_X" className="form-control form-control-sm" type="number" step="0.1" onChange={this.update_contactCoord_X} value={this.state.contactCoord_X}/>
                    </div>
                    
                    <div className="col-sm-4 position-relative">
                        <label style={label_style} htmlFor="contactCoord_Y" className="form-label">Y coordinate:</label>
                        <input id="contactCoord_Y" className="form-control form-control-sm" type="number" step="0.1" onChange={this.update_contactCoord_Y} value={this.state.contactCoord_Y}/>
                    </div>

                    <div className="col-sm-4 position-relative">
                        <button id="save_contact_btn" className="col-sm-12 btn btn-outline-primary btn-sm" onClick={this.clickContactSave}>Save</button>
                    </div>

                    <div className="col-sm-4 position-relative">
                        <button id="delete_contact_btn" className="col-sm-12 btn btn-outline-primary btn-sm" onClick={this.clickContactDelete}>Delete</button>
                    </div>

                    <div className="col-sm-4 position-relative">
                        <button id="edit_contact_btn" className="col-sm-12 btn btn-outline-primary btn-sm" onClick={this.clickContactEdit}>Edit</button>
                    </div>
                </form>


                <h2>Plunger group</h2>

                <div id="relative_plunger_key">
                </div>
                <input type="text" id="plunger_key"/>
                <button id="save_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerSave}>Save</button>
                <button id="delete_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerDelete}>Delete</button>
                <button id="edit_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerEdit}>Edit</button>

                <select id="plunger" onChange={this.choosePlungerOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <div>Distance A: </div>
                <div id="relative_a">
                </div>
                <input id="a" type="number" step="0.1" min="0" onChange={this.update_a} value={this.state.a}/>
                <div>Distance B: </div>
                <div id="relative_b">
                </div>
                <input id="b" type="number" step="0.1" min="0" onChange={this.update_b} value={this.state.b}/>
                <div>Friction in plunger: </div>
                <div id="relative_f">
                </div>
                <input id="f" type="number" step="0.01" min="0" onChange={this.update_f} value={this.state.f}/>
            


                <h2>Choose Spring:</h2>
                <div id="relative_spring_key">
                </div>
                <input type="text" id="spring_key"/>
                <button id="save_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringSave}>Save</button>
                <button id="delete_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringDelete}>Delete</button>
                <button id="edit_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringEdit}>Edit</button>

                <select id="spring" onChange={this.chooseSpringOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <div>Spring Stiffness: </div>
                <div id="relative_springStiff">
                </div>
                <input id="springStiff" type="number" step="0.1" min="0" onChange={this.update_springStiff} value={this.state.springStiff}/>
                <div>Free length: </div>
                <div id="relative_freeLen">
                </div>
                <input id="freeLen" type="number" step="0.1" min="0" onChange={this.update_freeLen} value={this.state.freeLen}/>
                <div>Spring length: </div>
                <div id="relative_springLen">
                </div>
                <input id="springLen" type="number" step="0.1" min="0" onChange={this.update_springLen} value={this.state.springLen}/>
            


                <h2>Choose Angles:</h2>
                <div id="relative_angles_key">
                </div>
                <input type="text" id="angles_key"/>
                <button id="save_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesSave}>Save</button>
                <button id="delete_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesDelete}>Delete</button>
                <button id="edit_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesEdit}>Edit</button>

                <select id="angles" onChange={this.chooseAnglesOption}>
                    <option value="None" defaultValue>Create</option>
                </select>

                <div>Direction of plunger friction forces: </div>
                <div id="relative_plungerFric">
                </div>

                <input id="plungerFric0" type="radio" name="plungerFric" className="form-check-input"
                    value="0" checked={this.state.plungerFric === "0"} onChange={this.update_plungerFric}/>
                <label htmlFor="plungerFric0">0 deg</label>

                <input id="plungerFric180" type="radio" name="plungerFric" className="form-check-input"
                    value="180" checked={this.state.plungerFric === "180"} onChange={this.update_plungerFric}/>
                <label htmlFor="plungerFric180">180 deg</label>

                <div>Direction of normal reaction force: </div>
                <div id="relative_N">
                </div>
                <input id="N" type="number" step="1" min="90" max="270" onChange={this.update_N} value={this.state.N}/>
                
                <div>Direction of normal reaction friction force: </div>
                <div id="relative_FN">
                </div>
                <input id="FNplus" type="radio" name="FN" className="form-check-input"
                    value="+" checked={this.state.FN === "+"} onChange={this.update_FN}/>
                <label htmlFor="FNplus"> + 90 deg</label>

                <input id="FNminus" type="radio" name="FN"className="form-check-input"
                    value="-" checked={this.state.FN === "-"} onChange={this.update_FN}/>
                <label htmlFor="FNminus"> - 90 deg</label>



                <h2>Choose Variables:</h2>
                <div id="relative_variables_key">
                </div>
                <input type="text" required id="variables_key"/>
                <select id="variables" onChange={this.chooseVariablesOption}>
                    <option value="None" defaultValue>Create</option>
                </select>
                <button id="delete_variables_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickVariablesSave}>Delete</button>
                <button id="save_variables_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickVariablesDelete}>Save</button>
                <button id="edit_variables_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickVariablesEdit}>Edit</button>


            </div>
        );
    }

    hideAlldelete() {
        document.querySelector('#delete_contact_btn').disabled = true;
        document.querySelector('#delete_plunger_btn').disabled = true;
        document.querySelector('#delete_spring_btn').disabled = true;
        document.querySelector('#delete_angles_btn').disabled = true;
        document.querySelector('#delete_variables_btn').disabled = true;
    }
    showAlldelete() {
        document.querySelector('#delete_contact_btn').disabled = false;
        document.querySelector('#delete_plunger_btn').disabled = false;
        document.querySelector('#delete_spring_btn').disabled = false;
        document.querySelector('#delete_angles_btn').disabled = false;
        document.querySelector('#delete_variables_btn').disabled = false;
    }
//
    hideAllsave() {
        document.querySelector('#save_contact_btn').disabled = true;
        document.querySelector('#save_plunger_btn').disabled = true;
        document.querySelector('#save_spring_btn').disabled = true;
        document.querySelector('#save_angles_btn').disabled = true;
        document.querySelector('#save_variables_btn').disabled = true;
    }
    showAllsave() {
        document.querySelector('#save_contact_btn').disabled = false;
        document.querySelector('#save_plunger_btn').disabled = false;
        document.querySelector('#save_spring_btn').disabled = false;
        document.querySelector('#save_angles_btn').disabled = false;
        document.querySelector('#save_variables_btn').disabled = false;
    }
//
    hideAlledit() {
        document.querySelector('#edit_contact_btn').disabled = true;
        document.querySelector('#edit_plunger_btn').disabled = true;
        document.querySelector('#edit_spring_btn').disabled = true;
        document.querySelector('#edit_angles_btn').disabled = true;
        document.querySelector('#edit_variables_btn').disabled = true;
    }
    showAlledit() {
        document.querySelector('#edit_contact_btn').disabled = false;
        document.querySelector('#edit_plunger_btn').disabled = false;
        document.querySelector('#edit_spring_btn').disabled = false;
        document.querySelector('#edit_angles_btn').disabled = false;
        document.querySelector('#edit_variables_btn').disabled = false;
    }
//
    hideAllkey() {
        document.querySelector('#contact_key').disabled = true;
        document.querySelector('#plunger_key').disabled = true;
        document.querySelector('#spring_key').disabled = true;
        document.querySelector('#angles_key').disabled = true;
        document.querySelector('#variables_key').disabled = true;
    }
    showAllkey() {
        document.querySelector('#contact_key').disabled = false;
        document.querySelector('#plunger_key').disabled = false;
        document.querySelector('#spring_key').disabled = false;
        document.querySelector('#angles_key').disabled = false;
        document.querySelector('#variables_key').disabled = false;
    }
//
    newState(name) {
        document.querySelector(`#delete_${name}_btn`).disabled = true;
        document.querySelector(`#save_${name}_btn`).disabled = false;
        document.querySelector(`#${name}_key`).disabled = false;
        document.querySelector(`#edit_${name}_btn`).disabled = true;
    }
    activeState(name) {
        document.querySelector(`#delete_${name}_btn`).disabled = false;
        document.querySelector(`#save_${name}_btn`).disabled = true;
        document.querySelector(`#${name}_key`).disabled = true;
        document.querySelector(`#edit_${name}_btn`).disabled = true;
    }
    editState(name) {
        document.querySelector(`#delete_${name}_btn`).disabled = false;
        document.querySelector(`#save_${name}_btn`).disabled = true;
        document.querySelector(`#${name}_key`).disabled = true;
        document.querySelector(`#edit_${name}_btn`).disabled = false;
    }

    componentDidMount() {

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

    preventSubmit = (event) => {
        event.preventDefault()
    }

    chooseContactOption = (event) => {
        parameter(event, "contact")
        .then(result => {

            if (result.var1 === 'unknown' &&
                result.var2 === 'unknown' &&
                result.var3 === 'unknown') {
                this.setState({
                    mu: 0.15,
                    contactCoord_X: 1,
                    contactCoord_Y: 1,
                    contact_state: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, 1, 1,
                    this.state.a, this.state.b);
                this.newState('contact');

            } else {
                this.setState({
                    mu: result.var1,
                    contactCoord_X: result.var2,
                    contactCoord_Y: result.var3,
                    contact_state: 1,
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
                    f: 0.15,
                    plunger_state: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
                    1, 1);
                this.newState('plunger');
            } else {
                this.setState({
                    a: result.var1,
                    b: result.var2,
                    f: result.var3,
                    plunger_state: 1,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
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
                    spring_state: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
                    this.state.a, this.state.b);
                this.newState('spring');
            } else {
                this.setState({
                    springStiff: result.var1,
                    freeLen: result.var2,
                    springLen: result.var3,
                    spring_state: 1,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
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
                    angles_state: 0,
                })
                drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
                    this.state.a, this.state.b);
                this.newState('angles');

            } else {
                this.setState({
                    plungerFric: String(result.var1),
                    N: result.var2,
                    angles_state: 1,
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

                drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
                    this.state.a, this.state.b);
                this.activeState('angles');
            }
        })
    }

    chooseVariablesOption = (event) => {
        
    }

        /////////////////////////////////////
    update_mu = (event) => {unread_emails(); 
        this.setState({
            mu: event.target.value,
        })        
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
        this.state.a, this.state.b);
        
        if (this.state.contact_state === 0) {
            this.newState('contact');
        } else {
            this.editState('contact');
            this.setState({
                contact_state: 2,
            })   
        }
        
    }

    update_contactCoord_X = (event) => {unread_emails(); 
        this.setState({
            contactCoord_X: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, event.target.value, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.contact_state === 0) {
            this.newState('contact');
        } else {
            this.editState('contact');
            this.setState({
                contact_state: 2,
            })  
        }
    }

    update_contactCoord_Y = (event) => {unread_emails(); 
        this.setState({
            contactCoord_Y: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, event.target.value,
            this.state.a, this.state.b);

        if (this.state.contact_state === 0) {
            this.newState('contact');
        } else {
            this.editState('contact');
            this.setState({
                contact_state: 2,
            })  
        }
    }
        /////////////////////////////////////
    update_a = (event) => {unread_emails(); 
        this.setState({
            a: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            event.target.value, this.state.b);

        if (this.state.plunger_state === 0) {
            this.newState('plunger');
        } else {
            this.editState('plunger');
            this.setState({
                plunger_state: 2,
            })  
        }
    }

    update_b = (event) => {unread_emails(); 
        this.setState({
            b: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, event.target.value);
        if (this.state.plunger_state === 0) {
            this.newState('plunger');
        } else {
            this.editState('plunger');
            this.setState({
                plunger_state: 2,
            })  
        }
    }

    update_f = (event) => {unread_emails(); 
        this.setState({
            f: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.plunger_state === 0) {
            this.newState('plunger');
        } else {
            this.editState('plunger');
            this.setState({
                plunger_state: 2,
            })  
        }
    }
        /////////////////////////////////////
    update_springStiff = (event) => {unread_emails(); 
        this.setState({
            springStiff: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.spring_state === 0) {
            this.newState('spring');
        } else {
            this.editState('spring');
            this.setState({
                spring_state: 2,
            })  
        }           
    }
    update_freeLen = (event) => {unread_emails(); 
        this.setState({
            freeLen: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.spring_state === 0) {
            this.newState('spring');
        } else {
            this.editState('spring');
            this.setState({
                spring_state: 2,
            })  
        }            
    }
    update_springLen = (event) => {unread_emails(); 
        this.setState({
            springLen: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.spring_state === 0) {
            this.newState('spring');
        } else {
            this.editState('spring');
            this.setState({
                spring_state: 2,
            })  
        }
    }
        /////////////////////////////////////
    update_plungerFric = (event) => {unread_emails(); 

        this.setState({
            plungerFric: event.target.value,
        })

        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.angles_state === 0) {
            this.newState('angles');
        } else {
            this.editState('angles');
            this.setState({
                angles_state: 2,
            })  
        }
    }
    update_N = (event) => {unread_emails(); 
        this.setState({
            N: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.angles_state === 0) {
            this.newState('angles');
        } else {
            this.editState('angles');
            this.setState({
                angles_state: 2,
            })  
        }
    }
    update_FN = (event) => {unread_emails(); 
        
        this.setState({
            FN: event.target.value,
        })
        drawRect(ctx, scale, pos.X, pos.Y, this.state.contactCoord_X, this.state.contactCoord_Y,
            this.state.a, this.state.b);

        if (this.state.angles_state === 0) {
            this.newState('angles');
        } else {
            this.editState('angles');
            this.setState({
                angles_state: 2,
            })  
        }
    }
        /////////////////////////////////////

    clickContactSave = () => {
        const select = document.querySelector('#contact');
        post_data(select, 'contact', 
            this.state.mu, this.state.contactCoord_X, this.state.contactCoord_Y)
        
    }

    clickPlungerSave = () => {
        const select = document.querySelector('#plunger');
        post_data(select, 'plunger', this.state.a, this.state.b, this.state.f)
    }

    clickSpringSave = () => {
        const select = document.querySelector('#spring');
        post_data(select, 'spring', this.state.springStiff, this.state.freeLen, this.state.springLen)
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
    }

    clickVariablesSave = () => {
        
    }
//
    clickContactDelete = () => {
        const select = document.querySelector('#contact');
        delete_data(select, 'contact');
        this.newState('contact');
        this.setState({
            contact_state: 0,
        })
    }

    clickPlungerDelete = () => {
        const select = document.querySelector('#plunger');
        delete_data(select, 'plunger');
        this.newState('plunger');
        this.setState({
            plunger_state: 0,
        })
    }

    clickSpringDelete = () => {
        const select = document.querySelector('#spring');
        delete_data(select, 'spring');
        this.newState('spring');
        this.setState({
            spring_state: 0,
        })
    }

    clickAnglesDelete = () => {
        const select = document.querySelector('#angles');
        delete_data(select, 'angles');
        this.newState('angles');
        this.setState({
            angles_state: 0,
        })
    }

    clickVariablesDelete = () => {
        
    }
//
    clickContactEdit = () => {
        change_data('contact', this.state.mu, this.state.contactCoord_X, this.state.contactCoord_Y);
        this.activeState('contact');
        this.setState({
            contact_state: 1,
        })

    }

    clickPlungerEdit = () => {
        change_data('plunger', this.state.a, this.state.b, this.state.f);
        this.activeState('plunger');
        this.setState({
            plunger_state: 1,
        })
    }

    clickSpringEdit = () => {
        change_data('spring', this.state.springStiff, this.state.freeLen, this.state.springLen);
        this.activeState('spring');
        this.setState({
            spring_state: 1,
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
            angles_state: 1,
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



    