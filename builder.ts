import { Pessoa } from "./Pessoa.ts";

// Builder é uma maneira de separar a lógica de criação de objetos
// mas mantendo uma interface fluente e uma API pública mais amigável para os desenvolvedores.
// Por exp: Um builder pode ser utilizado para configurar uma Pipeline de CICD.

/**
 * Descreve os métodos para um Builder de Pessoas.
 */
interface PessoaBuilder {
  chamada(nome: string): PessoaBuilder;
  comIdade(idade: number): PessoaBuilder;
  comBiografia(biografia: string): PessoaBuilder;
  clean(): PessoaBuilder;
  build(): Pessoa;
}

/**
 * Builder implementado com uma instância interna de pessoa.
 */
class PessoaBuilderComInstanciaInterna implements PessoaBuilder {
  protected static initPessoa(): Pessoa {
    return {
      nome: "",
      idade: 0,
    };
  }

  protected pessoa: Pessoa = PessoaBuilderComInstanciaInterna.initPessoa();

  chamada(nome: string): PessoaBuilder {
    this.pessoa.nome = nome;
    return this;
  }

  comIdade(idade: number): PessoaBuilder {
    this.pessoa.idade = idade;
    return this;
  }

  comBiografia(bio: string): PessoaBuilder {
    this.pessoa.biografia = bio;
    return this;
  }

  clean(): PessoaBuilder {
    this.pessoa = PessoaBuilderComInstanciaInterna.initPessoa();
    return this;
  }

  build(): Pessoa {
    return { ...this.pessoa };
  }
}

const pBuilder1: PessoaBuilder = new PessoaBuilderComInstanciaInterna();
const cesar = pBuilder1
  .clean()
  .chamada("Cesar Camillo")
  .comIdade(24)
  .build();

console.table(cesar);

console.table(
  pBuilder1.clean()
    .chamada("Rodolpho Alves")
    .comIdade(27)
    .comBiografia("Um maluco ai")
    .build(),
);

/**
 * Implementação com lógica (básica) de negócio.
 */
class PessoaBuilderComRegrasDeNegocio extends PessoaBuilderComInstanciaInterna {
  private validatePessoa() {
    const resultValidation: Map<string, string> = new Map<string, string>();

    if (this.pessoa.nome === "") {
      resultValidation.set("nome", "O nome da pessoa deve ser informado");
    }

    if (this.pessoa.idade < 0) {
      resultValidation.set("idade", "A idade deve ser maior que zero");
    }

    return resultValidation;
  }

  build(): Pessoa {
    const validationResult = this.validatePessoa();
    if (validationResult.size) {
      const result = Array.from(validationResult.entries());
      throw new Error(
        result
          .map((kp) => `${kp[0]}:${kp[1]}`)
          .join(", "),
      );
    }
    return super.build();
  }
}

const pBuilder2: PessoaBuilder = new PessoaBuilderComRegrasDeNegocio();

try {
  const guilherme = pBuilder2.clean()
    .chamada("José Guilherme")
    .comIdade(-29)
    .build();
  console.table(guilherme);
} catch (error) {
  console.log(error);
}

// no cSharp isso aqui seria um Action<Pessoa>
type pessoaAction = (p: Pessoa) => void;
// no cSharp isso aqui seria a Action 😝
// type genericAction<T> = (t: T) => void;

/**
 * Implementação utilizando delegates.
 */
class BuilderPorAction implements PessoaBuilder {
  protected pessoa: Pessoa = { nome: "", idade: 0 };
  protected passosParaCriar: pessoaAction[] = [];

  chamada(nome: string): PessoaBuilder {
    this.passosParaCriar.push((p) => {
      p.nome = nome;
    });
    return this;
  }

  comIdade(idade: number): PessoaBuilder {
    this.passosParaCriar.push((p) => {
      p.idade = idade;
    });
    return this;
  }

  comBiografia(biografia: string): PessoaBuilder {
    this.passosParaCriar.push((p) => {
      p.biografia = biografia;
    });
    return this;
  }

  clean(): PessoaBuilder {
    this.pessoa = { nome: "", idade: 0 };
    this.passosParaCriar = [];
    return this;
  }

  build(): Pessoa {
    this.passosParaCriar.forEach((p) => p(this.pessoa));
    return this.pessoa;
  }
}

console.table(
  new BuilderPorAction()
    .clean()
    .chamada("Calleb Perdido")
    .comIdade(24)
    .build(),
);

/**
 * Implementação utilizando delegates e lógica adicional.
 */
class BuilderComActionEValidacao extends BuilderPorAction {
  chamada(nome: string) {
    this.passosParaCriar.push((_) => {
      if (nome === "") {
        throw new Error("o Nome deve ser informado");
      }
    });
    return super.chamada(nome);
  }
}

try {
  console.table(
    new BuilderComActionEValidacao()
      .clean()
      .chamada("")
      .build(),
  );
} catch (error) {
  console.log(error);
}
