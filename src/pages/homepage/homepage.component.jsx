import React, { Component, PureComponent } from "react";

import getUsersFromDirectory from "../homepage/homepage.utils";
import ChartExample from "../../components/chart";

import "./homepage.styles.scss";

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      users: {},
    };
  }

  filterInformation() {
    let filteredProvincias = [];
    this.state.users.data.map((user) => {
      if (!filteredProvincias.includes(user.ano_de_estudio))
        filteredProvincias.push(user.ano_de_estudio);
    });
    console.log(filteredProvincias);
  }

  async componentDidMount() {
    try {
      const users = await getUsersFromDirectory();
      this.setState({ users: users });
    } catch (error) {
      console.log(error);
    }
    this.filterInformation();
  }
  render() {
    return (
      <div className="container">
        <ChartExample />
      </div>
    );
  }
}

export default HomePage;
