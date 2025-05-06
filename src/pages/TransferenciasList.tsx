import { Container } from "react-bootstrap";
import Menu from "../components/Menu";
import BeneficiariosList from "./BeneficiariosList";

const TransferenciasList = () => {
    return (
        <>
            <Menu />
            <Container className="container-principal mt-5">
                <BeneficiariosList />
            </Container>
        </>
    );
}

export default TransferenciasList;