### Leetcode 1128 (Easy): Number of Equivalent Domino Pairs [Practice](https://leetcode.com/problems/number-of-equivalent-domino-pairs)

### Description  
Given a list of dominoes where each domino is represented as a pair of integers `[a, b]`, two dominoes are considered *equivalent* if they contain the same numbers, regardless of their order (for example, `[1, 2]` is equivalent to `[2, 1]`). The task is to count the number of unique pairs of dominoes (i, j) with 0 ≤ i < j < n that are equivalent.

### Examples  

**Example 1:**  
Input: `[[1,2],[2,1],[3,4],[5,6]]`  
Output: `1`  
*Explanation: There is only one pair of equivalent dominoes: ([1,2], [2,1]).*

**Example 2:**  
Input: `[[1,2],[1,2],[1,1],[1,2],[2,2]]`  
Output: `3`  
*Explanation: The three equivalent pairs are: ([1,2], [1,2]), ([1,2], [1,2]), and ([1,2], [1,2]) involving any two out of the three [1,2] dominoes.*

**Example 3:**  
Input: `[[3,4],[5,6],[6,5],[3,4]]`  
Output: `2`  
*Explanation: Equivalent pairs are ([3,4], [3,4]) and ([5,6], [6,5]).*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to check all pairs (i, j), 0 ≤ i < j < n, to see if dominoes[i] is equivalent to dominoes[j], but that would take O(n²) time, which is too slow for large inputs.

An optimization is to use a hash map to count each unique domino configuration. To ensure [a, b] and [b, a] are treated the same, I’ll create a normalized representation for each domino: always store the pair as (min(a, b), max(a, b)), or even as a single integer using `min(a,b) × 10 + max(a,b)` (since domino values are between 1 and 9).

As I process each domino, I’ll record how many times each normalized domino has occurred so far. For each new occurrence, the number of new pairs formed is equal to the current count of that domino so far; summing these counts gives the answer.

This reduces time complexity to O(n), and space is constant since domino values are small (at most 9×9 = 81 possible keys) [1][2][3][4].

### Corner cases to consider  
- An empty list of dominoes (output is 0)
- Only one domino (output is 0)
- All dominoes the same (maximal number of pairs)
- Dominoes that are all unique (output is 0)
- Dominoes where both values are the same, e.g., [2,2]
- No equivalent pairs at all

### Solution

```python
def numEquivDominoPairs(dominoes):
    # Count of each standardized domino (smaller, larger)
    count = [0] * 100  # 0..99 covers all possible normalized pairs
    res = 0
    for a, b in dominoes:
        key = a * 10 + b if a <= b else b * 10 + a
        # Every time we see this domino, increment result by the count so far
        res += count[key]
        count[key] += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of dominoes, since each domino is processed once and all key lookups and updates are O(1).
- **Space Complexity:** O(1), because there are at most 100 different types of dominoes (with values 1–9), so the storage in the count array is constant.

### Potential follow-up questions (as if you’re the interviewer)  

- What if domino values could be very large (not just 1–9)?  
  *Hint: You’ll need to use a hash map instead of an array for counting.*

- Can you return the actual pairs instead of just their count?  
  *Hint: Keep track of indices for each key as you process dominoes.*

- Extend the problem if dominoes can have more than two values in each tile (like [a, b, c]); how does normalization change?  
  *Hint: Sort the values to build a canonical key for each domino.*

### Summary
This is a classic **counting pairs** problem using **hash maps** (or, due to constraints, simple array mapping). The core trick is always reducing items to a **canonical representation** (here, ordered pairs), which is a common pattern for problems involving equivalence allowing for symmetry or order-agnostic matches. The pattern is widely practical, including problems with anagrams, isomorphic graphs, or any time "equivalence up to order" arises.


### Flashcard
Normalize each domino as (min, max), count occurrences with a hash map, and use n × (n−1)/2 to sum pairs for each configuration.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
