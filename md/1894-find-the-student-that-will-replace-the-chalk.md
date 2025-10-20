### Leetcode 1894 (Medium): Find the Student that Will Replace the Chalk [Practice](https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk)

### Description  
Given a circular queue of n students (indexed 0 to n-1), each student i uses chalk[i] pieces whenever it's their turn. Starting at student 0, the teacher moves sequentially through the students, giving each a problem. If the chalk left (starting with k pieces) is less than the chalk required for the current student, that student must replace the chalk. Return the index of the student who will need to replace the chalk. The queue repeats indefinitely.

### Examples  

**Example 1:**  
Input: `chalk = [5,1,5]`, `k = 22`  
Output: `0`  
*Explanation:  
- Student 0 uses 5 (k=17), 1 uses 1 (k=16), 2 uses 5 (k=11).  
- Repeats: 0 uses 5 (k=6), 1 uses 1 (k=5), 2 uses 5 (k=0).  
- Repeats: 0 needs 5 chalk but only 0 left → student 0 replaces.*

**Example 2:**  
Input: `chalk = [3,4,1,2]`, `k = 25`  
Output: `1`  
*Explanation:  
- Total chalk per cycle = 10.  
- k = 25 → after 2 full cycles, 25 % 10 = 5 chalk left.  
- Student 0 uses 3 (k=2), 1 needs 4 (not enough left) → student 1 replaces.*

**Example 3:**  
Input: `chalk = [1,1,1,1]`, `k = 4`  
Output: `0`  
*Explanation:  
- Each needs 1. k=4 covers one full round, back to 0, who needs 1 (k=0 not enough), student 0 replaces.*

### Thought Process (as if you’re the interviewee)  
Initially, brute-force is to simulate the process: repeatedly loop through students, decrementing k by chalk[i] until k < chalk[i] for the current i, then return i.  
But for large k, this is too slow.  
Key optimization:  
- The cycle through all students always uses total = sum(chalk) chalk.  
- We only need to simulate for the remaining chalk after removing complete cycles: k = k % total.  
- Then, a single pass through chalk finds which student can't proceed.
Trade-off: The approach is O(n) time, O(1) space – optimal, as we must at least look at each student once.

### Corner cases to consider  
- k smaller than chalk.
- All chalk[i] equal.
- n = 1 (single student).
- Very large k (many full cycles).
- chalk containing large numbers.
- chalk[i] > k for some i in first pass.

### Solution

```python
def chalkReplacer(chalk, k):
    # First, compute total chalk needed for one round
    total = 0
    for c in chalk:
        total += c

    # Reduce k for full cycles
    k = k % total

    # Find the student who can't proceed
    for i, c in enumerate(chalk):
        if k < c:
            return i
        k -= c
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass for sum, one for finding the answer.
- **Space Complexity:** O(1) — We use a constant number of variables, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If the chalk array is very large and you expect many queries (different k's), how would you optimize?
  *Hint: Precompute a prefix sum array for faster lookups or use binary search.*

- If the students' chalk usage changes dynamically, how does this affect your approach?
  *Hint: If chalk is frequently updated, this may require data structures that allow efficient updates.*

- Can you solve it using less than O(n) per query if you preprocess the data?
  *Hint: Binary search the prefix sum for the remaining chalk.*

### Summary
This problem leverages the "cyclic elimination" and "modulo sum reduction" patterns seen in circular queue and resource-depletion scenarios. The key insight is reducing k by cycles for efficiency. This general reduction approach is useful whenever repetitive, cyclic resource usage occurs, and direct simulation is too slow. Patterns and techniques seen here are applicable to circular array simulation, resource scheduling, and similar allocation problems.


### Flashcard
Simulate the process with optimization by considering the remainder of chalk after complete cycles.

### Tags
Array(#array), Binary Search(#binary-search), Simulation(#simulation), Prefix Sum(#prefix-sum)

### Similar Problems
- Pass the Pillow(pass-the-pillow) (Easy)