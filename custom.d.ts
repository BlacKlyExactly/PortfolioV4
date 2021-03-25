// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}