import React, { Component } from "react";
import getUsersFromDirectory from "../homepage/homepage.utils";

import "./homepage.styles.css";

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      users: {},
    };
  }

  async componentDidMount() {
    try {
      const users = await getUsersFromDirectory();
      const jsonUsers = await users.json();
      this.setState({ users: jsonUsers.data });
    } catch (error) {
      console.log(error);
    }

    console.log(this.state.users);
  }
  render() {
    return <div></div>;
  }
}

export default HomePage;
