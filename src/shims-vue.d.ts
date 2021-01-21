declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
interface VM {
  $i18n: any;
  $store: any;
}
declare var vm: VM;

declare module 'vue/types/vue' {
  interface Vue {
    [key: string]: any;
    newInstance: function;
  }
  interface VueConstructor {
    [key: string]: any;
    newInstance: function;
  }
}

VueConstructor

declare module 'vue-material/dist/components' {
  import _Vue from "vue"; // <-- notice the changed import
  // export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
  export function MdAvatar(Vue: typeof _Vue, options?: any): void
  export function MdButton(Vue: typeof _Vue, options?: any): void
  export function MdBadge(Vue: typeof _Vue, options?: any): void
  export function MdField(Vue: typeof _Vue, options?: any): void
  export function MdIcon(Vue: typeof _Vue, options?: any): void
  export function MdMenu(Vue: typeof _Vue, options?: any): void
  export function MdList(Vue: typeof _Vue, options?: any): void
  export function MdTable(Vue: typeof _Vue, options?: any): void
  export function MdCheckbox(Vue: typeof _Vue, options?: any): void
  export function MdDrawer(Vue: typeof _Vue, options?: any): void
  export function MdDialog(Vue: typeof _Vue, options?: any): void
  export function MdContent(Vue: typeof _Vue, options?: any): void
  export function MdTabs(Vue: typeof _Vue, options?: any): void
  export function MdToolbar(Vue: typeof _Vue, options?: any): void
}
