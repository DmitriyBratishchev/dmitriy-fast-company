import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
  createComment: async (comment) => {
    const { data } = await httpService.put(commentEndpoint + comment._id, comment);
    // console.log("commentService", data);
    return data;
  },
  getComments: async (pageId) => {
    // docs Firebase: https://firebase.google.com/docs/database/rest/retrieve-data?hl=en
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  }
};

export default commentService;
