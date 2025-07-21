import { createVideo } from '../api';
import colors from '../colors';
import { Alert, Button, Field, Heading, Input, Link, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    form: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = (formData.get('title') as string).trim();
    const tags = (formData.get('tags') as string).trim();
    const formattedTags = tags ? tags.split(',').map((tag) => tag.trim()) : [];
    const thumbnail = (formData.get('thumbnail') as string).trim();
    if (!title) {
      setErrors({
        ...errors,
        title: 'Title is required',
      });
      return;
    }
    setLoading(true);

    createVideo({ title, tags: formattedTags, thumbnail_url: thumbnail })
      .then(() => {
        setSuccess('Video created successfully!');
        form.reset();
      })
      .catch((error) => {
        setErrors({
          ...errors,
          form: error.message || 'An error occurred while creating the video',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onAnyInputChange = () => {
    setErrors({ form: '', title: '' });
    setSuccess('');
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Heading size={'3xl'}>Create a New Video</Heading>
      <form onSubmit={handleSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.title}>
            <Field.Label>Video Title [min 3 characters]</Field.Label>
            <Input placeholder="Enter your video title" name="title" onChange={onAnyInputChange} />
            <Field.ErrorText>{errors.title}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Tags [separated by ,] (optional)</Field.Label>
            <Input placeholder="Enter your video tags" name="tags" onChange={onAnyInputChange} />
          </Field.Root>

          <Field.Root>
            <Field.Label>Thumbnail url (optional)</Field.Label>
            <Input
              placeholder="Enter your thumbnail url"
              name="thumbnail"
              onChange={onAnyInputChange}
            />
          </Field.Root>

          <Button type="submit" bgColor={colors.azure} loading={loading} disabled={loading}>
            Create Video
          </Button>
        </Stack>
      </form>

      {success && (
        <Alert.Root status="success" style={{ maxWidth: 600 }}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{success}</Alert.Title>
            <Alert.Description>
              You can now view it in your <Link href="/videos">VEED FEED</Link>.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      {errors.form && (
        <Alert.Root status="error" style={{ maxWidth: 600 }}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{errors.form}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}

      <Link href="/" color="gray">
        Home
      </Link>
    </div>
  );
};

export default CreatePage;
