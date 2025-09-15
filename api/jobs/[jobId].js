// Vercel serverless function for job status
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { jobId } = req.query;
      
      // Mock job response
      const response = {
        id: jobId,
        status: 'succeeded',
        logs: [
          'Planning project architecture...',
          'Creating repository structure...',
          'Generating UI components...',
          'Deploying to Vercel...',
          'Project completed successfully!'
        ],
        plan: {
          goal: 'Create a website',
          assumptions: ['Using Next.js', 'Deploying to Vercel'],
          steps: ['Plan', 'Scaffold', 'Generate', 'Deploy']
        },
        output: {
          repo: {
            pr_url: 'https://github.com/saapai/dream/pull/1'
          },
          deploy: {
            production_url: 'https://dream-dream.vercel.app',
            preview_url: 'https://dream-dream-git-dreame-4fffcc-saathvikpai817-gmailcoms-projects.vercel.app'
          }
        }
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to fetch job status',
        details: error.message 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
