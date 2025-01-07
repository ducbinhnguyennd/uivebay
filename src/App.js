import React, { Fragment } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { publicRoutes } from './router'
import { DefaultLayout } from './Layout/DeafaultLayout'
import { AdminLayout } from './Layout/AdminLayout'
import ToastProvider from './components/useToast/ToastContext'
import { useMediaQuery } from 'react-responsive'
import DeafaultLayoutMB from './LayoutMobile/DefaultLayoutMB/DefaultLayoutMB'

function App () {
  const IsMobile = () => {
    return useMediaQuery({ query: '(max-width: 767px)' })
  }

  return (
    <ToastProvider>
      <Router>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout

              if (IsMobile()) {
                Layout = DeafaultLayoutMB
              } else {
                Layout = DefaultLayout
              }
              const Page = route.component

              if (route.layout === null) {
                Layout = Fragment
              }
              if (route.layout === 'admin') {
                Layout = AdminLayout
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
