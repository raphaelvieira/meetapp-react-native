import React, { useMemo } from 'react';

import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
// import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';

import Icon from 'react-native-vector-icons/MaterialIcons';
import meetupLogo from '~/assets/meetup.png';

import {
  Container,
  MeetupImage,
  Info,
  Title,
  TextMeetup,
  ActionButton,
} from './styles';

export default function Meetup({ data, onSubscribe, onCancel }) {
  const dateFormatted = useMemo(
    () => format(parseISO(data.date), 'MMMM, d, hh:mm aa', { locale: en }),
    [data.date]
  );

  return (
    <Container past={data.past}>
      {data.file ? (
        <MeetupImage
          source={{
            uri: data.file.url,
          }}
        />
      ) : (
        <MeetupImage source={meetupLogo} />
      )}

      <Title>{data.title}</Title>

      <Info>
        <Icon name="place" size={20} color="#999" />
        <TextMeetup>{data.location}</TextMeetup>
      </Info>
      <Info>
        <Icon name="date-range" size={20} color="#999" />
        <TextMeetup>{dateFormatted}</TextMeetup>
      </Info>
      <Info>
        <Icon name="perm-identity" size={20} color="#999" />
        <TextMeetup>
          Organizer:
          {data.user.name}
        </TextMeetup>
      </Info>
      {!data.past && (
        <ActionButton onPress={onSubscribe || onCancel}>
          {onSubscribe ? 'Subscribe' : 'Cancel Subscription'}
        </ActionButton>
      )}
    </Container>
  );
}
Meetup.defaultProps = {
  data: [],
  onSubscribe: null,
  onCancel: null,
};
Meetup.propTypes = {
  data: PropTypes.oneOfType(Object),
  onSubscribe: PropTypes.func,
  onCancel: PropTypes.func,
};
