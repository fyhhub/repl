import { createApp, h, defineComponent } from 'vue'
import { Repl, ReplStore } from '../src'
// import MonacoEditor from '../src/editor/MonacoEditor.vue'
import CodeMirrorEditor from '../src/editor/CodeMirrorEditor.vue'
import { EditorComponentType } from '../src/editor/types'
;(window as any).process = { env: {} }

const App = {
  setup() {
    const query = new URLSearchParams(location.search)
    const store = new ReplStore({
      serializedState: 'eNp9UUFOwzAQ/IrxJSCVRqi3Kq0EqBJwAARIXHypkm3q4tiWvQ6RovydtUMDh6q33ZnZ0Yy257fWztsAfMkLXzppkXnAYNdCy8Yah6xnDnZsYDtnGpaRNBNa6NJoj6zxNVtF/jJ7AKUM+zROVRfZldBFPtqRES0IjVVbBNoYKyrZpoHG/c2675PPMBQ5bb+41DYga68bU4FaCU4KwfPxPB/vi3xy5TOOniLtZD0/eKOpTR+lgpemsVKBe7EoKbLgS5aYyG0p8fdTwtAFmB3xcg/l1wn84LuICf7qwINrQfCJw62rAUd68/4MHc0TSSWCIvUZ8g28USFmHGV3QVcU+58upX1MP5G6/vCbDkH7Y6kYNCqHpBec/nR/pvpf3MV8ke6EHvjwA6+hrIc=',
      showOutput: query.has('so'),
      outputMode: query.get('om') || 'preview',
      defaultVueVersion: '2.7.15',
    })
    const store1 = ((window as any).store = new ReplStore({
      serializedState: 'eNp9kU9LAzEQxb/KmMsq1C7SW9kWVArqQUUFL7mU3ek2NZuE/FkLS767k6yuHqS3ybxf3rxJBnZtzLwPyJascrUVxoNDH8yaK9EZbT0MYHE3gx6tE1pBhJ3VHRR0p+CKq1or56FzLawSeF7coZQa3rWVzVlxwVVVjr7kSAePnZFbj3QCqBrR54LK/dV6GLJPjEDVNC9WJWnflFAmeOgvO92gXHFGPGflaFaOblU5zWAz5h0F3Il2fnBa0ZJDQjmrdWeERPtkPA1xnC0hK0nbUv7Ph9zzNuDsp1/vsf74p39wx9Tj7NmiQ9sjZ5Pmt7ZFP8qb10c8Uj2JtESQRJ8QX9BpGVLGEbsJqqHYf7ic9j5/lVDtm9scPar0clPQRMbMc0a/dnti9d+4i/ki3+MqsvgFmNe1Lw==',
      showOutput: query.has('so'),
      outputMode: query.get('om') || 'preview',
      defaultVueVersion: '2.7.14',
    }))

    // store.setVueVersion('2.7.15')

    // watchEffect(() => history.replaceState({}, '', store.serialize()))

    // setTimeout(() => {
    // store.setFiles(
    //   {
    //     'index.html': '<h1>yo</h1>',
    //     'main.js': 'document.body.innerHTML = "<h1>hello</h1>"',
    //     'foo.js': 'document.body.innerHTML = "<h1>hello</h1>"',
    //     'bar.js': 'document.body.innerHTML = "<h1>hello</h1>"',
    //     'baz.js': 'document.body.innerHTML = "<h1>hello</h1>"'
    //   },
    //   'index.html'
    // )
    // }, 1000);

    setTimeout(() => {
      store.setVueVersion('3.3.6')
    }, 4000)
    return () =>
      [h(Repl, {
        store,
        theme: 'dark',
        editor: CodeMirrorEditor as any as EditorComponentType,
        showError: false,
        showMessageToggle: false,
        showCompileOutput: false,
        showFileSelector: false,
        // layout: 'vertical',
        ssr: false,
        sfcOptions: {
          script: {
            // inlineTemplate: false
          },
        },
        // showCompileOutput: false,
        // showImportMap: false
      })]
  },
}

createApp(App).mount('#app')
