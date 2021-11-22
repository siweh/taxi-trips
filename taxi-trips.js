module.exports = function TaxiTrips(pool) {
  async function totalTripCount() {
    let results = await pool.query(
      `select count(fare) from routes join trip on trip.taxi_id = taxi_id join fruit`
    );
  }

  async function findAllRegions() {
    let results = await pool.query(`select region_name from region`);
    console.log(results.rows);
    return results.rows;
  }

  return {
    totalTripCount,
    findAllRegions,
  };
};
