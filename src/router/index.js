import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '*', redirect: '/login'},
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../views/Login.vue'),
    meta: {
      hideNavbar: true,
      hideFooter: true
    }

  },
  {
    path: '/home',
    name: 'home',
    component: ()=> import('../views/Home.vue'),
    meta: {
      selection: 'parking'
    }

  },
  {
    path: '/home-gocorp',
    name: 'home-gocorp',
    component: ()=> import('../views/HomeGoCorp.vue'),
    meta: {
      selection: 'gocorp'
    }

  },
  {
    path: '/list-kendaraan',
    name: 'list-kendaraan',
    component: ()=> import('../views/ListKendaraan.vue'),
    meta: {
      selection: 'parking'
    }

  },
  {
    path: '/report',
    name: 'report',
    component: ()=> import('../views/Report.vue'),
    meta: {      
      selection: 'parking'
    }

  },
  {
    path: '/report-finance',
    name: 'report-finance',
    component: ()=> import('../views/Report.vue'),
    meta: {
      mode: 'finance',
      selection: 'parking'
    }

  },
  {
    path: '/report-quality-parking',
    name: 'report-quality-parking',
    component: ()=> import('../views/Report.vue'),
    meta: {
      mode: 'quality-parking',
      selection: 'parking'
    }

  },
  {
    path: '/posting',
    name: 'posting',
    component: ()=> import('../views/Posting.vue'),
  },
  {
    path: '/tambah-kendaraan',
    name: 'tambah-kendaraan',
    component: ()=> import('../views/TambahKendaraan.vue'),
    meta: {
      hideNavbar: true,
      selection: 'parking'
      // hideFooter: true
    }

  },
  {
    path: '/tambah-trip',
    name: 'tambah-trip',
    component: ()=> import('../views/TambahTrip.vue'),
    meta: {
      hideNavbar: true,
      selection: 'gocorp'
      // hideFooter: true
    }

  },
  // {
  //   path: '/approve-trip',
  //   name: 'approve-trip',
  //   component: ()=> import('../views/ApproveTrip.vue'),
  //   meta: {
  //     hideNavbar: true,
  //     hideFooter: true,
  //     selection: 'gocorp',
  //     mode: 'approve'
  //     // hideFooter: true
  //   }

  // },
  {
    path: '/reschedule-trip',
    name: 'reschedule-trip',
    component: ()=> import('../views/TambahTrip.vue'),
    meta: {
      hideNavbar: true,
      selection: 'gocorp',
      mode: 'reschedule'
      // hideFooter: true
    }

  },
  {
    path: '/cancel-trip',
    name: 'cancel-trip',
    component: ()=> import('../views/TambahTrip.vue'),
    meta: {
      hideNavbar: true,
      selection: 'gocorp',
      mode: 'delete'
      // hideFooter: true
    }

  },
  {
    path: '/mutasi-kendaraan',
    name: 'mutasi-kendaraan',
    component: ()=> import('../views/MutasiKendaraan.vue'),
    meta: {
      hideNavbar: true,
      selection: 'parking'
      // hideFooter: true
    },
    

  },
  {
    path: '/qp-download',
    name: 'qp-download',
    component: ()=> import('../views/QualityParkingDownload.vue'),
    meta: {
      hideNavbar: true,
      selection: 'parking',
      hideFooter: true
    }
  },
  {
    path: '/menu-ga',
    name: 'menu-ga',
    component: ()=> import('../views/MenuApprove.vue'),
    meta: {
      selection: 'gocorp',
      mode: 'menu-ga'
    }
  },
  {
    path: '/request-trip',
    name: 'request-trip',
    component: ()=> import('../views/MenuApprove.vue'),
    meta: {
      selection: 'gocorp',
      mode: 'request-trip'
    }
  },
  {
    path: '/history-trip',
    name: 'history-trip',
    component: ()=> import('../views/MenuApprove.vue'),
    meta: {
      selection: 'gocorp',
      mode: 'history-trip'
    }
  },
  {
    path: '/report-gocorp',
    name: 'report-gocorp',
    component: ()=> import('../views/Report.vue'),
    meta: {
      selection: 'gocorp',
      mode: 'report-gocorp'
    }
  },

]

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

export default router
