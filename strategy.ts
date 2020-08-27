import { Pessoa } from "./Pessoa.ts";

// Strategy é um pattern para minimizar o uso
// de condicionais no código ao mesmo tempo que
// permite a execução de lógicas mais complexas
// através de polimorfismo.
// Por exp: Para calcular a idade de uma pessoa de diferentes maneiras podemos criar várias estratégias.
// Uma que conte a partir o 0 como uma idade e uma que conte como uma pessoa normal.

/**
 * Descreve uma pessoa com data de nascimento "bruta".
 */
interface PessoaComNascimento extends Pessoa {
  dataNascimento: Date;
}

/**
 * Descreve a interface para o cálculo da idade de um pessoa.
 */
abstract class PessoaIdadeStrategy {
  constructor(protected readonly refPessoa: PessoaComNascimento) {}
  abstract getIdade(): number;

  protected getYearDiff(): number {
    return new Date().getFullYear() -
      this.refPessoa.dataNascimento.getFullYear();
  }
}

class PessoaComplexaComIdade implements PessoaComNascimento {
  nome: string = "";
  get idade(): number {
    return this.idadeCalculator?.getIdade() ?? 0;
  }
  dataNascimento: Date = new Date();
  biografia?: string;
  idadeCalculator: PessoaIdadeStrategy = new PessoaNormalIdadeStrategy(this);
}

class ProgramadorIdadeStrategy extends PessoaIdadeStrategy {
  constructor(p: PessoaComNascimento) {
    super(p);
  }
  getIdade(): number {
    return this.getYearDiff() - 1;
  }
}

class PessoaNormalIdadeStrategy extends PessoaIdadeStrategy {
  constructor(p: PessoaComNascimento) {
    super(p);
  }
  getIdade(): number {
    return this.getYearDiff();
  }
}

const guilherme = new PessoaComplexaComIdade();
guilherme.nome = "José Guilherme";
guilherme.dataNascimento = new Date(1991, 2, 12);
console.log(guilherme.idade);
guilherme.idadeCalculator = new ProgramadorIdadeStrategy(guilherme);
console.log(guilherme.idade);
