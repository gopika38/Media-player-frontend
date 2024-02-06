const { commonAPI } = require("./commonAPI");
const { serverUrl } = require("./serverUrl");

//upload video

export const uploadVideo =async (reqBody)=>{
    //make POST http request "http://localhost:4000/videos" to add videos to the json server return response to the add component

    return await commonAPI("POST",`${serverUrl}/videos`,reqBody)
}

//get all videos from json

export const getAllVideo =async ()=>{
    //make GET http request "http://localhost:4000/videos" to get all videos from the json server return response to the view componrnt

    return await commonAPI("GET",`${serverUrl}/videos`,"")
}

//get a video

export const getAVideo =async (id)=>{
    //make GET http request "http://localhost:4000/videos" to get all videos from the json server return response to the videocard componrnt

    return await commonAPI("GET",`${serverUrl}/videos${id}`,"")
}

//delete a video

export const deleteVideo =async (id)=>{
    //make DELELTE http request "http://localhost:4000/videos" to delete  videos from the json server return response to the videocard componrnt

    return await commonAPI("DELETE",`${serverUrl}/videos/${id}`,{})
}

// store watching video history to json server

export const addToHistory = async(videoDetails) => {
    // make post http request  "http://localhost:4000/history" to store  videos to the json server return response to the videocard component
    return await commonAPI("POST",`${serverUrl}/history`,videoDetails)

}

// GET watching video history to json server

export const getAllHistory =async (id)=>{
    //make GET http request "http://localhost:4000/history" to get  videos from the json server return response to the watch-history componrnt

    return await commonAPI("GET",`${serverUrl}/history`,"")
}

export const deleteHistory =async (id)=>{
    //make GET http request "http://localhost:4000/history/id" to delete videos from the json server return response to the watch-history componrnt

    return await commonAPI("DELETE",`${serverUrl}/history/${id}`,{})
}



//add category to json-server

export const addToCategory = async(reqBody) => {
    // make post http request  "http://localhost:4000/history" to store  videos to the json server return response to the category component
    return await commonAPI("POST",`${serverUrl}/categories `,reqBody)

}
// get all categories from json-server

export const getAllCategory =async (id)=>{
    //make GET http request "http://localhost:4000/history" to get all  videos from the json server return response to the category component

    return await commonAPI("GET",`${serverUrl}/categories`,"")


}
//delete all category form json server

export const deleteCategory =async (id)=>{
    //make DELELTE http request "http://localhost:4000/categories/id" to delete all videos from the 
    // json server return response to the category component

    return await commonAPI("DELETE",`${serverUrl}/categories/${id}`,{})

}

export const updateCategory =async (id,body)=>{
    //make DELELTE http request "http://localhost:4000/categories/id" to delete all videos from the 
    // json server return response to the category component

    return await commonAPI("PUT",`${serverUrl}/categories/${id}`,body)

}







