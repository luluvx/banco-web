import {  Routes, Route } from "react-router";
import { URLS } from "./CONSTANTS";
import LoginForm from "../pages/LoginForm";
import Home from "../pages/Home";
import RegisterForm from "../pages/RegisterForm";
import MovimientoForm from "../pages/MovimientoForm";
import BeneficiariosList from "../pages/BeneficiariosList";
import BeneficiarioForm from "../pages/BeneficiarioForm";
import TransferenciaForm from "../pages/TransferenciaForm";
import MovimientosList from "../pages/MovimientosList";
import TransferenciasList from "../pages/TransferenciasList";

const RouterConfig = () => {
    return (
        <Routes>
            <Route path={URLS.LOGIN}element={ <LoginForm/> } />
            <Route path={URLS.HOME} element={<Home/>} />
            <Route path={URLS.REGISTER} element={<RegisterForm/>} />
            <Route path={URLS.MOVIMIENTOS.CREATE} element={<MovimientoForm/>} />
            <Route path={URLS.BENEFICIARIOS.LIST} element={<BeneficiariosList/>} />
            <Route path={URLS.BENEFICIARIOS.CREATE} element={<BeneficiarioForm/>} />
            <Route path={URLS.BENEFICIARIOS.EDIT} element={<BeneficiarioForm/>} />
            <Route path={URLS.TRANSFERENCIAS.CREATE} element={<TransferenciaForm/>} />
            <Route path={URLS.MOVIMIENTOS.LIST} element={<MovimientosList/>} />
            <Route path={URLS.TRANSFERENCIAS.LIST} element={<TransferenciasList/>} />
        </Routes>

    );
}

export default RouterConfig;