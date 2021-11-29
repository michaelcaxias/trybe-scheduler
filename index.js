const string = `
[*] 13h00 às 13h50 - Mentorias técnicas - Zoom | Slido
         :cabeça_para_baixo:  Não existe dúvida boba
14h00 às 14h30 - Momento soft skills - Introdução ao Pensamento Crítico e Etapas para resolução de problemas Assíncrono :computador:
14h30 às 16h40 - Conteúdo :desktop:
16h40 às 18h20 - Aula ao Vivo :bandeira_quadriculada:- Zoom | Slido
[*] 18h40 às 19h30 - Mentorias técnicas - Zoom | Slido
        :sofá_e_abajur:  Lounge e cafezinho :café:
        :lápis_com_borracha:   Exercícios do dia
         :cabeça_para_baixo:  Não existe dúvida boba
19h30 às 19h40 - É hora do feedback :estrela_brilhante:
19h40 às 20h00 - Fechamento :cadeado_com_chave: - Zoom
`;

const arrayOfStrings = string
.split('\n')
.filter(line => line)
.map(filterLines => filterLines.split(/zoom/i)[0])
.filter(char => char[0] !== ' ')
.map(filterLines => {
  const filterObligated = filterLines.split('[*]')
  return filterObligated[1] ? filterObligated[1].trim() : filterObligated[0]
})
.map(filterLines => {
  const filterArray = filterLines.split('-')
  return {
    title: filterArray[1].trim(),
    time: filterArray[0].trim(),
  }
})

console.log(arrayOfStrings);