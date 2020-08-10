import React, { useState } from "react";
import TVPresenter from "./TVPresenter";
import { useEffect } from "react";
import { tvApi } from "../../api";

function useHooks() {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function getData() {
      try {
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setState({ topRated, popular, airingToday, loading: false });
      } catch {
        setState({
          error: "Can't find TV information.",
          loading: false,
        });
      }
    }

    getData();
  }, []);

  return state;
}

function TVContainer() {
  const state = useHooks();
  console.log(state);
  return <TVPresenter {...state} />;
}

export default TVContainer;
