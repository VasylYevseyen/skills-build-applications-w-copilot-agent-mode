import { useEffect, useState } from 'react';

import { getApiBase, normalizeListResponse } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const endpoint = `${getApiBase()}/activities/`;

  useEffect(() => {
    console.log('[Activities] REST endpoint:', endpoint);
    setLoading(true);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('[Activities] fetched data:', data);
        setActivities(normalizeListResponse(data));
        setError('');
      })
      .catch((e) => {
        console.log('[Activities] fetch error:', e);
        setError(String(e));
        setActivities([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h1 className="h5 mb-0">Activities</h1>
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
                  <th scope="col">Type</th>
                  <th scope="col" className="text-end">
                    Duration (min)
                  </th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : activities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-muted">
                      No activities found.
                    </td>
                  </tr>
                ) : (
                  activities.map((a) => (
                    <tr key={a.id ?? `${a.user}-${a.type}-${a.date}`}>
                      <td className="text-muted">{a.id}</td>
                      <td>{a.user}</td>
                      <td>{a.type}</td>
                      <td className="text-end">{a.duration}</td>
                      <td>{a.date}</td>
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
