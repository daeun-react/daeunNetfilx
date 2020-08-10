import React from "react";
import { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";
import { useEffect } from "react";

function SearchContainer() {
  const [state, setState] = useState({
    movieResults: null,
    tvResults: null,
    loading: false,
    error: null,
    searchTerm: "",
  });

  async function getData(searchTerm) {
    if (searchTerm === "") {
      return;
    }

    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setState({
        movieResults,
        tvResults,
        loading: false,
      });
    } catch {
      setState({ error: "Can't find results.", loading: false });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { searchTerm } = state;
    if (searchTerm !== "") {
      getData(searchTerm);
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setState({
      ...state,
      searchTerm: value,
    });
  };

  useEffect(() => {
    getData("");
  }, []);

  const { movieResults, tvResults, searchTerm, loading, error } = state;
  console.log(state);
  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  );
}

export default SearchContainer;
