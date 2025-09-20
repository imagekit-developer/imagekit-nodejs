import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: 'private_key_test',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('Helper Authentication Parameters', function () {
  it('should return correct authentication parameters with provided token and expire', function () {
    const authenticationParameters = client.helper.getAuthenticationParameters('your_token', 1582269249);

    expect(authenticationParameters).toEqual({
      token: 'your_token',
      expire: 1582269249,
      signature: 'e71bcd6031016b060d349d212e23e85c791decdd',
    });
  });

  it('should return authentication parameters with required properties when no params provided', function () {
    const authenticationParameters = client.helper.getAuthenticationParameters();

    expect(authenticationParameters).toHaveProperty('token');
    expect(authenticationParameters).toHaveProperty('expire');
    expect(authenticationParameters).toHaveProperty('signature');

    // Token should be a UUID (36 characters with dashes)
    expect(authenticationParameters.token).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );

    // Expire should be a number greater than current time
    expect(typeof authenticationParameters.expire).toBe('number');
    expect(authenticationParameters.expire).toBeGreaterThan(Math.floor(Date.now() / 1000));

    // Signature should be a hex string (40 characters for HMAC-SHA1)
    expect(authenticationParameters.signature).toMatch(/^[a-f0-9]{40}$/);
  });

  it('should handle edge case with expire time 0', function () {
    // When expire is 0, it's falsy, so the method uses default expire time
    const authenticationParameters = client.helper.getAuthenticationParameters('test-token', 0);

    expect(authenticationParameters.token).toBe('test-token');
    // Since 0 is falsy, it should use the default expire (30 minutes from now)
    const expectedExpire = Math.floor(Date.now() / 1000) + 60 * 30;
    expect(authenticationParameters.expire).toBeCloseTo(expectedExpire, -1);
    expect(authenticationParameters.signature).toMatch(/^[a-f0-9]{40}$/);
  });

  it('should handle empty string token', function () {
    // When token is empty string, it's falsy, so the method generates a UUID
    const authenticationParameters = client.helper.getAuthenticationParameters('', 1582269249);

    // Since '' is falsy, it should generate a UUID
    expect(authenticationParameters.token).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(authenticationParameters.expire).toBe(1582269249);
    expect(authenticationParameters.signature).toMatch(/^[a-f0-9]{40}$/);
  });
});
