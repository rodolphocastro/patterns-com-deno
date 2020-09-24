// State é um pattern para auxiliar no controle de "estados"
// de um objeto. Como uma máquina de estados.

import { Pessoa } from "./Pessoa.ts";

interface Educavel {
  Formar(): void;
  Esquecer(): void;
}

abstract class NivelEducacaoPessoa implements Educavel {
  constructor(
    protected readonly p: PessoaEducada,
    public readonly desc: string,
  ) {
  }

  public abstract Formar(): void;
  public abstract Esquecer(): void;
}

class NaoEducado extends NivelEducacaoPessoa {
  constructor(p: PessoaEducada) {
    super(p, "Não Educado");
  }

  public Formar(): void {
    this.p.idade += 1;
    this.p.setEstado(new EducadoFundamental(this.p));
  }

  public Esquecer(): void {
    return;
  }
}

class EducadoFundamental extends NivelEducacaoPessoa {
  public Formar(): void {
    this.p.idade += 1;
    this.p.setEstado(new EducadoMedio(this.p));
  }

  public Esquecer(): void {
    this.p.setEstado(new NaoEducado(this.p));
  }

  constructor(p: PessoaEducada) {
    super(p, "Ensino Fundamental");
  }
}

class EducadoMedio extends NivelEducacaoPessoa {
  private tentativas = 0;

  public Formar(): void {
    this.p.idade += 1;
    if (this.tentativas > 2) {
      this.p.setEstado(new EducadoOverrated(this.p));
    }
    this.tentativas += 1;
  }

  public Esquecer(): void {
    this.p.setEstado(new EducadoFundamental(this.p));
  }

  constructor(p: PessoaEducada) {
    super(p, "Ensino Medio");
  }
}

class EducadoOverrated extends NivelEducacaoPessoa {
  constructor(p: PessoaEducada) {
    super(p, "Overrated");
  }

  public Formar(): void {
  }

  public Esquecer(): void {
    this.p.setEstado(new EducadoMedio(this.p));
  }
}

class PessoaEducada implements Pessoa, Educavel {
  //private educacao = 1;
  // 1 -> Fundamental
  // 2 -> Medio
  // 3 -> Overrated
  // educacao++
  // educacao--
  // switch(educacao) => "Fundamental" | "Medio" | "Overrated" | "Aposentado"
  private nivelEducacao = new NaoEducado(this);

  constructor(
    public readonly nome: string,
    public idade: number,
    public readonly biografia?: string,
  ) {
  }

  public setEstado(n: NivelEducacaoPessoa) {
    this.nivelEducacao = n;
  }

  private estudar() {
    this.nivelEducacao.Formar();
  }

  private aloprar() {
    this.nivelEducacao.Esquecer();
  }

  Formar() {
    this.estudar();
  }
  Esquecer() {
    this.aloprar();
  }

  get nomeFormacao() {
    return this.nivelEducacao.desc;
  }
}

const guilherme: Educavel = new PessoaEducada(
  "José Guilherme",
  29,
  "Um cara que quer se formar e esquecer",
);
console.dir(guilherme);
guilherme.Formar();
console.dir(guilherme);
guilherme.Esquecer();
console.dir(guilherme);
guilherme.Formar();
guilherme.Formar();
guilherme.Formar();
console.dir(guilherme);
guilherme.Formar();
guilherme.Formar();
console.dir(guilherme);

const educa = (e: Educavel) => e.Formar();
educa(
  {
    Formar: () => console.log("me formei"),
    Esquecer: () => console.log("esqueci, doh"),
  },
);
educa(guilherme);
educa(guilherme);
educa(guilherme);
educa(guilherme);
console.dir(guilherme);
