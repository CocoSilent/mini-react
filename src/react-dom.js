// import { initVNode } from "./lib/dom.js";
// function render(vnode, container) {
//     //虚拟dom转成真实dom
//     console.log('abc', vnode);
//     const node = initVNode(vnode);
//     //把都挂载到root节点上
//     container.appendChild(node);
// }


// fiber版
let nextFiberReconcileWork = null;
let wipRoot = null;


function reconcileChildren(wipFiber, elements) {
    if (!elements) {
        return
    }
    let index = 0
    while (index < elements.length) {
        let newFiber;
        if (typeof elements[index] === 'string') {
            newFiber = {
                type: 'TEXT_ELEMENT',
                props: {
                    nodeValue: elements[index],
                },
                dom: null,
                return: wipFiber,
                effectTag: "PLACEMENT", // 新增
            }
        } else {
            newFiber = {
                type: elements[index].type,
                props: elements[index].props,
                dom: null,
                return: wipFiber,
                effectTag: "PLACEMENT", // 新增
            }
        }

        if (index === 0) {
            wipFiber.child = newFiber;
        } else {
            wipFiber.child.sibling = newFiber;
        }
        index++;
    }
}

function createDom(fiber) {
    console.log(fiber)
    const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);

    for (const prop in fiber.props) {
        setAttribute(dom, prop, fiber.props[prop]);
    }

    return dom;
}

function isEventListenerAttr(key, value) {
    return typeof value == 'function' && key.startsWith('on');
}

function isStyleAttr(key, value) {
    return key == 'style' && typeof value == 'object';
}

function isPlainAttr(key, value) {
    return typeof value != 'object' && typeof value != 'function';
}

const setAttribute = (dom, key, value) => {
    if (key === 'children') {
        return;
    }

    if (key === 'nodeValue') {
        dom.textContent = value;
    } else if (isEventListenerAttr(key, value)) {
        const eventType = key.slice(2).toLowerCase();
        dom.addEventListener(eventType, value);
    } else if (isStyleAttr(key, value)) {
        Object.assign(dom.style, value);
    } else if (isPlainAttr(key, value)) {
        dom.setAttribute(key, value);
    }
};


function reconcile(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
}

function performNextWork(fiber) {
    reconcile(fiber);
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }
    let parentFiber = fiber.return;
    while (!parentFiber.dom) {
        parentFiber = parentFiber.return;
    }

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
        parentFiber.dom.appendChild(fiber.dom);
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling)
}

function commitRoot() {
    console.log(wipRoot);
    commitWork(wipRoot.child);
    wipRoot = null
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextFiberReconcileWork && !shouldYield) {
        nextFiberReconcileWork = performNextWork(
            nextFiberReconcileWork
        );
        shouldYield = deadline.timeRemaining() < 1
    }
    if (!nextFiberReconcileWork && wipRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);


function render(vnode, container) {
    console.log(vnode)
    wipRoot = {
        dom: container,
        props: {
            children: [vnode],
        }
    }
    nextFiberReconcileWork = wipRoot
}

export default { render };
