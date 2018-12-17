import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '/dpcjsp',
    component: () => import('@/views/spspgl/dpcjsp')
    // name: 'dpcjsp'
    // meta: { title: '店铺创建商品' }
  },
  {
    path: '/dgsplb',
    component: () => import('@/views/spspgl/dgsplb')
    // name: 'dgsplb'
    // meta: { title: '单个SPU商品列表' }
  },
  {
    path: '/dpspxq',
    component: () => import('@/views/spspgl/dpspxq')
    // name: 'dpspxq'
    // meta: { title: '店铺商品详情' }
  },
  {
    path: '',
    component: Layout,
    redirect: 'spdashboard',
    children: [{
      path: 'spdashboard',
      component: () => import('@/views/spindex/index'),
      name: 'spdashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/spzhsz',
    component: Layout,
    redirect: 'spzhsz',
    name: 'spzhsz',
    alwaysShow: true,
    meta: {
      title: '账号设置',
      icon: 'password'
    },
    children: [
      {
        path: 'xgmm',
        component: () => import('@/views/spzhsz/xgmm'),
        name: 'xgmm',
        meta: {
          title: '修改密码'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap13 = [
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'spdashboard',
  //   children: [{
  //     path: 'spdashboard',
  //     component: () => import('@/views/spindex/index'),
  //     name: 'spdashboard',
  //     meta: {
  //       title: '首页',
  //       icon: 'dashboard',
  //       noCache: true,
  //       roles: ['1', '3']
  //     }
  //   }]
  // },
  {
    path: '/spdpgl',
    component: Layout,
    redirect: 'spdpgl',
    name: 'spdpgl',
    meta: {
      title: '店铺管理',
      icon: 'component',
      roles: ['1', '3']
    },
    children: [
      {
        path: 'spdpxx',
        component: () => import('@/views/spdpgl/dpxx'),
        name: 'dpxx',
        meta: {
          title: '店铺信息',
          roles: ['1', '3']
        }
      },
      {
        path: 'spzffs',
        component: () => import('@/views/spdpgl/zffs'),
        name: 'zffs',
        meta: {
          title: '支付方式',
          roles: ['1', '3']
        }
      },
      {
        path: 'spggcx',
        component: () => import('@/views/spdpgl/ggcx'),
        name: 'ggcx',
        meta: {
          title: '公告促销',
          roles: ['1', '3']
        }
      },
      {
        path: 'sppsxx',
        component: () => import('@/views/spdpgl/psxx'),
        name: 'psxx',
        meta: {
          title: '配送信息',
          roles: ['1', '3']
        }
      },
      {
        path: 'sphyfk',
        component: () => import('@/views/spdpgl/hyfk'),
        name: 'hyfk',
        meta: {
          title: '会员反馈',
          roles: ['1', '3']
        }
      },
      {
        path: 'sphylb',
        component: () => import('@/views/spdpgl/hylb'),
        name: 'hylb',
        meta: {
          title: '会员列表',
          roles: ['1', '3']
        }
      }

    ]
  },
  {
    path: '/spdpdd',
    component: Layout,
    redirect: 'spdpdd',
    name: 'spdpdd',
    meta: {
      title: '店铺订单',
      icon: 'clipboard',
      roles: ['1', '3']
    },
    children: [
      {
        path: 'spddgl',
        component: () => import('@/views/spdpdd/ddgl'),
        name: 'ddgl',
        meta: {
          title: '订单管理',
          roles: ['1', '3']
        }
      },
      {
        path: 'dpddxq/:id',
        component: () => import('@/views/spdpdd/dpddxq'),
        name: 'dpddxq',
        hidden: true,
        meta: {
          title: '订单详情',
          roles: ['1', '3']
        }
      },
      {
        path: 'spmdjd',
        component: () => import('@/views/spdpdd/mdjd'),
        name: 'mdjd',
        meta: {
          title: '门店加单（会员）',
          roles: ['1', '3']
        }
      },
      {
        path: 'spgwc',
        component: () => import('@/views/spdpdd/gwc'),
        name: 'gwc',
        meta: {
          title: '购物车',
          roles: ['1', '3']
        }
      }
    ]
  },
  {
    path: '/spspgl',
    component: Layout,
    redirect: 'spspgl',
    name: 'spspgl',
    meta: {
      title: '商品管理',
      icon: 'example',
      roles: ['1', '3']
    },
    children: [
      {
        path: 'ptsplb',
        component: () => import('@/views/spspgl/ptsplb'),
        name: 'ptsplb',
        meta: {
          title: '平台商品列表',
          roles: ['1', '3']
        }
      },
      {
        path: 'dpcjsp/:id',
        component: () => import('@/views/spspgl/dpcjsp'),
        hidden: true,
        name: 'dpcjsp',
        meta: {
          title: '店铺创建商品',
          roles: ['1', '3']
        }
      },
      {
        path: 'dgsplb/:id',
        component: () => import('@/views/spspgl/dgsplb'),
        hidden: true,
        name: 'dgsplb',
        meta: {
          title: '单个SPU商品列表',
          roles: ['1', '3']
        }
      },
      {
        path: 'dpspxq/:id',
        component: () => import('@/views/spspgl/dpspxq'),
        hidden: true,
        name: 'dpspxq',
        meta: {
          title: '店铺商品详情',
          roles: ['1', '3']
        }
      },
      {
        path: 'dpdgcjsp/:id',
        component: () => import('@/views/spspgl/dpdgcjsp'),
        hidden: true,
        name: 'dpspxq',
        meta: {
          title: '店铺创建商品',
          roles: ['1', '3']
        }
      },
      {
        path: 'dpsysplb',
        component: () => import('@/views/spspgl/dpsysplb'),
        name: 'dpsysplb',
        meta: {
          title: '店铺所有商品列表',
          roles: ['1', '3']
        }
      },
      {
        path: 'dpspfl',
        component: () => import('@/views/spspgl/dpspfl'),
        name: 'dpspfl',
        meta: {
          title: '店铺商品分类',
          roles: ['1', '3']
        }
      }
    ]
  }

]

export const asyncRouterMap2 = [
  {
    path: '/spyhgl',
    component: Layout,
    redirect: 'spyhgl',
    name: 'spyhgl',
    meta: {
      title: '用户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'cjyh',
        component: () => import('@/views/spyhgl/cjyh'),
        name: 'cjyh',
        meta: {
          title: '创建用户'
        }
      },
      {
        path: 'mjdpfl',
        component: () => import('@/views/spyhgl/mjdpfl'),
        name: 'mjdpfl',
        meta: {
          title: '卖家店铺分类'
        }
      },
      {
        path: 'mjdpqy',
        component: () => import('@/views/spyhgl/mjdpqy'),
        name: 'mjdpqy',
        meta: {
          title: '卖家店铺区域'
        }
      },
      {
        path: 'hylbmj',
        component: () => import('@/views/spyhgl/hylbmj'),
        name: 'hylbmj',
        meta: {
          title: '会员列表买家'
        }
      },
      {
        path: 'mjdplb',
        component: () => import('@/views/spyhgl/mjdplb'),
        name: 'mjdplb',
        meta: {
          title: '卖家店铺列表'
        }
      }
    ]
  },
  {
    path: '/spspsjk',
    component: Layout,
    redirect: 'spspsjk',
    name: 'spspsjk',
    meta: {
      title: '商品数据库',
      icon: 'chart'
    },
    children: [
      {
        path: 'ptsplb',
        component: () => import('@/views/spspsjk/ptsplb'),
        name: 'ptsplb',
        meta: {
          title: '平台商品列表（SPU）'
        }
      },
      {
        path: 'ptcjsp',
        component: () => import('@/views/spspsjk/ptcjsp'),
        name: 'ptcjsp',
        meta: {
          title: '平台创建商品（SPU）'
        }
      },
      {
        path: 'ptspfl',
        component: () => import('@/views/spspsjk/ptspfl'),
        name: 'ptspfl',
        meta: {
          title: '平台商品分类'
        }
      },

      {
        path: 'ptsppp',
        component: () => import('@/views/spspsjk/ptsppp'),
        name: 'ptsppp',
        meta: {
          title: '平台商品品牌'
        }
      },
      {
        path: 'sydpsplb',
        component: () => import('@/views/spspsjk/sydpsplb'),
        name: 'sydpsplb',
        meta: {
          title: '所有店铺商品列表'
        }
      }
    ]
  },
  {
    path: '/spbbhz',
    component: Layout,
    redirect: 'spbbhz',
    name: 'spbbhz',
    meta: {
      title: '报表汇总',
      icon: 'table'
    },
    children: [
      {
        path: 'sycgddgl',
        component: () => import('@/views/spbbhz/sycgddgl'),
        name: 'sycgddgl',
        meta: {
          title: '所有常规订单管理'
        }
      },
      {
        path: 'sycgddglxq/:id',
        component: () => import('@/views/spbbhz/sycgddglxq'),
        hidden: true,
        props: (route) => ({ query: route.query.q }),
        name: 'sycgddglxq',
        meta: {
          title: '订单详情'
        }
      },
      {
        path: 'symdjdgl',
        component: () => import('@/views/spbbhz/symdjdgl'),
        name: 'symdjdgl',
        meta: {
          title: '所有门店加单管理'
        }
      },
      {
        path: 'symdjdxq/:id',
        component: () => import('@/views/spbbhz/symdjdxq'),
        hidden: true,
        name: 'symdjdxq',
        meta: {
          title: '非常规订单详情'
        }
      },
      {
        path: 'clrw',
        component: () => import('@/views/spbbhz/clrw'),
        name: 'clrw',
        meta: {
          title: '陈列任务'
        }
      },
      {
        path: 'cjclrw',
        component: () => import('@/views/spbbhz/cjclrw'),
        name: 'cjclrw',
        meta: {
          title: '创建陈列任务'
        }
      },
      {
        path: 'ptxxtz',
        component: () => import('@/views/spbbhz/ptxxtz'),
        name: 'ptxxtz',
        meta: {
          title: '平台信息通知'
        }
      },
      {
        path: 'pthyfk',
        component: () => import('@/views/spbbhz/pthyfk'),
        name: 'pthyfk',
        meta: {
          title: '会员反馈'
        }
      },
      {
        path: 'appqdpz',
        component: () => import('@/views/spbbhz/appqdpz'),
        name: 'appqdpz',
        meta: {
          title: 'APP启动配置'
        }
      },
      {
        path: 'bnpz',
        component: () => import('@/views/spbbhz/bnpz'),
        name: 'bnpz',
        meta: {
          title: 'APP banner配置'
        }
      }
    ]
  },
  {
    path: '/spzhsz',
    component: Layout,
    redirect: 'spzhsz',
    name: 'spzhsz',
    alwaysShow: true,
    meta: {
      title: '账号设置',
      icon: 'password'
    },
    children: [
      {
        path: 'xgmm',
        component: () => import('@/views/spzhsz/xgmm'),
        name: 'xgmm',
        meta: {
          title: '修改密码'
        }
      }
    ]
  }

]
