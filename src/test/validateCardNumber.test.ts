import { validateCardNumber } from "../main";

describe('validateCardNumber', () => {
    it('должен возвращать true для корректного номера карты', () => {
      const validCardNumber = '4111 1111 1111 1111'; 
      const result = validateCardNumber(validCardNumber);
      expect(result).toBe(true);
    });

    it('должен возвращать false для некорректного номера карты содержащего другие символы', () => {
        const invalidCardNumber = '4111 1111 adcd !@#$'; 
        const result = validateCardNumber(invalidCardNumber);
        expect(result).toBe(false);
      });

    it('должен возвращать false с недостаточным количеством цифр', () => {
        const invalidCardNumber = '4111 1111 1111 ';
        const result = validateCardNumber(invalidCardNumber);
        expect(result).toBe(false);
    });

    it('должен возвращать false с большим количеством цифр', () => {
        const invalidCardNumber = '4111 1111 1111 1111 1111 1111';
        const result = validateCardNumber(invalidCardNumber);
        expect(result).toBe(false);
    });
});