import axios from 'axios';


const postIdToDelete = 2;
axios.delete(`/api/v1/customers/restrictions`)
  .then(response => {
    console.log(`Deleted post with ID`);
  })
  .catch(error => {
    console.error(error);
  });




  