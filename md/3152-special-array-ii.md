### Leetcode 3152 (Medium): Special Array II [Practice](https://leetcode.com/problems/special-array-ii)

### Description  
Given an array of integers `nums`, and a list of queries, each represented as `[from, to]`, determine for each query whether the subarray `nums[from..to]` is **special**.  
A subarray is considered **special** if *every pair of adjacent elements* has **different parity**. That is, for every i in `from ≤ i < to`, `nums[i]` and `nums[i+1]` must differ in being odd/even.  
Return a boolean result for each query.

### Examples  

**Example 1:**  
Input: `nums = [3,4,1,2,6]`, `queries = [[0,4]]`  
Output: `[false]`  
*Explanation: The subarray is [3,4,1,2,6]. The last two elements (2 and 6) are both even, so parity does not alternate. Not special.*

**Example 2:**  
Input: `nums = [1,2,3,4,5,6]`, `queries = [[0,1],[2,5]]`  
Output: `[true, false]`  
*Explanation:  
- For [0,1]: [1,2], 1 is odd, 2 is even → alternates → special.  
- For [2,5]: [3,4,5,6]. 3-4 is odd-even (ok), 4-5 is even-odd (ok), 5-6 is odd-even (ok), but all pairs alternate so it appears special. If all alternate, returns true.*

**Example 3:**  
Input: `nums = [2,4,6,8]`, `queries = [[0,3],[1,2]]`  
Output: `[false, false]`  
*Explanation:  
- For [0,3]: [2,4,6,8]. 2-4 is even-even (bad), so not special.  
- For [1,2]: [4,6], both even, not special.*


### Thought Process (as if you’re the interviewee)  
First, I need to check for each query if *all* adjacent pairs in the subarray have different parity.  
Brute force: For each query, iterate from `from` to `to-1` and check `nums[i] % 2 != nums[i+1] % 2`. This works but is slow for lots of queries.  
Optimization:  
If I precompute an array (say, `diff[]`) where `diff[i] = 1` if `nums[i] % 2 != nums[i+1] % 2` else 0, and then compute a prefix sum over `diff`, I can answer each query in O(1):  
- For query [l, r], check if `prefix[r] - prefix[l] == r - l`. If so, all adjacent pairs in [l, r] alternate parity.  
This leverages the prefix sum pattern for quick range queries and is efficient for large inputs.

### Corner cases to consider  
- Array of length 1 (no adjacent elements, should be considered special).
- Queries where `from == to` (subarray with a single element).
- All elements have same parity (should be not special except for single-element subarrays).
- Queries that span the whole array.
- Queries that cover ranges with both odd and even elements, but not always alternating.

### Solution

```python
def is_special_array(nums, queries):
    n = len(nums)
    # diff[i] = 1 if nums[i] % 2 != nums[i+1] % 2, else 0
    diff = [0] * (n - 1)
    for i in range(n - 1):
        diff[i] = 1 if nums[i] % 2 != nums[i + 1] % 2 else 0

    # prefix_sum[i]: sum of diff[0] to diff[i-1]
    prefix = [0] * (n)
    for i in range(1, n):
        prefix[i] = prefix[i - 1] + diff[i - 1]

    res = []
    for l, r in queries:
        if l == r:
            # Single element, vacuously special
            res.append(True)
        else:
            total_pairs = r - l
            # prefix[r] - prefix[l] counts "good" adjacent pairs in [l, r]
            if prefix[r] - prefix[l] == total_pairs:
                res.append(True)
            else:
                res.append(False)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q), where n is length of nums, q is number of queries. O(n) to build `diff` and prefix array, O(q) to answer all queries.
- **Space Complexity:** O(n) for `diff` and prefix arrays; O(q) for result storage.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you support updates to the nums array and still answer queries efficiently?
  *Hint: Segment trees or binary indexed trees might help for dynamic range queries.*

- What if the queries asked for ranges where exactly k parity mismatches are required?
  *Hint: Extend prefix technique to allow difference checks for exactly k mismatches.*

- Could this be extended to larger groups instead of just adjacent pairs?
  *Hint: You'd need to define what "special" means for groupings, and precompute group-wise properties.*

### Summary
This leverages the **range prefix sum** pattern to answer multiple range "specialness" queries efficiently after linear preprocessing. The core check uses O(1) prefix queries per subarray. This is a common pattern for range property queries and also applies to problems like "number of even/odd numbers in a range", "number of increasing pairs", or "number of transitions in state in a range".

### Tags
Array(#array), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
