import { createGroup, getMenus, getRoutes } from './core'

import Index from '@/view'
import Logs from '@/view/nav1/Logs/Logs'
import Nav1 from '@/view/nav1/Nav1'
import Rate from '@/view/nav1/Rate/Rate'
import Nav2 from '@/view/nav2/Nav2'
import Like from '@/view/nav2/Like/Like'
import Star from '@/view/nav2/Star/Star'
import Nav3 from '@/view/nav3/Nav3'

//
const nav1 = createGroup('nav1', {
   title: 'nav1',
   component: Nav1
})

nav1.createRoute('log', {
   title: 'logs',
   component: Logs
})

nav1.createRoute('rate', {
   title: 'rate',
   component: Rate
})

const nav2 = createGroup('nav2', {
   title: 'nav2',
   component: Nav2
})

nav2.createRoute('like', {
   title: 'like',
   component: Like
})

nav2.createRoute('star', {
   title: 'star',
   component: Star
})

const nav3 = createGroup('nav3', {
   title: 'nav3',
   component: Nav3
})

//

console.log(getRoutes(), getMenus())
