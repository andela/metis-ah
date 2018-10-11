
// globals assert, expect, describe
import chai from 'chai';
import beginningOfWeek from '../server/helpers/getBeginningOfWeek';

const { expect, should } = chai;
should();


describe('BEGINNING OF WEEK HELPER TESTS', () => {
  expect(beginningOfWeek('2018-8-5').toString()).to.contain(new Date('2018-07-30T00:00:00.000Z'));
});
