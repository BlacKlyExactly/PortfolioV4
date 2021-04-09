import React, { FC, FormEvent, Reducer, useReducer, useState, ChangeEvent, useRef, useEffect } from 'react';
import { PageProps } from "gatsby";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";

import SEO from "../components/seo";
import TextInput from "../components/TextInput";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";

import useMail from "../hooks/useMail";
import { Coral, Gray } from "../assets/styles/colors";

const contactSites: Site[] = [
    { 
        icon: faGithub, 
        value: "BlacKlyExactly", 
        color: "#211F1F",
        link: "https://github.com/BlacKlyExactly"
    },
    { 
        icon: faTwitter, 
        value: "@BlacK79409311", 
        color: "#1DA1F2",
        link: "https://twitter.com/BlacK79409311"
    },
    { 
        icon: faEnvelope, 
        value: process.env.GATSBY_MAIL || "",
        color: "#3bf17c",
        link: `mailto:${process.env.GATSBY_MAIL || ""}`
    },
    { 
        icon: faDiscord, 
        value: "BlacK#1238", 
        color: "#7289da",
        link: "https://discord.gg/cvUfrpDx"
    },
]

const ContactPage: FC<PageProps> = () => {
    const { sendMail } = useMail();

    const [ inputValue, setInputValue ] = 
        useReducer<Reducer<Inputs, Inputs>>(( state, newState ) => ({ ...state, ...newState }), {
            name: "",
            email: "",
            title: "",
            msg: ""
        });
    
    const [ recaptchaState, setRecaptchaState ] = useState<boolean>(false);
    const [ loadingState, setLoadingState ] = useState<boolean>(false);

    const fields = useRef<HTMLFormElement>(null);
    const links = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!fields.current || !links.current) return;

        const tl = gsap.timeline();
        tl.from(fields.current.children, { y: 20, opacity: 0, stagger: 0.15 })
        .from(links.current.children, { y: 20, opacity: 0, stagger: 0.15 })
    }, [])

    const setValue = ( name: string, value: string ) => setInputValue({ [ name ]: value });

    const resetInputs = () => setInputValue({
        name: "",
        email: "",
        title: "",
        msg: ""
    });

    const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        toast.dismiss();

        const { name, email, title, msg } = inputValue;
        
        name.length === 0 && toast.error("Name input is empty");
        email.length === 0 && toast.error("You forgot to type your email");
        title.length === 0 && toast.error("What's about title ?");
        msg.length === 0 && toast.error("Ehm... Message ?");
        !recaptchaState && toast.error("Complete captcha to send message");

        const canAccess: boolean = (
            name.length > 0 &&
            email.length > 0 &&
            title.length > 0 &&
            msg.length > 0 &&
            recaptchaState
        );

        if(!canAccess) return;
        setLoadingState(true);
        
        const response = await sendMail(email, title, msg, name);
        setLoadingState(false);

        if(response.status !== 200){
            toast.error("Send mail error. Try later");
            return;
        }

        toast.success("Wow! You are successfully sent message");
        resetInputs();
    }

    const handleTextareaChange = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
        e.preventDefault();
        setInputValue({ msg: e.target.value });
    }

    const onRecaptchaChange = ( token: string | null ) => 
        setRecaptchaState(token !== null && token.length > 0);
    
    return(
        <Wrapper>
            <SEO title="Contact"/>
            <Content>
                <FindMeOn>
                    <FindMeOnSites ref={links}>
                        {contactSites.map(({ value, icon, color, link }: Site) => (
                            <a key={value} href={link}>
                                <FindMeOnSite color={color}>
                                    <FontAwesomeIcon icon={icon}/>
                                    <FindMeOnSiteValue>{value}</FindMeOnSiteValue>
                                </FindMeOnSite>
                            </a>
                        ))}
                    </FindMeOnSites>
                </FindMeOn>
                <SendQuestion>
                    {loadingState ? <Loader/> : (
                        <SendQuestionForm onSubmit={handleSubmit} ref={fields}>
                            <TextInput
                                name="name"
                                label="Name"
                                setValue={setValue}
                                value={inputValue.name || ""}
                                placeholder="John"
                                width="30%"
                            />
                            <TextInput
                                name="email"
                                label="Email"
                                setValue={setValue}
                                value={inputValue.email || ""}
                                placeholder="example@gmail.com"
                                type="email"
                                width="52%"
                            />
                            <TextInput
                                name="title"
                                label="Title"
                                setValue={setValue}
                                value={inputValue.title || ""}
                                placeholder="Question..."
                                width="86%"
                            />
                            <SendQuestionTextArea
                                value={inputValue.msg || ""}
                                onChange={handleTextareaChange}
                                placeholder="Text..."
                            />
                            <SendQuestionButtons>
                                <SendQuestionSubmit type="submit" value="SEND"/>
                                <ReCAPTCHA
                                    sitekey={process.env.GATSBY_RECAPTCHA_SITEKEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                    onChange={onRecaptchaChange}
                                />
                            </SendQuestionButtons>
                        </SendQuestionForm>
                    )}
                </SendQuestion>
            </Content>
            <Navigation 
                position="relative"
                isFull
                fixedInMobile
                color={Coral}
                background="white"
            />
        </Wrapper>
    )
};

