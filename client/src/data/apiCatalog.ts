import { ApiMetadata } from '../types/api';

export const API_CATALOG: ApiMetadata[] = [
  {
    slug: 'vibe',
    name: 'Vibe API',
    method: 'GET',
    endpoint: '/api/v1/vibe',
    tagline: 'Because your codebase deserves a spiritual assessment.',
    description: 'Returns an intentionally useless developer vibe analysis, frequency harmonic, chaos quotient, and unwarranted recommendations.',
    category: 'Spiritual Assessment',
    explanation: 'Leverages quantum pseudorandomness to assess the metaphysical state of your git repository, developer aura, and astrological build risks.',
    requiredInput: 'None. Just ambient despair.',
    uselessnessScore: 99.8,
    queryParams: [],
    exampleRequest: {
      curl: 'curl -X GET "https://api.uselessapi.dev/api/v1/vibe" \\\n  -H "X-API-Key: uk_live_sample"'
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
    name: 'Motivation API',
    method: 'GET',
    endpoint: '/api/v1/motivation',
    tagline: 'Brutal honesty, available over HTTP.',
    description: 'Provides razor-sharp, demotivating truths about software engineering, dead sprint goals, and the illusion of control.',
    category: 'Developer Therapy',
    explanation: 'Designed to disabuse engineers of misplaced optimism before major product deployments or architecture review meetings.',
    requiredInput: 'None. Reality is free.',
    uselessnessScore: 98.9,
    queryParams: [],
    exampleRequest: {
      curl: 'curl -X GET "https://api.uselessapi.dev/api/v1/motivation" \\\n  -H "X-API-Key: uk_live_sample"'
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
    name: 'Necessity API',
    method: 'GET',
    endpoint: '/api/v1/necessity',
    tagline: 'Find out whether your idea should exist.',
    description: 'Rigorous algorithmic proof explaining why your proposed software project or dependency is strictly non-essential.',
    category: 'Product Validation',
    explanation: 'Runs multi-universe simulations comparing human flourishing with and without your feature, concluding with mathematically sound dismissals.',
    requiredInput: "Query parameter 'thing' (string)",
    uselessnessScore: 99.7,
    queryParams: [
      {
        name: 'thing',
        type: 'string',
        required: true,
        description: 'The concept, package, or application to evaluate for existential relevance.',
        example: 'another todo app'
      }
    ],
    exampleRequest: {
      curl: 'curl -X GET "https://api.uselessapi.dev/api/v1/necessity?thing=another%20todo%20app" \\\n  -H "X-API-Key: uk_live_sample"'
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
    name: 'Decision API',
    method: 'POST',
    endpoint: '/api/v1/decision',
    tagline: 'Definitive answers to trivial dilemmas.',
    description: 'Accepts difficult existential choices and outputs an unyielding, mathematically unsupported decision with confident rationales.',
    category: 'Algorithmic Arbitrage',
    explanation: 'Eliminates decision paralysis by outsourcing personal agency to an uncalibrated deterministic pseudo-randomizer.',
    requiredInput: 'JSON object with a "question" string.',
    uselessnessScore: 98.6,
    requestBodyFields: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: 'The binary dilemma or query demanding unyielding resolution.',
        example: 'Should I order biriyani?'
      }
    ],
    exampleRequest: {
      curl: 'curl -X POST "https://api.uselessapi.dev/api/v1/decision" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"question": "Should I order biriyani?"}\'',
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
    name: 'Roast API',
    method: 'POST',
    endpoint: '/api/v1/roast',
    tagline: 'Automated code and life review with extreme prejudice.',
    description: 'Accepts developer plans, code snippets, or optimistic timelines and returns a severe, technical roast.',
    category: 'Code Review',
    explanation: 'Trained on 15 years of frustrated pull-request comments, HN debates, and compiler error logs.',
    requiredInput: 'JSON object with a "text" string.',
    uselessnessScore: 99.1,
    requestBodyFields: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: 'The statement, boast, or code claim to ruthlessly dismantle.',
        example: 'I will finish my project tonight.'
      }
    ],
    exampleRequest: {
      curl: 'curl -X POST "https://api.uselessapi.dev/api/v1/roast" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"text": "I will finish my project tonight."}\'',
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
    name: 'Excuse API',
    method: 'POST',
    endpoint: '/api/v1/excuse',
    tagline: 'Enterprise-grade plausible deniability.',
    description: 'Generates technically convoluted, unfalsifiable developer excuses for missed deadlines, broken builds, and outages.',
    category: 'Ops & Compliance',
    explanation: 'Formulates excuses using high-density distributed systems jargon calculated to silence non-technical stakeholders instantly.',
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
      curl: 'curl -X POST "https://api.uselessapi.dev/api/v1/excuse" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"situation": "missed a deadline"}\'',
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
