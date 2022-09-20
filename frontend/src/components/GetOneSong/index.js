// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import { getOneSong } from "../../components/GetOneSong";

// const GetOneSong = () => {
//     let { songId } = useParams();
//     songId = parseInt(songId)
//     const dispatch = useDispatch();

//     const songObj = useSelector(state => state.songs)

//     useEffect(() => {
//         dispatch(getOneSong(songId))
//     }, [dispatch])

//     return (
//         <>
//             <div>One Song placeholder</div>
//         </>
//     )

// }

// export default GetOneSong;