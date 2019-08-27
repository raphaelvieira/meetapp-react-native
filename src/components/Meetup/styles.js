import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-top: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const MeetupImage = styled.Image`
  flex: 1;
  width: 300px;
  height: 300px;
`;
export const Title = styled.Text`
  flex: 1;
  align-self: flex-start;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  padding-top: 15px;
`;

export const Info = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: flex-start;
  padding-left: 10px;
  padding-top: 15px;
`;

export const TextMeetup = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: #999;
`;

export const ActionButton = styled(Button)`
  align-self: center;
  width: 80%;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  background: #d44059;
`;
