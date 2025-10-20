### Leetcode 854 (Hard): K-Similar Strings [Practice](https://leetcode.com/problems/k-similar-strings)

### Description  
You are given two strings, `A` and `B`, that are anagrams of each other. The goal is to find the smallest number of swaps of adjacent letters needed to transform `A` into `B`. Each swap is a single operation where you can swap two characters in `A`.

### Examples  

**Example 1:**  
Input=`"ab"`,`"ba"`  
Output=`1`  
Explanation: Swap the first 'a' and 'b' in "ab" to get "ba". Only one swap is needed.

**Example 2:**  
Input=`"abc"`,`"bca"`  
Output=`2`  
Explanation: First swap 'a' and 'b' in "abc" → "bac". Then, swap 'a' and 'c' in "bac" → "bca". Two swaps total.

**Example 3:**  
Input=`"aabc"`,`"abac"`  
Output=`1`  
Explanation: Swap 'b' and 'a' (on 2ⁿᵈ and 3ʳᵈ positions) in "aabc" → "aabc" (2ⁿᵈ and 3ʳᵈ characters are 'a' and 'b'; swap to get 'b' and 'a': "aabc" → "aa(b and a swap)" → "aabc" → "aabc" (still not "abac"? Hmm, let’s rethink. To get "abac", from "aabc", swap 'b' and 'c': "aabc" → "aacb". Then swap 'c' and 'a' in "aacb" → "abac". But the minimal is 1: "aabc" → "aabc", swap 2ⁿᵈ and 3ʳᵈ: "aabc" → "abac". So correct output is `1`.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try every possible swap, see if you get closer to B, repeat until you match. This would be very slow, even for small strings.
- **Optimization:** Think of this as a shortest path problem—every swap moves you to a new state, and you want to reach the target with the minimum steps. Breadth-First Search (BFS) is suitable here because it explores all possibilities level by level, guaranteeing the minimum number of swaps.
- **Trade-offs:** BFS ensures minimum swaps but can get expensive for some inputs due to combinatorics. For small strings (as per constraints, length ≤20), BFS is feasible.
- **Implementation:** For each string state, try swapping two characters at the first mismatch, then proceed. Enqueue all new states obtained, and repeat until you reach B.

### Corner cases to consider  
- **A and B are already identical:** return 0.
- **Single character:** always return 0 (cannot swap with itself).
- **Strings are reverses of each other:** might need multiple swaps.
- **Repetitive characters:** Can be tricky, since swapping same characters does not help—must choose correct swaps.
- **Strings with multiple mismatches:** Need to find the optimal order of swaps.
- **Empty strings:** Not possible per constraints, but keep in mind for similar problems.

### Solution

```python
from collections import deque

def kSimilarity(A, B):
    if A == B:
        return 0
    queue = deque()
    visited = set()
    queue.append(A)
    visited.add(A)
    swaps = 0
    while queue:
        for _ in range(len(queue)):
            s = queue.popleft()
            for i in range(len(s)):
                if s[i] != B[i]:
                    break
            for j in range(i + 1, len(s)):
                if s[j] == B[i]:
                    new_s = list(s)
                    new_s[i], new_s[j] = new_s[j], new_s[i]
                    new_s = ''.join(new_s)
                    if new_s not in visited:
                        if new_s == B:
                            return swaps + 1
                        visited.add(new_s)
                        queue.append(new_s)
        swaps += 1
    return swaps
```

**How it works:**  
- Start BFS with the initial string.
- For each string, find the first mismatch, then try swapping it with every possible candidate that could resolve the mismatch.
- Enqueue all new strings obtained, and keep track of visited states to avoid cycles.
- Return the swap count when you reach the target.

### Time and Space complexity Analysis  

- **Time Complexity:** O( N × k ), where N is the length of the string and k is the number of distinct anagrams reachable from the initial string with swaps. In the worst case (all possible permutations), this is O(N×N!), but in practice, with the greedy BFS approach and early termination, it is much better for small N.

- **Space Complexity:** O( N × k ) for the queue and visited set, storing multiple string states—again, worst-case exponential, but practical for the problem constraints.

### Potential follow-up questions (as if you’re the interviewer)  

How would you optimize further if the strings are much longer (e.g., length = 100)?
Hint: Would you still use BFS? Are there heuristics or branch-and-bound strategies you can use?

What if you could swap any two characters, not just adjacent ones? Would the minimum number of swaps be different?
Hint: No—swapping any two characters is always at least as good (and sometimes better) than swapping adjacent. In this problem, swapping non-adjacent is already allowed. Clarify this in the interview.

How does the solution change if the strings are not guaranteed to be anagrams?
Hint: In this case, it’s impossible to transform A into B with swaps if they are not anagrams. You’d first check for anagram-ness, then proceed.

### Summary  
BFS is a standard approach for finding the minimum number of operations to transform one state (string) into another, especially when each operation (swap) leads to a new state. This pattern is used in problems involving shortest (transformation) paths between states, such as word ladder transformations. It is crucial to track visited states to avoid cycles and redundant work. While the worst-case complexity is high, for small problem sizes and with early termination, BFS is both feasible and optimal.


### Flashcard
Use BFS to explore all string states by swapping mismatched characters, guaranteeing the minimum number of swaps to reach the target.

### Tags
Hash Table(#hash-table), String(#string), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Couples Holding Hands(couples-holding-hands) (Hard)