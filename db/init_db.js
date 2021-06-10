// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

// async function buildTables() {
//   try {
//     client.connect();

//     // drop tables in correct order

//     // build tables in correct order

//   } catch (error) {
//     throw error;
//   }
// }

async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS link;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS link_tags;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");
    throw error;
  }
}

async function createTables() {
  console.log("Building/Creating Tables...");
  try {
    await client.query(`
      CREATE TABLE link(
        click-count INTEGER,
        comment,
        date-shared
      );

      CREATE TABLE tags(

      );

      CREATE TABLE link_tags(

      );
    `);
    console.log("Finished building/creating tables!");
  } catch (error) {
    console.error("Error while building/creating tables!");
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());