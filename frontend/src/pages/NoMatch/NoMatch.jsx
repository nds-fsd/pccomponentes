import styles from './noMatch.module.css';
import { TextButton } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <main className={`wrapper fullvh ${styles.main}`}>
      <p>This page does not exist</p>
      <Link to='/'>
        <TextButton leftIcon='home' value='Go to home'></TextButton>
      </Link>
    </main>
  );
}

export default NoMatch;
