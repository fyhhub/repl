import * as defaultCompiler from 'vue/compiler-sfc'
import * as defaultCompilerVue2 from 'compiler-sfc-browser-vue2'

export function createCompiler<T>(options: {
  vueVersion?: string;
  code: string;
  filename: string;
  compiler: any
}) {
  const { vueVersion, code, filename, compiler } = options;

  function parse()  {
    if (vueVersion?.startsWith('2.')) {
      const descriptor = compiler.parse({
        source: code,
        filename,
        sourceMap: true,
      })
      return {
        errors: descriptor.errors,
        descriptor
      }
    } else {
      return compiler.parse(code, {
        filename,
        sourceMap: true,
      })
    }
  }


  return {
    parse
  }
}
