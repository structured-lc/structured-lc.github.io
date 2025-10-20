### Leetcode 1806 (Medium): Minimum Number of Operations to Reinitialize a Permutation [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation)

### Description  
Given an **even** integer n, you start with a permutation perm of size n where perm[i] = i (0-based index).  
You repeatedly perform this operation: create a new array arr of the same size, and for every index i in arr,
- If i is even, arr[i] = perm[i/2]
- If i is odd,  arr[i] = perm[n/2 + (i-1)/2]
After one operation, set perm = arr, and repeat.
Your goal is to find the minimum non-zero number of operations needed to return perm back to its initial state (perm[i] = i).

---

### Examples  

**Example 1:**  
Input: `n=2`,  
Output: `1`  
*Explanation: Initial: [0,1]. After 1 operation: [0,1] (same as start). So answer = 1.*

**Example 2:**  
Input: `n=4`,  
Output: `2`  
*Explanation:  
Initial: [0,1,2,3]  
1st operation: [0,2,1,3]  
2nd operation: [0,1,2,3] (back to original)  
So answer = 2.*

**Example 3:**  
Input: `n=6`,  
Output: `4`  
*Explanation:  
Initial: [0,1,2,3,4,5]  
1st:   [0,3,1,4,2,5]  
2nd:   [0,4,3,2,1,5]  
3rd:   [0,2,4,1,3,5]  
4th:   [0,1,2,3,4,5] (back to start)  
So answer = 4.*

---

### Thought Process (as if you’re the interviewee)  

To solve this, let's first simulate the process for small n. Every operation rearranges perm in a specific way, but the size can be up to 1000, so a brute simulation would take O(n^2) if not careful.

#### Brute-force idea  
- Start with initial perm.
- Repeat generating arr based on the rules, count how many steps until perm matches the initial again.
- But this is O(n^2) at worst.

#### Optimization  
Notice that each element's movement only depends on its current position (index).  
If we track how position 1 moves (since position 0 never changes), we can find the cycle length.
If at each step we process how index i moves:
- if i is even, new_i = i / 2
- if i is odd,  new_i = n / 2 + (i-1) / 2

Since the process is deterministic, the permutation returns to original once each element's index cycles back. Because 0 always stays at 0, we can just trace i=1, count how long it takes for i to rotate back to 1.

#### Final solution
- Initialize pos = 1 and step = 0
- Repeat: update pos based on the rules, increase step, stop when pos == 1

This runs in O(n) time since the longest possible cycle is n-1.

---

### Corner cases to consider  
- **n = 2** (smallest allowed, but easy to handle)
- **Large n** (e.g., 1000, need efficiency)
- **n is always even** (no need to handle odd n)
- **No duplicate elements** (it is always a permutation by definition)

---

### Solution

```python
def reinitializePermutation(n: int) -> int:
    # We track the index 1; index 0 never moves.
    pos = 1
    steps = 0
    while True:
        steps += 1
        if pos % 2 == 0:
            pos = pos // 2
        else:
            pos = n // 2 + (pos - 1) // 2
        if pos == 1:
            break
    return steps
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Because the position of each element can cycle at most n-1 times before returning to the start, the loop will at most run n times.

- **Space Complexity:** O(1)  
  Only variables for the current position and step count are used, no arrays or extra storage.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if n could be odd?  
  *Hint: Carefully discuss how the rules and cycles change when n is not even.*

- Can you generalize the process to find the cycle length for every i?  
  *Hint: Try to write a helper or function that simulates the movement for any position.*

- Can you formalize or mathematically "prove" the cycle length for given n?  
  *Hint: Consider group theory, order of 2 mod (n-1), etc.*

---

### Summary
This problem uses the pattern of finding the **cycle length of a permutation transformation**, which is a common topic when reasoning about repeated process on permutations. By focusing on the movement of a single non-fixed element, we reduce the process to O(n) time and O(1) space. This pattern frequently appears in cyclic simulation, shuffling, and group theory related coding problems.


### Flashcard
Simulate permutation transformation tracking only index 1 (index 0 never moves); count steps until index 1 returns to position 1.

### Tags
Array(#array), Math(#math), Simulation(#simulation)

### Similar Problems
