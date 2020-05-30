import fs from 'fs'
import jsYaml from 'js-yaml'
import dtsGenerator, {
  DefaultTypeNameConvertor,
  SchemaId,
} from 'dtsgenerator'

const filePath = 'docs.yml'

function typeNameConvertor (id: SchemaId): string[] {
  const names = DefaultTypeNameConvertor(id)

  if (names.length > 0) {
    if (names[0] === 'Components') {
      names.shift()
    } else if (names[0] === 'Paths') {
      names[2] = names[2] + names[1]
      names.splice(0, 2)
      if (names[1] === 'Responses') {
        names.splice(1, 1)
      }
    }
  }
  return names
}

async function main (): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const content = jsYaml.safeLoad(fs.readFileSync(filePath, 'utf-8'))
  const result = await dtsGenerator({
    contents: [ content ],
    typeNameConvertor,
    indentSize: 2,
  })
  const out = 'declare module \'@poke-app/api\' {' +
  ('\n' + result)
    .replace(/;/gm, '')
    .replace(/declare\s/gm, '')
    .replace(/\n$/m, '')
    .replace(/\n/gm, '\n  ') +
  '\n}\n'

  fs.writeFileSync('index.d.ts', out)
}
main().catch(() => undefined)
