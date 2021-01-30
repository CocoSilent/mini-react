import React, { Component } from "../src/react.js";
import ReactDOM from "../src/react-dom.js"; // import "./index.css";
// function类型的组件

function Comp(props) {
  return /*#__PURE__*/React.createElement("h2", null, "hi", props.name);
} // class类型组件


class Comp2 extends Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "hi", this.props.name));
  }

}

const users = [{
  name: "tom",
  age: 20
}, {
  name: "jerry",
  age: 30
}];
const jsx = /*#__PURE__*/React.createElement("div", {
  id: "demo"
}, /*#__PURE__*/React.createElement("input", {
  value: users[0].name
}), /*#__PURE__*/React.createElement("span", null, "hi\u4E00\u7EA7"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "hi \u4E8C\u7EA7"), /*#__PURE__*/React.createElement("span", null, "hi \u4E8C\u7EA7")), /*#__PURE__*/React.createElement(Comp, {
  name: " mini-react-function"
}), /*#__PURE__*/React.createElement(Comp2, {
  name: " mini-react-function-class"
}), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "wo--111"), users.map((item, index) => /*#__PURE__*/React.createElement("li", {
  key: index
}, item.name, "--", item.age))));
ReactDOM.render(jsx, document.querySelector("#app"));
