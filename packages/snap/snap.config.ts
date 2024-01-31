import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
    crypto: true,
    events: true,
    stream: true,
    string_decoder: true,
    util: true,
  },
};

export default config;
