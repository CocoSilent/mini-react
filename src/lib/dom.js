//vdom转换为dom
//diff
//vtype元素类型：1-html元素；2-function组件；3-class组件
export function createVNode(vtype, type, props) {
    const vnode = { vtype, type, props };
    return vnode;
}

//vdom转换为dom
export function initVNode(vnode) {
    const { vtype } = vnode;
    if (!vtype) {
        //文本节点
        return document.createTextNode(vnode);
    }
    const { props } = vnode;
    let { children } = props;
    let flag = false;
    for(let i=children.length-1;i>=0;i--) {
        const c = children[i];
        if (c.vtype === 4) {
            flag = true;
            const splice = children.splice(i,1);
            splice[0].props.children.forEach(item=>{
                children.push(item);
            })
        }
    }
    if (flag) {
        console.log(vnode);
    }

    if (vtype === 1) {
        //原生元素
        return createElement(vnode);
    } else if (vtype === 2) {
        //class组件
        return createClassComp(vnode);
    } else if (vtype === 3) {
        //函数组件
        return createFuncComp(vnode);
    }
}

function createElement(vnode) {
    const { type, props } = vnode;
    //type是元素标签
    const node = document.createElement(type);
    //处理属性
    const { key, children, ...rest } = props;
    Object.keys(rest).forEach(k => {
        if (k === "className") {
            node.setAttribute("class", rest[k]);
        } else if (k === "htmlFor") {
            node.setAttribute("for", rest[k]);
        } else if (k === "style") {
            const style = rest[k];
            if (typeof style === 'string') {
                node.style.cssText = style;
            } else {
                for (const cssName in style) {
                    node.style[cssName] = style[cssName];
                }
            }
        } else {
            node.setAttribute(k, rest[k]);
        }
    });
    children.forEach(c => {
        if (Array.isArray(c)) {
            c.forEach(n => node.appendChild(initVNode(n)));
        } else {
            node.appendChild(initVNode(c));
        }
    });
    return node;
}

function createClassComp(vnode) {
    //type是class组件的声明
    const { type, props } = vnode;
    const component = new type(props);
    const vdom = component.render();
    return initVNode(vdom);
}
function createFuncComp(vnode) {
    //type是函数
    const { type, props } = vnode;
    const vdom = type(props);
    return initVNode(vdom);
}

export function createDom(fiber) {
    const { vtype } = vnode;
    if (!vtype) {
        //文本节点
        return document.createTextNode(vnode);
    }
    const { props } = vnode;
    let { children } = props;
    let flag = false;
    for(let i=children.length-1;i>=0;i--) {
        const c = children[i];
        if (c.vtype === 4) {
            flag = true;
            const splice = children.splice(i,1);
            splice[0].props.children.forEach(item=>{
                children.push(item);
            })
        }
    }
    if (flag) {
        console.log(vnode);
    }

    if (vtype === 1) {
        //原生元素
        return createElement(vnode);
    } else if (vtype === 2) {
        //class组件
        return createClassComp(vnode);
    } else if (vtype === 3) {
        //函数组件
        return createFuncComp(vnode);
    }
}

