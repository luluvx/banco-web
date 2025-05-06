import { Card, Col, Row } from "react-bootstrap";
import { Movimiento } from '../models/Movimiento';

type MovimientoProps = {
    movimiento: Movimiento;
}



const MovimientoCard = ({ movimiento }: MovimientoProps) => {

    const fecha = new Date(movimiento.fecha!);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const horaFormateada = fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card className="card-movimiento mb-2 px-2 py-2 ">
            <Card.Body className="p-0">
                <Row className="d-flex justify-content-between align-items-center">
                    <Col xs="auto" className="hora text-muted">
                        {fechaFormateada} {horaFormateada}
                    </Col>
                    <Col xs="auto" className="text-end fw-bold">
                        Bs.
                        {movimiento.tipo === 'egreso' ? ' - ' : ' '}
                        {movimiento.monto}
                    </Col>
                </Row>
                <br />

                <Row className="d-flex justify-content-between align-items-center">
                    <Col xs="auto" className="numero-cuenta text-muted">
                        {movimiento.cuenta?.numero_cuenta}
                    </Col>
                    <Col xs="auto" className="text-muted">
                        {movimiento.tipo.toUpperCase()}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MovimientoCard;