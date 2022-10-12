// import { useDispatch, useSelector } from 'react-redux';
// import { likeASong } from '/../store/songs';
// import { toggleLike } from '/../store/stats';

// function LikeSong({ song.id }) {
//     const dispatch = useDispatch();
//     const songs = useSelector(state => state.songs);
//     const likes = useSelector(state => state.likes)

//     const like = () => {
//         if (songs) return dispatch(likeASong(song.id, likes.count + 1));
//         dispatch(addItem(song.id));
//     };

//     return (
//         <button
//             className={"like-button" + (song.liked ? " selected" : "")}
//             onClick={() => dispatch(toggleLike(song.id))}
//         >
//             <i className={"fas fa-heart"} />
//         </button>
//     );
// }

// export default LikeSong
