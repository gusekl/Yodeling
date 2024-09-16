import React, { useState } from "react";
import { Box, Button, Collapse, H4, Flex } from "@northlight/ui";
import { ChevronDownDuo, ChevronUpDuo } from "@northlight/icons";

import { UserScore } from "../../util/types";
import { UserInfoCard } from "./userInfoCard";

interface ScorelistRowProps {
  user: UserScore
}

export function ScorelistRow(props: ScorelistRowProps) {
  const { user } = props;

  const [show, setShow] = useState(false)

  const toggleCollapse = () => {
    setShow(previous => !previous)
  }

  const handleCorners = () => {
    return show ? '0' : 'auto';
  }

  const renderChevron = () => {
    return show ? <ChevronUpDuo /> : <ChevronDownDuo />
  }

  return (
    <Box w={'100%'}>
      <Button w={'100%'} onClick={toggleCollapse} roundedBottom={handleCorners()}>
        <Flex w={'100%'} flexDir={'row'} justifyContent={'space-between'}>
          <H4>
            {user.name} - {user.maxScore}
          </H4>
          {renderChevron()}
        </Flex>
      </Button>
      <Collapse in={show}>
        <Box bg={'#f5f5f5'} roundedBottom={'8'}>
          <UserInfoCard user={user} />
        </Box>
      </Collapse>
    </Box>
  )
}