// node-resolve will resolve all the node dependencies
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import inject from 'rollup-plugin-inject';

const processShim = '\0process-shim';

const prod = process.env.PRODUCTION;
const mode = prod ? 'production' : 'development';

console.log(`Creating ${mode} bundle...`);

const output = prod ?
[
  { file: 'dist/bundle.min.js', format: 'cjs', exports: 'named' },
] :
[
  { file: 'dist/bundle.js', format: 'cjs', exports: 'named' },
];

const plugins = [
  // Unlike Webpack and Browserify, Rollup doesn't automatically shim Node
  // builtins like `process`. This ad-hoc plugin creates a 'virtual module'
  // which includes a shim containing just the parts the bundle needs.
  {
    resolveId(importee) {
      if (importee === processShim) return importee
      return null
    },
    load(id) {
      if (id === processShim) return 'export default { argv: [], env: {} }'
      return null
    },
  },
  resolve(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
  inject({
    process: processShim,
  }),
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers']
  })
]

if (prod) plugins.push(uglify());

export default {
  // All the used libs needs to be here
  external: [
    'react',
    'react-proptypes'
  ],
  input: 'src/index.js',
  output,
  plugins
}