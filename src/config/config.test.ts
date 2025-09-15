describe("config", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test("return default value", async () => {
    delete process.env.PORT;
    delete process.env.NODE_ENV;
    const config = (await import('@/config/config')).default;
    expect(config.port).toBe(8000);
    expect(config.nodeEnv).toBe('development');
  });

  test("reflect env variables", async () => {
    process.env.PORT = '4321';
    process.env.NODE_ENV = 'production';
    const config = (await import('@/config/config')).default;
    expect(config.port).toBe(4321);
    expect(config.nodeEnv).toBe('production');
  });
});
