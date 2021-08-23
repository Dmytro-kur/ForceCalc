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
                <input onChange={this.updateQuery} type="text" id="myQuery" placeholder="Search.."/>
                <table id="homeTable">
                    <tbody>
                        {/* value={this.state.query}  */}
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

    pagesCount = () => {
        this.state.pages = Math.ceil(document.querySelector("#page_counter").innerHTML/10);
    }

    startPage = () => {
        projects_retrieve(this.state.query, this.state.page)
        this.pagesCount()
    }

    // updatePage = (query, page) => {
    //     remove_list();
    //     projects_retrieve(query, page);
    // }

    updateQuery = (event) => {
        console.log(event.target.value)

        this.state.query = event.target.value;

        document.querySelector('#myQuery').value = event.target.value;
        projects_retrieve(event.target.value, this.state.page);
        this.pagesCount();
    }







    nextPage = () => {
        if (this.state.page < this.state.pages) {
            this.setState({
                page: this.state.page + 1
            });
            projects_retrieve(this.state.query, this.state.page + 1);
            // this.updatePage(this.state.query, this.state.page + 1);
            this.pagesCount();
        }
    }

    previousPage = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            });
            projects_retrieve(this.state.query, this.state.page - 1);
            // this.updatePage(this.state.query, this.state.page - 1);
            this.pagesCount();
        }
    }

    firstPage = () => {
        this.setState({
            page: 1
        });
        projects_retrieve(this.state.query, 1);
        // this.updatePage(this.state.query, 1);
        this.pagesCount();
    }

    lastPage = () => {
        this.setState({
            page: this.state.pages
        });
        projects_retrieve(this.state.query, this.state.pages);
        // this.updatePage(this.state.query, this.state.pages);
        this.pagesCount();
    }





}

ReactDOM.render(<Search />, document.querySelector('#myQuery'));