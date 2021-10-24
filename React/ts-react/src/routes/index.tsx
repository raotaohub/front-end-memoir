import Logs from '@/view/logs/Logs/Logs'
import React from 'react'
import { Redirect } from 'react-router'
import { RouteConfig } from './type'

const routes: RouteConfig[] = [
   {
      path: '/',
      component: Logs,
      routes: []
   },
   // {
   //    path: '/',
   //    exact: true,
   //    render: () => <Redirect to={'/singers'} />
   // },
   {
      path: '/recommend',
      component: Logs,
      routes: [
         {
            path: '/recommend/:id',
            component: Logs
         }
      ]
   },
   {
      path: '/singers',
      component: Logs,
      routes: [
         {
            path: '/singers/:id',
            component: Logs
         }
      ]
   },
   {
      path: '/rank',
      component: Logs,
      routes: [
         {
            path: '/rank/:id',
            component: Logs
         }
      ]
   },
   {
      path: '/search',
      component: Logs
   },
   {
      path: '/search/logs',
      component: Logs
   }
]

export default routes
