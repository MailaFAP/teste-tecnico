import { ForbiddenException, Injectable, Query } from '@nestjs/common';
import { OperacaoDto } from './operacoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperacoesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async adicao(operacaoDto: OperacaoDto) {
    const { valor1, valor2 } = operacaoDto;
    const resultado = valor1 + valor2;
    const novaOperacao = await this.prisma.operacao.create({
      data: {
        valor1,
        valor2,
        resultado,
        tipo: 1
      }
    });
    if (!novaOperacao) throw new ForbiddenException('Não foi possível registrar a operação, tente novamente.')
    return { resultado };
  }

  async subtracao(operacaoDto: OperacaoDto) {
    const { valor1, valor2 } = operacaoDto;
    const resultado = valor1 - valor2;
    const novaOperacao = await this.prisma.operacao.create({
      data: {
        valor1,
        valor2,
        resultado,
        tipo: 2
      }
    });
    if (!novaOperacao) throw new ForbiddenException('Não foi possível registrar a operação, tente novamente.')
    return { resultado };
  }

  async multiplicacao(operacaoDto: OperacaoDto) {
    const { valor1, valor2 } = operacaoDto;
    const resultado = valor1 * valor2;
    const novaOperacao = await this.prisma.operacao.create({
      data: {
        valor1,
        valor2,
        resultado,
        tipo: 3
      }
    });
    if (!novaOperacao) throw new ForbiddenException('Não foi possível registrar a operação, tente novamente.')
    return { resultado };
  }

  async divisao(operacaoDto: OperacaoDto) {
    const { valor1, valor2 } = operacaoDto;
    const resultado = valor1 / valor2;
    const novaOperacao = await this.prisma.operacao.create({
      data: {
        valor1,
        valor2,
        resultado,
        tipo: 4
      }
    });
    if (!novaOperacao) throw new ForbiddenException('Não foi possível registrar a operação, tente novamente.')
    return { resultado };
  }

  async listar(tipo: string) {
    const operacoes = await this.prisma.operacao.findMany();
    const operacoesFiltradas = operacoes.filter(operacao => operacao.tipo === parseInt(tipo)); 
    return tipo ? operacoesFiltradas : operacoes;
  }
}
