/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Pressable,
  Modal,
} from 'react-native';

import {useQuery} from '@tanstack/react-query';
import {getPokemon} from '../api/pokemon';
import Pokecard from '../components/cardcompo';
import DetailScreen from './detail';

export default function HomeScreen() {
  const [filter, setfilter] = React.useState({
    offset: '0',
    limit: '25',
  });
  const [data, setdata] = React.useState([]);
  const [selecteddata, setselecteddata] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  const {
    isLoading,
    data: responseData,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['dataExplore'],
    queryFn: () => getPokemon(filter),
  });

  React.useEffect(() => {
    if (responseData?.data?.results) {
      setdata(responseData?.data?.results);
    }
  }, [responseData]);

  React.useEffect(() => {
    refetch();
  }, [filter]);

  const nextPage = () => {
    const currentoffset = filter.offset;
    setfilter({...filter, offset: currentoffset + 25});
  };
  const prevPage = () => {
    const currentoffset = filter.offset;
    if (filter.offset == 0) {
    } else {
      setfilter({...filter, offset: currentoffset - 25});
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <View>
          <Text> PokeApp - Tazakka Ria Ramadhan</Text>
        </View>
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                data.map(dt => {
                  return (
                    <Pressable
                      key={dt?.name}
                      onPress={() => {
                        const number = dt.url
                          .split('/')
                          .filter(segment => segment !== '')
                          .pop();
                        setselecteddata({number, ...dt});
                        setModalVisible(true);
                      }}>
                      <Pokecard data={dt} />
                    </Pressable>
                  );
                })
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
              }}>
              <Button title="<" onPress={prevPage} />
              <Button title=">" onPress={nextPage} />
            </View>
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DetailScreen
              closeModal={() => {
                setModalVisible(!modalVisible);
              }}
              selecteddata={selecteddata}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
