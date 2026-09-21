import { useState, type SubmitEvent } from "react";
import type { DadosProduto, TipoProduto } from "../../types/produto";

type Props = {
  inicial?: TipoProduto;
  ocupado?: boolean;
  onSalvar: (dados: DadosProduto) => Promise<void>;
};

export default function FormularioProduto({ inicial, ocupado = false, onSalvar }: Props) {
  // Campos numéricos ficam como texto durante a digitação.
  // Assim, é possível apagar o conteúdo sem convertê-lo imediatamente em zero.
  const [nome, setNome] = useState(inicial?.nome ?? "");
  const [preco, setPreco] = useState(inicial ? String(inicial.preco) : "");
  const [estoque, setEstoque] = useState(inicial ? String(inicial.estoque) : "");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function enviar(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (salvando || ocupado) return;
    setErro("");

    const valorPreco = Number(preco);
    const valorEstoque = Number(estoque);

    if (
      nome.trim() === "" || preco.trim() === "" || estoque.trim() === "" ||
      !Number.isFinite(valorPreco) || valorPreco < 0 ||
      !Number.isInteger(valorEstoque) || valorEstoque < 0
    ) {
      setErro("Informe um nome, preço não negativo e estoque inteiro não negativo.");
      return;
    }

    setSalvando(true);
    try {
      await onSalvar({ nome: nome.trim(), preco: valorPreco, estoque: valorEstoque });
      // Limpar só depois do sucesso, e somente no cadastro.
      if (!inicial) {
        setNome("");
        setPreco("");
        setEstoque("");
      }
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível salvar.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-xl border p-5">
      <fieldset disabled={salvando || ocupado} className="space-y-4">
        <legend className="font-semibold">Dados do produto</legend>
        <label className="block">
          Nome
          <input required value={nome} onChange={(e) => setNome(e.target.value)}
            className="block w-full rounded border p-2" />
        </label>
        <label className="block">
          Preço
          <input required type="number" min="0" step="0.01" value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="block w-full rounded border p-2" />
        </label>
        <label className="block">
          Estoque
          <input required type="number" min="0" step="1" value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            className="block w-full rounded border p-2" />
        </label>
        <button type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50">
          {salvando ? "Salvando..." : "Salvar produto"}
        </button>
      </fieldset>
      {erro && <p role="alert" className="text-red-700">{erro}</p>}
    </form>
  );
}