import { Test, TestingModule } from '@nestjs/testing';
import { Helper } from './helpers';

describe('calculateDistance()', () => {
  let helper = new Helper();
  it('should return 0', () => {
    expect(
      helper.calculateDistance(
        '-1.971142',
        '30.103683',
        '-1.971142',
        '30.103683',
      ),
    ).toBe(0);
  });
  it('should return the final results', () => {
    expect(
      helper.calculateDistance(
        '-1.956537',
        '30.063616',
        '-1.971142',
        '30.103683',
      ),
    ).toBe(4.7);
  });
});

describe('arraySorter()', () => {
  let helper = new Helper();

  const testData = [
    { id: 1, name: 'Nicola', distance: 40 },
    { id: 2, name: 'Maxxy Cabral', distance: 12 },
    { id: 3, name: 'Iron man', distance: 12 },
  ];
  it('should sort array of object', () => {
    expect(helper.arraySorter(testData)).toEqual([
      { id: 2, name: 'Maxxy Cabral', distance: 12 },
      { id: 3, name: 'Iron man', distance: 12 },
      { id: 1, name: 'Nicola', distance: 40 },
    ]);
  });
  it('should return the same order', () => {
    expect(
      helper.arraySorter([
        { id: 2, name: 'Danilo medina', distance: 3 },
        { id: 1, name: 'Angel Miguel', distance: 3 },
      ]),
    ).toEqual([
      { id: 2, name: 'Danilo medina', distance: 3 },
      { id: 1, name: 'Angel Miguel', distance: 3 },
    ]);
  });
});

describe('getCoordinates()', () => {
  let helper = new Helper();

  it('should return latitude and longitude separately', () => {
    expect(helper.getCoordinates('-1.956537, 31.063616')).toEqual({
      lat: '-1.956537',
      lon: '31.063616',
    });
  });
});

describe('cleanJoiValidator()', () => {
  let helper = new Helper();

  it('should remove special characters', () => {
    expect(helper.cleanJoiValidator('/myLocation/ is required')).toEqual(
      'myLocation is required',
    );
  });
});

describe('validateCoordinates()', () => {
  let helper = new Helper();

  it('should return true', () => {
    expect(helper.validateCoordinates('-1.956537', '31.063616')).toEqual(true);
  });
  it('should return return false', () => {
    expect(helper.validateCoordinates('dfdfd', 'dfdfd')).toEqual(false);
  });
});
