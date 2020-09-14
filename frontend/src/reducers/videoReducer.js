const {VIDEO_LIST_REQUEST, VIDEO_LIST_SUCCESS, VIDEO_LIST_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_FAIL, VIDEO_SAVE_REQUEST, VIDEO_SAVE_SUCCESS, VIDEO_SAVE_FAIL, VIDEO_DELETE_REQUEST, VIDEO_DELETE_SUCCESS, VIDEO_DELETE_FAIL} = require('../constants/videoConstats')

function videoListReducer(state = {videos:[]},action){

    switch(action.type){
        case VIDEO_LIST_REQUEST:
            return {loading:true,videos:[]};
        case VIDEO_LIST_SUCCESS:
            return {loading:false,videos:action.payload};
        case VIDEO_LIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state
    }
}

function videoDetailsReducer(state ={video:{}},action){
    switch (action.payload){
        case VIDEO_DETAILS_REQUEST:
            return {loading:true};
        case VIDEO_DETAILS_SUCCESS:
            return {loading:false,success:true,video:action.payload};
        case VIDEO_DETAILS_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;

    }
}

function videoSaveReducer(state = {video:{}},action){
    switch (action.type){
        case VIDEO_SAVE_REQUEST:
            return {loading:true}
        case VIDEO_SAVE_SUCCESS:
            return {loading:false,video:action.payload,success:true};
        case VIDEO_SAVE_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

function videoDeleteReducer(state= {video :{}},action){

    switch (action.type){
        case  VIDEO_DELETE_REQUEST:
            return {loading: true};
        case VIDEO_DELETE_SUCCESS:
            return {loading: false, video: action.payload, success:true};
        case VIDEO_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }

}

export{
    videoDeleteReducer,
    videoDetailsReducer,
    videoListReducer,
    videoSaveReducer
}
