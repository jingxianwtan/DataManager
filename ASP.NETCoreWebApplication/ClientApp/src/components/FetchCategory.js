import React, { Component } from 'react';
import Link from "react-router-dom/Link";

export class FetchCategory extends Component {
    static displayName = FetchCategory.name;

    constructor(props) {
        super(props);
        this.state = { categories: [], loading: true, parent: "" };
    }

    componentDidMount() {
        this.populateCategory();
    }

    static renderCategoryTable(categories, parent) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category ID</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => {
                    return <tr key={category.name}>
                            <td><Link to={{pathname: `/event`, state: {pName : parent, cName : category.name, cid : category.categoryId}}}>{category.name}</Link></td>
                            <td>{category.categoryId}</td>
                        </tr>
                })}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchCategory.renderCategoryTable(this.state.categories, this.state.parent);
        return (
            <div>
                <h1 id="tabelLabel" >All Categories</h1>
                <p>Here are all the categories.</p>
                {contents}
            </div>
        );
    }

    async populateCategory() {
        const params = this.props.location.state;
        const response = await fetch('category?parent_cat=' + params.pid);
        const data = await response.json();
        this.setState({ categories: data, loading: false, parent : params.pName });
    }
}
