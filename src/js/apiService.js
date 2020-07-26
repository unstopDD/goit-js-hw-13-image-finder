const apiKey = '17653140-37eca66381d8ffc40f2e9b8e7';

export default {
  seqrchQuery: '',
  page: 1,
  fetchGallery() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.seqrchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log(error));
  },

  resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  get query() {
    return this.seqrchQuery;
  },

  set query(value) {
    return (this.seqrchQuery = value);
  },
};
