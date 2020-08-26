import { Pessoa } from "./Pessoa.ts";

// Factory é uma maneira de separar a lógica de criação de objetos
// da classe em si.
// Muito útil para resolver dependências e, caso necessário, realizar validações a tempo de criação.
// Por exp: Uma Factory de pessoa poderia verificar se idade >= 0, mantendo essa lógica fora do Model.

class PessoaComplexa implements Pessoa {
  nome: string = "";
  idade: number = 0;
  biografia?: string;
}

class PessoaComFactoryDefault extends PessoaComplexa implements Pessoa {
  popularPessoa({ idade, nome, biografia }: Pessoa): void {
    this.idade = idade;
    this.nome = nome;
    // Só atribui se definir
    if (biografia) {
      this.biografia = biografia;
    }
  }
}

class PessoaComFactoryStatic extends PessoaComplexa implements Pessoa {
  static criaPessoa({ idade, nome, biografia }: Pessoa): Pessoa {
    const pessoa = new PessoaComFactoryStatic();
    pessoa.idade = idade;
    pessoa.nome = nome;
    if (biografia) {
      pessoa.biografia = biografia;
    }
    return pessoa;
  }
}

function criarPessoa({ nome, idade, biografia }: Pessoa): Pessoa {
  const novaPessoa = new PessoaComplexa();
  novaPessoa.nome = nome;
  novaPessoa.idade = idade;
  if (biografia) {
    novaPessoa.biografia = biografia;
  }
  return novaPessoa;
}

abstract class PessoaFactory {
  static criarPessoa({ nome, idade, biografia }: Pessoa): Pessoa {
    return {
      nome,
      idade,
      biografia,
    };
  }
  static criarPessoaSemBiografia({ nome, idade }: Pessoa): Pessoa {
    return {
      nome,
      idade,
    };
  }
  static criarPessoaSemIdade({ nome, biografia }: Pessoa): Pessoa {
    return {
      nome: nome, // <-- Modo Verboso, não precisa fazer isso se o nome for igual! Veja os outros campos
      idade: 0,
      biografia,
    };
  }
}

const rodolpho = new PessoaComplexa();
rodolpho.nome = "Rodolpho Alves";
rodolpho.idade = 27;
console.log(rodolpho);

const cesar = new PessoaComFactoryDefault();
cesar.popularPessoa({
  nome: "Cesar Camillo",
  idade: 24,
});
console.log(cesar);

const guilherme = PessoaComFactoryStatic.criaPessoa({
  nome: "Jose Guilherme",
  idade: 29,
  biografia: "Narguillêro",
});
console.log(guilherme);

const fear = criarPessoa({
  nome: "Jonata",
  idade: 28,
  biografia: "Fear",
});
console.log(fear);

const kebbab = PessoaFactory.criarPessoa({
  nome: "Calleb Cecco",
  idade: 27,
});
console.log(kebbab);

const calleb = PessoaFactory.criarPessoaSemIdade({
  nome: "Calleb Novamente",
  biografia: "Um calleb no pedaço",
  idade: 24,
});
console.log(calleb);
