import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { jobId } = req.query;

  if (!jobId || typeof jobId !== 'string') {
    return res.status(400).json({ error: 'Job ID is required' });
  }

  try {
    // Return mock completed job data
    const mockData = {
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
    
    res.status(200).json(mockData);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ 
      error: 'Failed to fetch job status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
