import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "1a88ef42580a45520eead93aeb5a5933",
    language: "en-US",
  },
});

const params = {
  params: {
    api_key: "1a88ef42580a45520eead93aeb5a5933",
    language: "en-US",
  },
};

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing", params),
  upcoming: () => api.get("movie/upcoming", params),
  popular: () => api.get("movie/popular", params),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        api_key: "1a88ef42580a45520eead93aeb5a5933",
        language: "en-US",
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        api_key: "1a88ef42580a45520eead93aeb5a5933",
        language: "en-US",
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated", params),
  popular: () => api.get("tv/popular", params),
  airingToday: () => api.get("tv/airing_today", params),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        api_key: "1a88ef42580a45520eead93aeb5a5933",
        language: "en-US",
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        api_key: "1a88ef42580a45520eead93aeb5a5933",
        language: "en-US",
        query: encodeURIComponent(term),
      },
    }),
};
