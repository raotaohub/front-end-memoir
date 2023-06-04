type Key = string;

type TreeData = Array<{
  checked?: boolean;
  pKey?: any;
  key: Key;
  children?: TreeData;
}>;

type CheckedKeys = Array<Key>;

interface Node {
  key: Key;
  parent: string | null;
}
function handleUnCheck(treeData: TreeData, preCheckedKeys: CheckedKeys, key: Key): CheckedKeys {
  // 请实现
  type TreeObj = TreeData[0];
  // 拿到所有的叶子节点
  const allNodes: Array<Node> = [];
  // 需要删除的节点
  const removeNodes = new Set([key]);

  treeData.forEach((treeDataItem) => {
    let count = 0;
    getTreeNodeParent(treeDataItem, count);
  });

  getRemoveTreeNodeList(allNodes, key);

  const res: CheckedKeys = preCheckedKeys.filter((item) => {
    return !removeNodes.has(item);
  });
  return res;

  function getRemoveTreeNodeList(allNodes, removeKey: Key) {
    allNodes.forEach((item) => {
      if (item.parent === removeKey) {
        removeNodes.add(item.key);
        const res = isParent(allNodes, item.key);
        if (res && !removeNodes.has(res as string)) {
          getRemoveTreeNodeList(allNodes, item.key);
        }
      }
    });
  }

  function isParent(arr: Array<Node>, itemKey: Key): boolean | string {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].parent === itemKey) {
        return arr[i].key;
      }
    }
    return false;
  }

  function getTreeNodeParent(parent: TreeObj, count: number): void {
    if (count === 0) {
      // 第一层的parent为null
      allNodes.push({ key: parent.key, parent: null } as Node);
    }
    count++;
    parent.children &&
      parent.children.forEach((item) => {
        allNodes.push({ key: item.key, parent: parent.key } as Node);
        if (item.children) {
          getTreeNodeParent(item, count++);
        }
      });
  }
}

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

// console.log(handleUnCheck(TREE_DATA, ["a-1", "b-1", "b-2", "c-1-1"], "c-1-1")); // ['a-1', 'b-1', 'b-2']
// console.log(handleUnCheck(TREE_DATA, ["a-1", "b-1", "c-1-1", "a-2"], "a-1")); // ['a-2']

// console.log(handleUnCheck(TREE_DATA, ["a-1", "b-1", "c-1-1"], "c-1-1")); //  [ 'a-1', 'b-1' ] ! []

// 假设我们在开发一个可check的树组件，请编写一个handleUnCheck方法，用于实现摸个树节点被取消选中后，计算整棵树的选中状态，所有子孙节点需要被取消选中。

// 方法参数说明：

// treeData - 嵌套的树结构，结构面熟见下面代码块中的TreeData。
// preCheckedKeys - 之前的选中状态，值内容为选中节点的key数组。
// key - 将要被取消选中的节点key。
// 方法输出说明：取消选中之后的树选中状态，值内容为选中节点的key数组。

// function _handleUnCheck(treeData: TreeData, preCheckedKeys: CheckedKeys, key: Key | Array<Key>) {
//   const allNodes: Array<TreeData[number] & { checked: boolean; pKey: string }> = [];

//   const checkedMap = preCheckedKeys.reduce((prev, cur) => {
//     prev[cur] = true;
//     return prev;
//   }, {});

//   key = typeof key === "string" ? [key] : key;

//   const unCheckMap = key.reduce((prev, cur) => {
//     prev[cur] = false;
//     return prev;
//   }, {});

//   const allCheckMap = Object.assign(checkedMap, unCheckMap);

//   const result: string[] = [];

//   function formatAllNodes(data: TreeData, allCheckMap, parent?) {
//     data.forEach((item) => {
//       if (parent && item.key !== parent) item.pKey = parent;

//       if (item.children) {
//         formatAllNodes(item.children, allCheckMap, parent);
//         item.checked = item.children.every((v) => {
//           v.checked = Boolean(allCheckMap[v.key]);
//           return v.checked;
//         });
//         if (item.checked) result.push(item.key);
//       } else {
//         item.checked = Boolean(allCheckMap[item.key]);
//         if (item.checked) result.push(item.key);
//       }
//     });
//   }

//   formatAllNodes(treeData, allCheckMap);
//   console.log("allCheckMap", allCheckMap);

//   console.log("result", result);

