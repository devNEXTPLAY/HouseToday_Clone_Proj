const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? 'text-button' : 'button';
  cssClasses += ' ' + className;
  // 271-2. Adding the className Prop

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
