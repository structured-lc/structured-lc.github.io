### Leetcode 1157 (Hard): Online Majority Element In Subarray [Practice](https://leetcode.com/problems/online-majority-element-in-subarray)

### Description  
Given an integer array, design a data structure with two operations:

- **Initialize** with an array of numbers.
- For multiple, repeated queries, **efficiently determine if there is an element within a subarray arr[left..right] that occurs at least `threshold` times**. If so, return it; otherwise, return -1.

A majority element here is defined as *an element appearing at least threshold times in the subarray*.

**The subarray and threshold change for each query. Queries can be up to 10,000, and the array's length and distinct values can be up to 20,000. Brute force won't work—high performance is required.**

### Examples  

**Example 1:**  
Input: `["MajorityChecker","query","query","query"]`, `[[[1,1,2,2,1,1]], [0,5,4], [0,3,3], [2,3,2]]`  
Output: `[null, 1, -1, 2]`  
Explanation:  
- MajorityChecker([1,1,2,2,1,1]) creates the structure.  
- query(0,5,4) → 1 (element 1 appears 4 times in [1,1,2,2,1,1])  
- query(0,3,3) → -1 (no element in [1,1,2,2] appears 3+ times)  
- query(2,3,2) → 2 (element 2 appears 2 times in [2,2])  

**Example 2:**  
Input: `["MajorityChecker","query"]`, `[[[2,3,3,2,2]], [0,4,3]]`  
Output: `[null, 2]`  
Explanation:  
- MajorityChecker([2,3,3,2,2])  
- query(0,4,3) → 2 (element 2 appears 3 times in [2,3,3,2,2])  

**Example 3:**  
Input: `["MajorityChecker","query"]`, `[[[5]], [0,0,1]]`  
Output: `[null, 5]`  
Explanation:  
- Only one number is present; it’s the majority by default.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check counts of all elements in arr[left..right] for each query. This is O(n) per query—too slow for big inputs and lots of queries.

- **Optimized approach:**  
  Preprocess: For every unique element, store sorted indices where it occurs.  
  For any query, randomly select values in the subarray multiple times (sampling) and check if their frequency meets threshold, using binary search on precomputed index lists for those values.  
  - For each picked value, count how many times it appears in arr[left..right] in O(log k) using binary search (where k is frequency of that value overall).
  - Try 20-30 samples per query: high probability of catching the majority if it exists (since if an element is majority, sampling picks it by chance).
  - If after all samples no value passes threshold, return -1.
- **Why this approach:**  
  Space O(n), preprocessing quick, per query expected fast (O(#samples × log k)), correct with high probability.

### Corner cases to consider  
- Single element subarray.
- threshold == 1 (minimal possible threshold).
- No element meets threshold.
- All elements the same.
- Multiple queries for overlapping or identical subarrays.
- Large input sizes (test efficiency).
- threshold larger than subarray length.

### Solution

```python
import bisect
import random

class MajorityChecker:
    def __init__(self, arr):
        # Preprocess: Map value -> sorted list of all indices where it occurs
        self.arr = arr
        self.pos = {}
        for idx, val in enumerate(arr):
            if val not in self.pos:
                self.pos[val] = []
            self.pos[val].append(idx)
        self.n = len(arr)

    def query(self, left, right, threshold):
        for _ in range(20):
            # Randomly select an index in [left, right]
            rand_idx = random.randint(left, right)
            val = self.arr[rand_idx]
            idx_list = self.pos[val]
            # Find positions of left and right in idx_list for this value
            l = bisect.bisect_left(idx_list, left)
            r = bisect.bisect_right(idx_list, right)
            if r - l >= threshold:
                return val
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing: O(n), as we store index lists for each value.
  - Each query:
    - 20 iterations (constant).
    - Each iteration: binary search on sorted list (O(log k), k = freq of value overall).
    - So overall per query: O(20 × log k) ≈ O(log n).
- **Space Complexity:**  
  - O(n), for storing the mapping from value to list of indices.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you guarantee a deterministic answer rather than probabilistic?
  *Hint: Is there a way using segment trees or offline query sorting for strict correctness?*

- What if threshold can be much less than ⌊(right - left + 1)/2⌋?
  *Hint: Does sampling still work, or do you need another method?*

- How would you handle frequent updates to the underlying array?
  *Hint: Try to support modify operations efficiently—think about dynamic index structures.*

### Summary
This problem demonstrates **random sampling + binary search with precomputed indices** for sublinear-time queries in range frequency problems—*a major competitive programming and high-scale interview pattern*. The solution uses pre-indexing and random sampling due to high query speeds required. The approach is common for problems with *majority elements, range queries, or subarray statistics*, and variants appear in range mode/frequency queries and implicit data structure applications.