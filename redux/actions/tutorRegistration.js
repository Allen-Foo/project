import {
  SET_TUTORPROFILE,
  SET_SELFINTRO,
  SET_PROFESSION,
  SET_EXPERIENCE,
  SET_ACHIEVEMENT,
} from '../types'

export function setTutorProfile(profile) {
  return {
    type: SET_TUTORPROFILE,
    payload: profile
  };
}

export function setSelfIntro(selfIntro) {
  return {
    type: SET_SELFINTRO,
    payload: selfIntro
  };
}

export function setProfession(profession) {
	return {
    type: SET_PROFESSION,
    payload: profession
  };
}

export function setExperience(experience) {
	return {
    type: SET_EXPERIENCE,
    payload: experience
  };
}

export function setAchievement(achievement) {
  return {
    type: SET_ACHIEVEMENT,
    payload: achievement
  };
}