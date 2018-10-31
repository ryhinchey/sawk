import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify';
import cleaner from 'rollup-plugin-cleaner';

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'sawk',
      file: pkg.main,
      format: 'umd'
    }
  ],
  plugins: [
    cleaner({
      targets: [
        './dist/'
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    minify()
  ]
}