import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  async function loadMoreMeetups(_page = 1) {
    const response = await api.get('meetups', {
      params: {
        date,
        page: _page,
      },
    });
    setMeetup(_page >= 2 ? [...meetups, ...response.data] : response.data);
    setPage(_page);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    async function loadMeetups(_page = 1) {
      const response = await api.get('meetups', {
        params: {
          date,
          _page,
        },
      });
      setMeetup(response.data);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]);

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMoreMeetups(nextPage);
  }

  function refreshList() {
    setRefreshing(true);
    setMeetup([]);
    loadMoreMeetups();
  }

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
        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <List
            onRefresh={refreshList} // function triggered when user slide the list down
            refreshing={refreshing} // variable state true/false for check if list is updating
            onEndReachedThreshold={0.01} // function to load when reach 1% of items limit
            onEndReached={loadMore} // function to load more items
            loading={loading}
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onSubscribe={() => handleSubscribe(item.id)}
                data={item}
              />
            )}
          />
        )}
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
