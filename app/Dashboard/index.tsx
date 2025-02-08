import styled from 'styled-components/native';
import FinancialAnalysis from './components/FinancialAnalysis';
import Jumbotron from './components/Jumbotron';

const Dashboard = () => (
  <Scroll>
    <Jumbotron />
    <FinancialAnalysis />
  </Scroll>
);

const Scroll = styled.ScrollView`
  padding: 16px;
`;

export default Dashboard;
