import './css/Loading.scss';

const Loading = () => {
  return (
    <main className='main'>
      <div className='card'>
        <div className='banter-loader'>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
          <div className='banter-loader__box'></div>
        </div>

        <div className='card-info'>
          <h1>Loading . . .</h1>
        </div>
      </div>
    </main>
  );
};

export default Loading;
