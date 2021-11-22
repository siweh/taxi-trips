let assert = require('assert');
let TaxiTrips = require('../taxi-trips');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/taxi_trips';

const pool = new Pool({
  connectionString,
});

describe('Taxi Trips', function () {
  // beforeEach(async function () {

  // });

  it('should find how many trips all the taxis made', async function () {
    const taxiTrips = TaxiTrips(pool);

    assert.equal(7, await taxiTrips.totalTripCount());
  });

  it('should find all the regions', async function () {
    const taxiTrips = TaxiTrips(pool);

    assert.deepStrictEqual(
      [
        { region_name: 'Durban' },
        { region_name: 'Cape Town' },
        { region_name: 'Gauteng' },
      ],
      await taxiTrips.findAllRegions()
    );
  });

  it('should find all the taxis for a region', async function () {
    const taxiTrips = TaxiTrips(pool);

    assert.deepStrictEqual(
      [{ reg_number: 'DB12345' }],
      await taxiTrips.findTaxisForRegion('Durban')
    );
    assert.deepStrictEqual(
      [{ reg_number: 'CA19785' }],
      await taxiTrips.findTaxisForRegion('Cape Town')
    );
    assert.deepStrictEqual(
      [{ reg_number: 'GP32456' }],
      await taxiTrips.findTaxisForRegion('Gauteng')
    );
  });

  it('should find all the trips for a reg number', async function () {
    const taxiTrips = TaxiTrips(pool);

    assert.deepStrictEqual(
      [
        {
          route_id: 1,
        },
        {
          route_id: 2,
        },
        {
          route_id: 1,
        },
      ],
      await taxiTrips.findTripsByRegNumber('CA19785')
    );
    assert.deepStrictEqual(
      [
        {
          route_id: 3,
        },
        {
          route_id: 3,
        },
      ],
      await taxiTrips.findTripsByRegNumber('GP32456')
    );
  });

  it('should find the total number of trips by region', async function () {
    const taxiTrips = TaxiTrips(pool);

    assert.equal(3, await taxiTrips.findTripsByRegion('Cape Town'));
    assert.equal(2, await taxiTrips.findTripsByRegion('Gauteng'));
    assert.equal(2, await taxiTrips.findTripsByRegion('Durban'));
  });

  it('find the total income for a given reg number', async function () {
    const taxiTrips = TaxiTrips(pool);
    assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('...').length);
    assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('***').length);
  });

  it('find the total income for each taxi', async function () {
    const taxiTrips = TaxiTrips(pool);
    assert.deepStrictEqual([{}, {}, {}], taxiTrips.findTotalIncomePerTaxi());
  });

  it('find the total income for all the taxis', async function () {
    const taxiTrips = TaxiTrips(pool);
    assert.deepStrictEqual(0.0, taxiTrips.findTotalIncome());
  });

  after(function () {
    pool.end();
  });
});
