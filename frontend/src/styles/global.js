import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${props => props.theme.fonts.principal};
    }

    body {
        background-color: ${props => props.theme.colors.planoDeFundo};
        color: ${props => props.theme.colors.textoPrimario};
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
    }

    #root {
        width: 100%;
        max-width: 600px;
        margin: 0 auto; 
        min-height: 100vh;
        position: relative;
        padding: 0 1.25rem;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 0.8;
        }

        &:active {
            transform: translateY(1);
        }
    }

    input {
        outline: none;
        border: none;
    }
`;

export default GlobalStyle;