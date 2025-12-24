import { useEffect, useState } from 'react';

import { normalizeListResponse } from '../api';

function getEndpoint() {
  const configured = process.env.REACT_APP_CODESPACE_NAME;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferred = hostname.match(/^(.+)-3000\.app\.github\.dev$/)?.[1];
  const codespaceName = configured || inferred;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
  }

  return 'http://localhost:8000/api/leaderboard/';
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const endpoint = getEndpoint();

  useEffect(() => {
    console.log('[Leaderboard] REST endpoint:', endpoint);
    setLoading(true);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('[Leaderboard] fetched data:', data);
        setEntries(normalizeListResponse(data));
        setError('');
      })
      .catch((e) => {
        console.log('[Leaderboard] fetch error:', e);
        setError(String(e));
        setEntries([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h1 className="h5 mb-0">Leaderboard</h1>
          <a className="link-secondary small" href={endpoint} target="_blank" rel="noreferrer">
            API endpoint
          </a>
        </div>
        <div className="card-body">
          {error ? <div className="alert alert-danger mb-3">{error}</div> : null}

          <div className="table-responsive">
            <table className="table table-striped table-hover table-sm align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col" className="text-end">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-muted">
                      No leaderboard entries found.
                    </td>
                  </tr>
                ) : (
                  entries.map((e) => (
                    <tr key={e.id ?? `${e.user}-${e.score}`}>
                      <td className="text-muted">{e.id}</td>
                      <td>{e.user}</td>
                      <td className="text-end">{e.score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
