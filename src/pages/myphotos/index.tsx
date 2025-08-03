import * as React from 'react';
import Layout from '@/components/ui/layout';

interface MyPhotoProps {

}

const MyPhotoProps: React.FunctionComponent<MyPhotoProps> = (props) => {
  return (
    <Layout>
      <div>My Photos</div>
    </Layout>
  )
}

export default MyPhotoProps;