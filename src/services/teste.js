const filterTime = (string) => string.split(' ').filter((str) => (
  str.match(/([0-2][0-9]h[0-5][0-9])/) || str.match(/([0-2][0-9]h)/)))
  .map((str) => {
    if (str.match(/([0-2][0-9]h[0-5][0-9])/)) {
      return str;
    }
    return `${str}00`;
  });

const filterString = (string) => {
  const regex = /([0-2][0-9]h[0-5][0-9])/;
  return string
    .split('\n')
    .filter((str) => str.match(regex))
    .map((line) => {
      const startTime = filterTime(line)[0].replace('h', ':').trim();
      const endTime = filterTime(line)[1].replace('h', ':').trim();
      const title = line
        .replace(/-/g, '').trim();
      const optionalLine = line.includes('[*]') || line.includes('(*)');
      return {
        title,
        startTime,
        endTime,
        description: optionalLine ? 'Momento opcional' : '',
      };
    });
};

const agendaDoDia = `
:fogo: 14h00 até 15h00 - Esquenta [Zoom]
:quadrado_preto_pequeno:Divulgação dos finalistas do Torneio de Lógica + Novidade do Matheuzão
[*] :relógio_cronômetro: 15h10 às 17h00 - Embelezando seu conhecimento sobre CSS  [Zoom] [Slido]
:quadrado_preto_pequeno:Vamos praticar e debater sobre as diferentes abordagens de CSS em React
:apontando_para_a_direita: Para quem ainda está com projetos em aberto
[*] :cérebro: 17h30 às 19h10 - Mentorias de projetos [Zoom] [Slido]
Salas divididas por projeto:
:porta: Tryunfo
:porta: Trybetunes
:porta: Frontend Online Store
:porta: Testes em React
:apontando_para_a_direita:  Para quem está ontrack
[*] :champanhe: 17h30 às 19h00 - Final da Logic Championship   [Zoom]
[*] :champanhe: 19h00 às 19h20 - Anúncio dos vencedores da Logic Championship   [Zoom]
[*] :lupa_direita: Desafio Elementar puxado pela super dupla de Embaixas da Tribo B.
Mais infos aqui.
:ensolarado: Conta pra gente como foi o seu primeiro dia da semana "Ficar On track"
:cadeado: 19h30 às 20h00 - Fechamento do Ano de 2021   [Zoom] Senha de acesso: 123456789
:quadrado_preto_pequeno:é meu povo, acabou! Vamos juntar todas as turmas para fazer um fechamento do ano.
`;

console.log(filterString(agendaDoDia));
