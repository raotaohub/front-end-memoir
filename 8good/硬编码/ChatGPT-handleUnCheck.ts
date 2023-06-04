type Key = string;

type TreeData = Array<{
  key: Key;
  children?: TreeData;
}>;

type CheckedKeys = Array<Key>;

function handleUnCheck(treeData: TreeData, preCheckedKeys: CheckedKeys, key: Key): CheckedKeys {
  const checkedNodes = new Set(preCheckedKeys);
  const removeNodes = new Set<Key>();

  // 获取所有将被取消选中的节点
  getRemoveNodes(treeData, key);

  // 从选中节点集合中移除需要取消选中的节点及其子孙节点
  removeNodes.forEach((removeKey) => {
    checkedNodes.delete(removeKey);
  });

  // 返回最终的选中节点数组
  return Array.from(checkedNodes);

  // 递归遍历树节点，获取所有将被取消选中的节点
  function getRemoveNodes(nodes: TreeData, targetKey: Key) {
    nodes.forEach((node) => {
      if (node.key === targetKey) {
        removeNodes.add(node.key);
        return;
      }

      if (node.children) {
        const hasCheckedChild = getRemoveNodes(node.children, targetKey);
        if (hasCheckedChild) {
          removeNodes.add(node.key);
        }
      }
    });
    return nodes.some((node) => checkedNodes.has(node.key));
  }
}

// 示例数据
const TREE_DATA = [
  {
    key: "a-1",
    children: [
      {
        key: "b-1",
        children: [{ key: "c-1-1" }, { key: "c-1-2" }]
      },
      { key: "b-2" },
      { key: "b-3" }
    ]
  },
  {
    key: "a-2"
  }
];

// 调用示例

console.log(handleUnCheck(TREE_DATA, ["a-1", "b-1", "c-1-1"], "c-1-1")); //   []
console.log(handleUnCheck(TREE_DATA, ["a-1", "b-1", "b-2", "c-1-1"], "c-1-1")); //  [ 'a-1', 'b-2' ]
console.log(handleUnCheck(TREE_DATA, ["a-1", "b-1", "b-2", "c-1-1", "a-2"], "c-1-1")); //  [ 'a-1', 'b-2' ]

export {};
