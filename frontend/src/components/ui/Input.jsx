import './css/Input.scss';

const Input = ({
  className = '',
  placeholder,
  label,
  id,
  description,
  children,
  ...props
}) => {
  let cssClasses = 'input-box';
  cssClasses += ' ' + className;

  return (
    <div className={cssClasses}>
      {!children && (
        <>
          {label && <label htmlFor={id}>{label}</label>}
          {description && <p>{description}</p>}
          <input id={id} {...props} placeholder={placeholder} />
        </>
      )}

      {children && (
        <>
          {label && <label htmlFor={id}>{label}</label>}
          {description && <p>{description}</p>}
          <div>
            <input id={id} {...props} placeholder={placeholder} />
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
