import React, { Component } from "../src/react.js";
import ReactDOM from "../src/react-dom.js";
// import "./index.css";

// function类型的组件
function Comp(props) {
    return <h2>hi{props.name}</h2>;
}
// class类型组件
class Comp2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ' state传值'
        }
    }
    render() {
        return (
            <div>
                <h2>hi{this.props.name}</h2>
                <h2>hi{this.state.name}</h2>
            </div>
        );
    }
}
const users = [{ name: "tom", age: 20 }, { name: "jerry", age: 30 }];
const jsx = (
    <div id="demo" style={{ backgroundColor: 'red' }}>
        <div>
            <input value={users[0].name}></input>
        </div>
        <span>hi一级</span>
        <div>
            <span>hi 二级</span>
            <><span>hi 二级</span><span>hi 二级</span></>
        </div>
        <Comp name=" mini-react-function" />
        <Comp2 name=" mini-react-class" />
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
