'use client';

import { Container, Paper, Typography } from "@mui/material"
import { SantaLetterForm } from "./SantaLetterForm"

interface PageProps {
  title?: string
}

const LetterToSantaPage: React.FC<PageProps> = (props) => {
  return (
    <Container>
      <Paper sx={{
        mt: 20,
        p: 2
      }}>
        <Typography variant="h3">A Letter to Santa</Typography>
        <SantaLetterForm/>
      </Paper>
    </Container>
  )
}

export {
  LetterToSantaPage
}