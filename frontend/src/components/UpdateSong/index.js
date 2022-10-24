import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSong, getSongs } from "../../store/songs.js";
import DeleteSong from "../DeleteSong";
import { getAlbums } from "../../store/albums.js";
import "./UpdateSong.css";

const UpdateSong = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // get song id from url
  let { songId } = useParams();
  songId = parseInt(songId);
  const userId = useSelector((state) => state.session.user.id);
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);
  // identify the song that matches the id from url
  const thisSong = songsArr.find((song) => song.id === songId);
  // getters and setters for update song form
  const [title, setTitle] = useState(thisSong?.title);
  const [description, setDescription] = useState(thisSong?.description);
  const [url, setUrl] = useState(thisSong?.url);
  const [albumId, setAlbumId] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [albumSelect, setAlbumSelect] = useState([]);

  // get songs
  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  // get albums
  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
  const albumsArr = Object.values(albums);
  // identify all albums belonging to the current user
  let userAlbums = albumsArr.filter((album) => album.userId === user.id);

  // helper function for clearing the form after submit
  const revert = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setAlbumId();
  };

  // form validations
  useEffect(() => {
    const errors = [];
    setValidationErrors(errors);
    if (!title) errors.push("Song title is required.");
    if (!url) errors.push("Audio is required.");
    // if (isNaN(albumId) && albumId) errors.push(`"${albumId}" is not a valid integer.`)
    setValidationErrors(errors);
  }, [title, url]);

  // set user albums for form select
  const updateAlbum = (e) => setAlbumSelect(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    let songBody = {
      title,
      description,
      url,
      albumId,
    };
    // a song needs to belong to the user in order to allow editing
    if (userId === thisSong.userId) {
      revert();
      let updatedSong = await dispatch(updateSong(songBody, songId));
      history.push(`/songs/${updatedSong.id}`);
    }
  };

  if (!Object.values(songs).length) return null;

  return (
    <div className="wrapper-container">
      <div className="edit-container">
        <br></br>
        <form className="edit-song-form" onSubmit={handleSubmit}>
          <div className="edit-title">Edit song details below:</div>
          <input
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="url"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select
            onChange={updateAlbum}
            value={albumSelect}
            placeholder="Select an album"
          >
            <option value="" disabled selected>
              Select an album...
            </option>
            {userAlbums.map((album) => (
              <option key={album.title}>{album.title}</option>
            ))}
          </select>
          <ul className="errors">
            {validationErrors.length > 0 &&
              validationErrors.map((err) => (
                <li id="err" key={err}>
                  {err}
                </li>
              ))}
          </ul>
          <button
            className="edit-song-submit"
            type="submit"
            disabled={!!validationErrors.length}
          >
            Submit
          </button>
          <div>
            <DeleteSong />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSong;
