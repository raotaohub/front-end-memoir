// function transfor(obj) {
//   const result = [];

//   Object.values(obj).forEach((v) => {});
// }

// transform({
//   0: {
//     username: "0",
//     department: "A-B-C"
//   },
//   1: {
//     username: "1",
//     department: "A-B-D"
//   },
//   2: {
//     username: "2",
//     department: "A-X-Y"
//   }
// });

// [
//   {
//     name: "A",
//     path: "A",
//     children: [
//       {
//         name: "0",
//         path: "A-B",
//         children: [
//           { name: "0", path: "A-B-C", children: [] },
//           { name: "1", path: "A-B-D", children: [] }
//         ]
//       },
//       { name: "2", path: "A-X", children: [{ name: "2", path: "A-X-Y", children: [] }] }
//     ]
//   }
// ];

// list: 数组对象
// id: 每条数据的id
// pid: 每条数据的父节点对应字段
// pid:null 没有父节点的数据

const list = [
  { id: 04, pid: 03 },
  { id: 01, pid: null },
  { id: 02, pid: null },
  { id: 03, pid: 01 },
  { id: 05, pid: 01 },
  { id: 06, pid: 03 },
  { id: 07, pid: 02 },
  { id: 09, pid: 02 },
  { id: 10, pid: 07 }
];

function toTree(list) {
  const result = [];
  let len = list.length;
  let map = {};

  list.forEach((item) => {
    map[item.id] = item;
  });

  console.log("map", map);
  list.forEach((item) => {
    const parent = map[item.pid]; // 利用map 来找每个元素的父元素

    console.log(parent);
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item); // 没有父元素的则为最外层的元素
    }
  });

  console.log(result);
  return result;
}

toTree(list);

// [
//   ({
//     id: 1,
//     pid: null,
//     children: [
//       {
//         id: 3,
//         pid: 1,
//         children: [
//           {
//             id: 4,
//             pid: 3
//           },
//           {
//             id: 6,
//             pid: 3
//           }
//         ]
//       },
//       {
//         id: 5,
//         pid: 1
//       }
//     ]
//   },
//   {
//     id: 2,
//     pid: null,
//     children: [
//       {
//         id: 7,
//         pid: 2,
//         children: [
//           {
//             id: 10,
//             pid: 7
//           },
//           {
//             id: 11,
//             pid: 7
//           }
//         ]
//       },
//       {
//         id: 9,
//         pid: 2
//       }
//     ]
//   })
// ];
