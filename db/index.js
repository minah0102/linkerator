// Connect to DB
const { Client } = require('pg');
const { unstable_renderSubtreeIntoContainer } = require('react-dom');
const DB_NAME = 'localhost:5432/linkerator-dev';
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

//links

// async function getAllLinks() {
//   try {
//     const { rows: [links] } = await client.query(/*sql*/`
//       SELECT *
//       FROM links
//       JOIN tags ON links."linkId" = tags.id;
//     `,);
//     const linksWithTags = attachTagsToLinks(links);

//     return linksWithTags;
//   } catch (error) {
//     throw error;
//   }
// }

async function getAllLinks() {
  try {
    const { rows: linkIds } = await client.query(/*sql*/`
      SELECT *
      FROM links;
    `);

    const links = await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));

    return links;
  } catch (error) {
    throw error;
  }
}

// async function getLinkById(id) {
//   try {
//     const { rows: [link] } = await client.query(/*sql*/`
//     SELECT * FROM links
//     WHERE id = $1
//     `, [id]);
//     return link;
//   } catch (error) {
//     throw error;
//   }
// }

async function getLinkById(linkId) {
  try {
    const { rows: [link] } = await client.query(/*sql*/`
    SELECT * FROM links
    WHERE id = $1
    `, [linkId]);

    if (!link) {
      throw {
        name: "LinkNotFoundError",
        message: "Could not find a link with that linkId"
      };
    }

    const { rows: tags } = await client.query(/*sql*/`
    SELECT tags.*
    FROM tags
    JOIN link_tags ON tags.id=link_tags."tagId"
    WHERE link_tags."linkId"=$1;
    `, [linkId]);

    link.tags = tags;

    return link;
  } catch (error) {
    console.error("Error on getLinkById...", error);
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



// async function createLink({ url, comment, tags = [] }) {
//   try {
//     const { rows: [link] } = await client.query(/*sql*/`
//       INSERT INTO links(url, comment)
//       VALUES ($1, $2)
//       RETURNING *;
//     `, [url, comment]);

//     const tagList = await createTag(tags);

//     return await addTagsToLink(link.id, tagList);
//   } catch (error) {
//     throw error;
//   }
// }

async function createLink({ url, count, comment, date, tags }) {
  try {
    const { rows: [link] } = await client.query(/*sql*/`
      INSERT INTO links(url, count, comment, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [url, count, comment, date]);

    // const tagList = await createTag(tags);

    // return await addTagsToLink(link.id, tagList);

    return link;
  } catch (error) {
    throw error;
  }
}

async function updateLink(linkId, fields ={}) {
  const { tags } = fields;
  delete fields.tags;

  const insertFields = Object.keys(fields).map((key, idx) => {
    `"${key}"=$${idx +1}`.join(", ");
  });
  try {
    if (insertFields.length > 0) {
      await client.query(`
      UPDATE links
      SET ${insertFields}
      WHERE id=${linkId}
      RETURNING *;
      `, Object.values(fields));
    }
    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    const tagList = await creatTags(tags);
    const tagListIds = tagList.map((tag) => `${tag.id}`).join(", ");

    await client.query(`
    DELETE FROM link_tags
    WHERE "tagId"
    NOT IN (${tagListIds})
    AND "linkId"=$1;
    `, [linkId]);

    await addTagsToLink(linkId, tagList);
    return getLinkById(linkId);
  } catch (error) {
    console.log("Error on updateLink...", error);
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

// async function createTag(tagname) {

//   try {
//     const { rows: [tag] } = await client.query(/*sql*/`
//       INSERT INTO tags(tagname)
//       VALUES ($1)
//       ON CONFLICT (tagname) DO NOTHING
//       RETURNING *;
//     `, [tagname]);

//     return tag;
//   } catch (error) {
//     throw error;
//   }
// }

async function createTag(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertTags = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectTags = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      `
    INSERT INTO tags(tagname)
    VALUES(${insertTags})
    ON CONFLICT (tagname) DO NOTHING;
    `,
      tagList
    );
    const { rows } = await client.query(
      `
  
    SELECT * FROM tags
    WHERE tagname IN (${selectTags})`,
      tagList
    );

    return rows;
  } catch (error) {
    console.log("createTags", error);
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

// async function addTagsToLink({ linkId, tagId}) {
//   try {
//     const { rows: [newTag] } = await client.query(/*sql*/`
//     INSERT INTO link_tags("linkId", "tagId")
//     VALUES ($1, $2)
//     RETURNING *;
//     `, [linkId, tagId]);
//     return newTag;
//   } catch (error) {
//     throw error;
//   }
// }

async function addTagsToLink(linkId, tagList) {
  try {
    const allTagsPromises = tagList.map((tag) => createLinkTag(linkId, tag.id));
    await Promise.all(allTagsPromises);
    return await getLinkById(linkId);
  } catch (error) {
    console.log("Error on addTagsToLink...", error);
    throw error;
  }
}


async function createLinkTag(linkId, tagId) {
  try {
    await client.query(/*sql*/`
    INSERT INTO link_tags("linkId", "tagId")
    VALUES ($1, $2)
    ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);
  } catch (error) {
    console.log("Error on createLinkTag...", error);
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
  getAllLinks,
  getLinkById,
  getLinkWithoutTags,
  createLink,
  updateLink,
  getAllTags,
  getTagsbyId,
  createTag,
  getLinkTagsbyId,
  addTagsToLink,
  createLinkTag
}