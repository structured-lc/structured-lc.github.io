### Leetcode 1286 (Medium): Iterator for Combination [Practice](https://leetcode.com/problems/iterator-for-combination)

### Description  
Design the **CombinationIterator** class that generates all combinations of a specified length from a given string of distinct, sorted lowercase English letters, in lexicographical order.
- `CombinationIterator(characters, combinationLength)`: Initializes the iterator with a string `characters` and an integer `combinationLength`.
- `next()`: Returns the next combination of length `combinationLength` in lex order.
- `hasNext()`: Returns `True` if a next combination exists; otherwise, `False`.

### Examples  
**Example 1:**  
Input: `["CombinationIterator","next","hasNext","next","hasNext","next","hasNext"]`, `[["abc",2],[],[],[],[],[],[]]`  
Output: `[null, "ab", true, "ac", true, "bc", false]`  
*Explanation:  
CombinationIterator itr = CombinationIterator("abc", 2)
- itr.next() -> "ab"
- itr.hasNext() -> True
- itr.next() -> "ac"
- itr.hasNext() -> True
- itr.next() -> "bc"
- itr.hasNext() -> False*

### Thought Process (as if you’re the interviewee)  
Initially, the brute-force idea is to precompute and store all possible combinations and iterate over them. However, since the max number of combinations is manageable (`C(15,7)` at most due to constraints), but we can still optimize for memory by generating combinations on-the-fly.

A more optimal solution is to use **indices** to represent current position for generating the current combination. Start with the first valid combination [0, 1, ..., combinationLength-1], and then advance the indices to form the next valid combination by incrementing from the end, just like generating combinations in lex order.

Alternatively, a bitmask/backtracking approach can be used. But since the requirement is to return values in lex order and with repeated `next()`/`hasNext()`, the indices approach is both clear and efficient in Python.

**Trade-offs:**
- Precompute all combinations: Faster `next`, higher memory.
- Advance by renew indices: Slightly more logic, but optimal memory and responsive to large inputs with few function calls.

### Corner cases to consider  
- `combinationLength == 1` (just single chars)
- `combinationLength == len(characters)` (entire string as one combination)
- `characters` is short (length 1)
- No more combinations after last generated
- Multiple subsequent `next()`/`hasNext()` calls

### Solution

```python
class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        self.chars = characters
        self.n = len(characters)
        self.k = combinationLength
        # Start with the first combination: [0, 1, ..., k-1]
        self.indices = list(range(self.k))
        self.finished = False

    def next(self) -> str:
        # Form the current combination to return
        comb = ''.join(self.chars[i] for i in self.indices)
        # Generate next combination indices
        i = self.k - 1
        while i >= 0:
            if self.indices[i] != i + self.n - self.k:
                break
            i -= 1
        if i < 0:
            self.finished = True
        else:
            self.indices[i] += 1
            for j in range(i + 1, self.k):
                self.indices[j] = self.indices[j - 1] + 1
        return comb

    def hasNext(self) -> bool:
        return not self.finished
```

### Time and Space complexity Analysis  

- **Time Complexity:** `O(k)` per `next()` call, to build the string and update indices. If `k` is small compared to `n`, this is efficient.
- **Space Complexity:** `O(k)` extra for indices; otherwise, very space-efficient since we generate on-demand, not storing all combinations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle combinations if the input string can contain duplicate characters?  
  *Hint: Consider how to skip duplicates or unique sorting upon initialization*

- Can you generalize this iterator for permutations instead of combinations?  
  *Hint: Think about backtracking and tracking used elements*

- What if `next()` and `hasNext()` are called a million times each? How does time/memory scale?  
  *Hint: Consider designs for large input and frequent function calls*

### Summary
This problem uses the classic **combinatorial generation using indices** pattern, enabling on-the-fly generation of combinations in lexicographical order without redundant memory. This approach can be adapted for any iterator pattern where sequencing through k-combinations is required, especially in scenarios with large input where pre-building all outputs is impractical.


### Flashcard
Generate combinations on-the-fly using indices to represent the current combination, starting with the first valid combination and incrementing indices to generate the next.

### Tags
String(#string), Backtracking(#backtracking), Design(#design), Iterator(#iterator)

### Similar Problems
