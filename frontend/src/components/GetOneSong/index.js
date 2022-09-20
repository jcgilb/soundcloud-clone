import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneSong } from "../../components/GetOneSong";

const GetOneSong = () => {
    const { songId } = useParams();
    const dispatch = useDispatch();

    const songObj = useSelector(state => state.songs)

    useEffect(() => {
        dispatch(getOneSong(id))
    }, [dispatch])

    return (
        <>
            <div>One Song placeholder</div>
        </>
    )

}

export default GetOneSong;