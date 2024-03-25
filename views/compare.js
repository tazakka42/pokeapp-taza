import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import useSelectedPokemon from '../context/pokecompare';
import {VStack, Box, Divider, Center, Image} from 'native-base';
import {BarChart} from 'react-native-gifted-charts';

export default function CompareScreen() {
  const {firstPoke, secPoke} = useSelectedPokemon();
  if (JSON.stringify(firstPoke) != '{}') {
    if (JSON.stringify(secPoke) != '{}') {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      '' + firstPoke?.numberP
                    }.png`,
                  }}
                  alt="IMG"
                  size="xl"
                />
                <Text>{firstPoke?.name}</Text>
              </View>
              <View>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      '' + secPoke?.numberP
                    }.png`,
                  }}
                  alt="IMG"
                  size="xl"
                />
                <Text>{secPoke?.name}</Text>
              </View>
            </View>
            <View>
              <GroupedBars data1={firstPoke} data2={secPoke} />
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View>
          <Center>
            <Text>Silahkan pilih 2 pokemon</Text>
          </Center>
        </View>
      );
    }
  } else {
    return (
      <View>
        <Center>
          <Text>Silahkan pilih 2 pokemon</Text>
        </Center>
      </View>
    );
  }
}

const GroupedBars = ({data1, data2}) => {
  const barData = [
    {
      value: data1?.stats[0]?.base_stat,
      label: data1?.stats[0]?.stat?.name,
      spacing: 2,
      labelWidth: 32,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: data2?.stats[0]?.base_stat, frontColor: '#ED6665'},
    {
      value: data1?.stats[1]?.base_stat,
      label: data1?.stats[1]?.stat?.name,
      spacing: 2,
      labelWidth: 32,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: data2?.stats[1]?.base_stat, frontColor: '#ED6665'},
    {
      value: data1?.stats[2]?.base_stat,
      label: data1?.stats[2]?.stat?.name,
      spacing: 2,
      labelWidth: 32,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: data2?.stats[2]?.base_stat, frontColor: '#ED6665'},
    {
      value: data1?.stats[3]?.base_stat,
      label: data1?.stats[3]?.stat?.name,
      spacing: 2,
      labelWidth: 32,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: data2?.stats[3]?.base_stat, frontColor: '#ED6665'},
    {
      value: data1?.stats[4]?.base_stat,
      label: data1?.stats[4]?.stat?.name,
      spacing: 2,
      labelWidth: 32,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: data2?.stats[4]?.base_stat, frontColor: '#ED6665'},
    {
      value: data1?.stats[5]?.base_stat,
      label: data1?.stats[5]?.stat?.name,
      spacing: 2,
      labelWidth: 32,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: data2?.stats[5]?.base_stat, frontColor: '#ED6665'},
  ];

  const renderTitle = () => {
    return (
      <View style={{marginVertical: 30}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          STATS
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 24,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#177AD5',
                marginRight: 8,
              }}
            />

            <Text
              style={{
                width: 60,
                height: 16,
              }}>
              {data1?.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#ED6665',
                marginRight: 8,
              }}
            />

            <Text
              style={{
                width: 60,
                height: 16,
              }}>
              {data2?.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingBottom: 40,
        borderRadius: 10,
      }}>
      {renderTitle()}

      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        //yAxisTextStyle={{color: 'gray'}}
        noOfSections={3}
        //maxValue={75}
      />
    </View>
  );
};
