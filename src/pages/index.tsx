import { useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): JSX.Element {
  const docsPath = useBaseUrl('/docs');

  useEffect(() => {
    window.location.href = docsPath;
  }, []);

  return null;
}
