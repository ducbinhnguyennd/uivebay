import { TrangChuLayout } from '../Layout/TrangChuLayout'

import LienHe from '../Layout/DeafaultLayout/LienHe/LienHe'

import GioiThieu from '../Layout/DeafaultLayout/GioiThieu/GioiThieu'



const publicRoutes = [
  { path: '/', component: TrangChuLayout },
  { path: '/lien-he', component: LienHe },

  { path: '/gioi-thieu-do-tho-y-yen', component: GioiThieu },
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
