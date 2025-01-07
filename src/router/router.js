import { useMediaQuery } from 'react-responsive'

import { TrangChuLayout } from '../Layout/TrangChuLayout'
import LienHe from '../Layout/DeafaultLayout/LienHe/LienHe'

import GioiThieu from '../Layout/DeafaultLayout/GioiThieu/GioiThieu'
import { VungLayout } from '../Layout/AdminLayout/VungLayout'
import { SearchLayout } from '../Layout/SearchLayout'
import { HangMayBayLayout } from '../Layout/AdminLayout/HangMayBayLayout'
import { TheLoaiBlog } from '../Layout/AdminLayout/TheLoaiBlogLayout'
import { PhanTramLayout } from '../Layout/AdminLayout/PhanTramLayout'
import { Login } from '../Layout/AdminLayout/LoginLayout'
import DatVe from '../Layout/DatVe/DatVe'
import ThanhToan from '../Layout/ThanhToan/ThanhToan'
import KhuyenMai from '../Layout/DeafaultLayout/KhuyenMai/KhuyenMai'
import XemLaiDonHang from '../Layout/DeafaultLayout/XemLaiDonHang/XemLaiDonHang'
import SearchKhuHoi from '../Layout/SearchLayout/SearchKhuHoiNoiDia/SearchKhuHoi'
import SearchQuocTe from '../Layout/SearchLayout/SearchQuocTe/SearchQuocTe'
import SearchKHQT from '../Layout/SearchLayout/SearchQuocTe/SearchKHQT'
import BlogDetail from '../components/Blogs/BlogDetail'
import BlogDetailKM from '../components/Blogs/BlogDetailKM'
import ChiTietDonHang from '../Layout/DeafaultLayout/XemLaiDonHang/ChiTietDonHang'
import ThongTinChuyenKhoan from '../Layout/DeafaultLayout/ThongTinChuyenKhoan/ThongTinChuyenKhoan'
import DeafaultLayoutMB from '../LayoutMobile/DefaultLayoutMB/DefaultLayoutMB'

const useIsMobile = () => {
  return useMediaQuery({ query: '(max-width: 767px)' })
}


const publicRoutes = [
  //  {
  //   path: '/',
  //   component: useIsMobile() ? DeafaultLayoutMB : TrangChuLayout,
  // },
  { path: '/', component: TrangChuLayout },
  { path: '/lien-he', component: LienHe },
  { path: '/search', component: SearchLayout },
  { path: '/gioi-thieu', component: GioiThieu },
  { path: '/vung', component: VungLayout, layout: 'admin' },
  { path: '/hangmaybay', component: HangMayBayLayout, layout: 'admin' },
  { path: '/theloaiblog', component: TheLoaiBlog, layout: 'admin' },
  { path: '/phantram', component: PhanTramLayout, layout: 'admin' },
  { path: '/datve', component: DatVe },
  { path: '/thanhtoan', component: ThanhToan },
  { path: '/tin-khuyen-mai', component: KhuyenMai },
  { path: '/xem-lai-don-hang', component: XemLaiDonHang },
  { path: '/searchkhuhoi', component: SearchKhuHoi },
  { path: '/searchquocte', component: SearchQuocTe },
  { path: '/searchkhuhoiquocte', component: SearchKHQT },
  { path: '/getchitietblog/:idblog', component: BlogDetail },
  { path: '/getkhuyenmai/:idblog', component: BlogDetailKM },
  { path: '/chitietdonhang', component: ChiTietDonHang },
  { path: '/thongtinchuyenkhoan', component: ThongTinChuyenKhoan },
  { path: '/login', component: Login, layout: null }

]
const privateRoutes = []
export { publicRoutes, privateRoutes }