//   return result;
// }
function _handleUnCheck(treeData: TreeData, preCheckedKeys: CheckedKeys, key: Key | Array<Key>) {
  const allNodes: Array<TreeData[number] & { checked: boolean; pKey?: string }> = [];

  const checkedMap = preCheckedKeys.reduce((prev, cur) => {
    prev[cur] = true;
    return prev;
  }, {});

  key = typeof key === "string" ? [key] : key;

  const unCheckMap = key.reduce((prev, cur) => {
    prev[cur] = false;
    return prev;
  }, {});

  const allCheckMap = { ...checkedMap, ...unCheckMap };

  const result: string[] = [];

  /*  formatAllNodes 函数中，对于具有子节点的节点，使用 formatAllNodes(item.children, allCheckMap, parent) 进行递归处理，
        并在递归返回后执行 item.checked = item.children.every(...)。
        这导致在计算父节点的选中状态时，使用的是递归后子节点的选中状态，而不是当前处理的子节点的选中状态。

  在 formatAllNodes 函数中，处理叶子节点时，直接将其选中状态设置为 item.checked = Boolean(allCheckMap[item.key])。
        这会导致叶子节点的选中状态仅取决于 allCheckMap 中的值，而不考虑其父节点的选中状态。

  在 formatAllNodes 函数中，对于具有子节点的节点，在所有子节点都被选中时，将该节点的 key 添加到 result 数组中。
        然而，您的要求是当所有子节点都未被选中时，将该节点从 result 数组中移除，而不是当所有子节点都被选中时才添加。
   */
  function formatAllNodes(data: TreeData, parent?: string) {
    data.forEach((item) => {
      if (parent && item.key !== parent) item.pKey = parent;

      if (item.children) {
        formatAllNodes(item.children, item.key);
        item.checked = item.children.every((v) => {
          return v.checked;
        });
        if (item.checked && item.key !== parent) result.push(item.key);
      } else {
        item.checked = Boolean(allCheckMap[item.key]);
        if (item.checked && item.key !== parent) result.push(item.key);
      }
    });
  }

  /*  我保留了您原始代码中的 checkedMap 和 unCheckMap，它们分别表示已选中的节点和将要取消选中的节点。通过合并这两个映射，得到了 allCheckMap，其中包含了所有节点的最新选中状态。

  在 formatAllNodes 函数中，我首先遍历每个节点，并根据节点是否具有子节点采取不同的处理方式。

  如果节点具有子节点，我递归调用 formatAllNodes 处理子节点，并在递归返回后执行 item.checked = item.children.every(...)，即将节点的选中状态设置为所有子节点的选中状态的逻辑与。

  对于没有子节点的叶子节点，我根据 allCheckMap 中的值将其选中状态设置为 Boolean(allCheckMap[item.key])。

  在处理节点的选中状态后，我进行了额外的判断 item.key !== parent，目的是避免将父节点自身添加到 result 数组中。这是因为我们只关心子节点的选中状态变化，而不关心父节点自身的选中状态。

  最后，如果节点的选中状态为 true，且该节点不是父节点自身（通过 item.key !== parent 进行判断），则将该节点的 key 添加到 result 数组中。

通过这些修改，我确保了节点的选中状态正确计算，并且根据要求将子节点未选中的父节点从 result 数组中排除。 */

  formatAllNodes(treeData);
  //   console.log("result", result);

  return result;
}

console.log(_handleUnCheck(TREE_DATA, ["a-1", "b-1", "c-1-1"], "c-1-1")); //   []
console.log(_handleUnCheck(TREE_DATA, ["a-1", "b-1", "b-2", "c-1-1"], "c-1-1")); //  [ 'a-1', 'b-2' ]
console.log(_handleUnCheck(TREE_DATA, ["a-1", "b-1", "b-2", "c-1-1", "a-2"], "c-1-1")); //  [ 'a-1', 'b-2' ]

// export default {};

// 我觉得我的这个思路，似乎不太好，因为最终 result结果 和 data数据中的checked是不吻合的，你怎么看待？

/* 您提出的观点是正确的。在您的代码中，`result` 数组是根据节点的选中状态进行处理的，而 `data` 数据中的 `checked` 属性则是根据子节点的选中状态进行赋值的。

这导致了 `result` 数组中的节点和 `data` 数据中的节点的选中状态不一致。因此，您在代码中观察到的不吻合现象是由于这种处理方式造成的。

为了解决这个问题，您可以尝试将 `formatAllNodes` 函数中的逻辑进行调整，确保 `result` 数组和 `data` 数据中的选中状态一致。

以下是一个可能的修改思路：

1. 在遍历每个节点时，首先检查其子节点的选中状态。

2. 如果节点具有子节点，递归调用 `formatAllNodes` 处理子节点，并获取子节点的选中状态。

3. 根据子节点的选中状态，更新当前节点的选中状态。

4. 然后，根据更新后的选中状态，将当前节点的 `key` 添加到 `result` 数组中，或从 `result` 数组中移除。

通过这样的调整，可以确保 `result` 数组中的节点和 `data` 数据中的节点的选中状态一致。这样，您就能够正确获得取消选中后的树的选中状态。

请尝试根据这个思路进行修改，并验证输出结果是否符合您的预期。如果您需要进一步的帮助，请随时告诉我。 */
