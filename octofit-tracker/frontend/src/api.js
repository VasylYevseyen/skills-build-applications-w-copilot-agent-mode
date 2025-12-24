export function getApiBase() {
  const configured = process.env.REACT_APP_CODESPACE_NAME;

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferred = hostname.match(/^(.+)-3000\.app\.github\.dev$/)?.[1];

  const codespaceName = configured || inferred;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}
