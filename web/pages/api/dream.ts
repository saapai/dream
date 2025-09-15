import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const prompt = req.body.prompt || 'Create a website';
    const jobId = `job_${Date.now()}`;
    
    // Return mock job data for now
    const mockData = {
      id: jobId,
      status: 'completed',
      logs: [
        'Planning project architecture...',
        'Creating repository structure...',
        'Generating UI components...',
        'Deploying to Vercel...',
        'Project completed successfully!'
      ],
      plan: {
        goal: prompt,
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
    console.error('Error creating project:', error);
    res.status(500).json({ 
      error: 'Failed to create project',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
