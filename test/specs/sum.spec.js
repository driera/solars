import each from 'jest-each';
import {sum, product} from 'inits/sum';

describe('Sum function', () => {
    each([
        [1, 2, 3],
        [2, 22, 24]
    ]).test('adds 2 numbers and returns it\'s sum', (a, b, result) => {
        var action = sum(a, b);

        expect(action).toBe(result);
    });
});

describe('Product function', () => {
    each([
        [2, 5, 10],
        [3, 10, 30]
    ]).test('multiply 1 + 2 and returns it\'s product', (a, b, result) => {
        var action = product(a, b);

        expect(action).toBe(result);
    });
})
