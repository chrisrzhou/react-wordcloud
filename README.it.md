# D3 WordCloud React

**Lingue:** [English](README.md) · [Português (Brasil)](README.pt-BR.md) · [Italiano](README.it.md)

**Le parole diventano mondi.** Una libreria React per word cloud basate su layout D3 e interfacce tipizzate, mantenuta indipendentemente da Cecil-IA Labs.

**[Visita WordCloud Studio](https://cecil-ia-labs.github.io/d3-wordcloud-react/)** · **[Installa da npm](https://www.npmjs.com/package/@cecilialabs/d3-wordcloud-react)** · **[Codice sorgente](https://github.com/cecil-ia-labs/d3-wordcloud-react)**

## Cosa permette di creare

Word cloud reattive e interattive che mostrano frequenza e importanza delle parole. Personalizza pesi, colori, dimensioni, spirali, rotazioni, tooltip e interazioni del mouse.

L'API principale esporta **`ReactWordCloud`** e l'alias compatibile `ReactWordcloud`; accetta `words`, `options`, `callbacks` e dimensioni opzionali.

## Per iniziare

```bash
npm install @cecilialabs/d3-wordcloud-react
```

```tsx
import { ReactWordCloud } from '@cecilialabs/d3-wordcloud-react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const words = [
  { text: 'ricerca', value: 42 },
  { text: 'design', value: 28 },
  { text: 'open source', value: 18 },
];

export function Nuvola() {
  return <ReactWordCloud words={words} />;
}
```

Per l'API completa, vedi [la documentazione tecnica](docs/README.legacy.en.md) e [src/types.ts](src/types.ts).

## Stato e compatibilità

Il pacchetto dichiara **React `^18.3.1`** come dipendenza peer. Il supporto a React 19 non è confermato senza test specifici. Questo fork TypeScript include integrazione D3, test e strumenti di sviluppo.

WordCloud Studio è una presentazione con un SVG illustrativo originale: **non esegue il motore D3 di collisione e posizionamento**, né rappresenta un benchmark.

## Origini e licenza

Fork indipendente di [react-wordcloud di Chris Zhou](https://github.com/chrisrzhou/react-wordcloud), mantenuto separatamente da Cecil-IA Labs. I copyright originari e la licenza MIT sono preservati in [NOTICE.md](NOTICE.md) e [LICENSE](LICENSE). Sono permesse modifiche, ridistribuzione e versioni commerciali con gli avvisi previsti.

Per sviluppatori e agenti: [AGENTS.md](AGENTS.md), [skill locali](.agents/skills/) e [documentazione tecnica](docs/README.legacy.en.md).
