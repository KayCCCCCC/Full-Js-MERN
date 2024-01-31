import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routers/index"
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils/utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "./redux/slides/userSlides";
import Loading from "./components/LoadingComponent/Loading";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  console.log('user: ', user)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()

    if (decoded?.id) {
      handleGetDetailUser(decoded.id, storageData)
    }

    setIsLoading(false)
  }, [])
  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded, storageData } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    // console.log('storageRefreshToken', refreshToken)
    const decodedRefreshToken = jwtDecode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.RefreshToken()
        config.headers['Authorization'] = `${data?.access_token}`
      } else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })
  const handleGetDetailUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.GetDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
  }

  return (
    <React.Fragment>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page
              const isCheckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={isCheckAuth ? route.path : ''} element={
                  <React.Fragment>
                    <Layout>
                      <Page />
                    </Layout>
                  </React.Fragment>
                }
                ></Route>
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </React.Fragment>
  );
}

export default App;
