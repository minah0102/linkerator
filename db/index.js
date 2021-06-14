// Connect to DB
const { Client } = require('pg');
const { unstable_renderSubtreeIntoContainer } = require('react-dom');
const DB_NAME = 'localhost:5432/linkerator-dev';
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

//links
async function getLinkById(id) {
  try {
    const { rows: [link] } = await client.query(/*sql*/`
    SELECT * FROM links
    WHERE id = $1
    `, [id]);
    return link;
  } catch (error) {
    throw error;
  }
}

async function getLinkWithoutTags() {
  try {
    const { rows } = await client.query(/*sql*/`
            SELECT * FROM links;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createLink({ url, count, comment, date }) {
  try {
    const { rows: [link] } = await client.query(/*sql*/`
      INSERT INTO links(url, count, comment, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [url, count, comment, date]);

    return link;
  } catch (error) {
    throw error;
  }
}

//tags
async function getAllTags() {
  try {
    const { rows } = await client.query(/*sql*/`
    SELECT * FROM tags
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getTagsbyId(id) {
  try {
    const { rows: [tags] } = await client.query(/*sql*/`
    SELECT * FROM tags
    WHERE id = $1
    `, [id]);
    return tags;
  } catch (error) {
    throw error;
  }
}

async function createTag({name}) {
  try {
    const { rows: [tag] } = await client.query(/*sql*/`
      INSERT INTO tags(name)
      VALUES ($1)
      RETURNING *;
    `, [name]);

    return tag;
  } catch (error) {
    throw error;
  }
}

//link-tags
async function getLinkTagsbyId(id) {
  try {
    const {rows: linkTags } = await client.query(/*sql*/`
      SELECT *
      FROM link_tags
      WHERE id = $1;
    `, [id]);
    return linkTags;
  } catch (error) {
    throw error;
  }
}

async function addTagsToLink({ linkId, tagId}) {
  try {
    const { rows: [newTag] } = await client.query(/*sql*/`
    INSERT INTO link_tags("linkId", "tagId")
    VALUES ($1, $2)
    RETURNING *;
    `, [linkId, tagId]);
    return newTag;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
  getLinkById,
  getLinkWithoutTags,
  createLink,
  getAllTags,
  getTagsbyId,
  createTag,
  getLinkTagsbyId,
  addTagsToLink
}