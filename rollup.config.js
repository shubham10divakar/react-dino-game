import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
//import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      }
    ],
    plugins: [
      // url({
      //   include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'], // Include GIFs
      //   limit: 0, // Set the limit to avoid inlining the files
      // }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      image({
        limit: 100000,
      }), // This plugin handles image imports
      external(),
      resolve(),
      terser(),
    ]
  }
];
