interface Search {
    keyword: string,
    regex?: RegExp
}

const searchHelper = (query: Record<string, any>): Search => {
    const objectSearch: Search = {
        keyword: ""
    }
    const keyword = query.keyword
    if (keyword) {
        objectSearch.keyword = keyword
        const regex = new RegExp(keyword, "i")
        objectSearch.regex = regex
    }
    return objectSearch
}

export default searchHelper