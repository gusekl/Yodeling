import { Box, Button, Form, H2, NumberInputField, VStack, TextField, useForm, } from "@northlight/ui";
import { HStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

interface FormContents {
  name: string
  score: number | string
}

interface AddUserScoreProps {
  parentHandleSubmit: (name: string, score: number) => void
}

export function AddUserScore(props: AddUserScoreProps) {
  const { parentHandleSubmit } = props

  const toast = useToast();

  const handleSubmit = (data: FormContents) => {
    parentHandleSubmit(data.name, data.score as number);
    toast({
      title: "Score added",
      description: `Score: ${data.score} added for ${data.name}`,
      isClosable: true,
      position: 'top',
      duration: 1000
    });
    console.log(data);
  }

  return (
    <Box>
      <H2 paddingBottom={'2'}>Add Score</H2>
      <Form onSubmit={handleSubmit} initialValues={{
        name: '',
        score: ''
      }}
      >{({ reset }) => (
        <VStack alignSelf={'start'}>
          <TextField isRequired name="name" label="Enter name" />
          <TextField type={'number'} isRequired name="score" label="Enter score" />
          <HStack>
            <Button type={"submit"}>Add score</Button>
            <Button type={'button'} variant={'danger'} onClick={() => reset()}>Clear fields</Button>
          </HStack>
        </VStack>
      )}
      </Form>
    </Box>
  )
}