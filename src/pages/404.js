import React from 'react';

import Layout from '../layout';
import { Seo } from '../components/seo';

function NotFoundPage() {
  return (
    <Layout>
      <h1>404: Not Found</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
    </Layout>
  );
}

export default NotFoundPage;

export function Head() {
  return <Seo title="404: Not found" />;
}
