import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useSearchResults } from "../../context/SearchResultsContext";
import { getSongs } from "../../store/songs";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const songs = useSelector((state) => state.songs);
  const keywordList = {};

  const { searchResults, setSearchResults } = useSearchResults();
  const [songList, setSongList] = useState(Object.values(songs));
  const [songArr, setSongArr] = useState(Object.values(songs));

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/songs");
      const responseData = await response.json();
      setSongArr(responseData["songs"]);
    }
    fetchData();
  }, [songs]);

  songArr?.map((song, i) => {
    // title;
    if (keywordList[song.title]) {
      keywordList[song.title].push(song);
    }
    if (!keywordList[song.title]) {
      keywordList[song.title] = [song];
    }
    // artist
    if (keywordList[song.Artist?.username]) {
      keywordList[song.Artist?.username].push(song);
    }
    if (!keywordList[song.Artist?.username]) {
      keywordList[song.Artist?.username] = [song];
    }
    // album
    if (keywordList[song.Album?.title]) {
      keywordList[song.Album?.title].push(song);
    }
    if (!keywordList[song.Album?.title]) {
      keywordList[song.Album?.title] = [song];
    }
  });

  let keys = Object.keys(keywordList);
  let values = Object.values(keywordList);

  let items = keys.map((key, i) => {
    let obj = {
      id: i,
      name: key,
      songs: values[i],
    };
    return obj;
  });

  useEffect(() => {
    setSearchResults(songList);
  }, [songList]);

  const handleOnSelect = (item) => {
    // the item selected
    setSearchResults(item.songs);
    setSongList(item.songs);
    return history.push("/songs/results");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            searchResults={searchResults}
            items={items}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
};

export default Search;
