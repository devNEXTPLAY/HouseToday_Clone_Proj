function AgreeInput({ id, title, condition, checked, ...props }) {
  return (
    <div className="agree__chackbox">
      <input {...props} id={id} checked={checked} type="checkbox" />
      <label htmlFor={id}>
        {title && title}
        <span>({condition})</span>
      </label>
    </div>
  );
}

export default AgreeInput;
