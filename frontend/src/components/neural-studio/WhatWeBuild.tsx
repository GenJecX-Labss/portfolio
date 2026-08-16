'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DiagramStep {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

interface Project {
  id: number;
  name: string;
  shortName: string;
  tier: 'Tier-1' | 'Tier-2' | 'Tier-3';
  description: string;
  status: string;
  diagrams: DiagramStep[];
}

export default function WhatWeBuild() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<string | null>(null);

  // Tier classification
  const tierCategories = [
    {
      id: 'tier-1',
      label: 'Applied Intelligence Systems',
      subtitle: 'Production-Deployed Systems',
      description:
        'Systems built using adapted models, orchestration layers, and applied intelligence patterns to solve real-world business problems.',
      color: 'bg-blue-100 border-blue-300',
      badge: 'text-blue-700 bg-blue-50',
    },
    {
      id: 'tier-2',
      label: 'Hybrid Research Systems',
      subtitle: 'Active Development',
      description:
        'Systems combining research-driven design with adapted models, custom pipelines, and experimental intelligence layers.',
      color: 'bg-amber-100 border-amber-300',
      badge: 'text-amber-700 bg-amber-50',
    },
    {
      id: 'tier-3',
      label: 'Foundational Intelligence Architectures',
      subtitle: 'Research & Production',
      description:
        'Purpose-built neural systems where intelligence is trained or designed from first principles, without dependence on general-purpose LLMs.',
      color: 'bg-red-100 border-red-300',
      badge: 'text-red-700 bg-red-50',
    },
  ];

  // Portfolio Projects with Diagram Structure
  const allProjects: Project[] = [
    {
      id: 1,
      name: 'Nova',
      shortName: 'Nova',
      tier: 'Tier-3',
      description:
        'Custom RNN-CNN hybrid neural network for deterministic mathematical reasoning and programming support.',
      status: 'Production',
      diagrams: [
        {
          id: 'nova-1',
          title: 'System Overview',
          description:
            'Black-box view showing how mathematical problems are converted into structured reasoning paths.',
          imagePath: '',
        },
        {
          id: 'nova-2',
          title: 'Intelligence Placement',
          description:
            'Custom RNN-CNN hybrid where logical reasoning is encoded directly in learned weights.',
          imagePath: '',
        },
        {
          id: 'nova-3',
          title: 'Data Flow',
          description:
            'Input tokenization through deterministic inference with bounded output space.',
          imagePath: '',
        },
        {
          id: 'nova-4',
          title: 'Reasoning Path',
          description:
            'How the model decomposes problems and generates step-by-step solutions.',
          imagePath: '',
        },
        {
          id: 'nova-5',
          title: 'Training Pipeline',
          description:
            'Custom loss functions and gradient control for precise reasoning behavior.',
          imagePath: '',
        },
      ],
    },
    {
      id: 2,
      name: 'Sara Personality Neural Model',
      shortName: 'Sara',
      tier: 'Tier-3',
      description:
        'High-EQ personality-specific neural network with sarcastic, flirtatious, and emotionally intelligent behavior.',
      status: 'Deployed',
      diagrams: [
        {
          id: 'sara-1',
          title: 'Personality Architecture',
          description:
            'Standalone neural network with personality constraints embedded at training time.',
          imagePath: '',
        },
        {
          id: 'sara-2',
          title: 'Trait Encoding',
          description:
            'How sarcasm, flirtation, and emotional intelligence are structurally embedded in weights.',
          imagePath: '',
        },
        {
          id: 'sara-3',
          title: 'Memory System',
          description:
            'Per-user isolated memory tracking relationship progression and emotional state.',
          imagePath: '',
        },
        {
          id: 'sara-4',
          title: 'Response Generation',
          description:
            'How personality constraints guide response synthesis and behavior boundaries.',
          imagePath: '',
        },
      ],
    },
    {
      id: 3,
      name: 'Semantic Knowledge System',
      shortName: 'Semantic Knowledge',
      tier: 'Tier-3',
      description:
        'Purpose-built semantic knowledge and reasoning architecture combining knowledge graphs, hybrid retrieval, and autonomous AI reasoning to generate actionable enterprise intelligence.',
      status: 'Production',
      diagrams: [
        {
          id: 'semantic-1',
          title: 'End-to-End Knowledge & AI Reasoning Architecture',
          description:
            'Provides a high-level macro view of how raw knowledge sources are ingested, stored semantically, retrieved, and processed by AI to generate actionable intelligence outputs.',
          imagePath: '/diagrams/tier-1/obsidian-ai/OBS1.png',
        },
        {
          id: 'semantic-2',
          title: 'Knowledge Ingestion, Extraction & Structuring Pipeline',
          description:
            'Details the sequential data processing pipeline required to transform unstructured raw knowledge into validated, structured semantic knowledge outputs.',
          imagePath: '/diagrams/tier-1/obsidian-ai/OBS2.png',
        },
        {
          id: 'semantic-3',
          title: 'Query Processing, Hybrid Retrieval & AI Reasoning Flow',
          description:
            'Maps the real-time operational path a user query takes to extract context, perform hybrid searches, and synthesize intelligent responses.',
          imagePath: '/diagrams/tier-1/obsidian-ai/OBS3.png',
        },
        {
          id: 'semantic-4',
          title: 'Autonomous Intelligence Analysis & Knowledge Evolution Cycle',
          description:
            'Illustrates the continuous feedback loop where existing knowledge is analyzed, validated by humans, and re-integrated to evolve the core Knowledge Graph over time.',
          imagePath: '/diagrams/tier-1/obsidian-ai/OBS4.png',
        },
      ],
    },
    {
      id: 4,
      name: 'Organizational Knowledge System',
      shortName: 'Org Knowledge',
      tier: 'Tier-3',
      description:
        'Enterprise knowledge and intelligence processing system for social platforms, combining ontologies, knowledge graphs, and neuro-symbolic reasoning to power executive decision-making.',
      status: 'Production',
      diagrams: [
        {
          id: 'orgknowledge-1',
          title: 'End-to-End Knowledge & Intelligence Processing Pipeline',
          description:
            'Illustrates the complete linear workflow of ingesting raw unstructured data, structuring it using ontologies and knowledge graphs, applying advanced reasoning/agents, and serving executive outputs through an Intelligence Workspace.',
          imagePath: '/diagrams/tier-3/Ditto_Ai/DA1.jpeg',
        },
        {
          id: 'orgknowledge-2',
          title: 'Query Processing & Neuro-Symbolic Query Execution Engine',
          description:
            'Details the step-by-step logic flow required to process a user query by integrating statistical neural retrieval with deterministic symbolic reasoning to produce an evidence-backed answer.',
          imagePath: '/diagrams/tier-3/Ditto_Ai/DA2.jpeg',
        },
        {
          id: 'orgknowledge-3',
          title: 'Multi-Agent Orchestration & Data Integration Architecture',
          description:
            'Depicts a modular, agentic architecture where a central orchestrator delegates specialized sub-tasks across distinct domain agents and knowledge stores to deliver synthesized executive reports.',
          imagePath: '/diagrams/tier-3/Ditto_Ai/DA3.jpeg',
        },
        {
          id: 'orgknowledge-4',
          title: 'High-Level Strategic Value Chain (Data to Strategic Advantage)',
          description:
            'Showcases a streamlined, high-level roadmap outlining how raw documents are transformed into strategic enterprise value using GraphRAG, Neuro-Symbolic AI, and AI Agents.',
          imagePath: '/diagrams/tier-3/Ditto_Ai/DA4.jpeg',
        },
      ],
    },
    {
      id: 5,
      name: 'BrandWriter Platform',
      shortName: 'BrandWriter',
      tier: 'Tier-2',
      description:
        'Hybrid system combining fine-tuned models with custom content intelligence pipelines.',
      status: 'Active Research',
      diagrams: [
        {
          id: 'bw-1',
          title: 'Platform Overview',
          description:
            'Multi-layer system integrating brand understanding with content generation.',
          imagePath: '/diagrams/tier-2/brandwriter/brand-context-1.png',
        },
        {
          id: 'bw-2',
          title: 'Brand Context Layer',
          description:
            'Custom pipeline for encoding brand voice, values, and messaging patterns.',
          imagePath: '/diagrams/tier-2/brandwriter/brand-context-2.png',
        },
        {
          id: 'bw-3',
          title: 'Brand Context Layer',
          description:
            'Custom pipeline for encoding brand voice, values, and messaging patterns.',
          imagePath: '/diagrams/tier-2/brandwriter/content-generation.png',
        },
        {
          id: 'bw-4',
          title: 'Content Generation',
          description:
            'Fine-tuned models with custom orchestration for platform-specific outputs.',
          imagePath: '/diagrams/tier-2/brandwriter/platform-overview.png',
        },
        {
          id: 'bw-5',
          title: 'Quality Control',
          description:
            'Validation layers ensuring consistency with brand guidelines and constraints.',
          imagePath: '/diagrams/tier-2/brandwriter/quality-control.png',
        },
      ],
    },
    {
      id: 6,
      name: 'Vsai',
      shortName: 'Code Editor',
      tier: 'Tier-2',
      description:
      'An intelligent development environment that understands code context, developer intent, and project structure to generate, refactor, and reason about code in real time.',
      status: 'Active Research',
      diagrams: [
        {
          id: 'code-editor-1',
          title: 'AI Code Editor',
          description:
            'A context-aware code editor that assists developers with intelligent generation, refactoring, debugging, and architectural reasoning across the entire codebase.',
          imagePath: '/diagrams/tier-2/code-editor/System-Overview.png',
        },
        {
          id: 'code-editor-2',
          title: 'Data Ingestion',
          description:
            'Multiple data source integration with real-time processing pipelines.',
          imagePath: '/diagrams/tier-2/code-editor/Data-Pipeline.png',
        },
        {
          id: 'code-editor-3',
          title: 'Ranking & Selection',
          description:
            'Custom models for evaluating hook performance across platforms.',
          imagePath: '/diagrams/tier-2/code-editor/analysis-pipeline.png',
        },
        {
          id: 'code-editor-4',
          title: 'Feedback Loop',
          description:
            'Learning system that improves hook generation based on performance data.',
          imagePath: '/diagrams/tier-2/code-editor/optimization-engine.png',
        },
        {
          id: 'code-editor-5',
          title: 'Feedback Loop',
          description:
            'Learning system that improves hook generation based on performance data.',
          imagePath: '/diagrams/tier-2/code-editor/editor-pipeline.png',
        },
      ],
    },
    {
      id: 7,
      name: 'Podcast Topic Recommender',
      shortName: 'Topic Recommender',
      tier: 'Tier-2',
      description:
        'A calm, brand-aware content brain that helps a Gen Z mental health podcast gently discover, refine, and speak ideas that feel like home.',
      status: 'Production',
      diagrams: [
        {
          id: 'topic-recommender-1',
          title: 'System Architecture',
          description:
            'A pastel-soft recommender that generates thoughtful mental health topics and lovingly polishes your drafts into scripts, guided by psychology, relatability, and emotional safety.',
          imagePath: '/diagrams/tier-2/topic-recommender/system-overview.png',
        },
        {
          id: 'topic-recommender-2',
          title: 'Analysis Pipeline',
          description:
            'Real-time data collection from Reddit, YouTube, and Instagram sources.',
          imagePath: '/diagrams/tier-2/topic-recommender/analysis-pipeline.png',
        },
        {
          id: 'topic-recommender-3',
          title: 'Generation Engine',
          description:
            'LLM orchestration with platform-specific prompt conditioning.',
          imagePath: '/diagrams/tier-2/topic-recommender/topic-generator-pipeline.png',
        },
        {
          id: 'topic-recommender-4',
          title: 'Hook Delivery',
          description:
            'User interface flow for hook search, selection, and copy functionality.',
          imagePath: '/diagrams/tier-2/topic-recommender/hook-pipeline.png',
        },
        {
          id: 'topic-recommender-5',
          title: 'Data Flow',
          description:
            'User interface flow for hook search, selection, and copy functionality.',
          imagePath: '/diagrams/tier-2/topic-recommender/data-pipeline.png',
        },
      ],
    },
    {
      id: 8,
      name: 'Executive Memory System',
      shortName: 'Executive Memory',
      tier: 'Tier-2',
      description:
        'Hybrid executive operating system combining organizational memory, retrieval-augmented generation, and multi-source data ingestion to power executive intelligence.',
      status: 'Active Research',
      diagrams: [
        {
          id: 'execmem-1',
          title: 'End-to-End Executive Operating System Pipeline',
          description:
            'Illustrates the complete step-by-step architecture flow that transforms raw, multi-source workplace data into an actionable Executive Operating System.',
          imagePath: '/diagrams/tier-2/Rag_Ceo/RC1.jpeg',
        },
        {
          id: 'execmem-2',
          title: 'Information Integration and Intelligence Mapping',
          description:
            'Depicts how operational communication streams (emails, documents, meetings, messages) are categorized into specialized enterprise memory domains to feed executive intelligence outputs.',
          imagePath: '/diagrams/tier-2/Rag_Ceo/RC2.jpeg',
        },
        {
          id: 'execmem-3',
          title: 'Retrieval-Augmented Generation (RAG) Query Architecture',
          description:
            'Shows the technical workflow of processing executive queries using hybrid search mechanisms, dual database storage, and LLM context assembly to return grounded answers.',
          imagePath: '/diagrams/tier-2/Rag_Ceo/RC3.jpeg',
        },
        {
          id: 'execmem-4',
          title: 'High-Level Executive Decision Value Chain',
          description:
            'Presents a simplified, macro-level conceptual model of how raw enterprise data undergoes structured refinement to enable strategic executive decision-making.',
          imagePath: '/diagrams/tier-2/Rag_Ceo/RC4.jpeg',
        },
      ],
    },
    {
      id: 9,
      name: 'Hook Explorer',
      shortName: 'Explorer',
      tier: 'Tier-1',
      description:
        'A multi-niche intelligence system that discovers, ranks, and generates high-performing hooks, captions, and titles using real audience language from social platforms.',
      status: 'Production',
      diagrams: [
        {
          id: 'explorer-1',
          title: 'Enterprise Architecture',
          description:
            'A single-LLM platform trained on scraped Reddit, YouTube, and Instagram conversations to deliver niche-specific hooks and captions with contextual matching, filtering, and editing workflows.',
          imagePath: '/diagrams/tier-1/explorer/hook-discovery.png',
        },
        {
          id: 'explorer-2',
          title: 'Analysis Pipeline',
          description:
            'Real-time content analysis with multi-dimensional quality scoring.',
          imagePath: '/diagrams/tier-1/explorer/data-ingestion.png',
        },
        {
          id: 'explorer-3',
          title: 'Optimization Engine',
          description:
            'Automated recommendations for content improvement and performance.',
          imagePath: '/diagrams/tier-1/explorer/ranking-selection.png',
        },
      ],
    },
    {
      id: 10,
      name: 'Booking Automation System',
      shortName: 'BAS',
      tier: 'Tier-1',
      description:
        'A modular, automation-ready booking platform designed for scalable scheduling, payments, and operational workflows.',
      status: 'Production',
      diagrams: [
        {
          id: 'bas-1',
          title: 'Platform Overview',
          description:
            'Complete booking automation workflow from planning to analytics.',
          imagePath: '/diagrams/tier-1/bas/platform-overview.png',
        },
        {
          id: 'bas-2',
          title: 'Main Pipeline',
          description:
            'Booking and scheduling with platform-specific optimization.',
          imagePath: '/diagrams/tier-1/bas/booking-pipeline.png',
        },
        {
          id: 'bas-3',
          title: 'Collection Engine',
          description:
            'Intelligent scheduling with optimal timing and audience targeting.',
          imagePath: '/diagrams/tier-1/bas/guest-collection-pipeline.png',
        },
        {
          id: 'bas-4',
          title: 'Subscription Pipeline',
          description:
            'Real-time performance tracking with actionable insights.',
          imagePath: '/diagrams/tier-1/bas/subscription-pipeline.png',
        },
      ],
    },
    {
      id: 11,
      name: 'LinkedIn Copilot',
      shortName: 'LinkedIn Copilot',
      tier: 'Tier-1',
      description:
        'Multi-agent LinkedIn engagement platform that generates and ranks top-performing comments through a sequential seven-agent workflow.',
      status: 'Production',
      diagrams: [
        {
          id: 'linkedin-1',
          title: 'Sequential Multi-Agent Workflow',
          description:
            'Illustrates the high-level, step-by-step user journey and agent progression from initial content input to the final generated top-ranked comments.',
          imagePath: '',
        },
        {
          id: 'linkedin-2',
          title: 'Multi-Agent Data & Memory Architecture',
          description:
            'Details how data and persistent storage (databases/memories) integrate with each specific agent stage in the workflow.',
          imagePath: '',
        },
        {
          id: 'linkedin-3',
          title: 'System Tech Stack & Orchestration Architecture',
          description:
            'Provides a technical infrastructure view showing how frontend/backend frameworks, database tools, and AI engines interface.',
          imagePath: '',
        },
      ],
    },
    {
      id: 12,
      name: 'Hiring AI',
      shortName: 'Hiring AI',
      tier: 'Tier-1',
      description:
        'TalentForge AI recruitment platform automating candidate sourcing, screening, interviewing, and evaluation through a multi-agent workforce.',
      status: 'Production',
      diagrams: [
        {
          id: 'hiring-1',
          title: 'TalentForge AI High-Level Business Workflow',
          description:
            'Illustrates the end-to-end recruitment process showing how human input integrates with the core TalentForge AI platform to make final hiring decisions.',
          imagePath: '',
        },
        {
          id: 'hiring-2',
          title: 'TalentForge AI Technical System Architecture',
          description:
            'Presents a detailed technical breakdown showing the interaction between the UI, backend infrastructure, persistent data storage, multi-agent framework, and underlying local LLM models.',
          imagePath: '',
        },
        {
          id: 'hiring-3',
          title: 'Granular AI Recruitment Pipeline',
          description:
            'Maps out the step-by-step operational pipeline of candidate processing from raw job requirements to the final hire.',
          imagePath: '',
        },
      ],
    },
  ];

  // Filter projects by tier
  const getProjectsByTier = (tierId: string) => {
    const tierMap: { [key: string]: 'Tier-1' | 'Tier-2' | 'Tier-3' } = {
      'tier-1': 'Tier-1',
      'tier-2': 'Tier-2',
      'tier-3': 'Tier-3',
    };
    return allProjects.filter((p) => p.tier === tierMap[tierId]);
  };

  const selectedProjects = selectedTier
    ? getProjectsByTier(selectedTier)
    : [];

  const selectedTierInfo = tierCategories.find(
    (t) => t.id === selectedTier
  );

  return (
    <section className="gx-section gx-studio-portfolio">
      <div className="gx-container">
        {!selectedTier ? (
          <>
            {/* Tier Selection View */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
                What We Build
              </h2>
              <p className="text-lg text-[#475569] mb-8 max-w-3xl">
                Our portfolio spans three tiers of AI system complexity. Choose
                any tier to explore our functional diagrams and working systems.
              </p>
            </div>

            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {tierCategories.map((tier) => {
                const projectsInTier = getProjectsByTier(tier.id);
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className="p-8 border-2 border-[#E5E7EB] rounded-lg hover:border-[#334155] transition-all text-left group hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#334155] transition-colors">
                        {tier.label}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tier.badge}`}>
                        {tier.subtitle}
                      </span>
                    </div>

                    <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                      <span className="text-xs font-medium text-[#334155]">
                        {projectsInTier.length} Projects
                      </span>
                      <span className="text-lg text-[#334155] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Portfolio View */}
            <div className="mb-12">
              <button
                onClick={() => {
                  setSelectedTier(null);
                  setExpandedProject(null);
                  setActiveDiagram(null);
                }}
                className="inline-flex items-center gap-2 text-[#334155] hover:text-[#0F172A] mb-6 transition-colors"
              >
                <span>←</span>
                <span className="text-sm font-medium">Back to Tiers</span>
              </button>

              <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
                {selectedTierInfo?.label}
              </h2>
              <p className="text-lg text-[#475569]">
                Functional Diagrams — {selectedTierInfo?.label}
              </p>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {selectedProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-[#E5E7EB] rounded-lg overflow-hidden"
                >
                  {/* Project Header */}
                  <button
                    onClick={() =>
                      setExpandedProject(
                        expandedProject === project.id ? null : project.id
                      )
                    }
                    className="w-full p-6 bg-white hover:bg-[#F9FAFB] transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-[#475569]">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                        <span className="text-xs font-medium text-[#334155] px-3 py-1 bg-[#F9FAFB] rounded-full">
                          {project.status}
                        </span>
                        <span
                          className={`text-2xl transition-transform ${
                            expandedProject === project.id
                              ? 'rotate-90'
                              : ''
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Project Details - Diagram Navigator */}
                  {expandedProject === project.id && (
                    <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Diagram Navigator */}
                        <div className="lg:col-span-1">
                          <h4 className="text-sm font-semibold text-[#0F172A] mb-4">
                            Diagrams
                          </h4>
                          <div className="space-y-2">
                            {project.diagrams.map((diagram) => (
                              <button
                                key={diagram.id}
                                onClick={() => setActiveDiagram(diagram.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                                  activeDiagram === diagram.id
                                    ? 'bg-[#0F172A] text-white'
                                    : 'bg-white text-[#475569] hover:bg-[#E5E7EB]'
                                }`}
                              >
                                <span className="font-medium">
                                  ● {diagram.title}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Center: Diagram Canvas */}
                        <div className="lg:col-span-2">
                          {activeDiagram ? (
                            (() => {
                              const diagram = project.diagrams.find(
                                (d) => d.id === activeDiagram
                              );
                              return diagram ? (
                                <div>
                                  {/* Diagram Container */}
                                  <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden mb-4">
                                    <div className="relative w-full h-[400px] bg-[#F3F4F6]">
                                      {diagram.imagePath ? (
                                        <Image
                                          src={diagram.imagePath}
                                          alt={diagram.title}
                                          fill
                                          style={{ objectFit: 'contain' }}
                                          sizes="(max-width: 1024px) 100vw, 800px"
                                        />
                                      ) : (
                                        <div className="flex h-full items-center justify-center px-8 text-center">
                                          <div>
                                            <p className="text-sm font-medium text-[#475569]">
                                              Diagram not yet published
                                            </p>
                                            <p className="mt-2 text-xs text-[#9CA3AF]">
                                              The supporting research artifact is not currently available.
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Micro-Explanation */}
                                  <div className="bg-white p-4 rounded-lg border border-[#E5E7EB]">
                                    <h5 className="font-semibold text-[#0F172A] mb-2">
                                      {diagram.title}
                                    </h5>
                                    <p className="text-sm text-[#475569] leading-relaxed">
                                      {diagram.description}
                                    </p>
                                  </div>
                                </div>
                              ) : null;
                            })()
                          ) : (
                            <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 text-center">
                              <p className="text-[#9CA3AF] text-sm">
                                Select a diagram to view
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Information Note */}
        {!selectedTier && (
          <div className="mt-12 p-6 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
            <p className="text-sm text-[#475569]">
              <span className="font-semibold text-[#0F172A]">Note:</span> Each
              system includes functional diagrams showing intelligence flow,
              data handling, and decision making. Click any tier to explore
              detailed system architectures.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}