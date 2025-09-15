import React from 'react';

export default function JobStatus({ job }: { job?: any }) {
  if (!job) return null;
  return (
    <div style={{border:'1px solid #ddd', borderRadius:8, padding:16, marginTop:16}}>
      <div><strong>Job:</strong> {job.id}</div>
      <div><strong>Status:</strong> {job.status}</div>
      <div style={{marginTop:8}}>
        <strong>Logs</strong>
        <pre style={{whiteSpace:'pre-wrap'}}>{(job.logs || []).join('\n')}</pre>
      </div>
      {job.output?.deploy?.preview_url && (
        <div style={{marginTop:8}}>
          <a href={job.output.deploy.preview_url} target="_blank" rel="noreferrer">
            Preview
          </a>
        </div>
      )}
    </div>
  );
}
