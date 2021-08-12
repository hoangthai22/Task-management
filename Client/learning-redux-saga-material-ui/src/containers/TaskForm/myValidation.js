const validate = (value) => {
  const error = {};
  const { title, description } = value;
  if (title == null || typeof title === "undefined"){
      error.title = 'Please enter title';
  } else if(title.trim() && title.length < 2){
      error.title = 'Must be 2 characters or more'
  }return error;
};

export default validate;
