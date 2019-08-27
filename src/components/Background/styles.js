import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Image } from 'react-native';

export const BackgroundApp = styled(LinearGradient).attrs({
  colors: ['#22202C', '#402845'],
})`
  flex: 1;
`;

export const ImageLogo = styled(Image)`
  margin-top: 10px;
  align-content: center;
  align-items: center;
  align-self: center;
  width: 30px;
  height: 30px;
`;
