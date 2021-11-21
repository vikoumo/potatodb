import baseConfig from './rollup.config.base.js';
import{ terser } from 'rollup-plugin-terser';

const config = {
  ...baseConfig,
  output: [{
    file: 'dist/potatodb.esm.min.js',
    name: 'potatodb',
    format: 'esm',
  }, {
    file: 'dist/potatodb.iife.min.js',
    name: 'potatodb',
    format: 'iife',
  }],
  plugins: [
    ...baseConfig.plugins,
    terser()
  ]
}

export default config
