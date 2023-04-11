const uploadSaveBtn = document.getElementById('upload-save');
const deleteBtns = document.querySelectorAll('.delete_post');
const editBtns = document.querySelectorAll(".edit_post");
const updateBtn = document.querySelectorAll(".updatedPost");
const updateForm = document.querySelectorAll(".update-form")


const saveUpload = async () => {
  try{
  const form = document.getElementById('upload-form');
  const formData = new FormData(form);

  const response = await fetch('/users/update-profile-pic', {
    method: 'POST',
    body: formData,
  });
 
  const responseJson = await response.json();
  const profilePic = await responseJson.profilePic;


  const bio = await responseJson.userBio;
  const bioElement = document.getElementById('userBio');

  bioElement.innerText = bio;
  location.reload();
}catch(err){
  location.reload();
}

};

uploadSaveBtn.addEventListener("click", saveUpload);


const deletePost = async (event) =>{
  event.preventDefault();
const currentTarget = event.target.parentElement.id;


  const response = await fetch(`/posts/${currentTarget}`, {
    method: 'DELETE',
    body: JSON.stringify({ currentTarget}),
    headers: { 'Content-Type': 'application/json' },
  });
  location.reload();
}


deleteBtns.forEach(btn => btn.addEventListener('click', deletePost));

const editPost = async (event) => {
event.preventDefault();
const currentForm = event.target.parentElement.parentElement.nextSibling.nextSibling
currentForm.style.display ="block"
const targetEditBtn = event.target.parentElement.parentElement.firstChild.
nextSibling.nextSibling.nextSibling.nextSibling.
nextSibling.nextSibling.nextSibling
targetEditBtn.style.display = "inline";

  targetEditBtn.addEventListener("click", async (event) => {

    event.preventDefault();
    let postNumber = event.target.parentElement.id;

    let newContent = event.target.parentElement.parentElement.nextSibling.nextSibling
    console.log(newContent.querySelector('#user_inputbox').value.trim());

  
    const content = newContent.querySelector('#user_inputbox').value.trim();
const title = newContent.querySelector('#post_title').value.trim();

    const response = await fetch(`/posts/${postNumber}`, {
      method: 'PUT',
      body: JSON.stringify({ content, title}),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseJson = await response.json();

    location.reload();

  });


}

editBtns.forEach(btn => btn.addEventListener("click", editPost));