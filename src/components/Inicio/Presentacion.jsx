import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Section from '../Section';
import Foto1 from '../../assets/img/Foto1.jpg';
import { colors, lengths, fontSizes } from '../../utils/stylesRules';

const Presentacion = () => {
  return <AnimacionEntradaBoton />;
};

const AnimacionEntradaBoton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <Section presentation>
      <PrincipalContainer>
        <ImagePresentation $visible={isVisible} ref={targetRef} />
        <TextsContainer $visible={isVisible} ref={targetRef}>
          <StyledH1>Opciones Sacimex.</StyledH1>
          <StyledH2>Tu crédito de confianza.</StyledH2>
        </TextsContainer>
      </PrincipalContainer>
    </Section>
  );
};

export default Presentacion;

const PrincipalContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${lengths.medium[2]};
  justify-content: space-between;
  max-width: 1000px;
  opacity: 1;
  width: 100%;

  @media (min-width: 650px) {
    gap: 0;
  }
`;

const ImagePresentation = styled.div`
  background-image: url(${Foto1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  clip-path: circle(115% at 0 0);
  height: 350px;
  max-width: 500px;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '-10px')});
  transition: opacity 2s, transform 2s;
  width: 100%;

  @media (min-width: 650px) {
    width: 50%;
  }
`;

const TextsContainer = styled.div`
  align-items: end;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  gap: ${lengths.small[1]};
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '-10px')});
  transition: opacity 2s, transform 2s;
  width: 100%;

  @media (min-width: 650px) {
    width: 50%;
  }
`;

const StyledH1 = styled.h1`
  color: ${colors.green};
  font-size: ${lengths.medium[1]};
  text-align: center;
  width: 100%;

  @media (min-width: 650px) {
    font-size: ${lengths.medium[1]};
  }

  @media (min-width: 1000px) {
    font-size: ${lengths.medium[2]};
  }
`;

const StyledH2 = styled.h2`
  color: ${colors.label};
  font-size: ${lengths.small[2]};
  text-align: center;
  width: 100%;

  @media (min-width: 650px) {
    font-size: ${lengths.small[3]};
  }

  @media (min-width: 1000px) {
    font-size: ${lengths.medium[1]};
  }
`;