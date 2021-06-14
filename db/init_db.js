// code to build and initialize DB goes here
const {
  client,
  // other db methods 
  createLink,
  createTag,
  getLinkWithoutTags,
  getAllTags,
  addTagsToLink
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
    await client.query(/*sql*/`
    DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS tags;
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
    await client.query(/*sql*/`
        CREATE TABLE links(
          id SERIAL PRIMARY KEY,
          url TEXT UNIQUE NOT NULL,
          count INTEGER DEFAULT 0,
          comment TEXT NOT NULL,
          date DATE DEFAULT CURRENT_DATE
        );
    `);
  
    await client.query(/*sql*/`
      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);
        
    await client.query(/*sql*/`
      CREATE TABLE link_tags(
        id SERIAL PRIMARY KEY,
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE("linkId", "tagId")
      );
    `);
  } catch (error) {
    console.error("Error while building/creating tables!");
    throw error;
  }
}

// async function populateInitialData() {
//   try {
//     // create useful starting data
    
//   } catch (error) {
//     throw error;
//   }
// }

async function createInitialLinks() {
  try {
    console.log("Starting to create inital links...");
    const linksToCreate = [
      {
        url: "https://google.com",
        count: 318,
        comment: "This is still the best search engine I know of.",
        date: "13 Sept 2021"
      },
      {
        url: "https://youtube.com",
        count: 555,
        comment: "This is my favorite video website.",
        date: "05 Jan 2020"
      },
      {
        url: "https://amazon.com",
        count: 708,
        comment: "This is a good shopping website.",
        date: "04 July 2021"
      },
    ]
    const links = await Promise.all(linksToCreate.map(createLink));

    console.log("links created:");
    console.log(links);

  } catch (error) {
    console.error("Error creating inital links!");
    throw error;
  }
}

async function createInitialTags() {
  try {
    console.log("Starting to create tags...");
    const tagsToCreate = [
      { name: "search" },
      { name: "knowledge" },
      { name: "tool" },
      { name: "video" },
      { name: "uploads" },
      { name: "shopping" }
    ]

    const tags = await Promise.all(tagsToCreate.map(createTag));

    console.log("Tags created:");
    console.log(tags);
  } catch (error) {
    console.error("Error creating tags!");
    throw error;
  }
}

async function createInitialLinkTags() {
  try {
    console.log("Starting to create link-tags...");
    const [link1, link2, link3] = await getLinkWithoutTags();
    const [tag1, tag2, tag3, tag4, tag5, tag6] = await getAllTags();

    const linkTagsToCreate = [
      { linkId: link1.id, tagId: tag2.id },
      { linkId: link2.id, tagId: tag4.id },
      { linkId: link3.id, tagId: tag6.id }
    ]

    const linkTags = await Promise.all(linkTagsToCreate.map(addTagsToLink));
    console.log("link-tags created:", linkTags);
  } catch (error) {
    console.error("Error creating link-tags!");
    throw error;
  }
}

// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialLinks();
    await createInitialTags();
    await createInitialLinkTags();
  } catch (error) {
    console.error("error during rebuildDB")
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());

// module.exports = {
//   rebuildDB
// };