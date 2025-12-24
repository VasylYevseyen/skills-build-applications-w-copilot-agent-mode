import { useEffect, useState } from 'react';

import { getApiBase, normalizeListResponse } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const endpoint = `${getApiBase()}/workouts/`;

  useEffect(() => {
    console.log('[Workouts] REST endpoint:', endpoint);
    setLoading(true);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('[Workouts] fetched data:', data);
        setWorkouts(normalizeListResponse(data));
        setError('');
      })
      .catch((e) => {
        console.log('[Workouts] fetch error:', e);
        setError(String(e));
        setWorkouts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h1 className="h5 mb-0">Workouts</h1>
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
                  <th scope="col">Suggested For</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : workouts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-muted">
                      No workouts found.
                    </td>
                  </tr>
                ) : (
                  workouts.map((w) => (
                    <tr key={w.id ?? w.name}>
                      <td className="text-muted">{w.id}</td>
                      <td>{w.name}</td>
                      <td>{w.suggested_for}</td>
                      <td>{w.description}</td>
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
