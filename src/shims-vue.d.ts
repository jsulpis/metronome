declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Navigator {
  wakeLock: {
    request: (type: string) => Promise<void>;
  };
}
