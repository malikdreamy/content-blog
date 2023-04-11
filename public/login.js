const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
      try{

        document.location.replace('/profile');
      }
catch(err){
        setTimeout(()=>{
        },1000)
        location.reload();}
      } else {
        const modalElement = document.querySelector('#warning');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  };
  
  document
    .querySelector('.login_form')
    .addEventListener('submit', loginFormHandler);
  