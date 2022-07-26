declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module '*.mp3' {
  const content: string;
  export default content;
}
