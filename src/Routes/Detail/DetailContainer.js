import React, { useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import DetailPresenter from "./DetailPresenter";
import { useEffect } from "react";
import { moviesApi, tvApi } from "../../api";

function useHooks() {
  const { pathname } = useLocation();
  const isMovie = pathname.includes("/movie/");
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    result: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function getData() {
      if (isNaN(Number(id))) {
        return history.push("/");
      }
      let result = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.movieDetail(Number(id)));
        } else {
          ({ data: result } = await tvApi.showDetail(Number(id)));
        }
        setState({ result, error: null, loading: false });
      } catch {
        setState({
          result: null,
          error: "Can't find anything.",
          loading: false,
        });
      }
    }
    getData(id);
  }, [id, history, isMovie]);

  return state;
}
function DetailContainer() {
  const state = useHooks();
  return <DetailPresenter {...state} />;
}

export default DetailContainer;
