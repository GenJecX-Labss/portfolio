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
                    'Dual-path architecture separating generic vs code queries',
                    'Unified embedding layer before model split',
                    'Response aggregation with confidence scoring',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/system-overview-n.png'],
                },
                {
                  id: 'nova-sys-2',
                  number: 2,
                  title: 'Intelligence Placement',
                  purpose: 'Where learning resides in the architecture',
                  keyPoints: [
                    'RNN handles sequential token dependencies',
                    'CNN extracts local syntactic patterns',
                    'Fusion layer combines temporal and spatial features',
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
                    'Bidirectional LSTM for context understanding',
                    '1D convolutions with varying kernel sizes',
                    'Attention mechanism over CNN feature maps',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/training-pipeline.png'],
                },
                {
                  id: 'nova-intel-2',
                  number: 4,
                  title: 'Training Pipeline',
                  purpose: 'How deterministic reasoning is encoded',
                  keyPoints: [
                    'Cross-entropy loss for classification tasks',
                    'Teacher forcing during sequence generation',
                    'Gradient clipping to prevent explosion',
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
                    'Tokenization with custom vocabulary',
                    'Padding and truncation to fixed length',
                    'Special tokens for code vs natural language',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/inference-pipeline.png'],
                },
                {
                  id: 'nova-data-2',
                  number: 6,
                  title: 'Memory & Context',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Hidden state carries conversation context',
                    'Attention weights highlight relevant tokens',
                    'Output projection to vocabulary space',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/nova/context-reasoning.png'],
                },
                {
                  id: 'nova-data-3',
                  number: 7,
                  title: 'Failure Handling',
                  purpose: 'Maintaining reasoning state',
                  keyPoints: [
                    'Confidence threshold triggers fallback',
                    'Graceful degradation to simpler responses',
                    'Error logging for model retraining',
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
                    'Batch inference for throughput optimization',
                    'Model quantization for faster inference',
                    'Response caching for repeated queries',
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
                    'Emotional state tracker at conversation entry',
                    'Personality boundary enforcement layer',
                    'Multi-turn context aggregation module',
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
                    'LSTM with peephole connections for memory',
                    'Multi-scale CNNs for phrase-level patterns',
                    'Gated fusion for combining modalities',
                  ],
                  imagePaths: ['/diagrams/research/tier-3/sara/RNN-CNN.png'],
                },
                {
                  id: 'sara-intel-2',
                  number: 4,
                  title: 'Training Pipeline',
                  purpose: 'How deterministic reasoning is encoded',
                  keyPoints: [
                    'Triplet loss for emotional consistency',
                    'Behavioral clipping to enforce boundaries',
                    'Data augmentation with paraphrased dialogues',
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
                    'User input with conversation history encoding',
                    'Personality vector injection before decoding',
                    'Response filtering for boundary compliance',
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

        ///////////////// SEMANTIC KNOWLEDGE SYSTEM ////////////////////
        {
          id: 'SemanticKnowledgeSystem',
          name: 'Semantic Knowledge System',
          shortName: 'Semantic KS',
          intelligence: 'Custom-trained model for semantic knowledge representation and retrieval',
          tier: 'Tier-3',
          description: 'Custom neural network trained from scratch to encode and reason over semantic knowledge structures',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'sks-sys-1',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Lorem ipsum dolor sit amet',
                    'Consectetur adipiscing elit',
                    'Sed do eiusmod tempor incididunt',
                  ],
                  imagePaths: [],
                },
                {
                  id: 'sks-sys-2',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Ut enim ad minim veniam',
                    'Quis nostrud exercitation ullamco',
                    'Laboris nisi ut aliquip ex ea',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                {
                  id: 'sks-intel-1',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Duis aute irure dolor in reprehenderit',
                    'Voluptate velit esse cillum dolore',
                    'Fugiat nulla pariatur excepteur',
                  ],
                  imagePaths: [],
                },
                {
                  id: 'sks-intel-2',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Sint occaecat cupidatat non proident',
                    'Sunt in culpa qui officia',
                    'Deserunt mollit anim id est laborum',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'sks-data-1',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Placeholder key point line one',
                    'Placeholder key point line two',
                    'Placeholder key point line three',
                  ],
                  imagePaths: [],
                },
                {
                  id: 'sks-data-2',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Placeholder key point line four',
                    'Placeholder key point line five',
                    'Placeholder key point line six',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'sks-model-1',
                  number: 0,
                  title: '',
                  purpose: '',
                  keyPoints: [
                    'Placeholder key point line seven',
                    'Placeholder key point line eight',
                    'Placeholder key point line nine',
                  ],
                  imagePaths: [],
                },
              ],
            },
          ],
        },

        ///////////////// ORGANIZATIONAL KNOWLEDGE SYSTEM ////////////////////
        {
          id: 'OrganizationalKnowledgeSystem',
          name: 'Organizational Knowledge System',
          shortName: 'Org KS',
          intelligence: 'Custom-trained model for organizational knowledge representation',
          tier: 'Tier-3',
          description: 'Custom neural network trained from scratch to model organizational knowledge and relationships',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'oks-sys-1',
                  number: 0,
                  title: 'End-to-End Knowledge & Intelligence Processing Pipeline',
                  purpose: 'To illustrate the complete linear workflow of ingesting raw unstructured data, structuring it using ontologies and knowledge graphs, applying advanced reasoning/agents, and serving executive outputs through an Intelligence Workspace.',
                  keyPoints: [
                    'Ingestion & Structuring: Converts Unstructured Knowledge Sources into structured representations using a Knowledge Engineering Layer, Ontology Engine, and Knowledge Graph.',
                    'Reasoning & Agent Interaction: Applies a GraphRAG Intelligence Layer combined with Neuro-Symbolic Reasoning and a Multi-Agent System to perform complex analytical tasks.',
                    'Executive Applications: Consolidates insights into an Intelligence Workspace to deliver downstream capabilities like Decision Support, Research Intelligence, Knowledge Discovery, and Executive Insights.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                {
                  id: 'oks-intel-1',
                  number: 0,
                  title: 'Query Processing & Neuro-Symbolic Query Execution Engine',
                  purpose: 'To detail the step-by-step logic flow required to process a user query by integrating statistical neural retrieval with deterministic symbolic reasoning to produce an evidence-backed answer.',
                  keyPoints: [
                    'Neural Intelligence Stage: Receives a User Query and performs Semantic Understanding alongside GraphRAG Retrieval to collect relevant context.',
                    'Symbolic Intelligence Stage: Expands graph context and executes deterministic verification via Ontology Reasoning, Rule Validation, and an Inference Engine.',
                    'Validated Output: Generates a Confidence Scoring and Reasoning Trace before delivering a fully verifiable Evidence-Based Response.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'oks-data-1',
                  number: 0,
                  title: 'Multi-Agent Orchestration & Data Integration Architecture',
                  purpose: 'To depict a modular, agentic architecture where a central orchestrator delegates specialized sub-tasks across distinct domain agents and knowledge stores to deliver synthesized executive reports.',
                  keyPoints: [
                    'Central Orchestration: A Researcher / Analyst initiates tasks handled by an Agent Orchestrator that distributes workloads to dedicated agents.',
                    'Specialized Agent-Layer Execution: Specialized units (Research, Ontology, Validation, Reasoning, Report) interact with respective infrastructure layers (Knowledge Graph, Ontology Layer, Rule Engine, Inference Engine, Executive Reports).',
                    'Centralized Delivery: Aggregates outputs from all specialized streams into a unified Intelligence Workspace for seamless user access.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'oks-model-1',
                  number: 0,
                  title: 'High-Level Strategic Value Chain (Data to Strategic Advantage)',
                  purpose: 'To showcase a streamlined, high-level roadmap outlining how raw documents are transformed into strategic enterprise value using GraphRAG, Neuro-Symbolic AI, and AI Agents.',
                  keyPoints: [
                    'Foundation Layer: Begins with Documents & Research, extracting insights via Knowledge Extraction, Ontology Design, and Knowledge Graph construction.',
                    'Core AI Integration: Leverages GraphRAG, Neuro-Symbolic Reasoning, and AI Agents to perform deeper contextual processing.',
                    'Strategic Outcome: Translates analytical outputs into Intelligence & Insights and Decision Support, culminating in a sustainable Strategic Advantage.',
                  ],
                  imagePaths: [],
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
                    'Brand context ingestion and parsing pipeline',
                    'Multi-model orchestration for different content types',
                    'Quality scoring before output delivery',
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
                    'LoRA adapters for efficient fine-tuning',
                    'Brand voice calibration with sample content',
                    'A/B testing framework for model selection',
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
                    'Style guide parsing and embedding',
                    'Tone vocabulary extraction from samples',
                    'Forbidden phrase and pattern encoding',
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
                    'Content request parsing and intent classification',
                    'Brand context injection into prompt template',
                    'Multi-stage generation with refinement loops',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/inference-data-flow.png'],
                },
                {
                  id: 'bw-data',
                  number: 5,
                  title: 'Reasoning Path',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Chain-of-thought prompting for complex content',
                    'Iterative refinement with brand compliance checks',
                    'Human feedback integration for quality control',
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
                  id: 'bw-scale-1',
                  number: 6,
                  title: 'Ranking',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Multi-candidate generation with diversity sampling',
                    'Brand alignment scoring for each candidate',
                    'Top-k selection with human override option',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/ranking&selection.png'],
                },
                {
                  id: 'bw-scale-2',
                  number: 7,
                  title: 'Normalization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Input length standardization across platforms',
                    'Format conversion for different channels',
                    'Emoji and special character handling rules',
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
                  id: 'bw-scale-3',
                  number: 8,
                  title: 'Failure & Optimization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Off-brand content detection and rejection',
                    'Automatic regeneration with adjusted parameters',
                    'Escalation to human review queue',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/failure&optimization.png'],
                },
                                {
                  id: 'bw-scale-4',
                  number: 9,
                  title: 'Latency & Optimization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Parallel generation for batch requests',
                    'Caching frequent brand context embeddings',
                    'Streaming output for real-time preview',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/latency&optimization.png'],
                },
              ],
            }



          ],
        },


        ////////////////////////VSAI//////////////////

        {
          id: 'Vsai',
          name: 'Programming AI Model',
          shortName: 'VSAI',
          intelligence: 'RNN-CNN hybrid for generic answers, deterministic programming reasoning',
          tier: 'Tier-2',
          description: 'Custom neural network trained on generic & programming datasets',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'vsai-sys-1',
                  number: 1,
                  title: 'High-Level System Map',
                  purpose: 'Shows complete system flow and component relationships',
                  keyPoints: [
                    'Natural language to code translation pipeline',
                    'Multi-language syntax validation layer',
                    'IDE integration via LSP protocol',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/system-architecture.png'],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                                {
                  id: 'vsai-sys-2',
                  number: 2,
                  title: 'Intelligence Placement',
                  purpose: 'Where learning resides in the architecture',
                  keyPoints: [
                    'Code understanding encoder module',
                    'Syntax-aware attention mechanisms',
                    'Language-specific output decoder heads',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/model-architecture.png'],
                },
                {
                  id: 'vsai-intel-1',
                  number: 3,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'LSTM captures code structure dependencies',
                    'CNNs detect local syntax patterns and idioms',
                    'Hybrid fusion for semantic understanding',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/training-pipeline.png'],
                },
                {
                  id: 'vsai-intel-2',
                  number: 3,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'Token-level data flow through encoder',
                    'AST-aware positional encodings',
                    'Gradient checkpointing for long sequences',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/data-flow.png'],
                },
                {
                  id: 'vsai-intel-3',
                  number: 4,
                  title: 'Training Pipeline',
                  purpose: 'How deterministic reasoning is encoded',
                  keyPoints: [
                    'Conversation history window management',
                    'Variable scope tracking across turns',
                    'Code context accumulation strategy',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/memory&context.png'],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'vsai-data-1',
                  number: 5,
                  title: 'Input Normalization',
                  purpose: 'Standardizing problem representation',
                  keyPoints: [
                    'Code snippet extraction from user prompts',
                    'Language detection and syntax tagging',
                    'Whitespace and indentation normalization',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/input-normalization.png'],
                },
                {
                  id: 'vsai-data-2',
                  number: 6,
                  title: 'Memory & Context',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Step-by-step code generation reasoning',
                    'Intermediate variable and type tracking',
                    'Output validation before response',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/reasoning-path.png'],
                },
                {
                  id: 'vsai-data-3',
                  number: 7,
                  title: 'Failure Handling',
                  purpose: 'Maintaining reasoning state',
                  keyPoints: [
                    'Syntax error recovery strategies',
                    'Partial code completion fallbacks',
                    'Confidence threshold gating',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/failure-handling.png'],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'vsai-model-1',
                  number: 8,
                  title: 'Reasoning Path',
                  purpose: 'Step-by-step solution generation',
                  keyPoints: [
                    'Token streaming for real-time display',
                    'KV-cache optimization for long contexts',
                    'Request batching for concurrent users',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/vsai/latency&optimization.png'],
                },
              ],
            },
            
          ],
          
        },

        /////////////////////////////// Recommender System ////////////////////////

                {
          id: 'TopicRecommender',
          name: 'Podcast Topic Recommender',
          shortName: 'Recommender',
          intelligence: 'RNN-CNN hybrid for generic answers, deterministic programming reasoning',
          tier: 'Tier-2',
          description: 'Custom neural network trained on generic & programming datasets',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'recommender-sys-1',
                  number: 1,
                  title: 'High-Level System Map',
                  purpose: 'Shows complete system flow and component relationships',
                  keyPoints: [
                    'User preference ingestion and profiling',
                    'Content-based and collaborative filtering fusion',
                    'Ranked topic suggestions with explanations',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/system-overview.png'],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where custom training and learning occurs',
              diagrams: [
                                {
                  id: 'recommender-sys-2',
                  number: 2,
                  title: 'Intelligence Placement',
                  purpose: 'Where learning resides in the architecture',
                  keyPoints: [
                    'Topic embedding model for semantic similarity',
                    'User behavior sequence modeling',
                    'Cold-start handling with content features',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/model-architecture.png'],
                },
                {
                  id: 'recommender-intel-1',
                  number: 3,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'RNN captures listening history patterns',
                    'CNN extracts topic features from metadata',
                    'Attention over historical preferences',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/training-pipeline.png'],
                },
                {
                  id: 'recommender-intel-2',
                  number: 4,
                  title: 'RNN-CNN Architecture',
                  purpose: 'Hybrid neural structure for reasoning',
                  keyPoints: [
                    'User preference embedding storage',
                    'Session-based context window',
                    'Preference decay for stale interests',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/memory&context.png'],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'recommender-data-1',
                  number: 5,
                  title: 'Input Normalization',
                  purpose: 'Standardizing problem representation',
                  keyPoints: [
                    'Topic text cleaning and tokenization',
                    'User signal weighting and normalization',
                    'Feature extraction from podcast metadata',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/input-normalization.png'],
                },
                {
                  id: 'recommender-data-2',
                  number: 6,
                  title: 'Memory & Context',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Multi-hop reasoning through topic graph',
                    'Score aggregation across candidates',
                    'Diversity injection for variety',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/reasoning-path.png'],
                },
                {
                  id: 'recommender-data-3',
                  number: 7,
                  title: 'Failure Handling',
                  purpose: 'Maintaining reasoning state',
                  keyPoints: [
                    'Fallback to popularity-based ranking',
                    'Degraded mode with cached suggestions',
                    'Error logging for model improvement',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/failure-handling.png'],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'recommender-model-1',
                  number: 8,
                  title: 'Reasoning Path',
                  purpose: 'Step-by-step solution generation',
                  keyPoints: [
                    'Approximate nearest neighbor for speed',
                    'Embedding cache for frequent queries',
                    'Batch vs real-time inference trade-offs',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/latency-optimization.png'],
                },

              ],
            },
            {sectionTitle: 'Inference & Reasoning Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'recommender-data',
                  number: 9,
                  title: 'Inference Data Flow',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Query embedding generation from user input',
                    'Candidate retrieval from topic index',
                    'Re-ranking with user context features',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/brandwriter/inference-data-flow.png'],
                },
              
              ],
            },
            {
              sectionTitle: 'Failure Handling',
              sectionDescription: 'Production deployment considerations',
              diagrams: [
                {
                  id: 'recommender-scale-1',
                  number: 10,
                  title: 'Failure & Optimization',
                  purpose: 'Graceful degradation under error conditions',
                  keyPoints: [
                    'Circuit breaker for model timeouts',
                    'A/B testing framework for updates',
                    'Continuous feedback loop integration',
                  ],
                  imagePaths: ['/diagrams/research/tier-2/recommender/failure-handling.png'],
                },
              ],
            },
            
          ],
          
        },

        ///////////////// EXECUTIVE MEMORY SYSTEM ////////////////////
        {
          id: 'ExecutiveMemorySystem',
          name: 'Executive Memory System',
          shortName: 'Exec Memory',
          intelligence: 'Fine-tuned model adapted for long-term executive context retention',
          tier: 'Tier-2',
          description: 'Hybrid system combining a fine-tuned foundation model with custom memory orchestration for executive-level context',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'ems-sys-1',
                  number: 0,
                  title: 'End-to-End Executive Operating System Pipeline',
                  purpose: 'To illustrate the complete step-by-step architecture flow that transforms raw, multi-source workplace data into an actionable Executive Operating System.',
                  keyPoints: [
                    'Captures raw input from common productivity and communication tools (Outlook, Notion, Drive, Teams, Slack) into Enterprise Data Sources.',
                    'Processes raw data through Data Ingestion, Knowledge Processing, Organizational Memory, and Retrieval Engine layers.',
                    'Delivers refined insights via Executive Intelligence to ultimately power the overall Executive Operating System.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where adaptation happens',
              diagrams: [
                {
                  id: 'ems-intel-1',
                  number: 0,
                  title: 'Information Integration and Intelligence Mapping',
                  purpose: 'To depict how operational communication streams (emails, documents, meetings, messages) are categorized into specialized enterprise memory domains to feed executive intelligence outputs.',
                  keyPoints: [
                    'Aggregates diverse inputs—Emails, Documents, Meetings, and Messages—into a centralized base memory module.',
                    'Categorizes memories into core organizational domains: People Memory, Company Memory, Project Memory, and Timeline Memory.',
                    'Maps memory domains directly to executive tasks like commitment tracking and risk detection, feeding into an Executive Dashboard.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'ems-data-1',
                  number: 0,
                  title: 'Retrieval-Augmented Generation (RAG) Query Architecture',
                  purpose: 'To show the technical workflow of processing executive queries using hybrid search mechanisms, dual database storage, and LLM context assembly to return grounded answers.',
                  keyPoints: [
                    'Routes a "CEO Query" through Hybrid Search, targeting vector storage (Qdrant) and relational storage (PostgreSQL).',
                    'Combines document and communication data into a Context Assembly module before feeding it into the Qwen3 language model.',
                    'Delivers a verified, grounded response back to the executive, forming an interactive feedback loop.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'ems-model-1',
                  number: 0,
                  title: 'High-Level Executive Decision Value Chain',
                  purpose: 'To present a simplified, macro-level conceptual model of how raw enterprise data undergoes structured refinement to enable strategic executive decision-making.',
                  keyPoints: [
                    'Highlights the core linear progression starting directly from raw Enterprise Data.',
                    'Shows the transformation of data into structured Organizational Memory and operational Executive Intelligence.',
                    'Demonstrates the ultimate business goal of the system: driving informed, high-impact Executive Decisions.',
                  ],
                  imagePaths: [],
                },
              ],
            },
          ],
        },
      ],
    },
    //////////////////////////////////////////////////
//////////////////////////////////
////////////////////////////////
/////////////////////TIER 1//////////////////////
    {
      id: 'tier-1',
      name: 'Tier 1: LLM-Assisted Systems',
      philosophy:
        'Systems where LLMs provide specific capabilities within broader architectures. Use when language understanding is one component of a larger solution.',
      projects: [
        {
          id: 'hookbank',
          name: 'HookExplorer Cross-Platform',
          shortName: 'HookExplorer',
          intelligence: 'LLM-powered hook generation from real conversations',
          tier: 'Tier-1',
          description: 'Applies LLMs within carefully orchestrated content pipeline',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Hook generation system architecture',
              diagrams: [
                {
                  id: 'he-sys-1',
                  number: 1,
                  title: 'System Pipeline',
                  purpose: 'End-to-end hook discovery and generation',
                  keyPoints: [
                    'Multi-platform content ingestion (TikTok, Twitter, Reddit)',
                    'Hook pattern extraction and classification',
                    'Platform-specific output formatting',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/system-architecture.png'],
                },
                {
                  id: 'he-sys-2',
                  number: 2,
                  title: 'System Pipeline',
                  purpose: 'End-to-end hook discovery and generation',
                  keyPoints: [
                    'LLM selection per task complexity',
                    'Prompt chaining for multi-step generation',
                    'Quality scoring integration points',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/model-architecture.png'],
                },
              ],
            },
             {
              sectionTitle: 'System Overview',
              sectionDescription: 'Hook generation system architecture',
              diagrams: [
                {
                  id: 'he-sys-3',
                  number: 3,
                  title: 'Intelligence Placement',
                  purpose: 'End-to-end hook discovery and generation',
                  keyPoints: [
                    'Fine-tuned classifier for hook detection',
                    'Prompt templates for generation tasks',
                    'Feedback loop from user selections',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/training-pipeline.png'],
                },
                                {
                  id: 'he-sys-4',
                  number: 4,
                  title: 'Intelligence Placement',
                  purpose: 'End-to-end hook discovery and generation',
                  keyPoints: [
                    'Session history for personalization',
                    'Niche and category context injection',
                    'Trend data window management',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/memory&context.png'],
                },
              ],
            },
{
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'he-data-1',
                  number: 5,
                  title: 'Input Normalization',
                  purpose: 'Standardizing problem representation',
                  keyPoints: [
                    'Raw content cleaning and deduplication',
                    'Engagement metric normalization',
                    'Platform-specific metadata parsing',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/input-normalization.png'],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'he-model-1',
                  number: 6,
                  title: 'Reasoning Path',
                  purpose: 'Step-by-step solution generation',
                  keyPoints: [
                    'Async processing for bulk generation',
                    'Response caching for common patterns',
                    'Rate limiting across LLM providers',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/latency&optimization.png'],
                },

              ],
            },
            {sectionTitle: 'Inference & Reasoning Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'recommender-data',
                  number: 7,
                  title: 'Inference Data Flow',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'User query to hook candidate generation',
                    'Contextual filtering based on niche',
                    'Output ranking by predicted engagement',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/inference-data-flow.png'],
                },
                 {
                  id: 'he-data-2',
                  number: 8,
                  title: 'Memory & Context',
                  purpose: 'Problem to solution processing',
                  keyPoints: [
                    'Multi-step reasoning for hook synthesis',
                    'Pattern matching against top performers',
                    'Iterative refinement with constraints',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/reasoning-path.png'],
                },
              
              ],
            },
            {
              sectionTitle: 'Failure Handling',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'he-data-3',
                  number: 9,
                  title: 'Failure Handling',
                  purpose: 'Maintaining reasoning state',
                  keyPoints: [
                    'LLM API fallback chain (primary to backup)',
                    'Timeout handling with partial results',
                    'Content safety filter bypass alerts',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/failure-handling.png'],
                },
                {
                  id: 'he-data-4',
                  number: 10,
                  title: 'Ranking & Selection',
                  purpose: 'Maintaining reasoning state',
                  keyPoints: [
                    'Engagement prediction model scoring',
                    'Diversity enforcement across results',
                    'User preference weighting',
                  ],
                  imagePaths: ['/diagrams/research/tier-1/explorer/ranking&selection.png'],
                },
              ],
            }
          ],
        },

        ///////////////// LINKEDIN COPILOT ////////////////////
        {
          id: 'LinkedinCopilot',
          name: 'LinkedIn Copilot',
          shortName: 'LinkedIn Copilot',
          intelligence: 'LLM-powered content and engagement assistant for LinkedIn',
          tier: 'Tier-1',
          description: 'Applies LLMs within a broader workflow to help professionals draft posts, comments, and outreach on LinkedIn',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'lic-sys-1',
                  number: 0,
                  title: 'Sequential Multi-Agent Workflow',
                  purpose: 'Illustrates the high-level, step-by-step user journey and agent progression from initial content input to the final generated top-ranked comments.',
                  keyPoints: [
                    'Depicts a linear processing pipeline driven by seven specialized AI agents working in sequence from content intake to comment ranking.',
                    'Highlights the end-to-end feedback loop starting from the "Founder" role and looping back upon completion of the "Top Ranked Comments".',
                    'Focuses on functional agent responsibilities including understanding context, devising engagement strategies, enforcing voice consistency, filtering quality, and ranking outputs.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where the LLM contributes within the pipeline',
              diagrams: [
                {
                  id: 'lic-intel-1',
                  number: 0,
                  title: 'Multi-Agent Data & Memory Architecture',
                  purpose: 'Details how data and persistent storage (databases/memories) integrate with each specific agent stage in the workflow.',
                  keyPoints: [
                    'Outlines the explicit input types accepted at intake (URL, Screenshot, Text, PDF) before proceeding through the numbered AI agent chain.',
                    'Shows direct integration with storage systems, connecting Agent 2 to PostgreSQL, Agent 5 to Voice Memory, and Agent 7 to Analytics.',
                    'Maps the ultimate generation of final "Recommended Comments" alongside background telemetry/analytics tracking.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'lic-data-1',
                  number: 0,
                  title: 'Tech Stack & Orchestration Architecture',
                  purpose: 'Provides a technical infrastructure view showing how frontend/backend frameworks, database tools, and AI engines interface.',
                  keyPoints: [
                    'Displays a modern web architecture featuring a Next.js Frontend communicating with a FastAPI Backend.',
                    'Shows LangGraph Orchestrator managing specialized LLM engine modules, including Mistral OCR, GPT-5.5, Strategy Engine, Voice Engine, Quality Engine, and Ranking Engine.',
                    'Demonstrates system data persistence and analytics using PostgreSQL, Qdrant (vector DB), AWS S3, and PostHog, culminating in the final Comment Workspace output.',
                  ],
                  imagePaths: [],
                },
              ],
            },
          ],
        },

        ///////////////// HIRING AI ////////////////////
        {
          id: 'HiringAI',
          name: 'Hiring AI',
          shortName: 'Hiring AI',
          intelligence: 'LLM-assisted candidate screening and evaluation system',
          tier: 'Tier-1',
          description: 'Uses LLMs as one component within a larger hiring pipeline to parse resumes, score candidates, and support recruiter decisions',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'hai-sys-1',
                  number: 0,
                  title: 'TalentForge AI High-Level Business Workflow',
                  purpose: 'To illustrate the end-to-end recruitment process showing how human input integrates with the core TalentForge AI platform to make final hiring decisions.',
                  keyPoints: [
                    'Initiates with a Recruiter creating a job posting within the system.',
                    'Automates core tasks across 5 core stages: AI Agent Workforce, Candidate Intelligence, Interview Intelligence, Evaluation Engine, and Offer Recommendation.',
                    'Concludes with a human decision stage resulting in the final Hiring Decision.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'hai-data-1',
                  number: 0,
                  title: 'TalentForge AI Technical System Architecture',
                  purpose: 'To present a detailed technical breakdown showing the interaction between the UI, backend infrastructure, persistent data storage, multi-agent framework, and underlying local LLM models.',
                  keyPoints: [
                    'Connects a Mission Control UI frontend to a Node.js API and Workflow Engine backend.',
                    'Utilizes a dual-tier storage strategy leveraging PostgreSQL for relational data and ChromaDB for vector/embedding storage.',
                    'Orchestrates 7 specialized AI agents powered locally via Ollama using specialized models (Hermes, Qwen, and BGE embeddings).',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'hai-model-1',
                  number: 0,
                  title: 'Granular AI Recruitment Pipeline',
                  purpose: 'To map out the step-by-step operational pipeline of candidate processing from raw job requirements to the final hire.',
                  keyPoints: [
                    'Transforms initial Job Requirements into refined job descriptions using a dedicated Job Description Agent.',
                    'Processes candidate profiles sequentially through Resume Screening, Skill Extraction, and Candidate Matching.',
                    'Automates key evaluation stages via Interview Generation, candidate Evaluation, and automated Offer Generation leading to a final Hire.',
                  ],
                  imagePaths: [],
                },
              ],
            },
          ],
        },

        ///////////////// BOOKING APPLICATION SYSTEM ////////////////////
        {
          id: 'BookingApplicationSystem',
          name: 'Booking Application System',
          shortName: 'Booking System',
          intelligence: 'LLM-assisted conversational booking and scheduling assistant',
          tier: 'Tier-1',
          description: 'Integrates an LLM within a booking platform to handle natural language scheduling requests and confirmations',
          diagramSections: [
            {
              sectionTitle: 'System Overview',
              sectionDescription: 'Complete system architecture from input to output',
              diagrams: [
                {
                  id: 'bas-sys',
                  number: 0,
                  title: 'Centralized Booking Data Pipeline',
                  purpose: 'Illustrates how new reservation data flows into a core database and updates multiple operational modules.',
                  keyPoints: [
                    'Captures initial reservation details through a central Add Booking Form.',
                    'Stores submitted data into a single, centralized Bookings Table.',
                    'Automatically updates downstream modules, including Dashboard Records, Calendar Occupancy, Invoice Generator, and Daily Collections.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Intelligence Placement',
              sectionDescription: 'Where the LLM contributes within the pipeline',
              diagrams: [
                {
                  id: 'bas-intel-1',
                  number: 0,
                  title: 'Guest Payment Collection Pipeline',
                  purpose: 'Outlines the end-to-end processing of guest payments, from transaction entry to accounting update and PDF generation.',
                  keyPoints: [
                    'Receives payment inputs via multiple channels (Cash / Online) directly from guest transactions.',
                    'Registers transactions through a Daily Collection Entry point.t',
                    'Routes data into a Receiving Account and feeds a Daily Summary Engine to generate exportable Daily Collection PDFs.',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Data & Signal Flow',
              sectionDescription: 'How problems flow through the system',
              diagrams: [
                {
                  id: 'bas-data-1',
                  number: 0,
                  title: 'High-Level Hotel Management System Architecture',
                  purpose: 'Displays the full end-to-end system architecture, connecting frontend user interfaces, backend services, database storage, and external integrations.',
                  keyPoints: [
                    'Provides user UI tools for Hotel Staff / Admin to view dashboards, manage calendars, generate invoices, and manage settings.',
                    'Coordinates core business logic across dedicated backend engines like Booking Service, Occupancy Engine, and Invoice Engine.',
                    'Connects seamlessly to persistent storage (Primary Database, PDF / Media Storage) and third-party services (Razorpay Payment Gateway, OTA Integrations).',
                  ],
                  imagePaths: [],
                },
              ],
            },
            {
              sectionTitle: 'Latency & Optimization',
              sectionDescription: 'How reasoning produces solutions',
              diagrams: [
                {
                  id: 'bas-model-1',
                  number: 0,
                  title: 'User Subscription Billing Pipeline',
                  purpose: 'Map the sequential payment and verification steps required for users to unlock system platform features.',
                  keyPoints: [
                    'Initiates with the user selecting an Active Subscription Plan.',
                    'Routes transaction processing securely through the external Razorpay Gateway.',
                    'Evaluates Payment Success / Failure status to grant or restrict platform Feature Access.',
                  ],
                  imagePaths: [],
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
    <section className="gx-section gx-model-taxonomy">
      <div className="gx-container">
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
              {[...tiers].sort((a, b) => a.id.localeCompare(b.id)).map((tier) => (
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
                            <div key={diagram.id}>
                              <button
                                onClick={() => setActiveDiagram(activeDiagram === diagram.id ? null : diagram.id)}
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
                              
                              {/* Mobile inline diagram viewer - only shows on small screens */}
                              {activeDiagram === diagram.id && currentDiagram && (
                                <div className="lg:hidden mt-3 mb-4 animate-in slide-in-from-top-2 duration-200">
                                  <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
                                    {/* Diagram Image */}
                                    <div className="relative w-full bg-[#F3F4F6] p-4">
                                      {currentDiagram.imagePaths.map((src, index) => (
                                        <div
                                          key={index}
                                          className="relative w-full h-[250px] bg-white rounded-lg border mb-2 last:mb-0"
                                        >
                                          <Image
                                            src={src}
                                            alt={`${currentDiagram.title} — view ${index + 1}`}
                                            fill
                                            className="object-contain p-2"
                                            priority
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    
                                    {/* What to Notice */}
                                    <div className="p-4 border-t border-[#E5E7EB]">
                                      <h4 className="font-semibold text-[#0F172A] mb-2 text-sm">
                                        What to notice
                                      </h4>
                                      <ul className="space-y-1.5">
                                        {currentDiagram.keyPoints.map((point, idx) => (
                                          <li
                                            key={idx}
                                            className="text-xs text-[#475569] flex gap-2"
                                          >
                                            <span className="text-[#334155] font-bold">–</span>
                                            <span>{point}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Diagram Viewer - Desktop only */}
              <div className="hidden lg:block lg:col-span-2">
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
