'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DiagramSection {
  sectionTitle: string;
  sectionDescription: string;
  diagrams: {
    id: string;
    number: number;
    title: string;
    purpose: string;
    keyPoints: string[];
    imagePaths: string[]; // ✅ CHANGED from imagePath
  }[];
}

interface Project {
  id: string;
  name: string;
  shortName: string;
  intelligence: string;
  tier: 'Tier-1' | 'Tier-2' | 'Tier-3' | 'Non-LLM';
  description: string;
  diagramSections: DiagramSection[];
}

interface TierConfig {
  id: string;
  name: string;
  philosophy: string;
  projects: Project[];
}

export default function ModelTaxonomy() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // 8 Portfolio Projects organized by Tier
  const tiers: TierConfig[] = [
    {
      id: 'tier-3',
      name: 'Tier 3: Custom-Trained Models',
      philosophy:
        'Built entirely from scratch on domain-specific data. Use when the problem is novel or existing models are fundamentally misaligned.',
      projects: 
      [
        {
          id: 'Nova',
          name: 'Generic Intelligence Model',
          shortName: 'NOVA',
          intelligence: 'RNN-CNN hybrid for generic answers, deterministic programming reasoning',
          tier: 'Tier-3',
          description: 'Custom neural network trained on generic & programming datasets',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'nova-sys-1',
                  number: 1,
                  title: 'High-Level System Map',
                  purpose: 'Shows complete system flow and component relationships',
                  keyPoints: [
                    'Input problem normalization',
                    'Reasoning engine placement',
                    'Output generation pipeline',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/system-overview-n.png'],
                },
                {
                  id: 'nova-sys-2',
                  number: 2,
                  title: 'Intelligence Placement',
                  purpose: 'Where learning resides in the architecture',
                  keyPoints: [
                    'Custom weights encode reasoning',
                    'Deterministic inference paths',
                    'No stochastic sampling',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/RNN-CNN.png'],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                {
                  id: 'nova-intel-1',
                  number: 3,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'RNN for sequence processing',
                    'CNN for pattern extraction',
                    'Custom gradient control',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/training-pipeline.png'],
                },
                {
                  id: 'nova-intel-2',
                  number: 4,
                  title: 'Training Pipeline',
                  purpose: 'How deterministic reasoning is encoded',
                  keyPoints: [
                    'Custom loss functions',
                    'Manual backpropagation',
                    'Bounded output space',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/image-generation-pipeline.png'],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'nova-data-1',
                  number: 5,
                  title: 'Input Normalization',
                  purpose: 'Standardizing problem representation',
                  keyPoints: [
                    'Problem parsing',
                    'Format standardization',
                    'Feature extraction',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/inference-pipeline.png'],
                },
                {
                  id: 'nova-data-2',
                  number: 6,
                  title: 'Memory & Context',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Tokenization',
                    'Vector encoding',
                    'Result synthesis',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/context-reasoning.png'],
                },
                {
                  id: 'nova-data-3',
                  number: 7,
                  title: 'Failure Handling',
                  purpose: 'Maintaining reasoning state',
                  keyPoints: [
                    'Intermediate step storage',
                    'Context accumulation',
                    'State management',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/failure-handling.png'],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'nova-model-1',
                  number: 8,
                  title: 'Reasoning Path',
                  purpose: 'Step-by-step solution generation',
                  keyPoints: [
                    'Problem decomposition',
                    'Step sequencing',
                    'Solution composition',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/latency&optimization.png'],
                },
              ],
            },
            
          ],
          
        },
        
////////////////////////////////////////////
        // Additional Tier-1 projects would follow same structure
        ///////////////////////////////////////////////////



////////////////ALEX MODEL ////////////////////
        {
          id: 'Alexa',
          name: 'Generic Intelligence Model',
          shortName: 'ALEXA',
          intelligence: 'RNN-CNN hybrid for saasier personality modeling',
          tier: 'Tier-3',
          description: 'Custom neural network trained on personality datasets',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'Alexa-sys-1',
                  number: 1,
                  title: 'System-Overview',
                  purpose: 'Shows complete system flow and component relationships',
                  keyPoints: [
                    'Input problem normalization',
                    'Reasoning engine placement',
                    'Output generation pipeline',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/alexa/system-overview.png'],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                {
                  id: 'Alexa-intel-1',
                  number: 3,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'RNN for sequence processing',
                    'CNN for pattern extraction',
                    'Custom gradient control',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/alexa/RNN-CNN.png'],
                },
                {
                  id: 'Alexa-intel-2',
                  number: 4,
                  title: 'Training Pipeline',
                  purpose: 'How deterministic reasoning is encoded',
                  keyPoints: [
                    'Custom loss functions',
                    'Manual backpropagation',
                    'Bounded output space',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/alexa/training-pipeline.png'],
                },
              ],
            },
            {
              sectionTitle: 'Failure & Optimization',
              sectionDescription: 'Production deployment considerations',
              diagrams: [
                {
                  id: 'Alexa-scale-1',
                  number: 10,
                  title: 'Failure Handling',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Error detection',
                    'Fallback mechanisms',
                    'Recovery strategies',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/alexa/failure&optimization.png'],
                },
              ],
            },
            
          ],
          
        },
        ///////////////// SARA MODEL ////////////////////
        {
          id: 'Sara',
          name: 'Personality Model Sara',
          shortName: 'Sara',
          intelligence: 'Personality-Conditioned Conversational Intelligence',
          tier: 'Tier-3',
          description: 'A custom-trained neural network that encodes personality, tone, and behavioral boundaries to generate consistent, emotionally coherent conversational responses.',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'sara-sys-1',
                  number: 1,
                  title: 'High-Level System Map',
                  purpose: 'Shows complete system flow and component relationships',
                  keyPoints: [
                    'Input problem normalization',
                    'Reasoning engine placement',
                    'Output generation pipeline',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/sara/system-overview.png'],
                  
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Components',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                {
                  id: 'sara-intel-1',
                  number: 3,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'RNN for sequence processing',
                    'CNN for pattern extraction',
                    'Custom gradient control',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/sara/RNN-CNN.png'],
                },
                {
                  id: 'sara-intel-2',
                  number: 4,
                  title: 'Training Pipeline',
                  purpose: 'How deterministic reasoning is encoded',
                  keyPoints: [
                    'Custom loss functions',
                    'Manual backpropagation',
                    'Bounded output space',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/sara/training-pipeline.png'],
                },
              ],
            },
            {
              sectionTitle: 'Inference & Reasoning Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'sara-data',
                  number: 6,
                  title: 'Inference Data Flow',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Tokenization',
                    'Vector encoding',
                    'Result synthesis',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/sara/inference-reasoning.png'],
                },
              ],
            },
            {
              sectionTitle: 'Scale & Reliability',
              sectionDescription: 'Production deployment considerations',
              diagrams: [
                {
                  id: 'sara-scale-1',
                  number: 10,
                  title: 'Failure & Optimization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Error detection',
                    'Fallback mechanisms',
                    'Recovery strategies',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/sara/failure&optimization.png'],
                },
              ],
            },
            
          ],
          
        },
      ],
    },
  ////////////
  ////////////////
  //////////////////////
  /////////TIER2//////////////
  /////////////////////////////////
    {
      id: 'tier-2',
      name: 'Tier 2: Adapted Models',
      philosophy:
        'Pre-trained models fine-tuned for specific problems. Use when a foundation model exists but needs domain specialization.',
      projects: [
        {
          id: 'brandwriter',
          name: 'BrandWriter',
          shortName: 'BrandWriter',
          intelligence: 'Fine-tuned models with custom content pipeline',
          tier: 'Tier-2',
          description: 'Hybrid system combining transfer learning with custom orchestration',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Brand content generation architecture',
              diagrams: [
                {
                  id: 'bw-sys-1',
                  number: 1,
                  title: 'Platform Architecture',
                  purpose: 'Multi-layer content generation system',
                  keyPoints: [
                    'Brand context processing',
                    'Fine-tuned model pipeline',
                    'Quality validation',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/system-architecture.png'],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where adaptation happens',
              diagrams: [
                {
                  id: 'bw-intel-1',
                  number: 2,
                  title: 'Model Adaptation',
                  purpose: 'Fine-tuning strategy for brand voice',
                  keyPoints: [
                    'Transfer learning setup',
                    'Brand-specific tuning',
                    'Performance validation',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/training-pipeline.png'],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'Content processing pipeline',
              diagrams: [
                {
                  id: 'bw-data-1',
                  number: 3,
                  title: 'Brand Context Extraction',
                  purpose: 'Understanding brand guidelines',
                  keyPoints: [
                    'Brand asset parsing',
                    'Voice extraction',
                    'Constraint encoding',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/memory&context.png'],
                },
              ],
            },
            {
              sectionTitle: 'Inference & Reasoning Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'bw-data',
                  number: 4,
                  title: 'Inference Data Flow',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Tokenization',
                    'Vector encoding',
                    'Result synthesis',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/inference-data-flow.png'],
                },
                {
                  id: 'bw-data',
                  number: 5,
                  title: 'Reasoning Path',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Tokenization',
                    'Vector encoding',
                    'Result synthesis',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/reasoning-path.png'],
                },
              ],
            },
            {
              sectionTitle: 'Scale & Reliability',
              sectionDescription: 'Production deployment considerations',
              diagrams: [
                {
                  id: 'sara-scale-1',
                  number: 6,
                  title: 'Ranking',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Error detection',
                    'Fallback mechanisms',
                    'Recovery strategies',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/ranking&selection.png'],
                },
                {
                  id: 'sara-scale-1',
                  number: 6,
                  title: 'Normalization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Error detection',
                    'Fallback mechanisms',
                    'Recovery strategies',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/input-normalization.png'],
                },
              ],
            },
             {
              sectionTitle: 'Failure & Optimization',
              sectionDescription: 'Production deployment considerations',
              diagrams: [
                              {
                  id: 'sara-scale-1',
                  number: 6,
                  title: 'Failure & Optimization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Error detection',
                    'Fallback mechanisms',
                    'Recovery strategies',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/failure&optimization.png'],
                },
                                {
                  id: 'sara-scale-1',
                  number: 6,
                  title: 'Latency & Optimization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Error detection',
                    'Fallback mechanisms',
                    'Recovery strategies',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/latency&optimization.png'],
                },
              ],
            }
          ],
        },
      ],
    },
    //////////////////////////////////////////////////
//////////////////////////////////
////////////////////////////////
/////////////////////TIER 1//////////////////////
    {
      id: 'tier-3',
      name: 'Tier 3: LLM-Assisted Systems',
      philosophy:
        'Systems where LLMs provide specific capabilities within broader architectures. Use when language understanding is one component of a larger solution.',
      projects: [
        {
          id: 'hookbank',
          name: 'HookBank Cross-Platform',
          shortName: 'HookBank',
          intelligence: 'LLM-powered hook generation from real conversations',
          tier: 'Tier-3',
          description: 'Applies LLMs within carefully orchestrated content pipeline',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Hook generation system architecture',
              diagrams: [
                {
                  id: 'hb-sys-1',
                  number: 1,
                  title: 'System Pipeline',
                  purpose: 'End-to-end hook discovery and generation',
                  keyPoints: [
                    'Data scraping layer',
                    'LLM orchestration',
                    'Platform delivery',
                  ],
                  imagePaths: ['/diagrams/research/hookbank/01-system-pipeline.png'],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
///////////////////////////////////
// End of Tier Definitions
////////////////////////////////////
  const currentTier = tiers.find((t) => t.id === selectedTier);
  const currentProjectData =
    selectedProject && currentTier
      ? currentTier.projects.find((p) => p.id === selectedProject)
      : null;

  const allDiagrams = currentProjectData
    ? currentProjectData.diagramSections.flatMap((section) => section.diagrams)
    : [];
  const currentDiagram = activeDiagram
    ? allDiagrams.find((d) => d.id === activeDiagram)
    : null;

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {!selectedTier ? (
          <>
            {/* Tier Selection View */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
                Model Taxonomy
              </h2>
              <p className="text-lg text-[#475569] mb-8 max-w-3xl leading-relaxed">
                We think about models in clear categories. Select a tier to explore projects and their architectural diagrams.
              </p>
            </div>

            {/* Tier Cards */}
            <div className="space-y-4 mb-12">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setSelectedProject(null);
                    setActiveDiagram(null);
                  }}
                  className="w-full p-8 border-2 border-[#E5E7EB] rounded-lg hover:border-[#334155] hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#334155] transition-colors">
                      {tier.name}
                    </h3>
                    <span className="text-lg text-[#334155] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  <p className="text-[#475569] leading-relaxed">
                    {tier.philosophy}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <span className="text-xs font-medium text-[#9CA3AF]">
                      {tier.projects.length} Project{tier.projects.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : !selectedProject ? (
          <>
            {/* Tier View - Projects List */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setSelectedTier(null);
                  setSelectedProject(null);
                  setActiveDiagram(null);
                }}
                className="inline-flex items-center gap-2 text-[#334155] hover:text-[#0F172A] mb-6 transition-colors"
              >
                <span>←</span>
                <span className="text-sm font-medium">Back to Tiers</span>
              </button>

              <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
                {currentTier?.name}
              </h2>
              <p className="text-lg text-[#475569]">
                {currentTier?.philosophy}
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTier?.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project.id);
                    setActiveDiagram(null);
                  }}
                  className="p-6 border-2 border-[#E5E7EB] rounded-lg hover:border-[#334155] hover:shadow-lg transition-all text-left group"
                >
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#334155] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#475569] mb-4">
                    {project.intelligence}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <span className="text-xs text-[#9CA3AF]">
                      {project.diagramSections.reduce(
                        (sum, sec) => sum + sec.diagrams.length,
                        0
                      )}{' '}
                      Diagrams
                    </span>
                    <span className="text-lg text-[#334155] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Diagram Explorer View */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setActiveDiagram(null);
                }}
                className="inline-flex items-center gap-2 text-[#334155] hover:text-[#0F172A] mb-6 transition-colors"
              >
                <span>←</span>
                <span className="text-sm font-medium">Back to Projects</span>
              </button>

              <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
                {currentProjectData?.name}
              </h2>
              <p className="text-lg text-[#475569]">
                Architecture & System Diagrams — {currentProjectData?.tier}
              </p>
            </div>

            {/* Diagram Navigator Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Diagram Index */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-sm font-bold text-[#0F172A] mb-6 uppercase tracking-wider">
                    Diagram Sections
                  </h3>

                  <div className="space-y-6">
                    {currentProjectData?.diagramSections.map((section, index) => (
                      <div key={`${section.sectionTitle}-${index}`}>
                        <h4 className="text-xs font-bold text-[#9CA3AF] mb-3 uppercase tracking-wider">
                          {section.sectionTitle}
                        </h4>

                        <div className="space-y-2">
                          {section.diagrams.map((diagram) => (
                            <button
                              key={diagram.id}
                              onClick={() => setActiveDiagram(diagram.id)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                activeDiagram === diagram.id
                                  ? 'bg-[#0F172A] text-white'
                                  : 'bg-white text-[#0F172A] hover:bg-[#F9FAFB] border border-[#E5E7EB]'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-bold flex-shrink-0 mt-0.5">
                                  {diagram.number}.
                                </span>
                                <span className="text-sm font-medium leading-tight">
                                  {diagram.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Diagram Viewer */}
              <div className="lg:col-span-2">
                {activeDiagram && currentDiagram ? (
                  <div>
                    {/* Diagram Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                          {currentDiagram.number}. {currentDiagram.title}
                        </h3>
                        <p className="text-sm text-[#475569]">
                          {currentDiagram.purpose}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="text-sm font-medium text-[#334155] hover:text-[#0F172A] px-3 py-2 border border-[#E5E7EB] rounded-md transition-colors flex-shrink-0"
                      >
                        {isZoomed ? 'Exit' : 'Zoom'}
                      </button>
                    </div>

                    {/* Diagram Canvas - ✅ UPDATED */}
                    <div
                      className={`bg-white rounded-lg border border-[#E5E7EB] overflow-hidden mb-6 ${
                        isZoomed ? 'fixed inset-0 z-50 rounded-none' : ''
                      }`}
                    >
                      <div
                        className={`relative w-full ${
                          isZoomed ? 'h-screen' : 'min-h-[500px]'
                        } bg-[#F3F4F6] p-6 overflow-auto`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {currentDiagram.imagePaths.map((src, index) => (
                            <div
                              key={index}
                              className="relative w-full h-[350px] bg-white rounded-lg border"
                            >
                              <Image
                                src={src}
                                alt={`${currentDiagram.title} — view ${index + 1}`}
                                fill
                                className="object-contain p-4"
                                priority
                              />
                              <span className="absolute bottom-2 right-3 text-xs text-[#9CA3AF]">
                                View {index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {isZoomed && (
                        <button
                          onClick={() => setIsZoomed(false)}
                          className="absolute top-6 right-6 p-3 bg-white text-[#0F172A] rounded-lg shadow-lg hover:bg-[#F9FAFB]"
                        >
                          <span className="text-2xl">×</span>
                        </button>
                      )}
                    </div>

                    {/* Key Points */}
                    <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-[#0F172A] mb-3">
                          What to notice
                        </h4>
                        <ul className="space-y-2">
                          {currentDiagram.keyPoints.map((point, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-[#475569] flex gap-2"
                            >
                              <span className="text-[#334155] font-bold">–</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Counter */}
                    <div className="mt-6 text-xs text-[#9CA3AF] text-center">
                      Diagram {currentDiagram.number} of {allDiagrams.length}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-[#E5E7EB] p-12 text-center">
                    <p className="text-[#9CA3AF] text-sm">
                      Select a diagram to explore
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}