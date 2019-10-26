const { Component } = React;
const { render } = ReactDOM;

const app = document.querySelector('#app');

class App extends Component {
    state = {
        users: [],
        currHash: 'products',
    }

    componentDidMount() {
        console.log('mounted')
        fetch(`https://acme-users-api-rev.herokuapp.com/api/${this.state.currHash}`)
        .then(response => response.json())
        .then(users => {
            this.setState({ users })
    }).catch( e => console.log(e))
}

    componentDidUpdate(prevProps, prevState) {
        if(this.currHash !== this.state.currHash) {
        fetch(`https://acme-users-api-rev.herokuapp.com/api/${this.state.currHash}`)
        .then(response => response.json())
        .then(users => {
            this.setState({ users })
    }).catch( e => console.log(e))
}
}

    render() {
        let { users, currHash } = this.state;

        const changeHash = (target) => {
            // currHash = ev.target.innerText.toLowerCase();
            // console.log(currHash);
            console.log('hi')
            currHash = target.innerText.toLowerCase();
            this.setState({currHash})
        }

        const productLink = React.createElement('a', { onClick: (ev) =>{
            changeHash(ev.target);
        }}, 'Products')
        const companyLink = React.createElement('a', { onClick: (ev) => {
            changeHash(ev.target);
        }}, 'Company')

        const lis = users.map((user, idx) => React.createElement('li', { key: idx }, `${user.name} - ${user.description}`));
        const list = React.createElement('ul', null, lis)
        return React.createElement('div', null, productLink, companyLink, list);
        // return React.createElement('p', null, 'Hiu')
    }
}
render(React.createElement(App),app)