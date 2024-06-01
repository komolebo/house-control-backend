declare module "*.css";
declare module "*.module.scss";

/// <reference types="react-scripts" />
declare module "*.svg" {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
}
declare module '*.gif';
declare module '*.jpg';
declare module '*.png';