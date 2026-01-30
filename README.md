# integers-compressed-set

Compact serialization for integer sets (1–300).

- ASCII only
- Guaranteed to be 2 times less than `1,2,3`
- Does not use compression algorithms


## Install
```bash
npm install integers-compressed-set
```

## Usage
```js
import { serialize, deserialize } from "integers-compressed-set";

const data = [1, 3, 7, 10, 42];
const encoded = serialize(data);
const decoded = deserialize(encoded);
```
