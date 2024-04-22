import React, { Component } from "react";
import Headers from "./Header";
import { Menu } from "./Menu";
import Content from "./Content";
import Footer from "./Footer";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Headers />
        <Menu />
        <Content />
        <Footer />
      </div>
    );
  }
}
