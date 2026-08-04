import { TEAM_NUM } from './data.js';

const teamsPoint = new Array(TEAM_NUM);
teamsPoint.fill(0);

export function getPoints(teamNumber) {
  let num = parseInt(teamNumber);
  if (isNaN(num) || num > TEAM_NUM) return;
  return teamsPoint[num];
}
export function increasePoint(teamNumber) {
  let num = parseInt(teamNumber);
  if (isNaN(num) || num > TEAM_NUM) return;
  teamsPoint[num] = teamsPoint[num] + 1;

  return teamsPoint[num];
}
export function decreasePoint(teamNumber) {
  let num = parseInt(teamNumber);
  if (isNaN(num) || num > TEAM_NUM) return;
  if (teamsPoint[num] > 0) teamsPoint[num] = teamsPoint[num] - 1;
  return teamsPoint[num];
}
