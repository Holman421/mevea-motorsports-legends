/// <reference types="astro/client" />

// Declare module for shader files
declare module '*.glsl' {
    const content: string;
    export default content;
}

declare module '*.vs' {
    const content: string;
    export default content;
}

declare module '*.fs' {
    const content: string;
    export default content;
}

declare module '*.vert' {
    const content: string;
    export default content;
}

declare module '*.frag' {
    const content: string;
    export default content;
}
