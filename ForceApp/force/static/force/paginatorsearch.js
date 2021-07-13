class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            page: 1,
            pages: 1,
        };
        this.startPage();
    }
    render() {
        return (
            <div>
                <input onChange={this.updateQuery} type="text" id="myQuery" value={this.state.query} placeholder="Search.."/>
                <table id="homeTable">
                    <tbody>
                        <tr className="table_header">
                            <th>Date</th>
                            <th>Project number</th>
                            <th>Project name</th>
                            <th>Assembly number</th>
                            <th>User</th>
                        </tr>
                        <tr className="table_content"></tr>
                    </tbody>
                </table>
                <div className="paginator">
                    <span>
                        <a className="paginator_items" onClick={this.firstPage}>&laquo; first</a>
                        <a className="paginator_items" onClick={this.previousPage}> previous </a>
                        <span> Page {this.state.page} of {this.state.pages}.</span>
                        <a className="paginator_items" onClick={this.nextPage}> next </a>
                        <a className="paginator_items" onClick={this.lastPage}> last &raquo;</a>
                    </span>
                </div>
            </div>
        );
    }

    pagesCount = (query, page) => {
        projects_count(query, page)
        .then((projects_count) => {
            this.setState({
                pages: Math.ceil(projects_count/10)
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    startPage = () => {
        projects_retrieve(this.state.query, this.state.page)
        this.pagesCount(this.state.query, this.state.page)
    }

    updatePage = (query, page) => {
        remove_list();
        projects_retrieve(query, page);
    }

    updateQuery = (event) => {
        this.setState({
            query: event.target.value
        });
        this.updatePage(event.target.value, this.state.page);
        this.pagesCount(event.target.value, this.state.page);
    }

    nextPage = () => {
        if (this.state.page < this.state.pages) {
            this.setState({
                page: this.state.page + 1
            });
            this.updatePage(this.state.query, this.state.page + 1);
            this.pagesCount(this.state.query, this.state.page + 1);
        }
    }

    previousPage = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            });
            this.updatePage(this.state.query, this.state.page - 1);
            this.pagesCount(this.state.query, this.state.page - 1);
        }
    }

    firstPage = () => {
        this.setState({
            page: 1
        });
        this.updatePage(this.state.query, 1);
        this.pagesCount(this.state.query, 1);
    }

    lastPage = () => {
        this.setState({
            page: this.state.pages
        });
        this.updatePage(this.state.query, this.state.pages);
        this.pagesCount(this.state.query, this.state.pages);
    }

}

ReactDOM.render(<Search />, document.querySelector('#myQuery'));