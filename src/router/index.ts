// import Main from '@/pages/Main.vue'
// import { createRouter, createWebHistory } from 'vue-router'

// const routes = [
//     {
//         path: '/',
//         redirect: () => {
//           const sessionId = (+new Date()).toString(16);
//           return `/f${sessionId}`;
//         }
//       },
//       {
//         path: '/:id',
//         component: Main,
//       }
   
// ]

// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes,
    
// })

// export default router

import Main from '@/pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
        path: '/:id',
        component: Main,
    }
  ]
})

// Генерация уникального идентификатора
function generateSessionId() {
  return (+new Date()).toString(16);
}

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    const sessionId = generateSessionId();
    next(`/f${sessionId}`);
  } else {
    next();
  }
})

export default router