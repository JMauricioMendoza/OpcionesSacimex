import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Titulo from '../components/Titulo';
import Footer from '../components/Footer';
import Ventana from '../components/Ventana';
import { EstilosGlobales, CentrarPrincipalContenedor } from '../utils/estilosPages';
import datosCreditos from '../components/Comisiones/datosComisiones.json';
import { greenSacimex, text, label, disabled, smaLength1, medLength1, medLength2, medLength3, smaFont, medFont } from '../utils/stylesRules';

const Comisiones = () => {
  const [mostrarAnimaciones, setMostrarAnimaciones] = useState(false);
  const [evitarScroll, setEvitarScroll] = useState(false);
  const [windowState, setWindowState] = useState(null);

  useEffect(() => {
    setMostrarAnimaciones(true);
  }, []);

  const manejarScroll = (estado) => {
    setEvitarScroll(estado);
  };

  const existeCampo = (campo, index) => {
    const existe = campo in datosCreditos[index];
    return existe;
  };

  return (
    <>
      <EstilosGlobales $evitarScroll={evitarScroll} />
      <Helmet>
        <meta
          name='description'
          content='Créditos accesibles con transparencia en Opciones Sacimex. Descubre nuestras opciones de financiamiento con comisiones claras y justas.'
        />
        <title>Opciones Sacimex - Comisiones</title>
      </Helmet>
      <Header mostrarAnimaciones={mostrarAnimaciones} evitarScroll={manejarScroll} barraVerde />
      <CentrarPrincipalContenedor>
        <PrincipalContenedor $mostrarAnimaciones={mostrarAnimaciones}>
          <Titulo texto='Comisiones' />
          <div>
            <OpcionesSaci>Opciones Sacimex S.A. de C.V. SOFOM E.N.R.</OpcionesSaci>
            <Sacimex>Sacimex</Sacimex>
          </div>
          {datosCreditos.map((item, index) => (
            <CreditoContenedor key={index}>
              <NombreCredito>{item.nombre}</NombreCredito>
              <DatosCredito>{item.numeroDeRegistro}</DatosCredito>
              <DatosCredito>{item.tipoDeCredito}</DatosCredito>
              {item.subtipoDeCredito && <DatosCredito>{item.subtipoDeCredito}</DatosCredito>}
              <TablaContenedor>
                <Tabla>
                  {['apertura', 'disposicionDelCredito', 'gastosDeInvestigacion', 'pagoTardio', 'gastosDeCobranza'].some(
                    (campo) => campo in datosCreditos[index]
                  ) && (
                    <tr>
                      <Encabezado $titulo></Encabezado>
                      <Encabezado>Porcentaje</Encabezado>
                      <Encabezado>Y/O</Encabezado>
                      <Encabezado>Moneda</Encabezado>
                      <Encabezado>Referencia</Encabezado>
                      <Encabezado>Periocidad</Encabezado>
                      <Encabezado>Fecha de entrada</Encabezado>
                      <Encabezado>Fecha de actualización</Encabezado>
                    </tr>
                  )}
                  {['apertura', 'disposicionDelCredito', 'gastosDeInvestigacion', 'pagoTardio', 'gastosDeCobranza'].map(
                    (campo) =>
                      existeCampo(campo, index) && (
                        <tr key={campo}>
                          <Celda $titulo>{campo}</Celda>
                          {Object.values(item[campo]).map((valor, i) => (
                            <Celda key={i}>{valor}</Celda>
                          ))}
                        </tr>
                      )
                  )}
                </Tabla>
              </TablaContenedor>
            </CreditoContenedor>
          ))}
        </PrincipalContenedor>
      </CentrarPrincipalContenedor>
      <Footer setWindowState={setWindowState} />
      <Ventana windowState={windowState} setWindowState={setWindowState} />
    </>
  );
};

export default Comisiones;

const PrincipalContenedor = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${medLength2};
  margin-top: ${medLength3};
  max-width: 820px;
  opacity: ${({ $mostrarAnimaciones }) => $mostrarAnimaciones ? '1' : '0'};
  padding: ${medLength1} 0 ${medLength3};
  transform: translateY(${({ $mostrarAnimaciones }) => $mostrarAnimaciones ? '0' : '-10px'});
  transition: opacity 2s, transform 2s;
  width: 100%;
`;

const OpcionesSaci = styled.p`
  color: ${greenSacimex};
  font-size: ${smaFont};
  font-weight: 400;
  text-align: center;
`;

const Sacimex = styled.p`
  color: ${greenSacimex};
  font-size: ${medFont};
  font-weight: 800;
  text-align: center;
`;

const CreditoContenedor = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${smaLength1};
`;

const NombreCredito = styled.h3`
  color: ${greenSacimex};
  font-size: ${smaFont};
  text-align: center;
`;

const DatosCredito = styled.p`
  font-size: ${smaFont};
  text-align: center;
`;

const TablaContenedor = styled.div`
  margin-bottom: 100px;
  max-width: 820px;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 90vw;

  @media (min-width: 920px) {
    overflow-x: hidden;
  };
`;

const Tabla = styled.table`
  border-collapse: collapse;
  font-size: ${smaFont};
  text-align: center;
  width: 820px;
`;

const Celda = styled.td`
  border-bottom: 1px solid ${disabled};
  ${({ $titulo }) => $titulo && (`border-right: 1px solid ${label};`)};
  ${({ $titulo }) => $titulo ? `color: ${text};` : `color: ${label};`};
  ${({ $titulo }) => $titulo && (`font-weight: 800`)};
  padding: ${smaLength1};
`;

const Encabezado = styled.th`
  border-bottom: 1px solid ${label};
  ${({ $titulo }) => $titulo && (`border-right: 1px solid ${label};`)};
  padding: ${smaLength1};
`;