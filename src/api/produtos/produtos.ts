import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const produtos = await prisma.produto.findMany();
    return res.status(200).json(produtos);
  }

  if (req.method === "POST") {
    const { nome, preco, estoque } = req.body;
    const produto = await prisma.produto.create({ data: { nome, preco, estoque } });
    return res.status(201).json(produto);
  }

  if (req.method === "PUT") {
    const { id, nome, preco, estoque } = req.body;
    const produto = await prisma.produto.update({
      where: { id },
      data: { nome, preco, estoque },
    });
    return res.status(200).json(produto);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.produto.delete({ where: { id } });
    return res.status(204).end();
  }
}
