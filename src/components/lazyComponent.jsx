import { lazy } from "react";

export const HomePage = lazy(()=> import  ("./Homepage"))
export const About = lazy(()=> import  ("./About"))
export const ContactSection = lazy(()=> import ("./contact"))