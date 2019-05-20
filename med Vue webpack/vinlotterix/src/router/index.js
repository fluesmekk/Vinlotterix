import Vue from 'vue'
import Router from 'vue-router'
import PersonListe from '@/components/PersonListe'
import TrekningListe from '@/components/TrekningListe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PersonListe',
      component: PersonListe,
      props: true
    },
    {
      path: '/Trekning',
      name: 'TrekningListe',
      component: TrekningListe,
      props: true
    }
  ]
})
