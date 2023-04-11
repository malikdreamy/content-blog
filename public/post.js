const generatePost = async () => {
    const content = document.querySelector('#user_inputbox').value.trim();
    const title = document.querySelector('#post_title').value.trim();
  

  
    if (content && title) {
      console.log(title)
      console.log(content)
      const response = await fetch('/posts', {
        method: 'POST',
        body: JSON.stringify({ content, title }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
      location.reload()
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.post_btn').addEventListener('click', (event) => {
    event.preventDefault();
    generatePost();
  });
  