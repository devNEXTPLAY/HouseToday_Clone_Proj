const Loadingindicator = ({ title }) => {
  return (
    <div className="card">
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>

      <div className="card-info">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Loadingindicator;
