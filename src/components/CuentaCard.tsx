import { Button, Card } from "react-bootstrap";

interface CuentaCardProps {
    id?: number;
    numero_cuenta: number;
    saldo: string;
    onClick?: (id: number) => void;
    onIngreso?: void;
    onEgreso?: void;
}


export const CardCuenta = ({ numero_cuenta, saldo, onClick }: CuentaCardProps) => {
    return (
        <Card className="mb-3 card-cuenta" style={{ height: '250px' }}>
            <Card.Body>
                <Card.Title>Cuenta Nº</Card.Title>
                <Card.Subtitle className="text-muted">{numero_cuenta}</Card.Subtitle>
                
                <div className="d-flex justify-content-between align-items-center">
                <Card.Text className="fw-normal"><span className="fw-bold">Saldo</span> <br/> Bs. {saldo}</Card.Text>
                <Button variant="outline-primary" onClick={() => onClick?.(numero_cuenta)}>
                    Movimientos
                </Button>
                </div>
                
                
            </Card.Body>
        </Card>
    );
}