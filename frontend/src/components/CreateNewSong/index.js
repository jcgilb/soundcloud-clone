import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAlbums } from "../../store/albums.js";
import { createSong } from "../../store/songs.js";
import ImageUploading from "react-images-uploading";
import LoadingIcons from "react-loading-icons";
import "./CreateNewSong.css";

const CreateNewSong = () => {
  // getters and setters for the form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [albumId, setAlbumId] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [albumSelect, setAlbumSelect] = useState();
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  // get albums
  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  // find all albums belonging to the user
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
  const albumsArr = Object.values(albums);
  let userAlbums = albumsArr.filter((album) => album.userId === user?.id);

  // form validations
  useEffect(() => {
    const errors = [];
    setValidationErrors(errors);
    if (!title.length) errors.push("Song title is required.");
    if (!url) errors.push("Audio is required.");
    // if (!images.length) errors.push("Album cover is required.");
    if (isNaN(albumId) && albumId)
      errors.push(`"${albumId}" is not a valid integer.`);
    if (!userAlbums.length && albumId) errors.push("Authorization required.");
    setValidationErrors(errors);
  }, [title, url, albumId, images, userAlbums.length]);

  // get the id from the name of the selected experience
  useEffect(() => {
    let selected = userAlbums?.find((album) => album?.name == albumSelect);
    setAlbumId(selected?.id);
  }, [albumSelect, userAlbums]);

  // update selected album
  const updateAlbum = (e) => setAlbumSelect(e.target.value);
  // update songFiles
  const updateAudio = (e) => {
    const file = e.target.files[0];
    if (file) setUrl(file);
  };
  // const updateImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setImageUrl(file);
  // };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  // helper function for clearing the form
  const revert = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setImageUrl("");
    setAlbumId();
  };

  // handle form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) return;
    setIsLoading(true);
    let imageFiles = images?.map((img) => img.file);
    let img = imageFiles[0];
    console.log("image files", imageFiles);
    console.log("img file", img);
    let newSong;

    newSong = {
      title,
      description,
      albumId,
      url,
      imageUrl: img,
    };

    console.log("newSong", newSong);

    let song = await dispatch(createSong(newSong)).catch(async (res) => {
      const data = await res.json();
      console.log("data", data);
      if (data && data.errors) setValidationErrors(data.errors);
    });

    if (song) {
      if (validationErrors.length === 0) {
        revert();
        return history.push(`/songs/${song.id}`);
      }
    }
  };

  return (
    <>
      <br></br>
      <br></br>
      <div className="upload-title">Take your music to the next level.</div>
      <div className="upload-container">
        <br></br>
        <form className="upload-song-form" onSubmit={handleSubmit}>
          <div className="upload-form-heading">Upload your tracks here</div>
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
          <label className="audio-upload-label">
            {"Upload audio"}
            <input
              className="audio-upload-input"
              type="file"
              placeholder="Audio URL"
              onChange={updateAudio}
            />
          </label>
          {/* <label>
            Upload image
            <input type="file" placeholder="Image URL" onChange={updateImage} />
          </label> */}
          <label className="image-upload-label">
            {"Upload image"}
            <ImageUploading
              multiple={false}
              value={images}
              onChange={onChange}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div
                  className="upload-image-wrapper"
                  {...dragProps}
                  style={isDragging ? { color: "rgb(255, 22, 84)" } : undefined}
                >
                  <div
                    {...dragProps}
                    style={
                      isDragging ? { color: "rgb(255, 22, 84)" } : undefined
                    }
                  >
                    Drag & Drop to Upload Image
                  </div>
                  <div>OR</div>
                  <button
                    style={
                      isDragging ? { color: "rgb(255, 22, 84)" } : undefined
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                    className="add-rm-update"
                  >
                    Browse
                  </button>

                  <div className="image-area">
                    {imageList?.map((image, index) => (
                      <div key={index} className="image-item">
                        <img
                          style={{ width: "120px" }}
                          className="rvw-img-preview"
                          src={image["data_url"]}
                          alt=""
                        />
                        <div className="images-to-submit">
                          <button
                            className="add-rm-update"
                            onClick={() => onImageUpdate(index)}
                          >
                            Update
                          </button>
                          <button
                            className="add-rm-update"
                            onClick={() => {
                              onImageRemove(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </label>
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
                <div id="err" key={err}>
                  {err}
                </div>
              ))}
          </ul>
          <div className="loading-container">
            {isLoading && (
              <LoadingIcons.Audio
                stroke="var(--selective-yellow)"
                strokeOpacity={1}
                speed={0.75}
              />
            )}
          </div>
          <button
            className="upload-submit"
            type="submit"
            disabled={!!validationErrors.length}
          >
            Upload song
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNewSong;
