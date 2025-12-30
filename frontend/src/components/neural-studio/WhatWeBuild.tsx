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

  // 8 Portfolio Projects with Diagram Structure
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
          imagePath: '/diagrams/tier-3/nova/System-overview.png',
        },
        {
          id: 'nova-2',
          title: 'Intelligence Placement',
          description:
            'Custom RNN-CNN hybrid where logical reasoning is encoded directly in learned weights.',
          imagePath: '/diagrams/tier-3/nova/Intelligence-placement.png',
        },
        {
          id: 'nova-3',
          title: 'Data Flow',
          description:
            'Input tokenization through deterministic inference with bounded output space.',
          imagePath: '/diagrams/tier-3/nova/data-flow.png',
        },
        {
          id: 'nova-4',
          title: 'Reasoning Path',
          description:
            'How the model decomposes problems and generates step-by-step solutions.',
          imagePath: '/diagrams/tier-3/nova/reasoning-path.png',
        },
        {
          id: 'nova-5',
          title: 'Training Pipeline',
          description:
            'Custom loss functions and gradient control for precise reasoning behavior.',
          imagePath: '/diagrams/tier-3/nova/training-pipeline.png',
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
          imagePath: '/diagrams/tier-3/sara/personality-architecture.png',
        },
        {
          id: 'sara-2',
          title: 'Trait Encoding',
          description:
            'How sarcasm, flirtation, and emotional intelligence are structurally embedded in weights.',
          imagePath: '/diagrams/tier-3/sara/trait-encoding.png',
        },
        {
          id: 'sara-3',
          title: 'Memory System',
          description:
            'Per-user isolated memory tracking relationship progression and emotional state.',
          imagePath: '/diagrams/tier-3/sara/memory-system.png',
        },
        {
          id: 'sara-4',
          title: 'Response Generation',
          description:
            'How personality constraints guide response synthesis and behavior boundaries.',
          imagePath: '/diagrams/tier-3/sara/response-generation.png',
        },
      ],
    },
    {
      id: 3,
      name: 'Alexa Personality Neural Model',
      shortName: 'Alexa',
      tier: 'Tier-3',
      description:
        'Empathetic, trust-based personality neural model with emotional consistency and boundary respect.',
      status: 'Deployed',
      diagrams: [
        {
          id: 'alexa-1',
          title: 'Empathy Framework',
          description:
            'Neural architecture optimized for emotional understanding and supportive responses.',
          imagePath: '/diagrams/tier-3/alexa/Empathy-Framework.png',
        },
        {
          id: 'alexa-2',
          title: 'Emotional State',
          description:
            'How emotional consistency is maintained across conversations and interactions.',
          imagePath: '/diagrams/tier-3/alexa/Emotional-State.png',
        },
        {
          id: 'alexa-3',
          title: 'Boundary Enforcement',
          description:
            'Structural constraints preventing emotional over-extension or policy violations.',
          imagePath: '/diagrams/tier-3/alexa/Boundary-Enforcement.png',
        },
        {
          id: 'alexa-4',
          title: 'Response Routing',
          description:
            'How user input is routed through empathy and trust layers before generation.',
          imagePath: '/diagrams/tier-3/alexa/Response-Routing.png',
        },
      ],
    },
    {
      id: 4,
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
          imagePath: '/diagrams/tier-2/brandwriter/platform-overview.png',
        },
        {
          id: 'bw-2',
          title: 'Brand Context Layer',
          description:
            'Custom pipeline for encoding brand voice, values, and messaging patterns.',
          imagePath: '/diagrams/tier-2/brandwriter/brand-context-1.png',
        },
                {
          id: 'bw-3',
          title: 'Brand Context Layer',
          description:
            'Custom pipeline for encoding brand voice, values, and messaging patterns.',
          imagePath: '/diagrams/tier-2/brandwriter/brand-context-2.png',
        },
        {
          id: 'bw-4',
          title: 'Content Generation',
          description:
            'Fine-tuned models with custom orchestration for platform-specific outputs.',
          imagePath: '/diagrams/tier-2/brandwriter/content-generation.png',
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
      id: 5,
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
          imagePath: '/diagrams/tier-2/code-editor/analysis-pipeline.png',
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
          imagePath: '/diagrams/tier-2/code-editor/optimization-engine.png',
        },
        {
          id: 'code-editor-4',
          title: 'Feedback Loop',
          description:
            'Learning system that improves hook generation based on performance data.',
          imagePath: '/diagrams/tier-2/code-editor/System-Overview.png',
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
      id: 6,
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
          id: 'topic-recommender-4',
          title: 'Data Flow',
          description:
            'User interface flow for hook search, selection, and copy functionality.',
          imagePath: '/diagrams/tier-2/topic-recommender/data-pipeline.png',
        },
      ],
    },
    {
      id: 7,
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
      id: 8,
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
          imagePath: '/diagrams/tier-1/bas/guest-collectiion-pipeline.png',
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
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
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
                                      <Image
                                        src={diagram.imagePath}
                                        alt={diagram.title}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 1024px) 100vw, 800px"
                                      />
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