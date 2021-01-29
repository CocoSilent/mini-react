import React, { Component } from "../src/index";
import ReactDOM from "./mReact-dom";
import "./index.css";

// function类型的组件
function Comp(props) {
    return <h2>hi{props.name}</h2>;
}
// class类型组件
class Comp2 extends Component {
    render() {
        return (
            <div>
                <h2>hi{this.props.name}</h2>
            </div>
        );
    }
}
const users = [{ name: "tom", age: 20 }, { name: "jerry", age: 30 }];
const jsx = (
    <div id="demo">
        <span>hi1</span>
        <span>hi2</span>
        <div>
            <span>hi1</span>
            <span>hi2</span>
        </div>
        <Comp name="functionkaikeba" />
        <Comp2 name="classkaikeba" />
        <ul>
            <li>wo--111</li>
            {users.map((item, index) => (
                <li key={index}>
                    {item.name}--{item.age}
                </li>
            ))}
        </ul>
    </div>
);

ReactDOM.render(jsx, document.querySelector("#app"));