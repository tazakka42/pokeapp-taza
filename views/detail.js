import React from 'react';
import {
  ActivityIndicator,
  Button,
  View as Viewr,
  ToastAndroid,
} from 'react-native';
import {VStack, Box, Divider, View, Text, Image, Center} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {getPokemonDetail} from '../api/pokemon';
import useSelectedPokemon from '../context/pokecompare';

export default function DetailScreen({closeModal, selecteddata}) {
  const [data, setdata] = React.useState({});
  const {setfirst, setsec} = useSelectedPokemon();
  const {
    isLoading,
    data: responseData,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['dataExplore'],
    queryFn: () => getPokemonDetail(selecteddata.number),
  });

  React.useEffect(() => {
    if (responseData?.data) {
      setdata(responseData?.data);
    }
  }, [responseData]);

  return (
    <Box border="1" borderRadius="md">
      {isFetching ? (
        <View />
      ) : (
        <Center>
          <VStack space="4" divider={<Divider />}>
            <Box px="4" pt="4">
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    '' + selecteddata.number
                  }.png`,
                }}
                alt="Alternate Text"
                size="xl"
              />
              <Text>{selecteddata.name}</Text>
              <Text>
                Height: {data?.height} Weight: {data?.weight}
              </Text>
              <Text>
                Types: {data?.types?.map(dt => dt.type.name).join(',')}
              </Text>
              <Text>Stats</Text>
              {data?.stats?.map(dt => {
                return (
                  <Text key={dt.stat.name}>
                    {dt.stat.name}: {dt.base_stat}
                  </Text>
                );
              })}
            </Box>
            <Viewr
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                title="Compare Slot 1"
                onPress={() => {
                  setfirst({...data, numberP: selecteddata.number});
                  ToastAndroid.show('data set slot 1', ToastAndroid.SHORT);
                }}
                style={{marginRight: 3}}
              />
              <Button
                title="Compare Slot 2"
                onPress={() => {
                  setsec({...data, numberP: selecteddata.number});
                  ToastAndroid.show('data set slot 2', ToastAndroid.SHORT);
                }}
                style={{marginLeft: 3}}
              />
            </Viewr>
          </VStack>
        </Center>
      )}
    </Box>
  );
}
