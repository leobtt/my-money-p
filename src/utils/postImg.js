export const postImg = async ({ img }) => {
  const formData = new FormData()
  formData.append('image', img)
  const link = await fetch('3/image', {
    method: 'POST',
    headers: {
      Authorizartion: 'Client-ID 6cf5da13288d2eb',
    },
    body: formData,
  })
  console.log('link', link)
}
