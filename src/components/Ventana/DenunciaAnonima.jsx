import { useState } from 'react';
import styled from 'styled-components';
import { colors, lengths, fontSizes } from '../../utils/stylesRules';

const DenunciaAnonima = () => {
  const [stateInp1, setStateInp1] = useState('vacio');
  const [stateInp2, setStateInp2] = useState('vacio');

  const manejarInput = input => {
    const value = input.value.trim();

    if(input.id === 'denuncia-1') {
      if(value === '') setStateInp1('vacio');
      else setStateInp1('completo');
    };

    if(input.id === 'denuncia-2') {
      if(value === '') setStateInp2('vacio');
      else setStateInp2('completo');
    };
  };

  return(<>
    <Texto>
      <StyledH3>Tu denuncia será totalmente anónima.</StyledH3>
      <Parrafo>En nuestra sección de denuncias anónimas, tienes el poder de exponer cualquier conducta inapropiada. 
        Tu confidencialidad está garantizada mientras trabajamos juntos para mantener nuestra comunidad honesta y segura.</Parrafo>
    </Texto>
    <ContenedorInputs>
      <SpanInputContenedor>
        <StyledSpan
          $isFocus={stateInp1 === 'focus'}
          $isVacio={stateInp1 === 'vacio'}
          $isCompleto={stateInp1 === 'completo'}>
            Motivo de la denuncia
        </StyledSpan>
        <StyledInput
          id='denuncia-1'
          type='text'
          onFocus={() => setStateInp1('focus')}
          onBlur={ev => manejarInput(ev.target)}/>
      </SpanInputContenedor>
      <SpanInputContenedor>
        <StyledSpan
          $isFocus={stateInp2 === 'focus'}
          $isVacio={stateInp2 === 'vacio'}
          $isCompleto={stateInp2 === 'completo'}>
            Descripción detallada de la denuncia
        </StyledSpan>
        <StyledTextArea
          id='denuncia-2'
          onFocus={() => setStateInp2('focus')}
          onBlur={ev => manejarInput(ev.target)}/>
      </SpanInputContenedor>
      <StyledButton>Enviar</StyledButton>
    </ContenedorInputs>
  </>);
};

export default DenunciaAnonima;

const Texto = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${lengths.small[2]};
  padding: ${lengths.medium[3]} ${lengths.small[3]};
  width: 100%;
`;

const StyledH3 = styled.h3`
  color: ${colors.text};
  font-size: ${fontSizes.medium};
  text-align: center;
`;

const Parrafo = styled.p`
  font-size: ${fontSizes.small};
  text-align: center;
  width: 100%;
`;

const ContenedorInputs = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${lengths.medium[1]};
  width: 100%;
`;

const SpanInputContenedor = styled.div`
  position: relative;
  width: 90%;
`;

const StyledInput = styled.input`
  border: 2px solid ${colors.label};
  border-radius: 25px;
  font-size: ${fontSizes.small};
  outline: none;
  padding: ${lengths.small[1]} ${lengths.small[2]};
  transition: border .3s;
  width: 100%;

  &:focus {
    border: 2px solid ${colors.yellow};
  };
`;

const StyledSpan = styled.span`
  background-color: ${colors.white};
  font-size: ${fontSizes.small};
  left: ${lengths.small[2]};
  padding: 0 ${lengths.small[1]};
  pointer-events: none;
  position: absolute;
  transition: color .3s, transform .3s, border .3s, top .3s;

  ${({ $isVacio }) => $isVacio && (`
    border-left: 2px solid ${colors.white};
    border-right: 2px solid ${colors.white};
    top: 10px;
  `)}

  ${({ $isFocus }) => $isFocus && (`
    border-left: 2px solid ${colors.yellow};
    border-right: 2px solid ${colors.yellow};
    color: ${colors.green};
  `)}

  ${({ $isCompleto }) => $isCompleto && (`
    border-left: 2px solid ${colors.label};
    border-right: 2px solid ${colors.label};
  `)}

  ${({ $isFocus, $isCompleto }) => ($isFocus || $isCompleto) && (`
    transform: scale(80%);
    top: -12px;
  `)}

  ${({ $isVacio, $isCompleto }) => ($isVacio || $isCompleto) && (`
    color: ${colors.label};
  `)}
`;

const StyledTextArea = styled.textarea`
  border: 2px solid ${colors.label};
  border-radius: 25px;
  font-size: 1em;
  height: 150px;
  outline: none;
  padding: 10px 20px;
  resize: none;
  transition: border .3s;
  width: 100%;

  &:focus {
    border: 2px solid ${colors.yellow};
  };
`;

const StyledButton = styled.button`
  background-color: ${colors.yellow};
  border: none;
  border-radius: 5px;
  color: ${colors.text};
  cursor: pointer;
  font-size: ${fontSizes.small};
  font-weight: 800;
  padding: ${lengths.small[1]} ${lengths.small[2]};
  transition: transform .3s;

  &:hover {
    transform: scale(105%);
  };
`;