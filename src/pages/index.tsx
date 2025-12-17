import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const startLearningHref = '/docs/humanoid-physical-ai/introduction';

const modules = [
  {
    title: 'Robotic Nervous System (ROS 2)',
    description: 'Middleware, nodes, topics, services, URDF basics for coordinated motion.',
    icon: 'ROS',
  },
  {
    title: 'Digital Twin (Gazebo & Unity)',
    description: 'Simulate physics, test perception, validate motion before hardware.',
    icon: 'Twin',
  },
  {
    title: 'AI-Robot Brain (NVIDIA Isaac)',
    description: 'Perception and planning loops tuned for embodied intelligence.',
    icon: 'AI',
  },
  {
    title: 'Vision-Language-Action (VLA)',
    description: 'Connect language models to robot actions with grounded semantics.',
    icon: 'VLA',
  },
  {
    title: 'Capstone Project',
    description: 'Integrate all modules into a humanoid demo workflow end-to-end.',
    icon: 'Cap',
  },
  {
    title: 'Industry-Aligned',
    description: 'Best practices for safety, testing, and deployment in the field.',
    icon: 'Ops',
  },
];

const highlights = [
  {title: 'Embodied Intelligence', description: 'Robots that learn from contact, feedback, and continuous sensing.'},
  {title: 'Humanoid Systems', description: 'Human-scale kinematics, dexterous manipulation, and compliant motion.'},
  {title: 'Safety & Deployment', description: 'Validation, fallbacks, and operational readiness for real environments.'},
];

export default function Home(): JSX.Element {
  const handleScrollToModules = (): void => {
    const el = document.getElementById('modules');
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <Layout title="Physical AI & Humanoid Robotics" description="Premium landing page for the robotics learning portal.">
      <main>
        <section className="hpaiHero">
          <div className="container">
            <div className="hpaiBadge">Hackathon Project Documentation</div>
            <h1 className="hpaiTitle">Physical AI &amp; Humanoid Robotics</h1>
            <p className="hpaiSubtitle">A comprehensive guide to robotics, AI, and humanoid systems.</p>
            <div className="hpaiPills">
              {['ROS 2', 'Digital Twin', 'Humanoid AI'].map((pill) => (
                <span key={pill} className="hpaiPill">
                  {pill}
                </span>
              ))}
            </div>
            <div className="hpaiBtns">
              <Link className="hpaiPrimary" to={startLearningHref}>
                Start Learning
              </Link>
              <button type="button" className="hpaiSecondary" onClick={handleScrollToModules}>
                Explore Modules
              </button>
            </div>
          </div>
        </section>

        <section id="modules" className="hpaiSection">
          <div className="container">
            <div className="hpaiSectionHead">
              <div>
                <p className="hpaiBadge">Structured Curriculum</p>
                <h2>Learning Modules</h2>
                <p className="hpaiSubtitle">Build mastery across robotics middleware, simulation, AI planning, and deployment.</p>
              </div>
            </div>
            <div className="hpaiGrid">
              {modules.map((module) => (
                <div key={module.title} className="hpaiCard">
                  <div className="hpaiCardIcon" aria-hidden>
                    {module.icon}
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hpaiSection">
          <div className="container">
            <div className="hpaiSectionHead">
              <div>
                <p className="hpaiBadge">Why this matters</p>
                <h2>From research to real robots</h2>
                <p className="hpaiSubtitle">Shape the roadmap for humanoid systems that are safe, capable, and useful.</p>
              </div>
            </div>
            <div className="hpaiGrid hpaiHighlights">
              {highlights.map((item) => (
                <div key={item.title} className="hpaiCard">
                  <div className="hpaiCardIcon" aria-hidden>
                    Key
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hpaiCtaBand">
          <div className="container">
            <div>
              <p className="hpaiBadge">Next step</p>
              <h3>Ready to build your humanoid roadmap?</h3>
              <p className="hpaiSubtitle">Open the book and follow the guided path across middleware, simulation, and embodied AI.</p>
            </div>
            <Link className="hpaiPrimary" to={startLearningHref}>
              Open the Book
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
