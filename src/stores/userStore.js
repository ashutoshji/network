import { observable, computed, toJS, action } from "mobx";
import { getUserList } from "../services/API";
import Constants from "../config/constants";
import postStore from "./postStore";
import photoStore from "./photoStore";
import todoStore from "./todoStore";

class UserStore {
  @observable
  rawUserList = [];
  @observable
  selectedUser = null;
  @observable
  selectedTab = Constants.TAB_OPTION.POSTS;

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadUserList = () => {
    getUserList().then(rawUserList => {
      this.rawUserList = rawUserList;
    });
  };

  /**
   * Set the selected user (with displayed profile details)
   * @param {Object} user object selected from user list
   */
  @action
  selectUser = user => {
    this.selectedUser = user;
  };

  /**
   * Set the selected user (with displayed profile details)
   * @param {Object} user object selected from user list
   */
  @action
  selectTab = category => {
    if (this.selectedTab !== category) {
      this.selectedTab = category;
      this.loadDataByTabCategory(category);
    }
  };

  /**
   * Callback on tab select that loads the data for the corresponding
   * store in order to render the related UI components with data.
   * @param {String} category selected tab title / category
   */
  @action
  loadDataByTabCategory(category) {
    switch (category) {
      case Constants.TAB_OPTION.POSTS:
        postStore.loadPostHistory(this.selectedUser.id);
        break;
      case Constants.TAB_OPTION.ALBUMS:
        photoStore.loadPhotoAlbums(this.selectedUser.id);
        break;
      case Constants.TAB_OPTION.TODOS:
        todoStore.loadTodoList(this.selectedUser.id);
        break;
      default:
        break;
    }
  }

  /**
   * Reset current selections specific to user (e.g. Albums, Post history)
   * so that when a new user is selected the state params are not still rendered.
   * Note: Will clear the data from Post/Photo/TodoStores as well.
   */
  @action
  resetSelection = () => {
    this.selectedUser = null;
    this.selectedTab = Constants.TAB_OPTION.POSTS;
    postStore.clearData();
    photoStore.clearData();
    todoStore.clearData();
  };

  /**
   * @return {bool} inidcate whether current tab title is the selected one
   */
  isHighlighted = tabTitle => {
    return tabTitle === this.selectedTab;
  };

  /**
   * @return {Object} object with selected user details to display.
   * Properties address and workplace are extracted from the original
   * selectedUser object.
   */
  @computed
  get selectedUserDetails() {
    if (!this.selectedUser) {
      return {};
    }
    const { address, company, email, name, phone } = this.selectedUser;
    const { city, street, suite } = address;
    return {
      name,
      email,
      phone,
      address: `${suite} ${street}, ${city}`,
      workplace: company.name
    };
  }

  /**
   * Sort user list before returning to display on UI, note that computed
   * values should be cached as long as observable doesn't change.
   * @return {Array} sorted array of the rawUserList
   */
  @computed
  get filteredUserList() {
    let filteredArray = toJS(this.rawUserList)
      .concat()
      .sort((lhsUser, rhsUser) => {
        var nameLeft = lhsUser.name.toUpperCase(); // ignore upper and lowercase
        var nameRight = rhsUser.name.toUpperCase(); // ignore upper and lowercase
        if (nameLeft < nameRight) {
          return -1;
        }
        if (nameLeft > nameRight) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    return filteredArray;
  }
}
const userStore = new UserStore();
export default userStore;
