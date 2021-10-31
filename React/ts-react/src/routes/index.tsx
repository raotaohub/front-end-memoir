import Index from '@/view'
import Logs from '@/view/nav1/Logs/Logs'
import Nav1 from '@/view/nav1/Nav1'
import Rate from '@/view/nav1/Rate/Rate'
import Nav2 from '@/view/nav2/Nav2'
import Like from '@/view/nav2/Like/Like'
import Star from '@/view/nav2/Star/Star'
import Nav3 from '@/view/nav3/Nav3'
import React from 'react'
import { Redirect } from 'react-router'
import { RouteConfig } from './type'

const routes: RouteConfig[] = [
   // {
   //    path: '/',
   //    component: Index,
   //    routes: []
   // },
   {
      path: '/nav1',
      component: Nav1,
      routes: [
         {
            path: '/nav1',
            exact: true,
            render: () => <Redirect to={'/nav1/log'} />
         },

         {
            path: '/nav1/log',
            exact: true,
            component: Logs
         },
         {
            path: '/nav1/rate',
            exact: true,
            component: Rate
         }
      ]
   },
   {
      path: '/nav2',
      component: Nav2,
      routes: [
         {
            path: '/nav2',
            exact: true,
            render: () => <Redirect to={'/nav2/like'} />
         },

         {
            path: '/nav2/like',
            component: Like
         },
         {
            path: '/nav2/star',
            component: Star
         }
      ]
   },
   {
      path: '/nav3',
      component: Nav3,
      routes: []
   }
]

export default routes
