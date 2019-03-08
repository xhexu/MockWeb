import Router from 'vue-router'

const router = new Router ({

    routes: [{
      path: '/',
      component: resolve => require(['../views/menu/index.vue'],resolve),
      redirect: '/project',
      children: [{
        path: 'project',
        component: resolve => require(['../views/project/index.vue'],resolve)
      },{
        path: 'edit',
        component: resolve => require(['../views/project/edit.vue'], resolve)
      },{
        path: 'interList',
        component: resolve => require(['../views/interface/list.vue'], resolve)
      },{
        path: 'editor',
        component: resolve => require(['../views/interface/editor.vue'], resolve)
      },{
        path: 'detail',
        component: resolve => require(['../views/interface/detail.vue'], resolve)
      },{
        path: 'document',
        component: resolve => require(['../views/document/index.vue'], resolve)
      }]
    }]
})

export {
  router
}
