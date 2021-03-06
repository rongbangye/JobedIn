async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    
    const title = document.querySelector('input[name="post-title"]').value;    
    const content = document.querySelector('input[name="post-content"]').value;    
    // const id = req.params.id;
    
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title:title,
          content:content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    });
        
    if (response.ok) {
        //   document.location.reload();
          document.location.replace('/profile');
    } else {
          alert(response.statusText);
    }
  
  }
  
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);