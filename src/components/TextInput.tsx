import React, { FC, ChangeEvent, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Coral } from "../assets/styles/colors";
import gsap from "gsap";

const TextInput: FC<TextInputProps> = ({ label, placeholder, name, type, setValue, value, width }) => {
    const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        setValue(name, e.target.value);
    }

    return(
        <Wrapper width={width}>  
            <Label htmlFor={name}>{label}</Label>
            <Input
                placeholder={placeholder}
                name={name}
                id={name}
                type={type || "text"}
                onChange={handleInputChange}
                value={value}
            />
        </Wrapper>
    )
}

type TextInputProps = {
    label: string,
    placeholder?: string,
    name: string,
    type?: string,
    setValue: ( name: string, value: string ) => void,
    value: string,
    width: string
}

type WrapperProps = {
    width: string
}

const Wrapper = styled.div<WrapperProps>`
    position: relative;
    margin: 40px 1vw;
    height: auto;
    width: 95%;

    @media screen and (min-width: 1150px){
        width: ${({ width }) => width};
        margin: 2vw 1vw;
        max-height: 6.5vw;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 7vh;
    border: none;
    background: white;
    border-bottom: 2px solid ${Coral};
    padding: 16px;
    margin: 10px 0;
    border-radius: 5px;

    @media screen and (min-width: 1150px){
        font-size: 17px;
        margin: 1.5vw 0;
    }
`;

const Label = styled.label`
    color: black;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
`;

export default TextInput;
