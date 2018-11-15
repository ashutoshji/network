

export const AppConstant = {
  POSTS: "https://jsonplaceholder.typicode.com/posts/",
  COMMENTS: "https://jsonplaceholder.typicode.com/comments/",
  ALBUMS: "https://jsonplaceholder.typicode.com/albums/",
  PHOTOS: "https://jsonplaceholder.typicode.com/photos/",
  TODOS: "https://jsonplaceholder.typicode.com/todos/",
  USERS: "https://jsonplaceholder.typicode.com/users/"
};


async function _fetchWithParams(url, fetchOptions) {
  try {
    let response = await fetch(url, fetchOptions);
    if (response.ok && response.json) {
      return response.json();
    } else {
      throw new Error(`Error on feteching API from URL: ${url}`);
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function get(url) {
  return await _fetchWithParams(url, {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}


export async function getUserList() {
  return await get(AppConstant.USERS);
}


export async function getPostHistoryForUser(userId) {
  const url = AppConstant.POSTS + `?userId=${userId}`;
  return await get(url);
}


export async function getCommentsForPost(postId) {
  const url = AppConstant.COMMENTS + `?postId=${postId}`;
  return await get(url);
}


export async function getAlbumsForUser(userId) {
  const url = AppConstant.ALBUMS + `?userId=${userId}`;
  return await get(url);
}


export async function getPhotosForAlbum(albumId) {
  const url = AppConstant.PHOTOS + `?albumId=${albumId}`;
  return await get(url);
}

export async function getTodosForUser(userId) {
  const url = AppConstant.TODOS + `?userId=${userId}`;
  return await get(url);
}
