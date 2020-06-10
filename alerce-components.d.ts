import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const AlerceComponents: { install: InstallFunction };
export default AlerceComponents;

export const AlerceComponentsSample: VueConstructor<Vue>;
