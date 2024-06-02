import { observer } from 'mobx-react';
import MainContent from './components/MainContent';
import AuthLayout from '../../layouts/AuthLayout';

const Home = observer(() => {
  return (
    <>
      <AuthLayout>
        <MainContent />
      </AuthLayout>
    </>
  );
});

export default Home;
