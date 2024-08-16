import { validateEmail } from "../main";

describe('validateEmail', () => {
    it('должен возвращать true для корректного почтового ящика', () => {
      const validEmail = 'mailname@domen.ru'; 
      const result = validateEmail(validEmail);
      expect(result.isValid).toBe(true);
    });

    it('должен возвращать false для почтового ящика, которые начинаются с @', () => {
        const invalidEmail = '@mailname@domen.ru';
        const result = validateEmail(invalidEmail);
        expect(result.isValid).toBe(false);
      });

    it('должен возвращать false для почтового ящика, которые не содержат @', () => {
        const invalidEmail = 'mailnamedomen.ru';
        const result = validateEmail(invalidEmail);
        expect(result.isValid).toBe(false);
    });

    it('должен возвращать false для почтового ящика, которые не содержат названия почтового ящика или домена', () => {
        const invalidEmail = 'mailname@';
        const result = validateEmail(invalidEmail);
        expect(result.isValid).toBe(false);
    });

    it('должен возвращать false для почтового ящика, которые начинаются с цифр', () => {
        const invalidEmail = '123mailname@domen.ru';
        const result = validateEmail(invalidEmail);
        expect(result.isValid).toBe(false);
    });
});