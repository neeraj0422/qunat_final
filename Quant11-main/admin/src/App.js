import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Menu } from "./components/master/Menu";
import Headers from "./components/master/Header";
import { Content } from "./components/master/Content";
import { ROUTE } from "./constants/constants";
import { AuthGuardedRoute } from "./guards/authGuard/AuthGuardedRoute";
import Footer from "./components/master/Footer";
import { Market } from "./components/market/Market";
import { Asset } from "./components/asset/Asset";
import { Strategy } from "./components/strategy/Strategy";
import { Users } from "./components/users/Users";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTE.LOGIN} component={Login} />

          <AuthGuardedRoute path={ROUTE.MARKET}>
            <Layout>
              <Market />
            </Layout>
          </AuthGuardedRoute>

          <AuthGuardedRoute path={ROUTE.ASSETS}>
            <Layout>
              <Asset />
            </Layout>
          </AuthGuardedRoute>

          <AuthGuardedRoute path={ROUTE.STRATEGY}>
            <Layout>
              <Strategy />
            </Layout>
          </AuthGuardedRoute>

          <AuthGuardedRoute path={ROUTE.DASHBOARD}>
            <Layout>
              <Content />
            </Layout>
          </AuthGuardedRoute>

          <AuthGuardedRoute path={ROUTE.USERS}>
            <Layout>
              <Users />
            </Layout>
          </AuthGuardedRoute>
          {/* <Route exact path={ROUTE.DASHBOARD} component={Content} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const Layout = ({ children }) => {
  return (
    <>
      <Headers />
      <Menu />
      {children}
      <Footer />
    </>
  );
};
