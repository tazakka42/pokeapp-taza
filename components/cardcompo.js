import React from 'react';
import {VStack, Box, Divider, Image} from 'native-base';

export default function Pokecard({data}) {
  const number = data.url
    .split('/')
    .filter(segment => segment !== '')
    .pop();

  return (
    <Box border="1" borderRadius="md">
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            '' + number
          }.png`,
        }}
        alt="Alternate Text"
        size="md"
      />
      <Box px="4">{capitalizeFirstLetter(data.name)}</Box>
    </Box>
  );
}
function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}
