import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  // { path: '/404', component: _import('errorPage/404'), hidden: true },
  // { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('documentation/index'),
  //       name: 'documentation',
  //       meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   meta: { role: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('permission/index'),
  //       name: 'permission',
  //       meta: {
  //         title: 'permission',
  //         icon: 'lock',
  //         role: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('svg-icons/index'),
  //       name: 'icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  {
    path: '/activity',
    component: Layout,
    meta: { title: 'activity', icon: 'example' },
    children: [
      {
        path: 'add',
        component: _import('activity/index'),
        name: 'add',
        meta: { title: 'activityAdd', icon: 'example', role: 'store' }
      },
      {
        path: 'config',
        component: _import('activity/config'),
        name: 'activity-config',
        meta: { title: 'activityConfig', icon: 'example', role: 'admin' }
      },
      {
        path: 'list',
        component: _import('activity/list'),
        name: 'list',
        meta: { title: 'activityList', icon: 'example' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    meta: { title: 'activity', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'edit-activity/:id',
        component: _import('activity/edit'),
        name: 'edit-activity',
        meta: { title: 'activityEdit', icon: 'example' }
      },
      {
        path: 'action/:id',
        component: _import('activity/action'),
        name: 'action',
        meta: { title: 'actionMrg', icon: 'example' }
      }
    ]
  },
  {
    path: '/information',
    component: Layout,
    meta: { title: 'information', icon: 'example', role: 'admin' },
    children: [
      {
        path: 'information-add',
        component: _import('information/add'),
        name: 'information-add',
        meta: { title: 'informationAdd', icon: 'example' }
      },
      {
        path: 'information-list',
        component: _import('information/list'),
        name: 'information-list',
        meta: { title: 'informationList', icon: 'example' }
      }
    ]
  },
  {
    path: '/information',
    component: Layout,
    meta: { title: 'information', icon: 'example', role: 'admin' },
    hidden: true,
    children: [
      {
        path: 'edit-information/:id',
        component: _import('information/edit'),
        name: 'edit-information',
        meta: { title: 'informationEdit', icon: 'example' }
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    meta: { title: 'store', icon: 'example', role: 'admin' },
    children: [
      {
        path: 'add',
        component: _import('store/add'),
        name: 'store-add',
        meta: { title: 'storeAdd', icon: 'example' }
      },
      {
        path: 'list',
        component: _import('store/list'),
        name: 'store-list',
        meta: { title: 'storeList', icon: 'example' }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    meta: { title: 'store', icon: 'example', role: 'admin' },
    hidden: true,
    children: [
      {
        path: 'edit/:id',
        component: _import('store/edit'),
        name: 'store-edit',
        meta: { title: 'storeEdit', icon: 'example' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: 'user', icon: 'example', role: 'admin' },
    children: [
      {
        path: 'list',
        component: _import('user/list'),
        name: 'user-list',
        meta: { title: 'userList', icon: 'example' }
      },
      {
        path: 'comments',
        component: _import('user/comments'),
        name: 'user-comments',
        meta: { title: 'userComments', icon: 'example' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    meta: { title: 'setting', icon: 'example', role: 'admin' },
    children: []
  },

  // {
  //   path: '/components',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'component-demo',
  //   meta: {
  //     title: 'components',
  //     icon: 'component'
  //   },
  //   children: [
  //     {
  //       path: 'tinymce',
  //       component: _import('components-demo/tinymce'),
  //       name: 'tinymce-demo',
  //       meta: { title: 'tinymce' }
  //     },
  //     {
  //       path: 'markdown',
  //       component: _import('components-demo/markdown'),
  //       name: 'markdown-demo',
  //       meta: { title: 'markdown' }
  //     },
  //     {
  //       path: 'json-editor',
  //       component: _import('components-demo/jsonEditor'),
  //       name: 'jsonEditor-demo',
  //       meta: { title: 'jsonEditor' }
  //     },
  //     {
  //       path: 'dnd-list',
  //       component: _import('components-demo/dndList'),
  //       name: 'dndList-demo',
  //       meta: { title: 'dndList' }
  //     },
  //     {
  //       path: 'splitpane',
  //       component: _import('components-demo/splitpane'),
  //       name: 'splitpane-demo',
  //       meta: { title: 'splitPane' }
  //     },
  //     {
  //       path: 'avatar-upload',
  //       component: _import('components-demo/avatarUpload'),
  //       name: 'avatarUpload-demo',
  //       meta: { title: 'avatarUpload' }
  //     },
  //     {
  //       path: 'dropzone',
  //       component: _import('components-demo/dropzone'),
  //       name: 'dropzone-demo',
  //       meta: { title: 'dropzone' }
  //     },
  //     {
  //       path: 'sticky',
  //       component: _import('components-demo/sticky'),
  //       name: 'sticky-demo',
  //       meta: { title: 'sticky' }
  //     },
  //     {
  //       path: 'count-to',
  //       component: _import('components-demo/countTo'),
  //       name: 'countTo-demo',
  //       meta: { title: 'countTo' }
  //     },
  //     {
  //       path: 'mixin',
  //       component: _import('components-demo/mixin'),
  //       name: 'componentMixin-demo',
  //       meta: { title: 'componentMixin' }
  //     },
  //     {
  //       path: 'back-to-top',
  //       component: _import('components-demo/backToTop'),
  //       name: 'backToTop-demo',
  //       meta: { title: 'backToTop' }
  //     }
  //   ]
  // },

  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'charts',
  //   meta: {
  //     title: 'charts',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'keyboard',
  //       component: _import('charts/keyboard'),
  //       name: 'keyboardChart',
  //       meta: { title: 'keyboardChart', noCache: true }
  //     },
  //     {
  //       path: 'line',
  //       component: _import('charts/line'),
  //       name: 'lineChart',
  //       meta: { title: 'lineChart', noCache: true }
  //     },
  //     {
  //       path: 'mixchart',
  //       component: _import('charts/mixChart'),
  //       name: 'mixChart',
  //       meta: { title: 'mixChart', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table/complex-table',
  //   name: 'example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('example/table/index'),
  //       redirect: '/example/table/complex-table',
  //       name: 'Table',
  //       meta: {
  //         title: 'Table',
  //         icon: 'table'
  //       },
  //       children: [
  //         {
  //           path: 'dynamic-table',
  //           component: _import('example/table/dynamicTable/index'),
  //           name: 'dynamicTable',
  //           meta: { title: 'dynamicTable' }
  //         },
  //         {
  //           path: 'drag-table',
  //           component: _import('example/table/dragTable'),
  //           name: 'dragTable',
  //           meta: { title: 'dragTable' }
  //         },
  //         {
  //           path: 'inline-edit-table',
  //           component: _import('example/table/inlineEditTable'),
  //           name: 'inlineEditTable',
  //           meta: { title: 'inlineEditTable' }
  //         },
  //         {
  //           path: 'complex-table',
  //           component: _import('example/table/complexTable'),
  //           name: 'complexTable',
  //           meta: { title: 'complexTable' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'tab/index',
  //       icon: 'tab',
  //       component: _import('example/tab/index'),
  //       name: 'tab',
  //       meta: { title: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'form',
  //   meta: {
  //     title: 'form',
  //     icon: 'form'
  //   },
  //   children: [
  //     {
  //       path: 'create-form',
  //       component: _import('form/create'),
  //       name: 'createForm',
  //       meta: { title: 'createForm', icon: 'table' }
  //     },
  //     {
  //       path: 'edit-form',
  //       component: _import('form/edit'),
  //       name: 'editForm',
  //       meta: { title: 'editForm', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: _import('errorPage/401'),
  //       name: 'page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: _import('errorPage/404'),
  //       name: 'page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: _import('errorLog/index'),
  //       name: 'errorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: _import('excel/exportExcel'),
  //       name: 'exportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: _import('excel/selectExcel'),
  //       name: 'selectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: _import('excel/uploadExcel'),
  //       name: 'uploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   children: [
  //     {
  //       path: 'download',
  //       component: _import('zip/index'),
  //       name: 'exportZip',
  //       meta: { title: 'exportZip', icon: 'zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('theme/index'),
  //       name: 'theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('clipboard/index'),
  //       name: 'clipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('i18n-demo/index'),
  //       name: 'i18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
