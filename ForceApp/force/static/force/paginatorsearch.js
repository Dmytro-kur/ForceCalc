
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            page: 1,
            pages: 1,
        };
    }
    render() {
        return (
            <div id="batch">
                <div id="search_module">
                    <div id="myQueryDiv">
                        <img id="myQueryImg" src={"/static/force/loupe.png"}/><input onChange={this.updateQuery} type="text" id="myQueryInput" placeholder="Search.."/>
                    </div>
                    <table id="homeTable">
                        <tbody></tbody>
                    </table>
                </div>
                <div className="paginator">
                    <a className="paginator_items" onClick={this.firstPage}>&laquo; first</a>
                    <a className="paginator_items" onClick={this.previousPage}> previous </a>
                    <span> Page {this.state.page} of {this.state.pages}.</span>
                    <input onKeyPress={this.updatePage} id="search_page"/>
                    <a className="paginator_items" onClick={this.nextPage}> next </a>
                    <a className="paginator_items" onClick={this.lastPage}> last &raquo;</a>
                </div>
            </div>
        );
    }

    Update() {
        this.forceUpdate();
    }

    componentDidMount() {
        items_retrieve(this.state.query, this.state.page, `${history.state.page}`)
        .then(() => {
            this.pagesCount();
        })
    }

    pagesCount() {
        this.setState({
            pages: parseInt(document.querySelector("#pages").innerHTML),
        })
    }

    updatePage = (event) => {

        if (event.key === 'Enter') {
            if (event.target.value < 1) {
                this.setState({
                    page: 1,
                })
    
                items_retrieve(this.state.query, 1, `${history.state.page}`)
                .then(() => {
                    this.pagesCount();
                })
            } else {
                this.setState({
                    page: event.target.value,
                })
        
                items_retrieve(this.state.query, event.target.value, `${history.state.page}`)
                .then(() => {
                    this.pagesCount();
                })
            }
        }
    }


    updateQuery = (event) => {

        this.setState({
            query: event.target.value,
        })
        
        items_retrieve(event.target.value, this.state.page, `${history.state.page}`)
        .then(() => {
            this.pagesCount();
        })
    }

    nextPage = () => {

        if (this.state.page < this.state.pages) {
            this.setState((state) => ({
                page: state.page + 1,
            }))
    
            items_retrieve(this.state.query, this.state.page + 1, `${history.state.page}`)        
            .then(() => {
                this.pagesCount();
            })
        } else if (this.state.pages === 0) {
            this.setState({
                page: 1,
            });
    
            items_retrieve(this.state.query, 1, `${history.state.page}`)        
            .then(() => {
                this.pagesCount();
            }) 
        }

    }

    previousPage = () => {
        
        if (this.state.page - 1 < 2) {
            this.setState({
                page: 1,
            });
    
            items_retrieve(this.state.query, 1, `${history.state.page}`)        
            .then(() => {
                this.pagesCount();
            })
        } else {
            this.setState((state) => ({
                page: state.page - 1,
            }))
    
            items_retrieve(this.state.query, this.state.page - 1, `${history.state.page}`)        
            .then(() => {
                this.pagesCount();
            })
        }
    }

    firstPage = () => {
        this.setState({
            page: 1
        });
        items_retrieve(this.state.query, 1, `${history.state.page}`)            
        .then(() => {
            this.pagesCount();
        })
    }

    lastPage = () => {
        if (this.state.pages === 0) {
            this.setState({
                page: 1
            });
            items_retrieve(this.state.query, 1, `${history.state.page}`)            
            .then(() => {
                this.pagesCount();
            })
        } else {
            this.setState((state) => ({
                page: state.pages,
            }));
    
            items_retrieve(this.state.query, this.state.pages, `${history.state.page}`)            
            .then(() => {
                this.pagesCount();
            })
        }

    }
}

let searchComponentInstance = ReactDOM.render(<Search />, document.querySelector('#myQuery'));