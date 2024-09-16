import { UserScore } from "./types";

export function addUserScore(name: string, score: number, userScoreList: Array<UserScore>) {
  const user = getUserFromName(name, userScoreList)
  if (user.userId === 0) {
    userScoreList.push({ ...user, userId: userScoreList.length + 1, scores: [score], maxScore: score })
  } else {
    const index = userScoreList.indexOf(user)
    let updatedUser = { ...user, scores: [...user.scores, score].sort((a, b) => b - a) };
    updatedUser.maxScore = updatedUser.scores[0]
    userScoreList[index] = updatedUser;
  }
}

export function sortUsers(users: Array<UserScore>) {
  return users.sort((a, b) => b.maxScore - a.maxScore)
}

function getUserFromName(name: String, userScoreList: Array<UserScore>) {
  const nameCheck = userScoreList.filter(user => user.name === name);
  if (nameCheck.length > 0) {
    return nameCheck[0]
  } else {
    const user = { userId: 0, name: name, scores: [], maxScore: 0 };
    return user;
  }
}