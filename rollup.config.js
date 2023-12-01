import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from '@rollup/plugin-typescript';
import typescript from 'typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import * as pkg from './package.json';

const input = ['src/index.ts'];
const name = 'FableHOC';

const external = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];
const buildFormats = [
  {
    file: 'dist/fable-hoc.mjs',
    format: 'es',
  },
  {
    file: 'dist/fable-hoc.cjs',
    format: 'cjs',
  },
];

const sharedPlugins = [
  resolve(),
  commonjs(),
  terser(),
  ts({
    typescript,
    tsconfig: './tsconfig.json',
    noEmitOnError: false,
  }),
  commonjs({
    include: 'node_modules/**',
  }),
];

const minifiedBuildFormats = buildFormats.map(({ file, ...rest }) => ({
  file: file.replace(/(\.[cm]?js)$/, '.min$1'),
  ...rest,
  minify: true,
  plugins: [terser({ compress: { directives: false } })],
}));

const allBuildFormats = [...buildFormats, ...minifiedBuildFormats];

const config = allBuildFormats.map(
  ({ file, format, globals, plugins: specificPlugins, }) => {
    const plugins = [
      ...sharedPlugins,
    ];

    if (specificPlugins && specificPlugins.length) {
      plugins.push(...specificPlugins);
    }

    return {
      input,
      output: {
        file,
        format,
        name,
        globals,
        sourcemap: true,
      },
      external,
      plugins,
    };
  },
);


export default [
  ...config,
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  }
];
