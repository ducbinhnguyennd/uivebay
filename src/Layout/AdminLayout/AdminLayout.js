import { Header } from './Header'
import { Sidebar } from './Sidebar'
import './AdmiLayout.scss'
import { SidebarProvider } from './context/sidebarContext'

function AdminLayout ({ children }) {
  return (
    <SidebarProvider>
      <div className='app'>
        <Sidebar />
        <div className='main-content'>
          <Header />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
