import { observable, computed, toJS, action } from "mobx";
import { getAlbumsForUser, getPhotosForAlbum } from "../services/API";

class PhotoStore {
  @observable
  rawAlbumList = [];
  @observable
  currentAlbum = null;
  @observable
  currentPhoto = null;
  @observable
  albumPhotoListMapping = new Map();

  @action
  loadPhotoAlbums = userId => {
    getAlbumsForUser(userId).then(albums => {
      albums.forEach(async album => {
        let photos = await getPhotosForAlbum(album.id);
        album.photoCount = photos.length;
        this.albumPhotoListMapping[album.id] = photos;
        this.rawAlbumList.push(album);
      });
    });
  };

  @action
  setCurrentAlbum = album => {
    this.currentAlbum = album;
  };

  @action
  setCurrentPhoto = photo => {
    this.currentPhoto = photo;
  };

  @action
  clearData() {
    this.rawAlbumList = [];
    this.albumPhotoListMapping = new Map();
    this.currentAlbum = null;
    this.currentPhoto = null;
  }

  @computed
  get albumList() {
    let filteredArray = toJS(this.rawAlbumList)
      .concat()
      .sort((lhsUser, rhsUser) => {
        var idLeft = lhsUser.id;
        var idRight = rhsUser.id;
        if (idLeft < idRight) {
          return -1;
        }
        if (idLeft > idRight) {
          return 1;
        }
        // ids must be equal
        return 0;
      });
    return filteredArray;
  }
}
const photoStore = new PhotoStore();
export default photoStore;
