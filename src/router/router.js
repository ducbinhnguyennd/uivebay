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
import { HoaDonLayout } from '../Layout/AdminLayout/HoaDonLayout'
import { NganHangLayout } from '../Layout/AdminLayout/NganHangLayout'
import { VoucherLayout } from '../Layout/AdminLayout/VoucherLayout'
import DatVeQT from '../Layout/DatVe/DatVeQT'
import DatVe from '../Layout/DatVe/DatVe'
import DatVeKhuHoiQT from '../Layout/DatVe/DateKhuHoiQT'
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
import TrangChuMB from '../LayoutMobile/TrangChuMB/TrangChuMB'
import LienHeMB from '../LayoutMobile/DefaultLayoutMB/LienHeMB/LienHeMB'
import SearchNoiDiaMB from '../LayoutMobile/SearchMB/SearchNoiDiaMB/SearchNoiDiaMB'
import SearchNoiDiaKHMB from '../LayoutMobile/SearchMB/SearchNoiDiaKHMB/SearchNoiDiaKHMB'
import DatVeKhuHoi from '../Layout/DatVe/DatVeKhuHoi'
import DatVeKhuHoiMB from '../LayoutMobile/DatVeMB/DatVeNoiDiaKHMB/DatVeNoiDiaKHMB'
import DatVeNoiDiaMB from '../LayoutMobile/DatVeMB/DatVeNoiDiaMB/DatVeNoiDiaMB'
import SearchQTMB from '../LayoutMobile/SearchMB/SearchQTMB/SearchQTMB'
import SearchKHQTMB from '../LayoutMobile/SearchMB/SearchQTKHMB/SearchKHQTMB'
import DatVeKhuHoiQTMB from '../LayoutMobile/DatVeMB/DatVeKhuHoiQTMB/DatVeKhuHoiQTMB'
import DatVeQuocTeMB from '../LayoutMobile/DatVeMB/DatVeQuocTeMB/DatVeQuocTeMB'
const IsMobile = () => {
  return useMediaQuery({ query: '(max-width: 767px)' })
}

const publicRoutes = [
  { path: '/gioi-thieu', component: GioiThieu },
  { path: '/login', component: Login, layout: null },
  { path: '/vung', component: VungLayout, layout: 'admin' },
  { path: '/hangmaybay', component: HangMayBayLayout, layout: 'admin' },
  { path: '/theloaiblog', component: TheLoaiBlog, layout: 'admin' },
  { path: '/phantram', component: PhanTramLayout, layout: 'admin' },
  { path: '/hoadon', component: HoaDonLayout, layout: 'admin' },
  { path: '/nganhang', component: NganHangLayout, layout: 'admin' },
  { path: '/voucher', component: VoucherLayout, layout: 'admin' },
  { path: '/getchitietblog/:idblog', component: BlogDetail },
  { path: '/getkhuyenmai/:idblog', component: BlogDetailKM },
  { path: '/chitietdonhang', component: ChiTietDonHang },
  { path: '/thongtinchuyenkhoan', component: ThongTinChuyenKhoan },
  { path: '/thanhtoan', component: ThanhToan },
  { path: '/tin-khuyen-mai', component: KhuyenMai },
  { path: '/xem-lai-don-hang', component: XemLaiDonHang },
  {
    path: '/',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <TrangChuMB /> : <TrangChuLayout />
    }
  },
  {
    path: '/lien-he',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <LienHeMB /> : <LienHe />
    }
  },
  {
    path: '/search',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <SearchNoiDiaMB /> : <SearchLayout />
    }
  },

  {
    path: '/datve',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <DatVeNoiDiaMB /> : <DatVe />
    }
  },
  {
    path: '/datvekhuhoi',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <DatVeKhuHoiMB /> : <DatVeKhuHoi />
    }
  },

  {
    path: '/datvequocte',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <DatVeQuocTeMB /> : <DatVeQT />
    }
  },
  {
    path: '/datvekhuhoiquocte',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <DatVeKhuHoiQTMB /> : <DatVeKhuHoiQT />
    }
  },

  {
    path: '/searchkhuhoi',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <SearchNoiDiaKHMB /> : <SearchKhuHoi />
    }
  },
  {
    path: '/searchquocte',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <SearchQTMB /> : <SearchQuocTe />
    }
  },
  {
    path: '/searchkhuhoiquocte',
    component: () => {
      const isMobile = IsMobile()
      return isMobile ? <SearchKHQTMB /> : <SearchKHQT />
    }
  }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
