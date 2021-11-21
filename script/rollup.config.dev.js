import baseConfig from './rollup.config.base.js';
import serve from 'rollup-plugin-serve';

const config = {
  ...baseConfig,
  output: [{
    file: 'dist/potatodb.esm.js',
    name: 'potatodb',
    format: 'esm',
  }, {
    file: 'dist/potatodb.iife.js',
    name: 'potatodb',
    format: 'iife',
  }],
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      port: '4300',
      openPage: '/test/test.html',
      contentBase: ''
    })
  ]
}
export default config
