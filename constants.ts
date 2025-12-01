import { PersonalInfo, ExperienceItem, SkillItem } from './types';
import { BookOpen, Award, Users, Mic, Brain, Microscope, Globe, Star } from 'lucide-react';

export const PERSONAL_INFO: PersonalInfo = {
  name: "Samia Farhana Zarin",
  class: "XI",
  section: "D",
  roll: "4089",
  id: "250890",
  institution: "DCGPSC"
};

export const INTRODUCTION = `I am a dedicated and enthusiastic student with a strong passion for science, research, and academic activities. I enjoy engaging in scientific discussions, participating in competitions, and contributing to meaningful learning environments. Through various school activities and external programs, I have developed leadership, communication, and analytical skills that support my growth as a science learner.`;

export const ROLES_RESPONSIBILITIES: ExperienceItem[] = [
  {
    title: "Science Activities",
    description: "Actively participated in science-related activities and discussions within school.",
    icon: "Microscope"
  },
  {
    title: "Club Leadership",
    description: "Served as the Head of the Science Club in my former institution, contributing to planning club activities and guiding members.",
    icon: "Users"
  },
  {
    title: "Event Organizer",
    description: "Assisted in organizing and participating in academic events, quizzes, and club sessions.",
    icon: "BookOpen"
  }
];

export const SKILLS: SkillItem[] = [
  {
    category: "Leadership & Social",
    skills: ["Team Leadership", "Event Organization", "Collaboration", "Mentoring Peers"]
  },
  {
    category: "Communication",
    skills: ["Public Speaking", "Diplomacy", "Debate (MUN)", "Presentation"]
  },
  {
    category: "Academic",
    skills: ["Biology", "Scientific Research", "Critical Thinking", "Analytical Analysis"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Olympiad Participation",
    role: "Participant",
    description: "Took part in competitive science Olympiad examinations, enhancing problem-solving skills and subject knowledge.",
    icon: "Brain"
  },
  {
    title: "Science Club Leadership",
    role: "Head of Science Club",
    description: "Contributed to planning, organizing, and encouraging student participation in scientific activities.",
    icon: "Users"
  },
  {
    title: "Lord MUN Session V",
    role: "Delegate of Netherlands",
    description: "Participated as a delegate, improving public speaking, diplomacy, and confidence.",
    icon: "Globe"
  },
  {
    title: "Biology Quiz",
    role: "Champion",
    description: "Secured first place in a Biology quiz conducted by Robiul Sir, showcasing strength in biological concepts.",
    icon: "Award"
  }
];

export const ACHIEVEMENTS = [
  "Head of Science Club (Previous School)",
  "Winner of Biology Quiz (1st Place)",
  "Active Science Olympiad Participant",
  "Delegate of Netherlands, Lord MUN Session V",
  "Consistent Participation in Academic Activities"
];

export const CONCLUSION = `I am committed to expanding my knowledge in the field of science and contributing positively to the Science Club. I aim to take part in future projects, events, and initiatives that encourage scientific curiosity and support a collaborative learning environment.`;
