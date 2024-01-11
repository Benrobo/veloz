import prettier from "prettier";

export default async function prettify(code: string, lang: string) {
  const pretty = await prettier.format(code, {
    semi: false,
    parser: lang,
    singleQuote: true,
    jsxSingleQuote: true,
    tabWidth: 2,
    trailingComma: "all",
    jsxBracketSameLine: false,
  });
  return pretty;
}
