class CalcInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_key: "",
            mu: 0.15,
            contactCoord_X: 1,
            contactCoord_Y: 1,

            plunger_key: "",
            a: 1,
            b: 1,
            f: 0.15,

            spring_key: "",
            springStiff: 4.1,
            freeLen: 10.7,
            springLen: 8.9,

            angles_key: "",
            plungerFric: "0",
            N: 120,
            FN: '+',

            Na: 0,
            Nb: 0,
            NR: 0,
            NaFD: 0,
            NbFD: 0,
            NRFD: 0,
            NaD: 0,
            NbD: 0,
            NRD: 0,
            NRT: 0,
            NRFT: 0,
            TIX: 0,
            FTIX: 0,
            TIY: 0,
            FTIY: 0,

            contact_state: 0,
            plunger_state: 0,
            spring_state: 0,
            angles_state: 0,
        };
    }
    render() {
        const label_style = {
            fontSize: "12px",
        };
        const label_style_plungerFric0 = {
            fontSize: "12px",
            width: "50px",
        };
        const label_style_FNplus = {
            fontSize: "12px",
            width: "50px",
        };

        const group_name_style = {
            backgroundImage: "linear-gradient(to bottom right, rgb(211 237 255 / 100%), rgb(211 237 255 / 5%))",
            textAlign: "center",
            borderBottom: "1px solid lightgrey",
            fontSize: "18px",
            fontStyle: "bold",
            zIndex: '1',
            width: '100%',
        };

        const for_wave_btn__sidebar = {
            zIndex: '0',
        }
        return (
            
            <div className="root">

                <div id="wave-btn__contactForm" className="wave-btn__sidebar">
                    <div className="wave-btn__sidebar text__sidebar">
                        <div style={group_name_style} className="position-relative">Contact</div>
                    </div>
                    <div style={for_wave_btn__sidebar} id="wave__contactForm" className="wave-btn__sidebar"></div>
                </div>
                <div id="expanded_box__contactForm" className="expanded_box" data-state={"closed"}>
                    <form id="contact_form" className="row g-1 needs-validation" noValidate onSubmit={this.preventSubmit}>
                    
                        <div className="col-sm-12 position-relative">
                            <input type="text" id="contact_key" className="form-control form-control-sm" placeholder="Contact group name:" onChange={this.update_contact_key} value={this.state.contact_key}/>
                            <div id="contact_key_invalid-tooltip" className="invalid-tooltip">
                            </div>
                        </div>

                        <div className="col-sm-12 position-relative">
                            <select id="contact" className="form-select form-select-sm" onChange={this.chooseContactOption}>
                                <option value="None" defaultValue>Create new</option>
                            </select>
                        </div>

                        <div className="parameter-inputs">
                            <div className="position-relative parameter">
                                <label style={label_style} htmlFor="mu" className="form-label">Friction:</label>
                                <input id="mu" className="form-control form-control-sm" type="number" step="0.01" min="0" max="1" onChange={this.update_mu} value={this.state.mu}/>
                                <div id="mu_invalid-tooltip" className="invalid-tooltip">
                                </div>
                            </div>
                            
                            <div className="position-relative parameter">
                                <label style={label_style} htmlFor="contactCoord_X" className="form-label">X coordinate:</label>
                                <input id="contactCoord_X" className="form-control form-control-sm" type="number" step="0.1" onChange={this.update_contactCoord_X} value={this.state.contactCoord_X}/>
                                <div id="contactCoord_X_invalid-tooltip" className="invalid-tooltip">
                                </div>
                            </div>
                            
                            <div className="position-relative parameter">
                                <label style={label_style} htmlFor="contactCoord_Y" className="form-label">Y coordinate:</label>
                                <input id="contactCoord_Y" className="form-control form-control-sm" type="number" step="0.1" onChange={this.update_contactCoord_Y} value={this.state.contactCoord_Y}/>
                                <div id="contactCoord_Y_invalid-tooltip" className="invalid-tooltip">
                                </div>
                            </div>
                        </div>

                        <div className="parameter-buttons">
                            <button id="save_contact_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickContactSave}>Save</button>
                            <button id="delete_contact_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickContactDelete}>Delete</button>
                            <button id="edit_contact_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickContactEdit}>Edit</button>
                        </div>
                    </form>
                </div>

                {/* ------------------------------------------------- */}

                <div id="wave-btn__plungerForm" className="wave-btn__sidebar">
                    <div className="wave-btn__sidebar text__sidebar">
                        <div style={group_name_style} className="position-relative">Plunger</div>
                    </div>
                    <div style={for_wave_btn__sidebar} id="wave__plungerForm" className="wave-btn__sidebar"></div>
                </div>
                <div id="expanded_box__plungerForm" className="expanded_box" data-state={"closed"}>
                    <form id="plunger_form" className="row g-1 needs-validation" noValidate onSubmit={this.preventSubmit}>
                    
                    <div className="col-sm-12 position-relative">
                        <input type="text" id="plunger_key" className="form-control form-control-sm" placeholder="Plunger group name:" onChange={this.update_plunger_key} value={this.state.plunger_key}/>
                        <div id="plunger_key_invalid-tooltip" className="invalid-tooltip">
                        </div>
                    </div>

                    <div className="col-sm-12 position-relative">
                        <select id="plunger" className="form-select form-select-sm" onChange={this.choosePlungerOption}>
                            <option value="None" defaultValue>Create new</option>
                        </select>
                    </div>
                    <div className="parameter-inputs">
                        <div className="position-relative parameter">
                            <label style={label_style} htmlFor="f" className="form-label">Friction:</label>
                            <input id="f" className="form-control form-control-sm" type="number" step="0.01" min="0" max="1" onChange={this.update_f} value={this.state.f}/>
                            <div id="f_invalid-tooltip" className="invalid-tooltip">
                            </div>
                        </div>

                        <div className="position-relative parameter">
                            <label style={label_style} htmlFor="a" className="form-label">Distance A:</label>
                            <input id="a" className="form-control form-control-sm" type="number" step="0.1" min="0" onChange={this.update_a} value={this.state.a}/>
                            <div id="a_invalid-tooltip" className="invalid-tooltip">
                            </div>
                        </div>

                        <div className="position-relative parameter">
                            <label style={label_style} htmlFor="b" className="form-label">Distance B:</label>
                            <input id="b" className="form-control form-control-sm" type="number" step="0.1" min="0" onChange={this.update_b} value={this.state.b}/>
                            <div id="b_invalid-tooltip" className="invalid-tooltip">
                            </div>
                        </div>
                    </div>

                    <div className="parameter-buttons">
                        <button id="save_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerSave}>Save</button>
                        <button id="delete_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerDelete}>Delete</button>
                        <button id="edit_plunger_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickPlungerEdit}>Edit</button>
                    </div>
                </form>
                </div>

                {/* ------------------------------------------------- */}

                <div id="wave-btn__springForm" className="wave-btn__sidebar">
                    <div className="wave-btn__sidebar text__sidebar">
                        <div style={group_name_style} className="position-relative">Spring</div>
                    </div>
                    <div style={for_wave_btn__sidebar} id="wave__springForm" className="wave-btn__sidebar"></div>
                </div>
                <div id="expanded_box__springForm" className="expanded_box" data-state={"closed"}>
                    <form id="spring_form" className="row g-1 needs-validation" noValidate onSubmit={this.preventSubmit}>
                    
                        <div className="col-sm-12 position-relative">
                            <input type="text" id="spring_key" className="form-control form-control-sm" placeholder="Spring group name:" onChange={this.update_spring_key} value={this.state.spring_key}/>
                            <div id="spring_key_invalid-tooltip" className="invalid-tooltip">
                            </div>
                        </div>

                        <div className="col-sm-12 position-relative">
                            <select id="spring" className="form-select form-select-sm" onChange={this.chooseSpringOption}>
                                <option value="None" defaultValue>Create new</option>
                            </select>
                        </div>
                        <div className="parameter-inputs">
                            <div className="position-relative parameter">
                                <label style={label_style} htmlFor="springStiff" className="form-label">Stiffness:</label>
                                <input id="springStiff" className="form-control form-control-sm" type="number" step="0.1" min="0" onChange={this.update_springStiff} value={this.state.springStiff}/>
                                <div id="springStiff_invalid-tooltip" className="invalid-tooltip">
                                </div>
                            </div>
                            
                            <div className="position-relative parameter">
                                <label style={label_style} htmlFor="freeLen" className="form-label">Free length:</label>
                                <input id="freeLen" className="form-control form-control-sm" type="number" step="0.1" min="0" onChange={this.update_freeLen} value={this.state.freeLen}/>
                                <div id="freeLen_invalid-tooltip" className="invalid-tooltip">
                                </div>
                            </div>
                            
                            <div className="position-relative parameter">
                                <label style={label_style} htmlFor="springLen" className="form-label">Length:</label>
                                <input id="springLen" className="form-control form-control-sm" type="number" step="0.1" min="0" onChange={this.update_springLen} value={this.state.springLen}/>
                                <div id="springLen_invalid-tooltip" className="invalid-tooltip">
                                </div>
                            </div>
                        </div>
                        <div className="parameter-buttons">
                            <button id="save_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringSave}>Save</button>
                            <button id="delete_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringDelete}>Delete</button>
                            <button id="edit_spring_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickSpringEdit}>Edit</button>
                        </div>
                    
                    </form>
                </div>

                {/* ------------------------------------------------- */}

                <div id="wave-btn__anglesForm" className="wave-btn__sidebar">
                    <div className="wave-btn__sidebar text__sidebar">
                        <div style={group_name_style} className="position-relative">Angles</div>
                    </div>
                    <div style={for_wave_btn__sidebar} id="wave__anglesForm" className="wave-btn__sidebar"></div>
                </div>
                <div id="expanded_box__anglesForm" className="expanded_box" data-state={"closed"}>
                    <form id="angles_form" className="row g-1 needs-validation" noValidate onSubmit={this.preventSubmit}>
                    
                    <div className="col-sm-12 position-relative">
                        <input type="text" id="angles_key" className="form-control form-control-sm" placeholder="Angles group name:" onChange={this.update_angles_key} value={this.state.angles_key}/>
                        <div id="angles_key_invalid-tooltip" className="invalid-tooltip">
                        </div>
                    </div>

                    <div className="col-sm-12 position-relative">
                        <select id="angles" className="form-select form-select-sm" onChange={this.chooseAnglesOption}>
                            <option value="None" defaultValue>Create new</option>
                        </select>
                    </div>



                    <div style={label_style} className="col-sm-12 position-relative">
                        Direction of plunger friction forces:
                    </div>

                    <div className="col-sm-12 position-relative radio-button">
                        <input id="plungerFric0" type="radio" name="plungerFric" className="form-check-input"
                            value="0" checked={this.state.plungerFric === "0"} onChange={this.update_plungerFric}/>
                        <label style={label_style_plungerFric0} className="form-check-label" htmlFor="plungerFric0">0 deg</label>
                        
                        <input id="plungerFric180" type="radio" name="plungerFric" className="form-check-input"
                            value="180" checked={this.state.plungerFric === "180"} onChange={this.update_plungerFric}/>
                        <label style={label_style} className="form-check-label" htmlFor="plungerFric180">180 deg</label>
                        
                        <div id="plungerFric_invalid-tooltip" className="invalid-tooltip">
                        </div>
                    </div>



                    <div className="col-sm-12 position-relative">
                        <label style={label_style} htmlFor="N" className="form-label">Direction of normal reaction force:</label>
                        <input id="N" className="form-control form-control-sm" type="number" step="0.1" min="90" max="270" onChange={this.update_N} value={this.state.N}/>
                        <div id="N_invalid-tooltip" className="invalid-tooltip">
                        </div>
                    </div>
                    


                    <div style={label_style} className="col-sm-12 position-relative">
                        Direction of normal reaction friction force: 
                    </div>

                    <div className="col-sm-12 position-relative radio-button">
                        <input id="FNplus" type="radio" name="FN" className="form-check-input"
                            value="+" checked={this.state.FN === "+"} onChange={this.update_FN}/>
                        <label style={label_style_FNplus} className="form-check-label" htmlFor="FNplus"> + 90 deg</label>

                        <input id="FNminus" type="radio" name="FN" className="form-check-input"
                            value="-" checked={this.state.FN === "-"} onChange={this.update_FN}/>
                        <label style={label_style} className="form-check-label" htmlFor="FNminus"> - 90 deg</label>
                        
                        <div id="FN_invalid-tooltip" className="invalid-tooltip">
                        </div>
                    </div>

                    <div className="parameter-buttons">
                        <button id="save_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesSave}>Save</button>
                        <button id="delete_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesDelete}>Delete</button>
                        <button id="edit_angles_btn" className="btn btn-outline-primary btn-sm" onClick={this.clickAnglesEdit}>Edit</button>
                    </div>

                </form>
                </div>

            </div>
        );
    }

    hideAlldelete() {
        document.querySelector('#delete_contact_btn').disabled = true;
        document.querySelector('#delete_plunger_btn').disabled = true;
        document.querySelector('#delete_spring_btn').disabled = true;
        document.querySelector('#delete_angles_btn').disabled = true;
    }
    showAlldelete() {
        document.querySelector('#delete_contact_btn').disabled = false;
        document.querySelector('#delete_plunger_btn').disabled = false;
        document.querySelector('#delete_spring_btn').disabled = false;
        document.querySelector('#delete_angles_btn').disabled = false;
    }
