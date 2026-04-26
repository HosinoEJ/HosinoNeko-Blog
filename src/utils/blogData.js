export const fetchBlogData = async () => {
    try {
        // 確保你的 data.json 放在 public 目錄下
        const response = await fetch('/blogData.json');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch blog data:", error);
        return { TagList: {}, Data: [] };
    }
};

/**
 * 根據 Tag ID 篩選文章 (對應原本 Express 的邏輯)
 */
export const getFilteredPosts = (data, tagId) => {
    if (!tagId) return data.Data;
    return data.Data.filter(post => post.tagid && post.tagid.includes(tagId));
};

/**
 * 根據文件名獲取單篇文章詳情
 */
export const getPostByFilename = (data, filename) => {
    return data.Data.find(p => p.filename === filename);
};