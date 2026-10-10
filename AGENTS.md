<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the salon experience on the public index route, with host and speaker intakes in dialogs, to preserve the single-page brief.
- Validate intakes with shared Zod on client and server; submit through a normalized, rate-bounded database function with no direct visitor table access to protect privacy and hide duplicate-email status.
- Define visual roles in the global semantic token system and reuse design-system buttons for all actions.

