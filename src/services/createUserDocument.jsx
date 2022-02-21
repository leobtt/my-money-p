import fire from './firebase-config'

const createUserDocument = async (user) => {
  if (!user) return null

  const userRef = fire.database().ref(`${user.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists()) {
    const { uid } = user

    const year = new Date().getFullYear()
    const month = '0' + (new Date().getMonth() + 1)

    await userRef.set({
      movimentacoes: `${month}-${year}`,
      createdAt: new Date().getTime(),
    })
  }
}

export default createUserDocument
