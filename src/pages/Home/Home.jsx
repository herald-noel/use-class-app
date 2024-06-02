import { observer } from 'mobx-react';
import MainContent from './components/MainContent';
import AuthLayout from '../../layouts/AuthLayout';
import SavedDiagrams from '../SavedDiagrams/SavedDiagrams';
import HomeViewModel from '../../viewModels/HomeViewModel';

const Home = observer(() => {
  return (
    <>
      <AuthLayout>
        {HomeViewModel.currentPage === 0 ? (
          <MainContent />
        ) : (
          HomeViewModel.currentPage === 1 && <SavedDiagrams />
        )}
      </AuthLayout>
    </>
  );
});

export default Home;
