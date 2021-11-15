import { expect } from 'chai';
import { reverseText } from '../src/reverse';

describe('a collecion of difficult tests', () => {

    it('a test case', () => {
        expect(reverseText('abcde')).to.equal('edcba');
    });

});