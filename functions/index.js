const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.somatoria = functions.database
  .ref('{uid}/movimentacoes/{dia}')
  .onWrite(async (change, context) => {
    // referência da tabela meses
    const mesesRef = admin
      .database()
      .ref(context.params.uid + '/meses/' + context.params.dia)
    // vai executar depois que a referência acontecer
    const movimentacoesRef = change.after.ref
    // Saber quais dados estão sendo salvos
    const movimentacoesSS = await movimentacoesRef.once('value')
    // Para extrair os dados que vem como snapshot - converter
    const movimentacoes = movimentacoesSS.val()

    let entradas = 0
    let saidas = 0
    let saldo = 0

    Object.keys(movimentacoes).forEach((m) => {
      if (movimentacoes[m].valor !== 0 && movimentacoes[m].receita === true) {
        saldo += parseFloat(movimentacoes[m].valor.toFixed(2))
        entradas += parseFloat(movimentacoes[m].valor.toFixed(2))
      }
      if (movimentacoes[m].valor !== 0 && movimentacoes[m].receita === false) {
        saidas -= parseFloat(movimentacoes[m].valor.toFixed(2))
        saldo -= parseFloat(movimentacoes[m].valor.toFixed(2))
      }
    })

    // modificar os meses
    return mesesRef.transaction((currentValue) => {
      if (currentValue === null) {
        return {
          entradas,
          saidas,
          saldo,
        }
      }
      return {
        ...currentValue,
        entradas: parseFloat(entradas.toFixed(2)),
        saidas: parseFloat(saidas.toFixed(2)),
        saldo: parseFloat(saldo.toFixed(2)),
      }
    })
  })

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const composition = `${month}-${year}`
  const userRef = admin
    .database()
    .ref(`${user.uid}/movimentacoes/${composition}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists()) {
    await userRef.push({
      categoria: 'Compras',
      valor: 0,
      receita: false,
      descricao: 'exemplo',
      data: `${date.getDate()}/${month}/${year}`,
      createdAt: date.getTime(),
    })
  }
})
