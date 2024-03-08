const Input = ({ placeholder, ...props }) => {
  return (
    <div className='control no-margin'>
      <input {...props} placeholder={placeholder} />
    </div>
  );
};

export default Input;
