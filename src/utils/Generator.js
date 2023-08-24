const authHeader = token => ({ Authorization: `Bearer${token}` })

export default { authHeader }