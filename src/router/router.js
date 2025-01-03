import { TrangChuLayout } from '../Layout/TrangChuLayout'

import LienHe from '../Layout/DeafaultLayout/LienHe/LienHe'

import GioiThieu from '../Layout/DeafaultLayout/GioiThieu/GioiThieu'
import { VungLayout } from '../Layout/AdminLayout/VungLayout'
import { SearchLayout } from '../Layout/SearchLayout'
const publicRoutes = [
  { path: '/', component: TrangChuLayout },
  { path: '/lien-he', component: LienHe },
  { path: '/search', component: SearchLayout },
  { path: '/gioi-thieu-do-tho-y-yen', component: GioiThieu },
  { path: '/vung', component: VungLayout, layout: 'admin' }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
