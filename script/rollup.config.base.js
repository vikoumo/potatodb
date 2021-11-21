const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from "rollup-plugin-typescript";

const config = {
  input: 'index.js',
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      exclude: "node_modules/**",
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    })
  ]
}
export default config;
