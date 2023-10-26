
import { Store } from './store';
import { CompilerOptions, SFCScriptBlock } from 'vue/compiler-sfc';
import {SFCScriptBlock as SFCScriptBlockVue2} from 'compiler-sfc-browser-vue2';

export function parse(options: {
  store: Store;
  code: string;
  filename: string;
})  {
  const { store, code, filename } = options;
  if (store.vueVersion?.startsWith('2.')) {
    const descriptor = store.compiler.parse({
      source: code,
      filename,
      sourceMap: true,
    })
    return {
      errors: descriptor.errors,
      descriptor
    }
  } else {
    return store.compiler.parse(code, {
      filename,
      sourceMap: true,
    })
  }
}

export function compileScript(options: {
  descriptor: any
  store: Store
  id: string
  isProd: boolean
  ssr: boolean
  isTS: boolean
}) {
  const { store, descriptor, id, isProd, ssr, isTS } = options;
  if (store.vueVersion?.startsWith('2.')) {
    const compiledScript = store.compiler.compileScript(descriptor, {
      ...store.options?.script,
      id,
      isProd: isProd
    })
    return compiledScript as SFCScriptBlock;
  } else {
    const expressionPlugins: CompilerOptions['expressionPlugins'] = isTS
    ? ['typescript']
    : undefined
    const compiledScript = store.compiler.compileScript(descriptor, {
      inlineTemplate: true,
      ...store.options?.script,
      id,
      templateOptions: {
        ...store.options?.template,
        ssr,
        ssrCssVars: descriptor.cssVars,
        compilerOptions: {
          ...store.options?.template?.compilerOptions,
          expressionPlugins,
        },
      },
    })
    return compiledScript as SFCScriptBlockVue2;
  }
}

export function compileTemplate(options: {
  descriptor: any;
  store: Store;
  id: string;
  ssr: boolean;
  bindingMetadata: any
  isTS: boolean
  }) {
    const { store, descriptor, id, ssr, bindingMetadata, isTS } = options;
    if (store.vueVersion?.startsWith('2.')) {
      return store.compiler.compileTemplate({
        isProd: false,
        ...store.options?.template,
        source: descriptor.template!.content,
        filename: descriptor.filename,
        id,
        scoped: descriptor.styles.some((s: any) => s.scoped),
        ssr,
        prettify: false,
        bindings: bindingMetadata,
        compilerOptions: {
          ...store.options?.template?.compilerOptions,
          expressionPlugins: isTS ? ['typescript'] : undefined,
        },
      })
    } else {
      return store.compiler.compileTemplate({
        isProd: false,
        ...store.options?.template,
        source: descriptor.template!.content,
        filename: descriptor.filename,
        id,
        scoped: descriptor.styles.some((s: any) => s.scoped),
        slotted: descriptor.slotted,
        ssr,
        ssrCssVars: descriptor.cssVars,
        compilerOptions: {
          ...store.options?.template?.compilerOptions,
          bindingMetadata,
          expressionPlugins: isTS ? ['typescript'] : undefined,
        },
      })
    }
}