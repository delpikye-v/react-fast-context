# ⚡ react-fast-context-z

[![NPM](https://img.shields.io/npm/v/react-fast-context-z.svg)](https://www.npmjs.com/package/react-fast-context-z) ![Downloads](https://img.shields.io/npm/dt/react-fast-context-z.svg)

<a href="https://codesandbox.io/p/sandbox/vvxnwp" target="_blank">LIVE EXAMPLE</a>

---

**Ultra-lightweight**, selector-based state container for React. No Provider. No reducer. No proxy. No magic.

Designed to stay **boring, explicit, and fast**

> **Read and update state with the least possible runtime overhead.**

---

## Why react-fast-context-z?

- ⚡ Fast re-renders via fine-grained selectors
- ✍️ Explicit, imperative state mutation
- 🚫 No Provider / no Context tree
- 🧠 Framework-agnostic core (works outside React)
- 🔌 Clean integration with external logic / intent engines
- 📦 Tiny bundle, minimal runtime

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

No reducers.  
No dependency graph.  
No proxy tracking.

What you write is exactly what runs.

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
      s.loading = true
      s.count++
      s.loading = false
    },
    add(s, n: number) {
      s.count += n
    },
  },
})

const double = counter.computed(s => s.count * 2)

export function Fast() {
  const count = counter.use(s => s.count)

  return (
    <>
      <div>{double.use()}</div>
      <button onClick={() => counter.actions.inc()}>
        {count}
      </button>
    </>
  )
}
```

---

## Selectors & Derived State

Selectors subscribe **only to what they read**.

```ts
const double = counter.computed(s => s.count * 2)

function View() {
  const value = double.use()
  return <div>{value}</div>
}
```

- No re-render if selector output doesn’t change
- Derived selectors are memoized and reactive

---

## Merge Mode

`react-fast-context-z` supports configurable **merge strategies** when updating state.

```ts
const store = createFastContext({
  state: { user: { name: "A", age: 20 } },
  merge: "shallow",
})
```

### Available modes

#### `merge: "shallow"` (default)

- Shallow-merge object fields
- Mutated fields are preserved
- Ideal for **mutable, intent-driven updates**

```ts
set(s => {
  s.user.name = "B"
})
// keeps user.age
```

#### `merge: "replace"`

- Replace state reference entirely
- Useful when state is treated as immutable snapshots

```ts
set(() => ({
  user: { name: "B", age: 30 }
}))
```

### When to use which?

| Mode       | Use case                                       |
|------------|------------------------------------------------|
| shallow    | Explicit mutation, intent/actions, local state |
| replace    | Immutable data, server snapshots, undo/redo    |

The merge mode is **explicit** — no hidden heuristics.

---

## Batch & Transaction

### Batch updates (single notify)

```ts
counter.batch(() => {
  counter.actions.inc()
  counter.actions.add(10)
})
```

### Rollback-safe transaction

```ts
try {
  counter.transaction(() => {
    counter.actions.add(100)
    throw new Error("cancel")
  })
} catch {}
```

State is restored automatically if an error is thrown.

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

Designed to work cleanly with **intent-first architectures**.

---

## Comparison

| Feature / Library                  | React Context | Redux  | Zustand | Jotai  | react-fast-context-z |
| ---------------------------------- | ------------- | -----  | ------- | -----  | -------------------- |
| **Provider required**              | ⚠️             | ❌     | ❌      | ❌     | ❌                    |
| **Selector-based render**          | ❌             | ✅     | ✅      | ✅     | ✅                    |
| **Fine-grained updates**           | ❌             | ⚠️     | ⚠️      | ✅     | ✅                    |
| **Proxy / atom graph**             | ❌             | ❌     | ❌      | ✅     | ❌                    |
| **Reducers required**              | ❌             | ✅     | ❌      | ❌     | ❌                    |
| **Direct mutation API**            | ❌             | ❌     | ⚠️²     | ❌     | ✅                    |
| **Works outside React**            | ❌             | ⚠️³    | ⚠️³     | ❌     | ✅                    |
| **Intent / event-driven friendly** | ❌             | ❌     | ⚠️      | ❌     | ✅                    |
| **Async flow native**              | ❌             | ⚠️     | ❌      | ❌     | ✅                    |
| **Devtools ecosystem**             | ❌             | ✅     | ⚠️      | ⚠️     | ❌ (by design)        |
| **Bundle size**                    | tiny           | large | small   | small  | **tiny**             |

---

## Philosophy

- State should be boring  
- Logic should be explicit  
- Rendering should be fast  

If you:
- already have a logic layer
- want full control over mutations
- hate hidden magic

Then this library is for you.

---

## License

MIT
