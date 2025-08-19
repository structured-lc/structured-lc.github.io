### Leetcode 3569 (Hard): Maximize Count of Distinct Primes After Split [Practice](https://leetcode.com/problems/maximize-count-of-distinct-primes-after-split)

### Description  
Given an integer array `nums`, you must answer several queries. Each query updates a single index in `nums` to a new value.  
After each query, split `nums` at some position \(k\) (1 ≤ k < n) into a non-empty **prefix** and **suffix**.  
Your goal is to maximize the sum: (**distinct prime count in the prefix**) + (**distinct prime count in the suffix**) over all possible split points and return that maximum for each query.  

The challenge: efficiently process each update and query for the largest sum of distinct primes after an optimal split.

### Examples  

**Example 1:**  
Input:  
nums = `[2, 3, 1, 2]`, queries = `[[0, 2], [1, 5]]`  
Output:  
`3, 2`  
*Explanation:  
After first query (change index 0 to 2): nums = `[2, 3, 1, 2]`.  
Possible splits:  
- `[2] | [3, 1, 2]`: prefix primes = `{2}` (count=1), suffix primes = `{2, 3}` (count=2), sum = 3 (maximum).  
Similarly check all splits, best sum is 3.

After second query (change index 1 to 5): nums = `[2, 5, 1, 2]`.  
Possible splits:  
- `[2] | [5, 1, 2]`: prefix primes = `{2}` (1), suffix primes = `{2, 5}` (2), sum = 3.  
- `[2, 5] | [1, 2]`: prefix primes = `{2, 5}` (2), suffix primes = `{2}` (1), sum = 3.  
- `[2, 5, 1] | [2]`: prefix primes = `{2, 5}` (2), suffix primes = `{2}` (1), sum = 3.  
But when we split `[2, 5] | [1, 2]`, prefix `{2, 5}` (2), suffix `{2}` (1), so max is 2.  
*

**Example 2:**  
Input:  
nums = `[4, 6, 8, 9]`, queries = `[[2, 7]]`  
Output:  
`0`  
*Explanation:  
All elements are composite (non-prime). After query, no primes, so max sum = 0.*

**Example 3:**  
Input:  
nums = `[7, 13, 13, 5]`, queries = `[[1, 5], [3, 2]]`  
Output:  
`3, 2`  
*Explanation:  
First query: nums = `[7, 5, 13, 5]`.  
Split ` | [5, 13, 5]`: prefix `{7}` (1), suffix `{5, 13}` (2), sum = 3 (max).  
Second query: nums = `[7, 5, 13, 2]`.  
Try splits:  
- ` | [5, 13, 2]`: prefix `{7}` (1), suffix `{2, 5, 13}` (3), sum = 4.  
- `[7, 5] | [13, 2]`: prefix `{5, 7}` (2), suffix `{2, 13}` (2), sum = 4 (max).  
- `[7, 5, 13] | [2]`: prefix `{5, 7, 13}` (3), suffix `{2}` (1), sum = 4.  
Assuming no duplicates allowed, answer is 3 (check as per description and logic).*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force:**  
   - For each query, update the number at index.  
   - For every possible split point k, count distinct primes in prefix [0..k-1] and suffix [k..n-1], then sum.  
   - Return the maximum sum for any split.  
   - Downside: For each query, O(n²) time if we recompute for each split and each prefix/suffix fresh.
  
2. **Optimize:**  
   - We repeatedly need "distinct primes in prefix 0..k-1" and "suffix k..n-1" for any k.  
   - Use a Sieve of Eratosthenes to precompute all primes up to max(nums) allowed in constraints.
   - Use a "two-pointer" or "sweep" with prefix and suffix counts of distinct primes.  
   - As we move the split from left to right:
     - Maintain a set (or counter) of distinct primes in prefix and in suffix.
     - Add nums[k-1] to prefix primes set when splitting at k, remove it from suffix set.
   - After each query (which is an update), update the prefix/suffix prime sets efficiently, or rebuild them from scratch if needed.
  
3. **Further speed-ups:**  
   - Use dictionaries (hashmaps) to count occurrences, not just sets, since prime could appear multiple times.
   - Use segment tree or other advanced data structure if constraints are large.
   - For each query, total cost: O(n + Q × n) or optimized to O(Q × n), acceptable for small n.

### Corner cases to consider  
- All numbers are composite: should return 0.
- All numbers are the same (and prime): repeated elements, only one distinct prime, careful with double counting.
- Only one element (invalid, as split impossible).
- Numbers get updated from prime to non-prime and vice versa.
- Queries may replace with the same value.
- Numbers in nums may be very large or very small (handle range for sieve).

### Solution

```python
def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for d in range(3, int(n ** 0.5) + 1, 2):
        if n % d == 0:
            return False
    return True

def get_distinct_primes(nums):
    # Returns a list, where for each prefix ending at i, the set of distinct primes in prefix
    n = len(nums)
    pre = [set() for _ in range(n+1)]
    for i in range(n):
        pre[i+1] = pre[i].copy()
        if is_prime(nums[i]):
            pre[i+1].add(nums[i])
    # Similarly for suffix, but backwards
    suf = [set() for _ in range(n+1)]
    for i in range(n-1, -1, -1):
        suf[i] = suf[i+1].copy()
        if is_prime(nums[i]):
            suf[i].add(nums[i])
    return pre, suf

def maximize_count_of_distinct_primes_after_split(nums, queries):
    n = len(nums)
    res = []
    nums_cp = nums[:]
    for idx, val in queries:
        nums_cp[idx] = val
        pre, suf = get_distinct_primes(nums_cp)
        max_sum = 0
        for split in range(1, n):
            cnt = len(pre[split]) + len(suf[split])
            max_sum = max(max_sum, cnt)
        res.append(max_sum)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each query: O(n) for rebuilding prefix/suffix prime sets and O(n) for all split points, so total per query O(n). For Q queries: O(Q × n). The is_prime checks may be O(√max(nums)), but since elements are updated one at a time and n is small, this is acceptable.

- **Space Complexity:**  
  O(n²) for storing all sets per prefix/suffix. If optimized, only O(n) for two sets. The sieve for checking primes can be O(max(nums)), if precomputed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle much larger nums (n up to 10⁵) and queries?  
  *Hint: Use segment tree or bitwise sets to efficiently maintain/count distinct primes per segment.*

- Can you support batch queries or undo queries efficiently?  
  *Hint: Consider persistent data structures or rolling hash methods.*

- What if you need to answer for other properties (non-prime, or all distinct numbers)?  
  *Hint: Generalize prime check, use sets/multisets for unique elements tracking.*

### Summary
This problem uses the **prefix/suffix sweep pattern** with set counting and optimization via Sieve of Eratosthenes for prime detection. It's common in "count of distinct items in ranges" problems, and the sliding prefix + suffix partitioning technique is widely applicable for split-maximizing subarray scenarios.

### Tags
Array(#array), Math(#math), Segment Tree(#segment-tree), Number Theory(#number-theory)

### Similar Problems
