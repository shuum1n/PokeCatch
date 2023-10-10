import { createRouter, createWebHistory } from 'vue-router'
import Test from '../views/Test.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/Home.vue'
import ImageForm from '../views/ImageForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/edit/profile-picture',
      name: 'editProfilePicture',
      component: ImageForm
    }
  ]
})

router.beforeEach((to, from, next) =>
{
  if (to.name === 'register')
  {
    next()
  }
  else if (to.name !== 'login' && !localStorage.access_token)
  {
    next({ name: 'login' });
  }
  else if (to.name === 'login' && localStorage.access_token)
  {
    next({ name: 'home' });
  }
  else
  {
    next();
  }
})

export default router
