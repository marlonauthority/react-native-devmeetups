import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Wrapper,
  Container,
  Banner,
  Info,
  Title,
  Schedule,
  ScheduleText,
  Place,
  PlaceText,
  Owner,
  OwnerText,
  TitleButton,
} from './styles';

export default function Subscription({ data, cancelSubscription }) {
  const dateFormatted = useMemo(() => {
    return format(parseISO(data.meetup.date), "dd 'de' MMMM', às ' HH:mm'", {
      locale: pt,
    });
  }, [data.meetup.date]);

  return (
    <Wrapper>
      <Banner
        source={{
          uri: data.meetup.banner.id
            ? data.meetup.banner.url
            : 'https://picsum.photos/id/992/940/300',
        }}
      />
      <Container>
        <Info>
          <Title>{data.meetup.title}</Title>
          <Schedule>
            <Icon name="event" size={14} color="#999" />
            <ScheduleText>{dateFormatted}</ScheduleText>
          </Schedule>
          <Place>
            <Icon name="place" size={14} color="#999" />
            <PlaceText>{data.meetup.location}</PlaceText>
          </Place>
          <Owner>
            <Icon name="person" size={14} color="#999" />
            <OwnerText>Organizador: {data.user.name}</OwnerText>
          </Owner>
        </Info>

        <TitleButton onPress={cancelSubscription}>
          Cancelar inscrição
        </TitleButton>
      </Container>
    </Wrapper>
  );
}
Subscription.propTypes = {
  cancelSubscription: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
Subscription.defaultProps = {
  cancelSubscription: PropTypes.func,
};
