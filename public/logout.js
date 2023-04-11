const logout = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/homepageNotLoggedIn');
    } else {
      alert(`${response.status}: ${response.statusText}`);
    }
  };
  
  document.querySelector('.logout-link').addEventListener('click', logout);
  