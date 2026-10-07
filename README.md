# BloomLab 

### An interactive way to learn and experiment with Bloom Filters.

BloomLab is a full-stack educational project that implements a **Bloom Filter from scratch** and visualizes how it works through an interactive web interface.

It lets you insert values, check membership, see hash positions light up, explore false positives, and understand the mathematics behind the probability.

---

## 🚀 Live Demo

**[Try BloomLab →](https://bloomlab-raer.onrender.com/)**

> The backend uses Render's free tier, so the first request after inactivity may take a few seconds.

---

## 📸 Preview

<!-- Replace these paths with your actual screenshots -->

![BloomLab Main Interface](docs/screenshots/main-interface.png)

![False Positive Experiment](docs/screenshots/false-positive.png)

---

## ✨ What You Can Do

- **Add values** and see their hash positions in the bit array.
- **Check values** to see whether they are definitely absent or probably present.
- **Visualize bits** changing as items are inserted.
- **Run a false-positive experiment** with a real Bloom Filter.
- **View live statistics** such as fill ratio and estimated false-positive probability.
- **Understand the mathematics** behind the probability calculation.

---

## 🧩 How It Works

A Bloom Filter uses:

- `m` → number of bits
- `k` → number of hash functions
- `n` → number of inserted items

When an item is added, multiple hash functions choose positions in the bit array and set them to `1`.

```text
apple
  │
  ├── Hash 1 → bit 4
  ├── Hash 2 → bit 12
  └── Hash 3 → bit 27
```

When checking an item:

```text
Any required bit = 0
        ↓
Definitely NOT present

All required bits = 1
        ↓
Probably present
```

This is why Bloom Filters **cannot have false negatives, but can have false positives**.

---

## ⚠️ False Positives

Suppose we insert:

```text
apple
mango
banana
```

and check:

```text
orange
```

If all hash positions for `orange` are already `1`, the filter may say:

> **Probably present**

even though `orange` was never inserted.

BloomLab includes a controlled experiment that demonstrates this behavior.

---

## 📐 The Mathematics

The approximate false-positive probability is:

\[
P \approx (1-e^{-kn/m})^k
\]

Where:

| Symbol | Meaning |
|---|---|
| `m` | Bit array size |
| `n` | Items inserted |
| `k` | Hash functions |
| `P` | False-positive probability |

For example:

```text
m = 32
n = 3
k = 3
```

gives an estimated probability of approximately:

```text
1.47%
```

BloomLab calculates this dynamically as the filter changes.

---

## 🏗️ Architecture

```text
React
  │
  │ REST API
  ▼
Express / Node.js
  │
  ▼
Bloom Filter
  │
  ▼
Bit Array
```

The Bloom Filter itself is implemented from scratch in JavaScript.

No database or external Bloom Filter library is required.

---

## 🛠️ Tech Stack

**Frontend**
- React
- JavaScript
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- REST API

**Deployment**
- GitHub
- Render
