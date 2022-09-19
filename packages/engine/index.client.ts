/*
 * UCS @ucsjs/engne
 * Copyright(c) 2022 Andre Ferreira
 * https://ucsjs.io
 * MIT Licensed
 */

export * from "./src/interfaces";
export * from './src/core';

const { UCS } = require('./src/core/ucs.core');
const { Application } = require('./src/core/application.core');

if(typeof window !== 'undefined'){
    window.UCS = UCS;
    window.Application = Application;
}