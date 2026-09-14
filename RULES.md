## Coding rules
This repo follows strict rules when developing components:
- Every component in most of the cases shouldn't be more that 200 lines long
- Every interface and type must be in /src/types
- Every component should have its own file
- Naming component files follows CamelCase except for files in src/app
- Components should be reusable 
- Components shouldn't be tighly coupled
- SVG elements should live in src/icons
- Components names in English
- Anchor tags uses Link components from Next
- Image tags uses Image component from Next
- Text should be in neutral Spanish
- Forms and validations uses Formik and Yup
- Use sileo for toasts
- Label forms always has to use htmlFor

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->


## Check code
To check code always use: 
- pnpm format && pnpm build
