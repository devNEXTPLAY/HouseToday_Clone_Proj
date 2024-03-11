import './css/Button.scss';

const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? 'text-button' : 'button';
  //* textOnly가 true면 text-button, 아니면 button
  cssClasses += ' ' + className;

  //* cssClasses에 className이 있으면 추가
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
