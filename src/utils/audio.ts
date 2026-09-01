// Audio system completely removed as requested. Clean silent no-op proxy for all methods.
export const cyberAudio: any = new Proxy(
  {},
  {
    get: () => () => {},
  }
);
