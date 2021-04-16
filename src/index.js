import './styles.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import photoTemplates from './templates/photo-cards.hbs';
import apiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';
import getRefs from './js/getRefs';
import STORAGE_KEY  from './js/keys';
import clientStorage from './js/services/clientStorage';
import notify from './js/notify';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = getRefs();
const imagesApiService = new apiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchPictures);
refs.gallery.addEventListener('click', onPictureClick);

restoreGallery();

function restoreGallery() {
    const imagesFromStorage = clientStorage.getItem(STORAGE_KEY.IMAGES)

    if (imagesFromStorage !== null) {
        appendPicturesMarkup(imagesFromStorage)
        loadMoreBtn.show();
        imagesApiService.pageNumber = clientStorage.getItem(STORAGE_KEY.PAGE);
        imagesApiService.searchQuery = clientStorage.getItem(STORAGE_KEY.QUERY);
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    clearGallery();
    const inputValue = event.currentTarget.elements.query.value;

    if (inputValue.trim() === '') {

        loadMoreBtn.hide();
        sessionStorage.clear();
        return notify.alert();

    } else {

        loadMoreBtn.show();
        imagesApiService.searchQuery = inputValue;
        clientStorage.setItem(STORAGE_KEY.QUERY, inputValue);
        imagesApiService.resetPage();
        clientStorage.clearStorage(STORAGE_KEY.IMAGES);
        fetchPictures();

    }
}

function fetchPictures() {
    loadMoreBtn.disable();
    imagesApiService.fetchPictures()
        .then(pictures => {
            appendPicturesMarkup(pictures);
            loadMoreBtn.enable();
            clientStorage.increaseItem(STORAGE_KEY.IMAGES, pictures);
            showFetchNotice(pictures);
            scrollPageDown();

    })
        .catch(error => {
            console.log(error);
            notify.error();
            loadMoreBtn.hide();
        });
}

function showFetchNotice (pictures) {
    if (pictures.length > 1) {
        notify.success(pictures);
    } else {
        notify.notice();
        loadMoreBtn.hide();
    }
}

function scrollPageDown () {
    window.scrollTo({
    top: refs.gallery.offsetHeight - 615,
    behavior: "smooth"
    });
}

function appendPicturesMarkup(pictures) {
    refs.gallery.insertAdjacentHTML('beforeend', photoTemplates(pictures));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onPictureClick (event) {
    const bigImgSrc = event.target.dataset.src;
  if (bigImgSrc) {
    basicLightbox
      .create(
        `<img src="${bigImgSrc}">`
      )
      .show();
  }
}
