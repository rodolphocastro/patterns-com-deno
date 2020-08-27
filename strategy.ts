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
  abstract getIdade(p: PessoaComNascimento): number;
  protected getYearDiff(rhs: Date, lhs: Date = new Date()): number {
    return lhs.getFullYear() - rhs.getFullYear();
  }
}

class PessoaComplexaComIdade implements PessoaComNascimento {
  nome: string = "";
  get idade(): number {
    return this.idadeCalculator?.getIdade(this);
  }
  dataNascimento: Date = new Date();
  biografia?: string;
  idadeCalculator: PessoaIdadeStrategy = new PessoaNormalIdadeStrategy();
}

class ProgramadorIdadeStrategy extends PessoaIdadeStrategy {
  getIdade(p: PessoaComNascimento): number {
    return this.getYearDiff(p.dataNascimento) - 1;
  }
}

class PessoaNormalIdadeStrategy extends PessoaIdadeStrategy {
  getIdade(p: PessoaComNascimento): number {
    return this.getYearDiff(p.dataNascimento);
  }
}

const guilherme = new PessoaComplexaComIdade();
guilherme.nome = "José Guilherme";
guilherme.dataNascimento = new Date(1991, 2, 12);
console.log(guilherme.idade);
guilherme.idadeCalculator = new ProgramadorIdadeStrategy();
console.log(guilherme.idade);