//
    hideAllsave() {
        document.querySelector('#save_contact_btn').disabled = true;
        document.querySelector('#save_plunger_btn').disabled = true;
        document.querySelector('#save_spring_btn').disabled = true;
        document.querySelector('#save_angles_btn').disabled = true;
    }
    showAllsave() {
        document.querySelector('#save_contact_btn').disabled = false;
        document.querySelector('#save_plunger_btn').disabled = false;
        document.querySelector('#save_spring_btn').disabled = false;
        document.querySelector('#save_angles_btn').disabled = false;
    }
//
    hideAlledit() {
        document.querySelector('#edit_contact_btn').disabled = true;
        document.querySelector('#edit_plunger_btn').disabled = true;
        document.querySelector('#edit_spring_btn').disabled = true;
        document.querySelector('#edit_angles_btn').disabled = true;
    }
    showAlledit() {
        document.querySelector('#edit_contact_btn').disabled = false;
        document.querySelector('#edit_plunger_btn').disabled = false;
        document.querySelector('#edit_spring_btn').disabled = false;
        document.querySelector('#edit_angles_btn').disabled = false;
    }
//
    hideAllkey() {
        document.querySelector('#contact_key').disabled = true;
        document.querySelector('#plunger_key').disabled = true;
        document.querySelector('#spring_key').disabled = true;
        document.querySelector('#angles_key').disabled = true;
    }
    showAllkey() {
        document.querySelector('#contact_key').disabled = false;
        document.querySelector('#plunger_key').disabled = false;
        document.querySelector('#spring_key').disabled = false;
        document.querySelector('#angles_key').disabled = false;
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

        let cnt_options = document.querySelectorAll('.contact_options');
        let plng_options = document.querySelectorAll('.plunger_options');
        let sprg_options = document.querySelectorAll('.spring_options');
        let angl_options = document.querySelectorAll('.angles_options');

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

        this.forces();
        expand('contactForm');
        expand('plungerForm');
        expand('springForm');
        expand('anglesForm');
    }

    preventSubmit = (event) => {
        event.preventDefault()
    }

    forces = () => {
        const mu = String(this.state.mu);
        const contactCoord_X = String(this.state.contactCoord_X);
        const contactCoord_Y = String(this.state.contactCoord_Y);
        const a = String(this.state.a);
        const b = String(this.state.b);
        const f = String(this.state.f);
        const springStiff = String(this.state.springStiff);
        const freeLen = String(this.state.freeLen);
        const springLen = String(this.state.springLen);
        const N = String(this.state.N);
        const plungerFric = String(this.state.plungerFric);

        let FN = ""
        if (this.state.FN === "+") {
            FN = String(parseFloat(N) + 90);
        } else if (this.state.FN === "-") {
            FN = String(parseFloat(N) - 90);
        }
        
        get_forces(
            mu, 
            contactCoord_X, 
            contactCoord_Y, 
            a,
            b,
            f,
            springStiff,
            freeLen,
            springLen,
            plungerFric,
            N,
            FN
            )
        .then(result => {

            const Na = String(result.REACTION.Na)
            const Nb = String(result.REACTION.Nb)
            const NR = String(result.REACTION.NR)

            const NaFD = String(result.FRICTION_DIRECTION.Na)
            const NbFD = String(result.FRICTION_DIRECTION.Nb)
            const NRFD = String(result.FRICTION_DIRECTION.NR)

            const NaD = String(result.DIRECTION.Na)
            const NbD = String(result.DIRECTION.Nb)
            const NRD = String(result.DIRECTION.NR)

            const NRT = String(result.TORQUE.NRT)
            const NRFT = String(result.TORQUE.NRFT)

            const TIX = String(result.INTERSECTION.TI.X)
            const FTIX = String(result.INTERSECTION.FTI.X)
            const TIY = String(result.INTERSECTION.TI.Y)
            const FTIY = String(result.INTERSECTION.FTI.Y)

            this.setState({
                Na: Na,
                Nb: Nb,
                NR: NR,
                NaFD: NaFD,
                NbFD: NbFD,
                NRFD: NRFD,
                NaD: NaD,
                NbD: NbD,
                NRD: NRD,
                NRT: NRT,
                NRFT: NRFT,
                TIX: TIX,
                FTIX: FTIX,
                TIY: TIY,
                FTIY: FTIY

            }, () => {
                draw(ctx, scale, pos.X, pos.Y, 
                    mu, 
                    contactCoord_X, 
                    contactCoord_Y, 
                    a,
                    b,
                    f,
                    springStiff,
                    freeLen,
                    springLen,
                    this.state.Na,
                    this.state.Nb,
                    this.state.NR,
                    this.state.NaFD,
                    this.state.NbFD,
                    this.state.NRFD,
                    this.state.NaD,
                    this.state.NbD,
                    this.state.NRD,
                    this.state.NRT,
                    this.state.NRFT,
                    this.state.TIX,
                    this.state.FTIX,
                    this.state.TIY,
                    this.state.FTIY,
                    );    
            })
        })
        
    }

    clearContactValidation = (start, end) => {
        let FIELDS = [
            'contact_key', 'mu', 'contactCoord_X', 'contactCoord_Y',
        ]
        FIELDS.slice(start, end).forEach((field) => {
            document.querySelector(`#${field}`).classList.remove('is-invalid')
            document.querySelector(`#${field}`).classList.remove('is-valid')
            document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
        })
    };
    clearPlungerValidation = (start, end) => {
        let FIELDS = [
            'plunger_key', 'a', 'b', 'f',
        ]
        FIELDS.slice(start, end).forEach((field) => {
            document.querySelector(`#${field}`).classList.remove('is-invalid')
            document.querySelector(`#${field}`).classList.remove('is-valid')
            document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
        })
    };
    clearSpringValidation = (start, end) => {
        let FIELDS = [
            'spring_key', 'springStiff', 'freeLen', 'springLen',
        ]
        FIELDS.slice(start, end).forEach((field) => {
            document.querySelector(`#${field}`).classList.remove('is-invalid')
            document.querySelector(`#${field}`).classList.remove('is-valid')
            document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
        })
    }
    clearAnglesValidation = (start, end) => {
        let FIELDS = [
            'angles_key', 'plungerFric', 'N', 'FN',
        ]
        FIELDS.slice(start, end).forEach((field) => {
            if (field === 'plungerFric') {
                document.querySelector(`#${field}0`).classList.remove('is-invalid')
                document.querySelector(`#${field}0`).classList.remove('is-valid')
                document.querySelector(`#${field}180`).classList.remove('is-invalid')
                document.querySelector(`#${field}180`).classList.remove('is-valid')

                document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''

            } else if (field === 'FN') {
                document.querySelector(`#${field}plus`).classList.remove('is-invalid')
                document.querySelector(`#${field}plus`).classList.remove('is-valid')
                document.querySelector(`#${field}minus`).classList.remove('is-invalid')
                document.querySelector(`#${field}minus`).classList.remove('is-valid')

                document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                
            } else {
                document.querySelector(`#${field}`).classList.remove('is-invalid')
                document.querySelector(`#${field}`).classList.remove('is-valid')
                document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
            }
        })
    }

    chooseContactOption = (event) => {
        this.clearContactValidation(0, 4);
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
                }, () => {this.forces();})
                this.newState('contact');

            } else {
                this.setState({
                    mu: result.var1,
                    contactCoord_X: result.var2,
                    contactCoord_Y: result.var3,
                    contact_state: 1,
                }, () => {this.forces();})
                this.activeState('contact');

            }
        })
    }

    choosePlungerOption = (event) => {
        this.clearPlungerValidation(0, 4);
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
                }, () => {this.forces();})
                this.newState('plunger');
            } else {
                this.setState({
                    a: result.var1,
                    b: result.var2,
                    f: result.var3,
                    plunger_state: 1,
                }, () => {this.forces();})
                this.activeState('plunger');
            }
        })
    }

    chooseSpringOption = (event) => {
        this.clearSpringValidation(0, 4);
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
                }, () => {this.forces();})
                this.newState('spring');
            } else {
                this.setState({
                    springStiff: result.var1,
                    freeLen: result.var2,
                    springLen: result.var3,
                    spring_state: 1,
                }, () => {this.forces();})
                this.activeState('spring');
            }
        })
    }

    chooseAnglesOption = (event) => {
        this.clearAnglesValidation(0, 4);
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
                }, () => {this.forces();})
                this.newState('angles');

            } else {
                this.setState({
                    plungerFric: String(result.var1),
                    N: result.var2,
                    angles_state: 1,
                }, () => {this.forces();})

                if (result.var3 > result.var2) {
                    this.setState({
                        FN: '+',
                    }, () => {this.forces();})

                } else if (result.var3 < result.var2) {
                    this.setState({
                        FN: '-',
                    }, () => {this.forces();})

                }

                this.activeState('angles');
            }
        })
    }

        /////////////////////////////////////
    update_contact_key =(event) => {
        this.clearContactValidation(0, 1);
        this.setState({
            contact_key: event.target.value,
        })
        
    }

    update_mu = (event) => {unread_emails();
        this.clearContactValidation(1, 2);

        if (event.target.value) {
            this.setState({
                mu: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearContactValidation(2, 3);

        if (event.target.value) {
            this.setState({
                contactCoord_X: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearContactValidation(3, 4);


        if (event.target.value) {
            this.setState({
                contactCoord_Y: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
    update_plunger_key =(event) => {
        this.clearPlungerValidation(0, 1);
        this.setState({
            plunger_key: event.target.value,
        }) 
    }

    update_a = (event) => {unread_emails();
        this.clearPlungerValidation(1, 2);
        
        if (event.target.value) {
            this.setState({
                a: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearPlungerValidation(2, 3);

        if (event.target.value) {
            this.setState({
                b: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearPlungerValidation(3, 4);
        
        if (event.target.value) {
            this.setState({
                f: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
    update_spring_key =(event) => {
        this.clearSpringValidation(0, 1);
        this.setState({
            spring_key: event.target.value,
        }) 
    }
    update_springStiff = (event) => {unread_emails();
        this.clearSpringValidation(1, 2);
        
        if (event.target.value) {
            this.setState({
                springStiff: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearSpringValidation(2, 3);
        

        if (event.target.value) {
            this.setState({
                freeLen: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearSpringValidation(3, 4);
        
        if (event.target.value) {
            this.setState({
                springLen: event.target.value,
            }, () => {this.forces();})  

        } else {
            // pass
        }

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
    update_angles_key =(event) => {
        this.clearAnglesValidation(0, 1);
        this.setState({
            angles_key: event.target.value,
        }) 
    }
    update_plungerFric = (event) => {unread_emails();
        this.clearAnglesValidation(1, 2);
        
        if (event.target.value) {
            this.setState({
                plungerFric: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearAnglesValidation(2, 3);

        if (event.target.value) {
            this.setState({
                N: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.clearAnglesValidation(3, 4);
        
        if (event.target.value) {
            this.setState({
                FN: event.target.value,
            }, () => {this.forces();})

        } else {
            // pass
        }

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
        this.forces();
    }

    clickPlungerSave = () => {
        const select = document.querySelector('#plunger');
        post_data(select, 'plunger', this.state.a, this.state.b, this.state.f)
        this.forces();
    }

    clickSpringSave = () => {
        const select = document.querySelector('#spring');
        post_data(select, 'spring', this.state.springStiff, this.state.freeLen, this.state.springLen)
        this.forces();
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
        this.forces();
    }
//
    clickContactDelete = () => {
        const select = document.querySelector('#contact');
        delete_data(select, 'contact');
        this.newState('contact');
        this.setState({
            contact_state: 0,
        })
        this.forces();
    }

    clickPlungerDelete = () => {
        const select = document.querySelector('#plunger');
        delete_data(select, 'plunger');
        this.newState('plunger');
        this.setState({
            plunger_state: 0,
        })
        this.forces();
    }

    clickSpringDelete = () => {
        const select = document.querySelector('#spring');
        delete_data(select, 'spring');
        this.newState('spring');
        this.setState({
            spring_state: 0,
        })
        this.forces();
    }

    clickAnglesDelete = () => {
        const select = document.querySelector('#angles');
        delete_data(select, 'angles');
        this.newState('angles');
        this.setState({
            angles_state: 0,
        })
        this.forces();
    }

//
    clickContactEdit = () => {
        change_data('contact', this.state.mu, this.state.contactCoord_X, this.state.contactCoord_Y);
        this.activeState('contact');
        this.setState({
            contact_state: 1,
        })
        this.forces();
    }

    clickPlungerEdit = () => {
        change_data('plunger', this.state.a, this.state.b, this.state.f);
        this.activeState('plunger');
        this.setState({
            plunger_state: 1,
        })
        this.forces();
    }

    clickSpringEdit = () => {
        change_data('spring', this.state.springStiff, this.state.freeLen, this.state.springLen);
        this.activeState('spring');
        this.setState({
            spring_state: 1,
        })
        this.forces();
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
        this.forces();
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
let vector_scaling = 0.5;
document.querySelector('#vectors_scaling').innerHTML = vector_scaling.toFixed(2);

draw_initialization();



    