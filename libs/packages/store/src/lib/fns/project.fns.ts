import { map } from 'rxjs/operators';
import {
  CollaborativeProject,
  CreateProjectParams,
  DEFAULT_PLATFORM_PROJECT_TYPE_DICT,
  Project,
  ProjectType
} from '../models/project.model';
import { hasDuplicatesByKey } from '@ngpat/fn';

export const checkForDuplicateProjectTypes = map((d: ProjectType[]) => {
  if (hasDuplicatesByKey(d, 'id')) {
    const errorMsg =
      'Platform Configuration Error: Duplicate ProjectType Value detected.';
    console.error(errorMsg);
    return new Error(errorMsg);
  } else if (hasDuplicatesByKey(d, 'name')) {
    const errorMsg =
      'Platform Configuration Error: Duplicate ProjectType Name detected.';
    console.error(errorMsg);
    return new Error(errorMsg);
  } else {
    return d;
  }
});

export function getProjectTypeByName(
  name: string,
  projectTypes: ProjectType[]
): ProjectType {
  const projectType: ProjectType | undefined = projectTypes.find(
    (p: ProjectType) => p.name === name
  );
  return projectType ? projectType : DEFAULT_PLATFORM_PROJECT_TYPE_DICT.COURSE;
}

/**
 *
 * @param num - Project Type
 * @param projectTypes
 */
export function getProjectTypeByNumber(
  num: number,
  projectTypes: ProjectType[]
): ProjectType {
  const projectType: ProjectType | undefined = projectTypes.find(
    (p: ProjectType) => p.id === num
  );
  return projectType ? projectType : DEFAULT_PLATFORM_PROJECT_TYPE_DICT.QUIZ;
}

export const getProjectTypeByNamePipe = map(
  ([name, projectTypes]: [string, ProjectType[]]) => {
    return getProjectTypeByName(name, projectTypes);
  }
);

export function projectTypeIsQuiz(projectType: number) {
  return DEFAULT_PLATFORM_PROJECT_TYPE_DICT.QUIZ.id === projectType;
}

export function projectTypeIsStudyGroup(projectType: number) {
  return DEFAULT_PLATFORM_PROJECT_TYPE_DICT.STUDY_GROUP.id === projectType;
}

export function createProjectParamsObject(
  p: Project | CollaborativeProject
): CreateProjectParams {
  return <CreateProjectParams>{
    id: p.id,
    projectTypeValue: p.projectType,
    name: p.name,
    description: p.description,
    isCollaborative: p.isCollaborative,
    isPrivate: p.isPrivate
  };
}

export function createProjectParamsFromParentProject(
  p: Project | CollaborativeProject
): CreateProjectParams {
  return <CreateProjectParams>{
    id: p.parentProjectID,
    projectTypeValue: p.parentProjectType,
    name: p.name,
    description: p.description,
    isCollaborative: p.isCollaborative,
    isPrivate: p.isPrivate
  };
}
