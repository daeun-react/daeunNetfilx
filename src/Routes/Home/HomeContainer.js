import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { moviesApi } from "../../api";
import HomePresenter from "./HomePresenter";

function useHooks() {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function getData() {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        setState({
          nowPlaying,
          upcoming,
          popular,
          loading: false,
        });
      } catch {
        setState({
          error: "Can't find movie information.",
          loading: false,
        });
      }
    }
    getData();
  }, []);

  return state;
}

const HomeContainer = () => {
  const state = useHooks();
  return <HomePresenter {...state} />;
};

export default HomeContainer;
