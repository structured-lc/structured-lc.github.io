### Leetcode 2354 (Hard): Number of Excellent Pairs [Practice](https://leetcode.com/problems/number-of-excellent-pairs)

### Description  
Given an array of positive integers `nums` and a positive integer `k`, we call a pair `(num1, num2)` *excellent* if both numbers exist in `nums`, and the sum of the number of set bits (1s in the binary representation) in `(num1 | num2)` and `(num1 & num2)` is at least `k`. Return the number of **distinct excellent ordered pairs** (i.e., `(a, b)` and `(b, a)` are considered different unless `a == b`).  
Order in the pair matters but reusing the same number is allowed if it appears in the array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,1]`, `k = 3`  
Output: `5`  
*Explanation:*

- (3, 3). 3 AND 3 = 11₂, 3 OR 3 = 11₂ ⇒ number of set bits = 2 + 2 = 4 ≥ 3
- (2, 3) and (3, 2). 2 AND 3 = 10₂, 3 OR 2 = 11₂ ⇒ bits = 1 + 2 = 3
- (1, 3) and (3, 1). 1 AND 3 = 01₂, 1 OR 3 = 11₂ ⇒ bits = 1 + 2 = 3  
So there are 5 excellent ordered pairs.

**Example 2:**  
Input: `nums = [5,1,1]`, `k = 10`  
Output: `0`  
*Explanation:*

There is no pair such that the combined number of set bits in the AND and OR is ≥ 10.

**Example 3:**  
Input: `nums = `, `k = 2`  
Output: `1`  
*Explanation:*

Only one possibility: (7,7). 7 & 7 = 111₂ = 3 set bits; 7 | 7 = 111₂ = 3 set bits. 3 + 3 = 6 ≥ 2.

### Thought Process (as if you’re the interviewee)  
- **Brute force approach**: Try all ordered pairs (including pairs of the same number) and for each, compute `popcount(num1 & num2) + popcount(num1 | num2)`. This is O(n²) and will TLE for large n.
- **Optimize:**  
  - **Distinctness:** Since order matters, but `(num1, num2)` == `(num2, num1)` only if values are the same, we need to process each pair (a, b) (with possible repetitions).
  - **Bit observation:** `popcount(a & b) + popcount(a | b) = popcount(a) + popcount(b)` (since the AND and OR split the ‘1’s into disjoint sets). So the check simplifies to:  
    For a distinct `nums`, for any ordered pair `(x, y)`, if `popcount(x) + popcount(y) ≥ k`, count the pair.
  - **Implementation:**  
    - First, deduplicate `nums` (otherwise, we’ll double-count pairs).
    - For each unique value `u`, compute `popcount(u)`. Build a frequency counter for each possible popcount.
    - For every combination of two popcounts (i, j) such that i + j ≥ k, pairs count is freq[i] × freq[j]. Since order matters, both (i, j) and (j, i) are counted unless i == j, in which case it’s freq[i] × freq[i].
    - Sum all such pairs.
    - Handle the distinction for repeated elements, but deduplication means each distinct value is used.

### Corner cases to consider  
- All duplicate numbers (deduplication is necessary)
- `k` very large (larger than any two numbers’ popcounts sum), should return 0
- Array of length 1
- All numbers have same popcount
- `nums` contains max integer values
- `k = 1` (always satisfied for any non-empty array)

### Solution

```python
def countExcellentPairs(nums, k):
    # Step 1: Unique values only
    nums = set(nums)
    # Step 2: Precompute popcount (count of set bits) for each 
    cnt = {}
    for x in nums:
        bits = bin(x).count('1')
        cnt[bits] = cnt.get(bits, 0) + 1
        
    # Step 3: All possible popcount values (max up to 30, since nums[i] ≤ 10^9)
    popcounts = sorted(cnt.keys())
    res = 0
    for i in popcounts:
        for j in popcounts:
            if i + j >= k:
                res += cnt[i] * cnt[j]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + B²), where N = len(nums) and B = number of possible popcounts (max 30). The outer deduplication is O(N), counting popcounts is O(N), and the double loop is at most 900 pairs.
- **Space Complexity:** O(B) for the popcount frequency map, O(N) for deduplicated input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and many duplicates are present?  
  *Hint: Is it possible to avoid reprocessing duplicate numbers?*

- How would you handle the case if the numbers were not positive?  
  *Hint: Consider how set bits behave for negative numbers in Python.*

- Can the result be computed without nested loops?  
  *Hint: Think about prefix sums or cumulative counts for faster lookup.*

### Summary
We use the insight that popcount(a & b) + popcount(a | b) = popcount(a) + popcount(b), reducing the problem to a frequency-count over set bit counts. Double counting is avoided by deduplicating input.  
This is a classic pattern where mathematical reduction (bit manipulation) allows O(n²) brute force to be transformed into a much faster O(N) grouping problem, which appears often in bitwise or combinatorial sum-type LeetCode problems.