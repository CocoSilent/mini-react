import { initVNode } from "./lib/dom.js";
function render(vnode, container) {
    //虚拟dom转成真实dom
    const node = initVNode(vnode);
    //把都挂载到root节点上
    container.appendChild(node);
}

export default { render };
