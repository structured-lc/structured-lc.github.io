### Leetcode 2350 (Hard): Shortest Impossible Sequence of Rolls [Practice](https://leetcode.com/problems/shortest-impossible-sequence-of-rolls)

### Description  
You are given an integer array `rolls` representing results of rolling a *k*-sided die multiple times, and an integer `k` (the number of sides on the die). The goal is to find the **smallest length ℓ** such that there is **no subsequence** of `rolls` of length ℓ that contains every possible sequence of die results of length ℓ (1 to k) as a subsequence (preserving order but not necessarily consecutiveness). In short:  
What is the shortest length of a dice roll subsequence **impossible** to extract (in the same order) from `rolls`?

### Examples  

**Example 1:**  
Input: `rolls = [1, 2, 3, 3, 2]`, `k = 3`  
Output: `2`  
*Explanation: All single values {1}, {2}, {3} do appear as subsequences. But for every possible two-length sequence (like {1,2}, {2,1}, etc), not all are present in `rolls`. In fact, it's impossible to find all sequences of length 2 for k=3, like {2,1}.*

**Example 2:**  
Input: `rolls = [1, 1, 2, 2]`, `k = 2`  
Output: `2`  
*Explanation: Sequences of length 1 ({1}, {2}) are possible, but, e.g., there is no subsequence {2,1}.*

**Example 3:**  
Input: `rolls = [1, 2, 3, 4, 1, 2, 3, 4]`, `k = 4`  
Output: `3`  
*Explanation: All 1ₛₜ and 2ₙd length subsequences containing all combinations are possible. However, for length 3, not all 4³=64 possible combinations can be constructed from subsequences.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try generating all possible sequences of length 1, 2, ..., kˡ and check if every sequence exists as a subsequence in `rolls`. This is prohibitively slow—there are kˡ possible sequences for length ℓ!

- **Key insight:**  
  Instead of checking every possible sequence, notice that the "shortest impossible" subsequence length increases **each time you've seen all k faces** in any order.  
  * In other words: As you scan rolls, count each time you "collect all k faces" in that subsequence; this corresponds to being able to form all possible sequences of current length.
  * When you fail to collect all k distinct faces, that's when longer sequences become impossible.

- **Optimized approach:**  
  Use a greedy strategy:
    - Track a set of unique values seen so far.
    - Each time you've seen all k faces, increment the answer (ℓ), and reset the set to empty.
    - Continue until end of rolls.
    - The final answer is the number of times you collected all k faces, plus one (since you couldn't finish a full next set).

- **Trade-offs:**  
  This greedy counting gives **O(n)** time and **O(k)** space, focusing only on critical "cycles" of collecting all faces, not on constructing sequences explicitly.

### Corner cases to consider  
- Empty `rolls` array ⇒ should return 1 (since even length-1 sequences can't be formed).
- `k` larger than length of `rolls` ⇒ can't cover all faces even once.
- All `rolls` equal ⇒ can only form length-1 sequences.
- Large `k` but short `rolls`.
- Many repeated values, or missing some dice values.

### Solution

```python
def shortestImpossibleSequence(rolls, k):
    # Set to track which values have been seen in current block
    seen = set()
    # Count number of full sets of k seen; answer will be this + 1
    answer = 1

    for roll in rolls:
        seen.add(roll)
        # Once we've seen all k faces, we can start collecting for next level
        if len(seen) == k:
            answer += 1
            seen.clear()
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(rolls). Each roll is processed once.
- **Space Complexity:** O(k), for the set tracking up to k unique faces.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must track which specific subsequences of a given length are missing?
  *Hint: Maintain maps of indices for each roll; use backtracking or BFS.*

- How would this work if you needed the actual impossible sequence, not just its length?
  *Hint: Try reconstructing by checking missing subsequences of length ℓ using Trie or DFS.*

- Is it possible to determine if a sequence of a given length is present using dynamic programming?
  *Hint: DP on positions and lengths, with memoization on face combinations.*

### Summary
The problem uses a greedy "cycle detection" method—the answer increases each time all k faces are observed.  
This technique is common when all variants of elements must be sequentially observed (subset collection patterns).  
The code avoids explicit combinatorial checks and is applicable to problems involving hitting all unique elements repeatedly in order.


### Flashcard
Count how many times you collect all k distinct faces while scanning rolls—that count plus 1 is the shortest impossible sequence length.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy)

### Similar Problems
