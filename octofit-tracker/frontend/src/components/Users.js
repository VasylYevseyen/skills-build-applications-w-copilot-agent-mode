import { useEffect, useState } from 'react';

import { normalizeListResponse } from '../api';

function getEndpoint() {
  const configured = process.env.REACT_APP_CODESPACE_NAME;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferred = hostname.match(/^(.+)-3000\.app\.github\.dev$/)?.[1];
  const codespaceName = configured || inferred;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`;
  }

  return 'http://localhost:8000/api/users/';
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const endpoint = getEndpoint();

  useEffect(() => {
    console.log('[Users] REST endpoint:', endpoint);
    setLoading(true);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('[Users] fetched data:', data);
        setUsers(normalizeListResponse(data));
        setError('');
      })
      .catch((e) => {
        console.log('[Users] fetch error:', e);
        setError(String(e));
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h1 className="h5 mb-0">Users</h1>
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-muted">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id ?? u.email}>
                      <td className="text-muted">{u.id}</td>
                      <td>{u.name}</td>
                      <td>
                        <a className="link-primary" href={`mailto:${u.email}`}>
                          {u.email}
                        </a>
                      </td>
                      <td>{u.team}</td>
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
