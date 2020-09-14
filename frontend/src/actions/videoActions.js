import axios from 'axios'
const {VIDEO_LIST_REQUEST, VIDEO_LIST_SUCCESS, VIDEO_LIST_FAIL, VIDEO_SAVE_REQUEST, VIDEO_SAVE_SUCCESS, VIDEO_SAVE_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_FAIL, VIDEO_DELETE_REQUEST, VIDEO_DELETE_SUCCESS, VIDEO_DELETE_FAIL} = require('../constants/videoConstats')
const listVideos = () => async(dispatch) =>{
    try{
        dispatch({type:VIDEO_LIST_REQUEST});
        const {data} = await axios.get("/api/video");
        dispatch({type:VIDEO_LIST_SUCCESS,payload:data});


    } catch(e){
        dispatch({type:VIDEO_LIST_FAIL,payload:e.message});
    }
}

const saveVideo = (video) => async (dispatch,getState) =>{
    try{

        dispatch({type:VIDEO_SAVE_REQUEST,payload:video})
        console.log(video)
        const {userSignin:{userInfo}} = getState();
        if(!video._id){
            const {data} = await axios.post("/api/video",video,{
                headers:{
                    'Authorization':'Bearer '+userInfo.token
                }
                
            })
            dispatch({type:VIDEO_SAVE_SUCCESS,payload:data});

        }
        else{
            const {data} = await axios.put("/api/video/"+video._id,video,{
                headers:{
                    'Authorization':'Bearer '+userInfo.token
                }
            })
            dispatch({type:VIDEO_SAVE_SUCCESS,payload:data});
        }
    } catch(e){
        dispatch({type:VIDEO_SAVE_FAIL,payload:e.message});
    }
}

const detailsVideo = (videoId) => async (dispatch)=> {
    try{
        dispatch({type:VIDEO_DETAILS_REQUEST,payload:videoId});
        const {data} = await axios.get("/api/video/" + videoId);
        dispatch({type:VIDEO_DETAILS_SUCCESS,payload:data});
    } catch(e){
        dispatch({type:VIDEO_DETAILS_FAIL,payload:e.message});
    }
}

const deleteVideo = (videoId) =>async (dispatch,getState) => {
    try{
        const {userSignin:{userInfo}} = getState();
        dispatch({type:VIDEO_DELETE_REQUEST,payload:videoId});
        const {data} = await axios.delete("/api/video/"+videoId,{
            headers:{
                Authorization:'Bearer '+ userInfo.token
            }
        });
        dispatch({type:VIDEO_DELETE_SUCCESS,payload:data,success:true});

    } catch(e){
        dispatch({type:VIDEO_DELETE_FAIL,payload:e.message});
    }
}


export {
    listVideos,
    saveVideo,
    deleteVideo,
    detailsVideo
}