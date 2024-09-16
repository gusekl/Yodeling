import React, { ReactElement } from "react";
import { H6, Text, VStack } from '@northlight/ui';

import { UserScore } from "../../util/types";

interface UserInfoCardProps {
  user: UserScore
};

export function UserInfoCard(props: UserInfoCardProps) {
  const { user } = props;

  function renderInfo() {
    const result: ReactElement[] = [];
    let key = 0;
    user.scores.forEach(score => {
      result.push(
        <Text fontSize={"sm"} key={key}>
          {score}
        </Text>
      )
      key++;
    });
    return result;
  };

  return (
    <VStack w={'100%'} align={'center'}>
      <H6 paddingTop={'2'}>All {user.name}'s scores:</H6>
      {renderInfo()}
    </VStack>
  );
}