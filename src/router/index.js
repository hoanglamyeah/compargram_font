import Vue from 'vue'
import Router from 'vue-router'
import Compare from '@/components/Compare'
import HomePage from '@/components/Homepage'
import Category from '@/components/Category'
import Thing from '@/components/Thing'
import ThingEditor from '@/components/ThingEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/compare',
      name: 'Compare',
      component: Compare
    },
    {
      path: '/thing',
      name: 'Thing',
      component: Thing
    },
    {
      path: '/thinge',
      name: 'ThingEditor',
      component: ThingEditor
    }
  ]
})
