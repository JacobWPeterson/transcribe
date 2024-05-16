import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import {
  Container, Navbar, NavDropdown,
} from 'react-bootstrap';

export const E404Section = styled.div < { left?: number, z?: number } > `
  display: flex;
  flex-direction: column;
  height: 400px;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: ${(props) => props.left}%;
  transform: translate(-50%, -50%);
  z-index: ${(props) => props.z};
`;

export const E404Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 125px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HomeFeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #3e5276;
  margin: 12px 0 24px 0;
  align-items: center;
  justify-content: space-evenly;
  gap: 24px;
`;

export const HomeLowerWrapper = styled.div`
  height: 140px;
  color: #fff;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  background-color: #c9ac5f;
  justify-content: space-evenly;
  align-items: center;
`;

export const HomeTextContainer = styled.div`
  min-width: 450px;
  font-size: 28px;
  padding: 20px;
  margin; auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HomeUpperWrapper = styled.div`
  display: flex;
  margin: 30px 0;
  justify-content: center;
  align-items: center;
`;



export const SectionHalf = styled.div < { background?: string } > `
  width: 80%;
  background: ${(props) => (props.background)};
  padding: 25px;
  border-radius: 20px;
`;

export const StyledButton = styled.button < { background?: string, fontSize?: number, padding?: string, marginTop?: string, height?: number } > `
  color: ${(props) => (props.color ? props.color : '#fff')};
  background: ${(props) => (props.background ? props.background : '#3e5276')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : 'inherit')};
  text-align: center;
  line-height: 1em;
  padding: ${(props) => (props.padding ? props.padding : '2px 5px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')};
  height: ${(props) => (props.height ? props.height : 25)}px;
  border: none;
  border-radius: 5px;

  &:focus {
    background: ${(props) => (props.background ? props.background : '#3e5276')}85;
    border: none;
    outline: none;
  }

  &:disabled {
    background: #c9ac5f95;
    color: #3e5276;
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    max-width: 100%;
    background: #3e5276;
    padding: 5px 50px;
  }
`;

export const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid #c9ac5f;
  gap: 12px;
`;

export const StyledImage = styled.img < { borderColor?: string, maxWidth?: number } > `
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : 400)}px;
  height: auto;
  border: 5px solid ${(props) => props.borderColor};
  border-radius: 5px;
`;

export const StyledLine = styled.div < { color?: string, fontSize?: number, paddingLeft?: number, alignSelf?: string } > `
  display: flex;
  color: ${(props) => (props.color ? props.color : '#606060')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : 'inherit')};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : 0)}px;
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : 'auto')}
`;

export const StyledNavbar = styled(Navbar) < { borderTop?: string } > `
  border-top: ${(props) => (props.borderTop ? props.borderTop : 'none')};
  padding-top: 0;
`;

export const StyledNavbarBrand = styled(Navbar.Brand)`
  &&& {
    color: #c9ac5f;
    font-size: 28px;
    font-weight: 400;
    font-style: italic;
    letter-spacing: .2rem;
    text-decoration: none;
  }
`;

export const StyledNavbarToggle = styled(Navbar.Toggle)`
  &&& {
    border-color: #c9ac5f;
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
&&& > a {
    padding: 0;
    color: #fff;
    text-decoration: none;

    &:hover, &:focus {
      outline: none;
      cursor: pointer;
      color: #c9ac5f;
    }
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      transition: 500ms ease;
    }
  }

  &&& > div {
    left: unset;
    right: 0;
  }
`;

export const StyledNavDropdownItem = styled(NavDropdown.Item)`
  color: #3e5276;
  text-decoration: none;

  &:hover, &:focus {
    outline: none;
    cursor: pointer;
    color: #c9ac5f
  }
  &:focus {
    text-decoration: underline;
  }
  &:hover {
    transition: 500ms ease;
  }
`;

export const StyledNav = styled(Nav)`
  align-items: center;
  gap: 18px;
`;

export const StyledP = styled.p < { width?: string, margin?: string, fontSize?: number, fontStyle?: string, textAlign?: string, textIndent?: string } > `
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: ${(props) => (props.margin ? props.margin : '0 auto')};
  color: #606060;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '24')}px;
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : 'normal')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'justify')};
  text-indent: ${(props) => (props.textIndent ? props.textIndent : '0')};
  letter-spacing: .03em;
`;

export const UnorderedList = styled.ul`
  list-style-type: square;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
`;

export const ListItem = styled.li < { color?: string } > `
  color: #c9ac5f;
  margin-left: 20px;
  padding: 10px 0 10px 10px;
  font-size: 20px;
  > span {
      color: ${(props) => (props.color ? props.color : '#3e5276')};
  }
`;
