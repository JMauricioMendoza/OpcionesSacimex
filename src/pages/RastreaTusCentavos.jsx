import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Titulo from '../components/Titulo';
import Imagen from '../components/Imagen';
import Calculadora from '../components/RastreaTusCentavos/Calculadora';
import Footer from '../components/Footer';
import Ventana from '../components/Ventana';
import { EstilosGlobales, CentrarPrincipalContenedor } from '../utils/estilosPages';
import ImagenGastosHormiga from '../assets/img/GastosHormiga.svg';
import { lengths } from '../utils/stylesRules';

const RastreaTusCentavos = () => {
  const [mostrarAnimaciones, setMostrarAnimaciones] = useState(false);
  const [evitarScroll, setEvitarScroll] = useState(false);
  const [windowState, setWindowState] = useState(null);

  useEffect( () => {
    setMostrarAnimaciones(true);
  },[]);

  const manejarScroll = (estado) => {
    setEvitarScroll(estado);
  };

  return(<>
    <EstilosGlobales $evitarScroll={evitarScroll}/>
    <Helmet>
      <meta
        name='description'
        content='¡Empieza a tomar el control de tus finanzas diarias!'/>
      <title>Opciones Sacimex - Rastrea tus centavos</title>
    </Helmet>
    <Header
      mostrarAnimaciones={mostrarAnimaciones}
      evitarScroll={manejarScroll}/>
    <CentrarPrincipalContenedor>
      <PrincipalContenedor $mostrarAnimaciones={mostrarAnimaciones}>
        <Titulo texto='Calculadora'/>
        <TextoImagenContenedor>
          <StyledP>Nuestra calculadora interactiva te ayuda a rastrear y controlar esos pequeños gastos que suman con el tiempo. 
            ¡Empieza a tomar el control de tus finanzas diarias y ahorra para tus metas más grandes!</StyledP>
          <Imagen
            tamano={lengths.large[3]}
            imagen={ImagenGastosHormiga}
            alt='Gastos hormiga'/>
        </TextoImagenContenedor>
        <Calculadora/>
      </PrincipalContenedor>
    </CentrarPrincipalContenedor>
    <Footer setWindowState={setWindowState}/>
    <Ventana
      windowState={windowState}
      setWindowState={setWindowState}/>
  </>);
};

export default RastreaTusCentavos;

const PrincipalContenedor = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${lengths.medium[1]};
  margin-top: ${lengths.medium[3]};
  max-width: 820px;
  opacity: ${({ $mostrarAnimaciones }) => $mostrarAnimaciones ? '1' : '0'};
  padding: ${lengths.medium[1]} ${lengths.medium[1]} ${lengths.medium[3]};
  transform: translateY(${({ $mostrarAnimaciones }) => $mostrarAnimaciones ? '0' : '-10px'});
  transition: opacity 2s, transform 2s;
  width: 100%;
`;

const TextoImagenContenedor = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${lengths.small[1]};
  justify-content: center;
`;

const StyledP = styled.p`
  min-width: 300px;
  text-align: justify;
  width: calc(100% - ${lengths.large[3]} - ${lengths.small[1]});
`;