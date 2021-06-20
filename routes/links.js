const express = require('express');
const linksRouter = express.Router();

const {
	getAllLinks,
	getLinkById,
	updateClickCounts,
	createLink
} = require("../db");

linksRouter.use((req, res, next) => {
  console.log("A request is being made to /links");

  next();
});

linksRouter.get("/", async (req, res, next) => {
  try {
		const allLinks = await getAllLinks();

		res.send(allLinks);
	} catch (error) {
		next(error);
	}
});

linksRouter.post('/', async (req, res, next) => {
	try {
		const { url, count, comment, date = "" } = req.body;

		const createNewLink = await createLink({url, count, comment, date, tag});

		res.send(createNewLink);
	} catch (error) {
		next(error);
	}
});

// linksRouter.patch("/:linkId", async (req, res, next) => {
// 	try {
// 		const { linkId: id } = req.params;
// 		const { url, count, comment, date } = req.body;

// 		const getLinkById = await getLinkById(id);

// 		if (getLinkById) {
// 			const updateLink = await updateLink({url, count, comment, date});
// 			res.send(updateLink);
// 		}
		
// 	} catch (error) {
// 		next (error);
// 	}
// })

linksRouter.patch("/:linkId", async (req, res, next) => {
  const { linkId } = req.params;
  const { clickCount } = req.body;

  try {
    await updateClickCount(linkId, clickCount);
    const updatedLink = await getLinkById(linkId);
    console.log(updatedLink);

    res.send(updatedLink);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

linksRouter.delete('/:linkId', async (req, res, next) => {
	try {
		const { linkId } = req.params;
		
		const getLink = await getLinkById(linkId);
		if (getLink) {
			const deleteLink = await destroyLink(linkId);
			res.send(deleteLink);
		}
	} catch (error) {
		next(error);
	}
});

linksRouter.post("/:linkId/tags", async (req, res, next) => {
	try {
		const { linkId } = req.params;
		const { tagId, name } = req.body;

		const attachTagsToLinks = await addTagsToLink(linkId, tagId);
		if (!(attachTagsToLinks.length === 0)) {
			return "Tag has been added to the routine."
		}

		const addTag = await addTagsToLink({ linkId, tagId, name });
		res.send(addTag);
	} catch (error) {
		next(error);
	}
});

module.exports = linksRouter;