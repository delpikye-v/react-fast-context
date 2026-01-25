# ⚡ react-fast-context-z

[![NPM](https://img.shields.io/npm/v/react-fast-context-z.svg)](https://www.npmjs.com/package/react-fast-context-z) ![Downloads](https://img.shields.io/npm/dt/react-fast-context-z.svg)

<a href="https://codesandbox.io/p/sandbox/vvxnwp" target="_blank">LIVE EXAMPLE</a>

---

**Ultra-lightweight**, selector-based React state container. No Provider. No reducer. No proxy. No magic.

Designed to stay boring, predictable, and fast, and to integrate cleanly with intent-driven logic cores like `intentx-core-z`.

> **How do we read and update state in React with the least possible overhead?**

---

## Why react-fast-context-z

- Fast renders via selectors
- Explicit state mutation
- Zero Provider / Context tree
- Framework-agnostic core
- Clean integration with external logic engines
- Tiny bundle size

---

## Mental Model

```
intent / action
      ↓
 explicit mutation
      ↓
   state store
      ↓
 selector subscription
      ↓
 React re-render
```

No reducers. No dependency graph. No proxy tracking.

---

## Installation

```bash
npm install react-fast-context-z
```

---

## Basic Usage

```ts
import { createFastContext } from "react-fast-context-z"

const counter = createFastContext({
  state: { count: 0, loading: false },
  actions: {
    inc(s) {
      s.loading = true;
      s.count++
      s.loading = false
    },
    add(s, n: number) {
      s.count += n
    },
  }}
)

const double = counter.computed(s => s.count * 2)
// counter.state().count

export function Fast() {
  const count = counter.use(s => s.count)

  return (
    <>
      {double.use()}
      <button onClick={() => counter.actions.inc()}>
        {count}
      </button>
    </>
  )
}

```

---

## Derived Selectors

```ts
const double = counter.computed(s => s.count * 2)

function View() {
  const value = double.use()
  return <div>{value}</div>
}
```

---

## Batch / Transaction

```ts
counter.batch(() => {
  counter.actions.inc()
  counter.actions.add(10)
})
```

Rollback-safe transaction:

```ts
try {
  counter.transaction(() => {
    counter.actions.add(100)
    throw new Error("cancel")
  })
} catch {}
```

---

## IntentX Integration

```ts
import { createIntentBus } from "intentx-core-z"
import { bindFastContext } from "react-fast-context-z"

const context = bindFastContext(counter)
const bus = createIntentBus(context)

bus.on("increment", ({ setState }) => {
  setState(s => {
    s.count++
  })
})

```

---

## Comparison

| Feature / Library        | React Context | Redux | Zustand | Jotai | react-fast-context-z |
|--------------------------|---------------|-------|---------|-------|----------------------|
| Provider required        | ❌            | ❌     | ❌      | ❌    | ✅ No Provider        |
| Selector-based render    | ❌            | ✅     | ✅      | ✅    | ✅                    |
| Proxy / atom graph       | ❌            | ❌     | ❌      | ✅    | ❌                    |
| Reducers                 | ❌            | ✅     | ❌      | ❌    | ❌                    |
| Explicit mutation        | ❌            | ❌     | ⚠️      | ❌    | ✅                    |
| Works outside React      | ❌            | ⚠️     | ⚠️      | ❌    | ✅                    |
| Intent engine friendly   | ❌            | ❌     | ⚠️      | ❌    | ✅                    |
| Bundle size              | small         | large | small   | small | **tiny**             |

---

## Philosophy

- State should be boring.  
- Logic should be explicit.  
- Rendering should be fast.

If you:
- already have a logic layer
- want full control over mutations
- hate hidden magic

Then this library is for you.

---

## License

MIT
