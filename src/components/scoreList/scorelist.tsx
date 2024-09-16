import React from "react";
import { Box, VStack } from '@northlight/ui'

import { UserScore } from "../../util/types";
import { ScorelistRow } from "./scorelistRow";

interface ScorelistProps {
  userScores: Array<UserScore>
}

export function Scorelist(props: ScorelistProps) {
  const { userScores } = props;

  const displayUsers = () => {
    const result: React.ReactElement[] = userScores.map(user => {
      return (
        <ScorelistRow user={user} key={user.userId} />
      )
    });
    return result;
  };

  return (
    <VStack w={'100%'}>
      {displayUsers()}
    </VStack>
  );
}