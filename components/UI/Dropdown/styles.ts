import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  top:20px;
`;

export const ActivatorButton = styled.button`
  align-items: center;
  background-color: inherit;
  border: 1px solid transparent;
  border-radius: 50px;
  border-color: #F3F4F6;
  color: inherit;
  display: flex;
  font-size: inherit;
  max-width: 160px;
  padding: 1em;

  &:after {
    content: "";
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    height: 0.5em;
    margin-left: 0.75em;
    width: 0.5em;
    transform: rotate(45deg);
  }
`;

export const DropdownList = styled.ul<{ active: boolean }>`
  color: black;
  display: ${props => (props.active ? "block" : "none")};
  margin: 0;
  min-width: 180px;
  padding: 0;
  li {
    margin: 0;
    a,
    a:link {
      display: block;
      padding: 0.5em;
      color: #217BF4;
      &:hover {
        transition: 0.2s;
        background-color: #C7FDE5;
        color: #009D69;
      }
    }
  }
  
`;


export const SelectSkills = styled.select`
     height: 48px;
     border: 1px solid rgb(250, 250, 250);
     border-radius: 100px !important;
      &:hover {
        border: 1px solid #C7FDE5
      }
`;
