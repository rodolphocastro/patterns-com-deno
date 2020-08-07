// Decorator é um pattern para encapsular um Objeto/Classe, mantendo os métodos e propriedades esperados
// porém adicionando alguma lógica "a mais".
// Por exemplo: Validação de dados (setters), Logging

interface Pessoa {
  nome: string;
  idade: number;
  biografia?: string;
}

class PessoaComLogica implements Pessoa {
  nome: string;
  idade: number;
  biografia?: string;

  constructor(p: Pessoa) {
    this.nome = p.nome;
    this.idade = p.idade;
    this.biografia = p.biografia;
  }

  get idadeEmDia(): number {
    return 365 * this.idade;
  }
}

class PessoaComLogicaV2 implements Pessoa {
  private pessoaInterna: Pessoa;

  get idade(): number {
    return this.pessoaInterna.idade;
  }

  set idade(novaIdade: number) {
    if (novaIdade <= this.idade) {
      throw new Error("Não é possível rejuvenescer uma pessoa");
    }
    this.pessoaInterna.idade = novaIdade;
  }

  get biografia(): string | undefined {
    return this.pessoaInterna.biografia;
  }

  set biografia(novaBio: string | undefined) {
    this.pessoaInterna.biografia = novaBio;
  }

  get nome(): string {
    return this.pessoaInterna.nome;
  }

  set nome(novoNome: string) {
    this.pessoaInterna.nome = novoNome;
  }

  constructor(p: Pessoa) {
    this.pessoaInterna = p;
  }

  get idadeEmDia() {
    return 365 * this.idade;
  }
}

const guilherme = new PessoaComLogica({
  nome: "José Guilherme",
  idade: 29,
});

const cesar: Pessoa = new PessoaComLogicaV2({
  nome: "Cesar Camillo",
  idade: 24,
  biografia: "24 aninhos 😉",
});

console.log(guilherme);
console.log(guilherme.nome);
console.log(guilherme instanceof PessoaComLogica);

console.log(cesar);
console.log(cesar.nome);
// cesar.idade = 20 <-- Resultará em error (vide o setter do v2)
console.log(cesar instanceof PessoaComLogica);

const canDrink = ({ idade }: Pessoa): boolean => {
  return idade >= 21;
};

const canDrinkV2 = (p: Pessoa): boolean => {
  const { idade } = p;
  return idade >= 21;
};

console.log(canDrink(guilherme));
console.log(canDrinkV2(cesar));
