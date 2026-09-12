import { ApiMetadata } from '../types/api';

export const API_CATALOG: ApiMetadata[] = [
  {
    slug: 'vibe',
    name: 'Vibe Oracle (വൈബ് ഒറാക്കിൾ)',
    method: 'GET',
    endpoint: '/api/v1/vibe',
    tagline: 'Find out whether today is giving pani or peace.',
    description: 'Kaavile paattu malsaram kazhinjo? Returns real-time metaphysical git rebase diagnostics, frequency harmonics, chaos levels, and completely unhinged lifestyle advice.',
    category: 'Spiritual Diagnostics',
    explanation: 'Evaluates your code karma and astrologically predicts whether your next push will trigger a production fire.',
    requiredInput: 'None. Just ambient Malayalam existential dread.',
    uselessnessScore: 99.8,
    queryParams: [],
    exampleRequest: {
      curl: 'curl -X GET "https://hell-yeah-useless-api.onrender.com/api/v1/vibe" \\\n  -H "X-API-Key: uk_live_sample"'
    },
    exampleResponse: {
      vibe: "Git Rebase Despair",
      energy: "Sub-zero (13.37 Hz)",
      chaos: "99.9%",
      recommendation: "Delete the repo and claim your hard drive experienced spontaneous combustion.",
      uselessness_score: 99.8,
      timestamp: "2026-09-12T07:25:50.933Z",
      version: "v1.0.0"
    }
  },
  {
    slug: 'motivation',
    name: 'Motivation Oracle (എന്തിനാ മോട്ടിവേഷൻ?)',
    method: 'GET',
    endpoint: '/api/v1/motivation',
    tagline: 'Enterprise-grade demotivation nobody requested.',
    description: 'Provides razor-sharp, fatalistic truths about software engineering, dead sprint goals, and the illusion that sprint retrospectives accomplish anything.',
    category: 'Manavalan Therapy',
    explanation: 'Designed by senior Malayali developers to dissolve optimism before sprint planning meetings.',
    requiredInput: 'None. Reality is 100% free.',
    uselessnessScore: 98.9,
    queryParams: [],
    exampleRequest: {
      curl: 'curl -X GET "https://hell-yeah-useless-api.onrender.com/api/v1/motivation" \\\n  -H "X-API-Key: uk_live_sample"'
    },
    exampleResponse: {
      motivation: 5,
      message: "There are two hard problems in CS: cache invalidation, naming things, and believing your sprint will finish on time.",
      confidence: 0.02,
      honesty: "Surgical",
      uselessness_score: 98.9,
      timestamp: "2026-09-12T07:25:53.219Z",
      version: "v1.0.0"
    }
  },
  {
    slug: 'necessity',
    name: 'Necessity Oracle (ഇത് വേണമായിരുന്നോ?)',
    method: 'GET',
    endpoint: '/api/v1/necessity',
    tagline: 'Find out whether your idea should exist.',
    description: 'Thilakan-level algorithmic critique proving why your proposed software project or 45-minute standup is strictly superfluous to the universe.',
    category: 'Existential Audit',
    explanation: 'Runs parallel universe simulations comparing human civilization with and without your feature, concluding with mathematically sound dismissals.',
    requiredInput: "Query parameter 'thing' (string)",
    uselessnessScore: 99.7,
    queryParams: [
      {
        name: 'thing',
        type: 'string',
        required: true,
        description: 'The concept, application, or meeting to evaluate for existential relevance.',
        example: 'another todo app'
      }
    ],
    exampleRequest: {
      curl: 'curl -X GET "https://hell-yeah-useless-api.onrender.com/api/v1/necessity?thing=another%20todo%20app" \\\n  -H "X-API-Key: uk_live_sample"'
    },
    exampleResponse: {
      thing: "another todo app",
      necessity_score: 2,
      verdict: "Strictly unnecessary. Please stop.",
      reason: "A single bash script written in 2004 could replace this entire venture capital funded entity.",
      confidence: 0.99,
      uselessness_score: 99.7,
      timestamp: "2026-09-12T07:25:55.789Z",
      version: "v1.0.0"
    }
  },
  {
    slug: 'decision',
    name: 'Decision Engine (തീരുമാനം ആയോ?)',
    method: 'POST',
    endpoint: '/api/v1/decision',
    tagline: 'Because making your own decisions is apparently too difficult.',
    description: 'Accepts existential engineering dilemmas and outputs an unyielding, mathematically unsupported decision with aggressive rationales.',
    category: 'Algorithmic Arbitrage',
    explanation: 'Eliminates developer decision paralysis by outsourcing personal responsibility to an uncalibrated deterministic pseudo-randomizer.',
    requiredInput: 'JSON object with a "question" string.',
    uselessnessScore: 98.6,
    requestBodyFields: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: 'The dilemma or question demanding unyielding resolution.',
        example: 'Should I order biriyani?'
      }
    ],
    exampleRequest: {
      curl: 'curl -X POST "https://hell-yeah-useless-api.onrender.com/api/v1/decision" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"question": "Should I order biriyani?"}\'',
      body: { question: "Should I order biriyani?" }
    },
    exampleResponse: {
      question: "Should I order biriyani?",
      decision: "YES",
      confidence: 0.99,
      reason: "Biochemical entropy demands immediate indulgence. Resistance is mathematically futile.",
      risk_level: "High (Potential Food Coma)",
      uselessness_score: 98.6,
      timestamp: "2026-09-12T07:25:58.380Z",
      version: "v1.0.0"
    }
  },
  {
    slug: 'roast',
    name: 'Tech Stack Roaster (റോസ്റ്റിംഗ് ചേട്ടൻ)',
    method: 'POST',
    endpoint: '/api/v1/roast',
    tagline: 'Submit your stack. Receive emotional damage.',
    description: 'Accepts developer claims, tech stacks, or ambitious timelines and delivers a severe, unvarnished Malayali review.',
    category: 'Code Review & Kunjappan',
    explanation: 'Trained on 15 years of frustrated pull-request comments, HN arguments, and compiler crash logs.',
    requiredInput: 'JSON object with a "text" string.',
    uselessnessScore: 99.1,
    requestBodyFields: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: 'The boast, code claim, or tech stack to ruthlessly dismantle.',
        example: 'I will finish my project tonight.'
      }
    ],
    exampleRequest: {
      curl: 'curl -X POST "https://hell-yeah-useless-api.onrender.com/api/v1/roast" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"text": "I will finish my project tonight."}\'',
      body: { text: "I will finish my project tonight." }
    },
    exampleResponse: {
      input: "I will finish my project tonight.",
      roast: "You introduced Kubernetes microservices for an application that has fewer concurrent users than your bathroom.",
      severity: "Total System Meltdown",
      uselessness_score: 99.1,
      timestamp: "2026-09-12T07:26:01.053Z",
      version: "v1.0.0"
    }
  },
  {
    slug: 'excuse',
    name: 'Excuse Generator (അണ്ണാ... ഒരു ന്യായീകരണം)',
    method: 'POST',
    endpoint: '/api/v1/excuse',
    tagline: 'Enterprise-grade plausible deniability.',
    description: 'Generates technically convoluted, unfalsifiable developer excuses to deflect blame for broken staging, dropped schemas, or missing features.',
    category: 'Standup Defense',
    explanation: 'Formulates excuses using high-density distributed systems jargon calculated to silence non-technical scrum masters instantly.',
    requiredInput: 'JSON object with a "situation" string.',
    uselessnessScore: 97.9,
    requestBodyFields: [
      {
        name: 'situation',
        type: 'string',
        required: true,
        description: 'The failure condition requiring immediate blame deflection.',
        example: 'missed a deadline'
      }
    ],
    exampleRequest: {
      curl: 'curl -X POST "https://hell-yeah-useless-api.onrender.com/api/v1/excuse" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"situation": "missed a deadline"}\'',
      body: { situation: "missed a deadline" }
    },
    exampleResponse: {
      situation: "missed a deadline",
      excuse: "The build failed because node_modules exceeded the gravitational Schwarzschild radius of macOS.",
      believability: "84.7% among senior architects",
      uselessness_score: 97.9,
      timestamp: "2026-09-12T07:26:04.680Z",
      version: "v1.0.0"
    }
  }
];

export function getApiBySlug(slug: string): ApiMetadata | undefined {
  return API_CATALOG.find((api) => api.slug.toLowerCase() === slug.toLowerCase());
}
