# D3 WordCloud React

**Idiomas:** [English](README.md) · [Português (Brasil)](README.pt-BR.md) · [Italiano](README.it.md)

**Palavras tornam-se mundos.** Uma biblioteca React com layout D3 e API tipada para nuvens de palavras expressivas, mantida independentemente pela Cecil-IA Labs.

**[Explorar o WordCloud Studio](https://cecil-ia-labs.github.io/d3-wordcloud-react/)** · **[Instalar pelo npm](https://www.npmjs.com/package/@cecilialabs/d3-wordcloud-react)** · **[Código-fonte](https://github.com/cecil-ia-labs/d3-wordcloud-react)**

## O que a biblioteca permite

Visualize a frequência ou relevância de termos em nuvens de palavras responsivas. É possível controlar pesos, cores, tamanho de fonte, espiral, rotação, tooltips e interações de mouse.

A API principal é **`ReactWordCloud`**, com alias compatível `ReactWordcloud`. Recebe `words`, `options`, `callbacks` e dimensões opcionais.

## Primeiros passos

```bash
npm install @cecilialabs/d3-wordcloud-react
```

```tsx
import { ReactWordCloud } from '@cecilialabs/d3-wordcloud-react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const words = [
  { text: 'pesquisa', value: 42 },
  { text: 'design', value: 28 },
  { text: 'código aberto', value: 18 },
];

export function Nuvem() {
  return <ReactWordCloud words={words} />;
}
```

Confira [docs/README.legacy.en.md](docs/README.legacy.en.md) e [src/types.ts](src/types.ts) para exemplos avançados de opções e callbacks.

## Estado e compatibilidade

A versão atual declara **React `^18.3.1`** como dependência peer. Suporte ao React 19 não deve ser presumido sem validação específica. O fork TypeScript inclui integração D3, testes e ferramentas de desenvolvimento.

O WordCloud Studio é um showroom com visualização SVG ilustrativa, **não executa o algoritmo real de colisão e posicionamento do D3** e não realiza benchmarks.

## Origem e licença

Fork independente de [react-wordcloud, de Chris Zhou](https://github.com/chrisrzhou/react-wordcloud), com manutenção posterior da Cecil-IA Labs. O copyright original e a licença MIT permanecem preservados em [NOTICE.md](NOTICE.md) e [LICENSE](LICENSE). A licença permite modificações, redistribuição e uso comercial com os avisos necessários.

Para desenvolvedores e agentes: [AGENTS.md](AGENTS.md), [skills do projeto](.agents/skills/) e [referência técnica](docs/README.legacy.en.md).
