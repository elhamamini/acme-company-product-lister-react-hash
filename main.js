const { Component } = React;
const { render } = ReactDOM;

const app = document.querySelector("#app");

class App extends Component {
  state = {
    products: [],
    companies: [],
    currHash: "products"
  };

  componentDidMount() {
    const url = [
      fetch("https://acme-users-api-rev.herokuapp.com/api/products"),
      fetch("https://acme-users-api-rev.herokuapp.com/api/companies")
    ];
    Promise.all(url).then(responses => {
      return Promise.all(responses.map(response => response.json())).then(
        datas => {
          const [products, companies] = datas;
          console.log(companies);
          this.setState({
            products: products,
            companies: companies
          });
        }
      );
    });
  }

  render() {
    let { currHash, products, companies } = this.state;
    let list;

    const changeHash = target => {
      // currHash = ev.target.innerText.toLowerCase();
      console.log(currHash);
      console.log("hi");
      const str = target.innerText.toLowerCase();
      this.setState({ currHash: str });
    };

    const productLink = React.createElement(
      "a",
      {
        herf: "#products",
        style: { border: "solid 1px black", margin: "1rem", padding: ".5rem" },

        onClick: ev => {
          changeHash(ev.target);
        }
      },
      "Products"
    );
    const companyLink = React.createElement(
      "a",
      {
        herf: "#companies",
        style: { border: "solid 1px black", padding: ".5rem" },
        onClick: ev => {
          changeHash(ev.target);
        }
      },
      "Company"
    );
    if (currHash === "products") {
      const pro = products.map((user, idx) =>
        React.createElement(
          "li",
          { key: idx },
          `${user.name} - ${user.description}`
        )
      );
      list = React.createElement("ul", null, pro);
    } else {
      const comp = companies.map((user, idx) =>
        React.createElement(
          "li",
          { key: idx },
          `${user.name} - ${user.description}`
        )
      );
      list = React.createElement("ul", null, comp);
    }

    return React.createElement("div", null, productLink, companyLink, list);
    // return React.createElement('p', null, 'Hiu')
  }
}
render(React.createElement(App), app);
