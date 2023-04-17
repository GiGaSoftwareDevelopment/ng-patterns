import { UserPermissions } from '../models/user.model';
import { InjectionToken } from '@angular/core';
import { TimeStamp } from './time-stamp.model';

export interface Project {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  isCollaborative: boolean;
  projectType: number;
  parentProjectType: number | null;
  parentProjectID: string | null;
  isDefault: boolean;
  createdAt: TimeStamp | null; // firebaseConfig.firestore.FieldValue;
  updatedAt: TimeStamp | null; // firebaseConfig.firestore.FieldValue;
}

export interface CollaborativeProject extends Project, UserPermissions {
  // joinCode: string;
  studentCode: string;

  /**
   * given to parent, guardian, mentor, etc.
   */
  mentorCode: string;
  teacherCode: string;
}

export type CollaborationProjectForm = Extract<
  Project,
  'name' | 'description' | 'isPrivate' | 'isCollaborative'
>;

export type ProjectTypeValue = 'researchTopic' | 'investigation' | 'course';

/**
 * If changed, verify updated at
 * libs/web-platform/data-access/src/lib/+project/project.fns.ts:18
 */
export interface ProjectType {
  name: string;
  id: number;
}

export interface DefaultProjectTypeDict {
  PRIVATE: ProjectType;
  RESEARCH: ProjectType;
  INVESTIGATION: ProjectType;
  COURSE: ProjectType;
  QUIZ: ProjectType;
  STUDY_GROUP: ProjectType;
  CLASS: ProjectType;
}

export const DEFAULT_PLATFORM_PROJECT_TYPE_DICT: DefaultProjectTypeDict = {
  PRIVATE: {
    name: 'Private',
    id: 0
  },
  QUIZ: {
    name: 'Quiz',
    id: 1
  },
  COURSE: {
    name: 'Course',
    id: 2
  },
  STUDY_GROUP: {
    name: 'Study Group',
    id: 3
  },
  CLASS: {
    name: 'Class',
    id: 4
  },
  RESEARCH: {
    name: 'Research',
    id: 5
  },
  INVESTIGATION: {
    name: 'Investigation',
    id: 6
  }
};

export const PLATFORM_PROJECT_TYPES: ProjectType[] = Object.values(
  DEFAULT_PLATFORM_PROJECT_TYPE_DICT
);

export const PROJECT_TYPE_BY_ID = new InjectionToken('PROJECT_TYPE_BY_ID');

export interface ProjectTypeByID {
  [key: string]: ProjectType;
}

export const PROJECT_TYPE_BY_ID_DICT = PLATFORM_PROJECT_TYPES.reduce(
  (a: { [key: string]: ProjectType }, i: ProjectType) => {
    a[i.id.toString(10)] = i;

    return a;
  },
  {}
);

export interface CreateProjectParams {
  id: string;
  projectTypeValue: number;
  name: string;
  description: string;
  isCollaborative: boolean;
  isPrivate: boolean;
  assigned?: boolean; // only used for quiz
}

export interface CreateSubProjectParams extends CreateProjectParams {
  parentProject: Project;
}

export interface UrlProps {
  SGID: string;
  CRID: string; // ClassroomID
  STU: string; // STUDENT
  QUIZ: string;
  REVIEW: string;
}

export const URL_PROPS: UrlProps = {
  SGID: 'sgid',
  CRID: 'crid',
  STU: 'stu',
  QUIZ: 'quiz',
  REVIEW: 'review'
};

export type JoinCodeType = 'mentor' | 'student' | 'teacher';

export enum JoinCodeTypes {
  MENTOR = 'mentor',
  STUDENT = 'student',
  TEACHER = 'teacher'
}
