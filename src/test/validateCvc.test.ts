import { validateCvc } from "../main";

describe('validateCvc', () => {
    it('должен возвращать true для корректного номера CVC', () => {
      const validCVC = '111'; 
      const result = validateCvc(validCVC);
      expect(result).toBe(true);
    });

    it('должен возвращать false для некорректного номера CVC 2 и меньше цифр', () => {
        const invalidCVC = '11'; 
        const result = validateCvc(invalidCVC);
        expect(result).toBe(false);
    });

    it('должен возвращать false для некорректного номера CVC 4 и больше цифр', () => {
        const invalidCVC = '1111'; 
        const result = validateCvc(invalidCVC);
        expect(result).toBe(false);
    });

    it('должен возвращать false для некорректного номера CVC 4 и больше цифр', () => {
        const invalidCVC = '1r!'; 
        const result = validateCvc(invalidCVC);
        expect(result).toBe(false);
    });
});