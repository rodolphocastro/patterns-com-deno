// Toda vez que for criar um objeto
// eu uso um outro objeto como base.
// clone(), copyTo(), copy()

import { Pessoa } from "./Pessoa.ts";

interface Cloneable<T> {
  clone(): T;
}

class PessoaVazia implements Pessoa, Cloneable<Pessoa> {
  clone(): Pessoa {
    const json = JSON.stringify(this);
    return JSON.parse(json) as Pessoa;
  }

  nome = "Fulano";
  idade = 0;
}

class PessoaVerdadeira implements Pessoa, Cloneable<Pessoa> {
  nome: string;
  idade: number;
  biografia?: string | undefined;

  constructor({ nome, idade, biografia }: Pessoa) {
    this.nome = nome;
    this.idade = idade;
    this.biografia = biografia;
  }

  clone(): Pessoa {
    const json = JSON.stringify(this);
    return JSON.parse(json) as Pessoa;
  }
}

const guilherme = new PessoaVerdadeira({
  nome: "José Guilherme",
  idade: 29,
});
console.table(guilherme);
const filhoGuilherme = guilherme.clone()
filhoGuilherme.nome = "Cesar Camillo"
console.table(filhoGuilherme)

const rodolpho = new PessoaVazia();
rodolpho.nome = "Rodolpho Alves";
rodolpho.idade = 27;
console.table(rodolpho);
const calleb = new PessoaVerdadeira(rodolpho.clone())
calleb.nome = "Calleb Cecco"
console.table(calleb);

// Demonstrando uma alteração por referência
const funcLascada = (p: Pessoa) => {    
    p.nome = "Lascado"
    return p;
}

console.dir(funcLascada(calleb.clone()))
console.dir(funcLascada(calleb))