// ---------------------创建类似与react的虚拟节点--------------------------------
function h(type, props, ...children) {
    return { type, props, children };
}
// ------------------------创建真是的dom节点------------------------------------
function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}
// ------------------------用于判断节点是否相同-----------------------------------
function changed(node1, node2) {
    return (
        typeof node1 !== typeof node2 ||
        (typeof node1 === 'string' && node1 !== node2) ||
        node1.type !== node2.type
    );
}
// ------------------------用于创建节点和更像节点---------------------------------
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}
// ---------------------------------------------------------------------
const a = h('ul', {}, h('li', {}, 'item 1'), h('li', {}, 'item 2'));
const b = h('ul', {}, h('li', {}, 'item 1'), h('li', {}, 'hello!'));
// ---------------------------------------------------------------------
const $root = document.getElementById('root');
const $update = document.getElementById('update');
const $reload = document.getElementById('reload');
// ---------------------------------------------------------------------
updateElement($root, a);
$update.addEventListener('click', () => {
    updateElement($root, b, a);
});
$reload.addEventListener('click', () => {
    updateElement($root, a, b);
});