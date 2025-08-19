### Leetcode 2031 (Medium): Count Subarrays With More Ones Than Zeros [Practice](https://leetcode.com/problems/count-subarrays-with-more-ones-than-zeros)

### Description  
Given a binary array `nums` (containing only 0s and 1s), return the number of contiguous subarrays where the count of 1s is strictly greater than the count of 0s. Since the answer might be very large, return it modulo 10⁹+7.

---

### Examples  

**Example 1:**  
Input: `nums = [0,1,1,0,1]`  
Output: `9`  
Explanation:  
Subarrays with more 1s than 0s:  
[1], [1], [1], [1,1], [0,1,1], [1,1,0], [1,0,1], [1,1,0,1], [0,1,1,0,1]

**Example 2:**  
Input: `nums = `  
Output: `0`  
Explanation:  
No subarray of length ≥1 has more 1s than 0s.

**Example 3:**  
Input: `nums = [1]`  
Output: `1`  
Explanation:  
The only subarray [1] has more 1s than 0s.

---

### Thought Process (as if you’re the interviewee)  

Brute-force:  
- Try every subarray, count 1s and 0s, check if 1s > 0s.
- This is O(n²) and too slow for large arrays.

Optimized Idea:  
- Notice counting 1s > 0s is equivalent to the subarray sum (1 for 1, -1 for 0) being > 0.
- Use **prefix sums**: replace each 0 with -1, each 1 stays 1.
- For each prefix sum at position i, we want to count how many start indices j < i such that (prefix[i] - prefix[j]) > 0 → prefix[i] > prefix[j].
- This is a prefix sum dominance counting problem.

Approach:
- Use a **map** or **Binary Indexed Tree (Fenwick Tree)** to count, for each new prefix sum, how many previous prefix sums are less than the current.
- Offset prefix summation to avoid negative indexes (since sum can be negative).

Why this works:  
- For each i, number of subarrays ending at i with more 1s than 0s is equal to the number of earlier prefix sums less than prefix[i].

Tradeoff:
- O(n log n) with Fenwick Tree (as prefix sums need counting and updates per index).
- O(n²) (brute force, not suitable).

---

### Corner cases to consider  
- Empty array (should return 0; but constraints say n ≥ 1).
- Array of all 0s (should return 0).
- Array of all 1s (should return n × (n+1)/2).
- Interleaved, alternating, equal numbers of 0s and 1s.
- Large arrays (so avoid brute force).

---

### Solution

```python
MOD = 10**9 + 7

class BIT:
    # Binary Indexed Tree (Fenwick Tree) for point add, prefix sum.
    def __init__(self, size):
        self.n = size
        self.tree = [0] * (size + 2)
        
    def update(self, idx, val):
        idx += 1
        while idx <= self.n + 1:
            self.tree[idx] += val
            idx += idx & -idx
    
    def query(self, idx):
        # Get prefix sum up to idx
        idx += 1
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= idx & -idx
        return res

def countSubarrays(nums):
    n = len(nums)
    # Turn 0 -> -1, 1 -> 1
    arr = [1 if num == 1 else -1 for num in nums]
    
    # Compute prefix sums
    prefix = [0]
    for a in arr:
        prefix.append(prefix[-1] + a)
    
    # Map prefix values to indices to handle negatives
    prefix_vals = list(set(prefix))
    prefix_vals.sort()
    idx_map = {v: i for i, v in enumerate(prefix_vals)}
    
    bit = BIT(len(prefix_vals))
    
    result = 0
    for p in prefix:
        idx = idx_map[p]
        # Number of prefix sums < current prefix
        count = bit.query(idx - 1)
        result = (result + count) % MOD
        bit.update(idx, 1)
    return result
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  - Mapping prefix sums: O(n log n) for sorting and mapping.
  - Each BIT (Fenwick Tree) operation: O(log n), performed n times.

- **Space Complexity:** O(n)  
  - For prefix sums, mapping table, and tree.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this method to count subarrays where the count of 1s is at least k more than 0s?  
  *Hint: Think about a threshold in the prefix comparison.*

- Can you generalize this to non-binary arrays (with arbitrary integers)?  
  *Hint: Does the prefix comparison strategy still apply?*

- What if you had to count subarrays with more 0s than 1s?  
  *Hint: Swap definitions or change comparison sign.*

---

### Summary
The core approach uses **prefix sums** converting the 0/1 array to -1/+1, and counts, for each end index, how many previous prefix sums are less than the current—a classic "count of range sum less than x" problem, efficiently solved with a Fenwick Tree or coordinate compression. This is a common pattern useful in subarray sum/count questions like "count range sum" or "number of subarrays with sum in [lower, upper]."

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
- Ones and Zeroes(ones-and-zeroes) (Medium)
- Longer Contiguous Segments of Ones than Zeros(longer-contiguous-segments-of-ones-than-zeros) (Easy)
- All Divisions With the Highest Score of a Binary Array(all-divisions-with-the-highest-score-of-a-binary-array) (Medium)