const postBtn = document.querySelector(".post_btn")

postBtn.addEventListener("click", (e)=> {
    e.preventDefault();
document.location.replace('/login')
});