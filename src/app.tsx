import React, { useState } from 'react'
import {
  Container,
  Box,
  H2,
  VStack,
  Card,
  Wrap,
  WrapItem,
} from '@northlight/ui'
import { useToast } from '@chakra-ui/react'

import { users, scores } from './data'
import { AddUserScore, ExcelDropzone, Scorelist } from './components'
import { UserScore, ExcelRow } from './util/types'
import { addUserScore, sortUsers } from './util/helperFunctions'

export default function App() {
  const toast = useToast();
  const [userScores, setUserScores] = useState(() => initUsers())

  function initUsers(): Array<UserScore> {
    const initialUserScores = users.map(user => {
      const userScores = scores.filter(score => score.userId == user._id).map(score => score.score).sort((a, b) => b - a);
      return {
        userId: user._id,
        name: user.name,
        scores: userScores,
        maxScore: userScores[0]
      }
    })
    return sortUsers(initialUserScores);
  }

  function handleSheetData(data: ExcelRow[]) {
    let userScoresFromSheet = [...userScores]
    data.forEach(row => {
      addUserScore(row.name, row.score, userScoresFromSheet)
    })
    setUserScores(sortUsers(userScoresFromSheet))
    toast({
      title: 'Scores added from excel',
      position: 'top',
      isClosable: true
    })
  }

  function handleAddUserSubmit(name: string, score: number) {
    console.log(name, score)
    let mutable = [...userScores]
    addUserScore(name, score, mutable)
    setUserScores(sortUsers(mutable))
  }

  return (
    <Container maxW="6xl" padding="12">
      <Wrap spacing={5} justify={'center'} align={'flex-start'} w={'100%'}>
        <WrapItem>
          <VStack align={'center'} spacing={5}>
            <Card minW={'320px'} padding={'4'} w={'100%'}>
              <H2 alignSelf={'start'} paddingBottom={'2'}>Upload scores</H2>
              <Box w={'100%'} px={'10%'}>
                <ExcelDropzone
                  onSheetDrop={handleSheetData}
                  label="Import excel file here"
                />
              </Box>
            </Card>
            <Card minW={'320px'} padding={'4'} w={'100%'}>
              <Box w={'100%'}>
                <AddUserScore parentHandleSubmit={handleAddUserSubmit} />
              </Box>
            </Card>
          </VStack>
        </WrapItem>
        <WrapItem>
          <Card minW={'320px'} maxH={'555px'} padding={'4'} height={'100%'} w={'100%'}>
            <VStack h={'100%'} spacing={4} align={'center'} overflow={'scroll'} p={'0'}>
              <H2 alignSelf={'start'}>Scorelist</H2>
              <Scorelist userScores={userScores} />
            </VStack>
          </Card>
        </WrapItem>
      </Wrap>
    </Container>
  )
}
