import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './public/main.js',
  output: {
    filename: 'fixlabs.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'umd',
    },
  },
  experiments: {
    outputModule: false,
  },
};