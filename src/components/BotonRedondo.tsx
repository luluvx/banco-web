import { Button } from "react-bootstrap";

type BotonRedondoProps = {
    icono: string;
    texto: string;
    onClick?: () => void;
    tamaño?: number;
};

const BotonRedondo = ({ icono, texto, onClick, tamaño = 68 }: BotonRedondoProps) => {
    return (
        <div className="text-center" style={{width: "110px", height: "100px"}}>
            <Button
                
                onClick={onClick}
                style={{
                    backgroundColor: "#131313",
                    border: "none",
                    width: `${tamaño}px`,
                    height: `${tamaño}px`,
                    borderRadius: "50%",
                    padding: 10,
                }}
            >
                <i className={`bi ${icono}`} style={{ fontSize: `${tamaño * 0.4}px`, color:'#206ff4' }}></i>
            </Button>
            <div style={{ marginTop: "10px", fontSize: "12px", color:"white", fontWeight:"bold" }}>{texto}</div>
        </div>
    );
};

export default BotonRedondo;
