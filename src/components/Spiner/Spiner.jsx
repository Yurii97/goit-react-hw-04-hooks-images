import Loader from 'react-loader-spinner';
import s from './Spiner.module.css';

function Spiner() {
  return (
    <div className={s.spiner}>
      <Loader
        type="Circles"
        color="#00BFFF"
        margin="0 auto"
        height={60}
        width={60}
      />
    </div>
  );
}

export default Spiner;
