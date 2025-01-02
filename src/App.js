import React, { Fragment } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { publicRoutes } from './router'
import { DefaultLayout } from './Layout/DeafaultLayout'
import { AdminLayout } from './Layout/AdminLayout'
import ToastProvider from './components/useToast/ToastContext'

function App () {
  return (
    <ToastProvider>
      <Router>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout
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
