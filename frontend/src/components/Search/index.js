import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const songnames = useSelector((state) => state.songs);
  return <></>;
};

export default Search;
