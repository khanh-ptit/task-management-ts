interface Pagination {
    limitedItem: number
    currentPage: number
    skip: number
}

const paginationHelper = (query: Record<string, any>): Pagination => {
    const objectPagination: Pagination = {
        limitedItem: 4,
        currentPage: 1,
        skip: 0
    }
    if (query.limitedItem) {
        const limitedItem = parseInt(query.limitedItem.toString())
        objectPagination.limitedItem = limitedItem
    }

    if (query.page) {
        const page = parseInt(query.page.toString(), 10); // Ép kiểu về số nguyên
        
        // Đảm bảo giá trị page hợp lệ, nếu không set mặc định là 1
        objectPagination.currentPage = isNaN(page) || page < 1 ? 1 : page;
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitedItem;
    }
    return objectPagination
}

export default paginationHelper