import React, { Component } from "../src/react.js";
import ReactDOM from "../src/react-dom.js";
// import "./index.css";

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
        <input value={users[0].name}></input>
        <span>hi一级</span>
        <div>
            <span>hi 二级</span>
            <span>hi 二级</span>
        </div>
        <Comp name=" mini-react-function" />
        <Comp2 name=" mini-react-function-class" />
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