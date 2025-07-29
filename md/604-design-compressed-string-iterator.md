### Leetcode 604 (Easy): Design Compressed String Iterator [Practice](https://leetcode.com/problems/design-compressed-string-iterator)

### Description  
Given a compressed string where each character is immediately followed by an integer (indicating how many times it repeats in the original string), design a data structure `StringIterator` that supports:
- `next()`: returns the next character in the uncompressed string, or `' '` (a space) if the string is exhausted.
- `hasNext()`: returns `true` if there are still characters left to return, otherwise `false`.

For example, the compressed string `"a2b1c5"` represents `"aabccccc"`.  
The input is always valid, with character-number pairs, and numbers can be large (up to 10⁹).

### Examples  

**Example 1:**  
Input:  
`StringIterator("L1e2t1C1o1d1e1")`  
Operations: `next()`, `next()`, `next()`, `next()`, `next()`, `next()`, `hasNext()`, `next()`, `hasNext()`  
Output:  
`"L", "e", "e", "t", "C", "o", True, "d", True`  
Explanation.  
- next() → `'L'` (first group L1)
- next() → `'e'`, next() → `'e'` (second group e2)
- next() → `'t'` (t1)
- next() → `'C'` (C1)
- next() → `'o'` (o1)
- hasNext() → True (d1, e1 remain)
- next() → `'d'`
- hasNext() → True (e1 remains)

**Example 2:**  
Input:  
`StringIterator("a12b2")`  
Operations: `next()` called 14 times  
Output:  
`"a", "a", ..., "a", "a", "b", "b", " "`  
Explanation.  
- The first 12 `next()` calls return `'a'` (since a12).
- Next two calls return `'b'` (b2).
- Subsequent calls after all characters are exhausted return `' '`.

**Example 3:**  
Input:  
`StringIterator("z1")`  
Operations: `next()`, `next()`, `hasNext()`  
Output:  
`"z", " ", False`  
Explanation.  
- next() → `'z'`
- next() → `' '` (nothing left)
- hasNext() → False

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** You could decompress the input string fully in advance and store all characters in a list, but since numbers can be very large (up to 10⁹), this would need massive memory and is not feasible.
- **Optimized approach:** Parse the compressed string into an internal structure for more efficient iteration—a list of (character, count) pairs. As you iterate, keep track of which pair you’re at and how many times you’ve emitted the current character.
- On `next()`, if the count for the current char > 1, decrement count and return char; if count == 1, return char and advance pointer to the next group.
- On `hasNext()`, return True if you’re not at the end, else False.
- This approach is efficient in time and does not expand the string in memory.

### Corner cases to consider  
- Empty string (should not occur by constraints, but handle gracefully).
- Single character string like `"a1"`.
- Current count is 0, need to move to the next available group.
- Numbers greater than single digit: e.g. `"a12"`, so parsing must handle multi-digit numbers.
- Next called after iterator is exhausted: should always return `' '`.
- `hasNext()` called when exhausted: should return False.

### Solution

```python
class StringIterator:
    def __init__(self, compressedString: str):
        self.chars = []
        self.counts = []
        n = len(compressedString)
        i = 0
        # Parse compressedString into chars[] and counts[]
        while i < n:
            ch = compressedString[i]
            i += 1
            count = 0
            while i < n and compressedString[i].isdigit():
                count = count * 10 + int(compressedString[i])
                i += 1
            self.chars.append(ch)
            self.counts.append(count)
        self.ptr = 0    # Current index in chars
        self.num_used = 0 # How many used in current counts[ptr]
        
    def next(self) -> str:
        while self.ptr < len(self.chars):
            if self.counts[self.ptr] > 0:
                self.counts[self.ptr] -= 1
                return self.chars[self.ptr]
            else:
                self.ptr += 1
        return ' '
    
    def hasNext(self) -> bool:
        while self.ptr < len(self.chars):
            if self.counts[self.ptr] > 0:
                return True
            self.ptr += 1
        return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Initial parsing is O(N), where N = length of compressedString (worst-case N=1000).
  - Each next()/hasNext() call is O(1) amortized, since we only scan when current count is exhausted.
- **Space Complexity:**  
  - O(K) for storing up to K=(compressed string length/2) char/count pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle extremely large numbers (up to 10⁹) more efficiently?
  *Hint: Don’t decompress all at once; track index and decrement counts lazily.*
- How would you reset the iterator or support a `rewind()` function?
  *Hint: Maintain a starting pointer and counts snapshot to reset as needed.*
- What if the compressed string could contain invalid input? How to validate and handle errors?
  *Hint: Check that every char is followed by at least one digit, and digits are nonzero.*

### Summary
The problem leverages *iterative parsing with lazy evaluation*, processing only what’s needed for the next/hasNext interface. No decompression is done; only char/count pairs are tracked and decremented as we go.  
The pattern is common in string iterator, stream, and generator problems, and can be adapted to custom iteration logic with memory efficiency.