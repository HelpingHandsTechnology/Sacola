import React from 'react';
import { View } from 'react-native';
import { Row } from 'design';
import { GreetingComponent } from './GreetingComponent';
import { HomeFirstLetterUserComponent } from './HomeFirstLetterUserComponent';
import { HomeAddLinkButton } from './HomeAddLinkButton';

export const HomeTopCard = () => {
  return (
    <View className="py-4 bg-white rounded-lg mb-8 content-between items-center flex-row">
      <GreetingComponent />
      <Row>
        <HomeAddLinkButton xClassName="mr-2" />
        <HomeFirstLetterUserComponent />
      </Row>
    </View>
  );
};
