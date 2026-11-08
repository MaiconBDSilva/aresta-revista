/**
 * Utilitário de compressão de imagens no navegador.
 * Regra de Negócio: Imagens em JPEG (image/jpeg, qualidade 0.82, <= 120 KB)
 * para compatibilidade nativa com @vercel/og (Satori), WhatsApp e Open Graph.
 */

export interface ResultadoCompressao {
  dataUrl: string;
  blob: Blob;
  tamanhoKB: number;
  largura: number;
  altura: number;
}

export async function comprimirImagemParaJpeg(
  arquivo: File,
  maxTamanhoKB: number = 120,
  qualidadeInicial: number = 0.82
): Promise<ResultadoCompressao> {
  return new Promise((resolve, reject) => {
    // Validação de tipo de arquivo
    if (!arquivo.type.startsWith('image/')) {
      reject(new Error('O arquivo selecionado não é uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de imagem.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Falha ao processar os dados da imagem.'));
      img.onload = () => {
        try {
          let { width, height } = img;
          const MAX_DIMENSAO = 1600;

          // Redimensionamento proporcional se a imagem for excessivamente grande
          if (width > MAX_DIMENSAO || height > MAX_DIMENSAO) {
            if (width > height) {
              height = Math.round((height * MAX_DIMENSAO) / width);
              width = MAX_DIMENSAO;
            } else {
              width = Math.round((width * MAX_DIMENSAO) / height);
              height = MAX_DIMENSAO;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Não foi possível inicializar o contexto 2D do Canvas.'));
            return;
          }

          // Preenche fundo branco para evitar transparência preta no JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          let qualidade = qualidadeInicial;
          let dataUrl = canvas.toDataURL('image/jpeg', qualidade);

          // Função auxiliar para estimar tamanho em KB a partir do Base64
          const getTamanhoKB = (str: string) => {
            const head = 'data:image/jpeg;base64,';
            const base64Len = str.length - head.length;
            const bytes = (base64Len * 3) / 4;
            return Math.round(bytes / 1024);
          };

          let tamanhoAtualKB = getTamanhoKB(dataUrl);

          // Ajuste iterativo se ainda passar de 120 KB
          while (tamanhoAtualKB > maxTamanhoKB && qualidade > 0.4) {
            qualidade -= 0.1;
            dataUrl = canvas.toDataURL('image/jpeg', qualidade);
            tamanhoAtualKB = getTamanhoKB(dataUrl);
          }

          // Converte para Blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Erro ao gerar Blob da imagem comprimida.'));
                return;
              }
              resolve({
                dataUrl,
                blob,
                tamanhoKB: Math.round(blob.size / 1024),
                largura: width,
                altura: height,
              });
            },
            'image/jpeg',
            qualidade
          );
        } catch (err) {
          reject(err);
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(arquivo);
  });
}

