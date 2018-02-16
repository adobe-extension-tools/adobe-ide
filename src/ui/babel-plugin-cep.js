module.exports = function({ template, types: t }) {
  const buildImport = template(`
  	window.cep_node.require(SOURCE)
  `)

  return {
    visitor: {
      Identifier(path) {
        if (
          path.node.name === 'require' &&
          !t.isMemberExpression(path.parentPath)
        ) {
          const parentComments =
            (path.parentPath.parent &&
              path.parentPath.parent.leadingComments) ||
            []
          const parentParentComments =
            (path.parentPath.parentPath.parent &&
              path.parentPath.parentPath.parent.leadingComments) ||
            []
          const comments = [
            ...parentComments.slice(-1),
            ...parentParentComments.slice(-1),
          ]

          if (comments) {
            const hasNodeRequireComment = comments.find(
              comment => comment.value.trim() == 'node-require'
            )

            if (hasNodeRequireComment) {
              const newRequire = buildImport({
                SOURCE:
                  path.parentPath.node.arguments ||
                  path.parentPath.parentPath.node.arguments,
              })
              path.parentPath.replaceWith(newRequire)
            }
          }
        }
      },
    },
  }
}
