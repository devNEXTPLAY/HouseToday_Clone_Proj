import './css/Loading.scss';

const Loading = () => {
  return (
    <main className='main'>
      <div className='card'>
        <div className='loader'></div>
        <div className='loader-info'>
          <h1>Loading </h1>
          <p>.</p>
          <p>.</p>
          <p>.</p>
        </div>
      </div>
    </main>
  );
};

export default Loading;
