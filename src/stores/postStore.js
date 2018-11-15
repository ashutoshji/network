import { observable, computed, toJS, action } from "mobx";
import {
  getPostHistoryForUser,
  getCommentsForPost
} from "../services/API";

class PostStore {
  @observable
  rawPostList = [];
  @observable
  currentPost = null;
  @observable
  currentPostComments = [];

  /**
   * Retrieve post list from backend and save to store
   */
  @action
  loadPostHistory = userId => {
    getPostHistoryForUser(userId).then(list => {
      this.rawPostList = list;
    });
  };

  @action
  setCurrentPost = post => {
    this.currentPost = post;
  };

  /**
   * Retrieve comments for current post from backend and save to store
   */
  @action
  loadPostComments = postId => {
    getCommentsForPost(postId).then(comments => {
      this.currentPostComments = comments;
    });
  };

  @action
  clearData() {
    this.rawPostList = [];
    this.currentPost = null;
    this.currentPostComments = [];
  }

  @computed
  get postList() {
    return toJS(this.rawPostList);
  }

  @computed
  get currentPostCommentsList() {
    return toJS(this.currentPostComments);
  }
}
const postStore = new PostStore();
export default postStore;
