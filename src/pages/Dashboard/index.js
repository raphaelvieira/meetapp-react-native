import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import { Container, Title, List } from './styles';
import DateInput from '~/components/DateInput';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());

  const [meetups, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('meetups', {
        params: {
          date,
        },
      });
      setMeetup(response.data);
    }
    if (isFocused) {
      loadMeetup();
    }
  }, [isFocused, date]);

  async function handleSubscribe(id) {
    try {
      await api.post(`subscriptions`, {
        meetup_id: id,
      });
      Alert.alert('Success', 'You have subscribed to this Meetup!');
    } catch (error) {
      Alert.alert(
        'Error to Subscribe',
        `${
          error.response.data.error.message
            ? error.response.data.error.message
            : error.response.data.error
        }`
      );
    }
  }

  return (
    <Background showLogo>
      <Container>
        <Title> Meetups</Title>
        <DateInput date={date} onChange={setDate} />
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup onSubscribe={() => handleSubscribe(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="list" size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: TabBarIcon,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
