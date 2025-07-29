### Leetcode 2176 (Easy): Count Equal and Divisible Pairs in an Array [Practice](https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array)

### Description  
You are given an integer array `nums` and an integer `k`. Return the number of pairs of indices `(i, j)` such that:
- `0 ≤ i < j < len(nums)`
- `nums[i] == nums[j]`
- `i × j` is divisible by `k`

In other words, find all valid index pairs where the elements are equal and the product of their indices is divisible by `k`.

### Examples  

**Example 1:**  
Input: `nums = [3,1,2,2,2,1,3]`, `k = 2`  
Output: `4`  
*Explanation:  
Valid pairs are:  
(0, 6): nums=3, nums=3, 0×6=0, 0 mod 2 = 0  
(2, 3): nums[2]=2, nums[3]=2, 2×3=6, 6 mod 2 = 0  
(2, 4): nums[2]=2, nums[4]=2, 2×4=8, 8 mod 2 = 0  
(3, 4): nums[3]=2, nums[4]=2, 3×4=12, 12 mod 2 = 0*  

**Example 2:**  
Input: `nums = [1,2,3,4]`, `k = 1`  
Output: `0`  
*Explanation:  
No pairs of equal elements, so count is 0.*

**Example 3:**  
Input: `nums = [1,1,1,1], k = 1`  
Output: `6`  
*Explanation:  
All pairs of equal elements considered:  
(0,1),(0,2),(0,3),(1,2),(1,3),(2,3).  
Product of indices in all pairs divided by 1 is always 0.*

### Thought Process (as if you’re the interviewee)  
At first glance, we must find all pairs `i, j` where `0 ≤ i < j < n`, with `nums[i] == nums[j]`, and `i×j` is divisible by `k`.  
- **Brute-force**: For every `i`, loop over every `j > i`, check the two conditions (`==` and divisibility), and count. This is O(n²).
- **Optimization?**:  
    - For typical constraints (`n ≤ 100`), brute-force is acceptable.
    - For larger sizes, consider using a hashmap to group indices by equal value, but the second condition couples indices by their product, which doesn't allow for significant preprocessing without increasing complexity or space.

Brute-force is direct and simple. Any optimization for larger datasets would likely involve precomputing lists of indices per value, and then checking index combinations, but not truly decreasing asymptotic cost.

### Corner cases to consider  
- Empty `nums` → No pairs to count.
- All elements are the same → Max number of pairs, all possible index pairs to consider.
- `k = 1` → Every value of `i×j` is divisible; just count equal value pairs.
- Only one element in `nums` → No pairs.
- No two equal elements → Result is 0.

### Solution

```python
def count_pairs(nums, k):
    n = len(nums)
    count = 0
    # Loop through all possible pairs i < j
    for i in range(n):
        for j in range(i + 1, n):
            # Check nums[i] == nums[j] AND (i × j) divisible by k
            if nums[i] == nums[j]:
                if (i * j) % k == 0:
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since we examine all possible pairs `(i, j)`, with `i < j` (total pairs: n×(n-1)/2 for n elements).
- **Space Complexity:** O(1) extra space; only variables for counting and loop indices used. No substantial extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array length could be up to 10⁵?
  *Hint: Is there a way to use additional space to reduce the number of pairwise checks?*
- What if we want to return the *list* of such pairs, not just the count?
  *Hint: Collect and return pairs that satisfy both conditions instead of just counting them.*
- How would you generalize to any number of criteria for the pair, not just two?
  *Hint: Think of designing the function flexibly to pass any validator per pair.*

### Summary
This is a classic "count valid pairs" technical screening problem and uses the brute-force double loop pattern. It's a good illustration of simulating constraints with direct pair-checking. The brute-force is efficient enough for small arrays; for massive arrays or other constraints, grouping and combinatorial math, or more advanced filtering might be considered. This general pattern of "searching all index pairs that meet constraints" appears in triangle problems, duplicate checks, and combinatorial filtering.