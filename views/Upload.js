import {Input, Button, Text, Card} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';

const Upload = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: '', description: ''},
  });

  const pickImage = () => {};

  return (
    <Card>
      <Card.Image source={{uri: 'https://placekitten.com/300'}} />
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

      <Button title="Select media" onPress={pickImage} />

      <Button title="Upload media" />
    </Card>
  );
};

export default Upload;
