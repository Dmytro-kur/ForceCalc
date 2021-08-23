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
            <div>
                <input onChange={this.updateQuery} type="text" id="myQuery" placeholder="Search.."/>
                <table id="homeTable">
                    <tbody></tbody>
                </table>
                <div className="paginator">
                    <span>
                        <a className="paginator_items" onClick={this.firstPage}>&laquo; first</a>
                        <a className="paginator_items" onClick={this.previousPage}> previous </a>
                        <span> Page {this.state.page} of {this.state.pages}.</span>
                        <input onChange={this.updatePage} type="number" id="search_page"/>
                        <a className="paginator_items" onClick={this.nextPage}> next </a>
                        <a className="paginator_items" onClick={this.lastPage}> last &raquo;</a>
                    </span>
                </div>
            </div>
        );
    }

    componentDidMount() {
        projects_retrieve(this.state.query, this.state.page)
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
        if (event.target.value < 1) {
            this.setState({
                page: 1,
            })

            projects_retrieve(this.state.query, 1)
            .then(() => {
                this.pagesCount();
            })
        } else {
            this.setState({
                page: event.target.value,
            })
    
            projects_retrieve(this.state.query, event.target.value)
            .then(() => {
                this.pagesCount();
            })
        }
    }


    updateQuery = (event) => {

        this.setState({
            query: event.target.value,
        })
        
        projects_retrieve(event.target.value, this.state.page)
        .then(() => {
            this.pagesCount();
        })
    }

    nextPage = () => {

        if (this.state.page < this.state.pages) {
            this.setState((state) => ({
                page: state.page + 1,
            }))
    
            projects_retrieve(this.state.query, this.state.page + 1)        
            .then(() => {
                this.pagesCount();
            })
        } else if (this.state.pages === 0) {
            this.setState({
                page: 1,
            });
    
            projects_retrieve(this.state.query, 1)        
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
    
            projects_retrieve(this.state.query, 1)        
            .then(() => {
                this.pagesCount();
            })
        } else {
            this.setState((state) => ({
                page: state.page - 1,
            }))
    
            projects_retrieve(this.state.query, this.state.page - 1)        
            .then(() => {
                this.pagesCount();
            })
        }
    }

    firstPage = () => {
        this.setState({
            page: 1
        });
        projects_retrieve(this.state.query, 1)            
        .then(() => {
            this.pagesCount();
        })
    }

    lastPage = () => {
        if (this.state.pages === 0) {
            this.setState({
                page: 1
            });
            projects_retrieve(this.state.query, 1)            
            .then(() => {
                this.pagesCount();
            })
        } else {
            this.setState((state) => ({
                page: state.pages,
            }));
    
            projects_retrieve(this.state.query, this.state.pages)            
            .then(() => {
                this.pagesCount();
            })
        }

    }





}

ReactDOM.render(<Search />, document.querySelector('#myQuery'));