type Site = {
    icon: FontAwesomeIconProps['icon'],
    value: string,
    color: string,
    link: string
}

type Inputs = {
    [ x: string ]: string
}

const Wrapper = styled.div`
    width: 100vw;
    background: ${Gray};
    color: ${Coral};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;

    @media screen and (min-width: 1150px){
        flex-direction: row-reverse;
        min-height: 100vh;
    }
`;

const SendQuestion = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 28px;
    min-height: 100vh;

    @media screen and (min-width: 1150px){
        padding: 2%;
    }
`;

const SendQuestionForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    @media screen and (min-width: 1150px){
        width: 80%;
        margin-left: 5%;
    }
`;

const SendQuestionTextArea = styled.textarea`
    display: block;
    width: 100%;
    height: 281px;
    border: none;
    background: white;
    border: 2px solid ${Coral};
    margin: 5vh 20px;
    padding: 20px;
    resize: none;
    
    @media screen and (min-width: 1150px){
        width: 86%;
        height: 300px;
    }
`;

const SendQuestionButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    @media screen and (min-width: 1150px){
        justify-content: space-between;
        flex-direction: row;
        width: 88%;
    }
`;

const SendQuestionSubmit = styled.input`
    width: 140px;
    height: 57px;
    background: ${Coral};
    color: white;
    border: none;
    font-weight: 700;
    font-family: "Montserrat";
    margin: 20px;
    cursor: pointer;
    transition: 0.2s color, 0.2s background;

    &:hover{
        color: ${Coral};
        background: white;
        border: 2px solid ${Coral};
    }
`;

const FindMeOn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 55vh;
    width: 100%;
    background: ${Coral};
    color: white;
    padding: 4%;
    margin-top: 110px;

    @media screen and (min-width: 1150px){
        width: 800px;
        height: 100vh;
        margin: 0;
        padding: 4%;
    }
`;

const FindMeOnSites = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin-bottom: 50px;
`;

type FindMeOnSiteProps = {
    color: string
}

const FindMeOnSite = styled.div<FindMeOnSiteProps>`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 35px;
    margin: 10px 0;
    cursor: pointer;

    svg{
        transition: 
            transform 0.2s,
            color 0.2s;
    }

    p{
        transition: 0.2s color;
    }

    &:hover{
        &::after{
            transform-origin: left;
            transform: scaleX(1);
            background: ${({ color }) => color};
        }

        svg{
            transform: rotate(15deg);
            color: ${({ color }) => color};
        }

        p{
            color: ${({ color }) => color};
        }
    }

    &::after{
        position: absolute;
        content: "";
        width: 100%;
        height: 2px;
        left: 0;
        top: 100%;
        background: white;
        transition: 0.2s transform, 0.2s background;
        transform: scaleX(0);
        transform-origin: right;
    }

    @media screen and (min-width: 1150px){
        font-size: 50px;
    }
`;

const FindMeOnSiteValue = styled.p`
    font-size: 18px;
    font-weight: 700;

    @media screen and (min-width: 1150px){
        font-size: 22px;
    }
`;

export default ContactPage;
