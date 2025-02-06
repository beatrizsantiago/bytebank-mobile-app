import { Image, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const Box = styled.View`
  padding: 16px;
  margin-bottom: 16px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.secondary.main};
  text-align: center;
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.gray['600']};
  margin-top: 8px;
  font-weight: 400;
  text-align: center;
`;

type Props = {
  icon: ImageSourcePropType,
  title: string,
  description: string,
};

const FeatureItem = ({
  icon, title, description
}: Props) => (
  <Box>
    <Image source={icon} style={{ width: 73 }} />
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Box>
);

export default FeatureItem;
