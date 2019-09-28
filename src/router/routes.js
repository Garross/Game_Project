export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/router/views/Home')
  },
  {
    path: '/games/TowerPvP',
    name: 'tower_pvp',
    component: () => import('@/router/games/tower_pvp')
  },
]
