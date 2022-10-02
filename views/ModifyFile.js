import {Input, Button, Text, Card} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import {Alert, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {mediaUrl} from '../utils/variables';
import FullSizeImage from '../components/FullSizeImage';
import {Video} from 'expo-av';

const ModifyFile = ({navigation, route}) => {
  const file = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const {putMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: file.title, description: file.description},
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(token, data, file.file_id);
      console.log('onSubmit modify file', response);
      Alert.alert(response.message, '', [
        {
          text: 'Ok',
          onPress: () => {
            setUpdate(!update);
            // navigation.navigate('MyFiles');
          },
        },
      ]);
    } catch (error) {
      console.error('onSubmit modify file failed', error);
      // TODO: add error user notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      {file.media_type === 'image' ? (
        <FullSizeImage
          source={{uri: mediaUrl + file.filename}}
          PlaceholderContent={<ActivityIndicator />}
          style={{marginBottom: 12}}
        />
      ) : (
        // use Card.Image as a hack to fix card not stretching
        <>
          <Card.Image
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
            }}
          >
            <Video
              source={{uri: mediaUrl + file.filename}}
              style={{width: '100%', height: '100%'}}
              onError={(error) => {
                console.log('Video error:', error);
              }}
              shouldPlay
              useNativeControls
              isLooping
            />
          </Card.Image>
          <Card.Divider />
        </>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
            autoCapitalize="words"
            errorMessage={
              (errors.title?.type === 'required' && (
                <Text>This is required.</Text>
              )) ||
              (errors.title?.type === 'minLength' && <Text>Min 3 chars!</Text>)
            }
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
          />
        )}
        name="description"
      />

      <Button
        title="Update"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

ModifyFile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ModifyFile;
