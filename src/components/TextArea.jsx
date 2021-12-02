import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { MyContext } from '../context/Provider';

const placeholder = `
[*] 13h00 às 13h50 - Mentoria
14h00 às 14h45 - Abertira
14h45 às 16h20 - Conteúdo
16h20 às 18h00 - Aula ao Vivo 
[*] 18h40 às 19h30 - Mentorias técnicas
19h30 às 19h40 - Feedback
19h40 às 20h00 - Fechamento
`;

export default function TextArea() {
  const { isSignedIn, changeScheduleValue } = useContext(MyContext);
  return (
    <TextField
      fullWidth
      multiline
      variant="filled"
      onChange={ ({ target: { value } }) => changeScheduleValue(value) }
      disabled={ !isSignedIn }
      placeholder={ placeholder }
      rows={ 10 }
      label="Agenda do Dia"
    />
  );
}
