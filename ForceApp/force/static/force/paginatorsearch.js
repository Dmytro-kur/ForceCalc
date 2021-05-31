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
                        <tr className="header">
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
                        <a onClick={this.CheckVisibility}>&laquo; first</a>
                        <a onClick={this.CheckVisibility}> previous </a>
                        <span> Page {this.state.page} of {this.state.pages}.</span>
                        <a onClick={this.CheckVisibility}> next </a>
                        <a onClick={this.CheckVisibility}> last &raquo;</a>
                    </span>
                </div>
            </div>
        );
    }

    startPage = () => {
        projects_retrieve(this.state.query, this.state.page)
        projects_count(this.state.query, this.state.page)
        .then((projects_count) => {
            this.setState({
                pages: Math.ceil(projects_count/10)
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    updateQuery = (event) => {
        this.setState({
            query: event.target.value
        });
        document.querySelectorAll('.table_content')
        .forEach(el => {
            el.remove()
        });
        projects_retrieve(event.target.value, this.state.page);
    }
}

ReactDOM.render(<Search />, document.querySelector('#myQuery'));



// class Paginator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             page: "1",
//             pages: "1",
//         };
//         this.page_number_refinement();
//     }
    
//     render() {
//         return (
//             <div className="paginator">
//                 <span>
//                     <a onClick={this.CheckVisibility}>&laquo; first</a>
//                     <a> previous </a>
//                     <span> Page {this.state.page} of {this.state.pages}.</span>
//                     <a> next </a>
//                     <a> last &raquo;</a>
//                 </span>
//             </div>
//         );
//     }

//     page_number_refinement() {
        
//     }
// }

// ReactDOM.render(<Paginator />, document.querySelector('#paginator'));