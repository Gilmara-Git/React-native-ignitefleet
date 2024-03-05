import React from 'react';
import { Container , Title } from './styles';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { useTheme } from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type CheckOutInHeaderProps = {
  title: string
}

export function CheckOutInHeader( {title}: CheckOutInHeaderProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 42; 
  const { goBack } = useNavigation();
  const theme = useTheme();

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} color={theme.COLORS.BRAND_LIGHT}/>
      </TouchableOpacity>

      <Title>
          {title}
      </Title>

    </Container>
  );
}