import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { addToCategory, deleteCategory, getAVideo, getAllCategory, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';


function Category() {

  const[categoryName,setCategoryName] = useState("")
  const[allcategories,setAllCategories] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
  const handleAddCategory= async()=>{
    if(categoryName){
      let body={
        categoryName,allVideos:[]
      }
      // make api call
      const response = await addToCategory(body)
      console.log(response);
      if(response.status>=200 && response.status<300){
        // hide modal
        handleClose()
        // reset state
        setCategoryName('')
      }else{
        toast.error("something went wrong")
      }
    }
    else{
      toast.warning("provide category name")
    }

  }

  const getCategories = async()=>{
    const {data} = await getAllCategory()
    setAllCategories(data);

  }
  console.log(allcategories);

  useEffect(()=>{
    getCategories()
  },[])

const handleDelete = async(id) =>{
  await deleteCategory(id)
  getCategories()
}

const dragOver =(e)=> {
  console.log("video drag over category");
  e.preventDefault()
}

const videoDrop =async (e,categoryId)=>{
  console.log("video drop inside category Id:"+categoryId);
  const videoId = e.dataTransfer.getData("video Id")
  console.log("Video card id:",videoId);


  // get video details
  const {data} = await getAVideo(videoId)
  console.log(data);
  // get category details

  const selectedCategory = allcategories?.find(item=>item.id===categoryId)
  selectedCategory.allVideos.push(data)
  console.log(selectedCategory);

  // make api call to get update category
  await updateCategory(categoryId,selectedCategory)
  getCategories()

}



  return (

    <>
      <div className='d-grid ms-3'>
        <button className='btn btn-info' onClick={handleShow}>Add to Category</button>

      </div>
      {
  allcategories?allcategories?.map((item)=>(
   <div className='mt-5 mb-3 border rounded p-3 ' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
    <div className='d-flex justify-content-between align-items-center'>
       <h6>{item?.categoryName}</h6>
       <button className='btn' onClick={()=>handleDelete(item?.id)}><i class="fa-solid fa-trash text-danger"></i></button>
    </div>
    <Row>
    {
      item?.allVideos && 
      item?.allVideos.map(
        card=>(
          <Col sm={12}>
            <VideoCard displayData={card} insideCategory={true}/>
          </Col>
        )
      )
    }
    </Row>





   </div>
  )):<p>Nothing to display</p>
}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
         <Form>
         <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Video Name</Form.Label>
        <Form.Control type="email" placeholder="Enter Video Name" onChange={(e)=>setCategoryName(e.target.value)} />
        
      </Form.Group>


         </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}
      />



    </>
  )
}

export default Category