import { PaiementMiddleware } from './paiement.middleware';

describe('PaiementMiddleware', () => {
  it('should be defined', () => {
    expect(new PaiementMiddleware()).toBeDefined();
  });
});
