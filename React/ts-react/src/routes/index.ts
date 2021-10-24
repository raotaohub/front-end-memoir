// import React from 'react'
// import { Redirect } from 'react-router-dom';
// /**
//  * @description: exact  - 属性为true时路径中的hash值必须和path完全一致才渲染对应的组件,如果为false则'/'也可以匹配'/xxx'
//  * @description: strick - 属性
//  */

// const routes = [
//    {
//       path: '/',
//       component: Home,
//       routes: [
//          {
//             path: '/',
//             exact: true,
//             render: () => <Redirect to={'/recommend'} />
//          },
//          {
//             path: '/recommend',
//             component: Recommend,
//             routes: [
//                {
//                   path: '/recommend/:id',
//                   component: Album
//                }
//             ]
//          },
//          {
//             path: '/singers',
//             component: Singers,
//             routes: [
//                {
//                   path: '/singers/:id',
//                   component: Singer
//                }
//             ]
//          },
//          {
//             path: '/rank',
//             component: Rank,
//             routes: [
//                {
//                   path: '/rank/:id',
//                   component: Album
//                }
//             ]
//          },
//          {
//             path: '/search',
//             component: Search
//          }
//       ]
//    }
// ]

// export default routes
