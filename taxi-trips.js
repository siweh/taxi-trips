module.exports = function TaxiTrips(pool) {
  async function totalTripCount() {
    let results = await pool.query(`select count(*) from trips`);

    return results.rows[0].count;
  }

  async function findAllRegions() {
    let results = await pool.query(`select region_name from region`);
    console.log(results.rows);
    return results.rows;
  }

  async function findTaxisForRegion(region_name) {
    let results = await pool.query(
      `select reg_number from taxi join region on taxi.region_id = region.id where region.region_name = $1`,
      [region_name]
    );
    console.log(results.rows);
    return results.rows;
  }

  async function findTripsByRegNumber(reg_number) {
    let results = await pool.query(
      `select trips.route_id from trips join taxi on trips.taxi_id = taxi.id where taxi.reg_number = $1`,
      [reg_number]
    );
    console.log(results.rows);
    return results.rows;
  }

  async function findTripsByRegion(region_name) {
    let results = await pool.query(
      `select count(*) from trips join taxi on trips.taxi_id = taxi.id join region on taxi.region_id = region.id where region.region_name = $1`,
      [region_name]
    );
    console.log(results.rows);
    return results.rows[0].count;
  }

  async function findIncomeByRegNumber(reg_number) {
    let results = await pool.query(
      `select sum(fare) from routes
      join trips on trips.route_id = routes.id
      join taxi on taxi.id = trips.taxi_id
      where taxi.reg_number = $1`,
      [reg_number]
    );
    console.log(results.rows);
    return results.rows[0].sum;
  }

  async function findTotalIncomePerTaxi() {
    let results = await pool.query(
      `select taxi.reg_number, sum(fare) as income from routes
      join trips on trips.route_id = routes.id
      join taxi on taxi.id = trips.taxi_id
      group by taxi.reg_number`
    );
    console.log(results.rows);
    return results.rows;
  }

  async function findTotalIncome() {
    let results = await pool.query(
      `select sum(fare) as income from routes
      join trips on trips.route_id = routes.id
      join taxi on taxi.id = trips.taxi_id`
    );
    console.log(results.rows);
    return results.rows[0].income;
  }

  return {
    totalTripCount,
    findAllRegions,
    findTaxisForRegion,
    findTripsByRegNumber,
    findTripsByRegion,
    findIncomeByRegNumber,
    findTotalIncomePerTaxi,
    findTotalIncome,
  };
};
