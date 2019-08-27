import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import { Container, Title, List } from './styles';

function Subscription({ isFocused }) {
  const [subscriptions, setSubscription] = useState([]);

  async function loadSubscription() {
    const response = await api.get('subscriptions');
    setSubscription(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscription();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      Alert.alert(
        'Success',
        'You have cancelled your subscription for this meetup!'
      );
      loadSubscription();
    } catch (error) {
      Alert.alert(
        'Error to Cancel',
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
        <Title> Subscriptions</Title>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup onCancel={() => handleCancel(item.id)} data={item.Meetup} />
          )}
        />
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscription.navigationOptions = {
  tabBarLabel: 'Subscription',
  tabBarIcon: TabBarIcon,
};
Subscription.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscription);
