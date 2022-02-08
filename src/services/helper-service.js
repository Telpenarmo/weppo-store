async function paginationHelper(req, table, itemsOnPage, where, include) {
	const page = req.query.page || 1
	const count = await table.count()
	const results = await table.findMany({
		skip: itemsOnPage * (page - 1),
		take: itemsOnPage,
		where,
		include
	})
	return {
		results,
		pagination: {
			numberOfPages: Math.ceil(count / itemsOnPage),
			currentPage: page
		}
	}
}

export default {
	paginationHelper
}