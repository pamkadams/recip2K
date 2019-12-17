import React, { Component } from "react";
import Pdf from "../public/recipes/cauliflower_pizza.pdf";

class Try extends Component {
  render() {
    return (
      <div>
        <a href={Pdf}>
          Full page recipe <h1>PDF Example </h1>
          <embed
            width="191"
            height="207"
            name="plugin"
            src={Pdf}
            type="application/pdf"
            page="1"
          />{" "}
        </a>
      </div>
    );
  }
}

export default Try;
