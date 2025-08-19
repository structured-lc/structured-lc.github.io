### Leetcode 805 (Hard): Split Array With Same Average [Practice](https://leetcode.com/problems/split-array-with-same-average)

### Description  
Given an integer array `nums`, determine if it's possible to split it into two **non-empty** subsets `A` and `B` such that the **average** of the elements in `A` is the same as the average of the elements in `B`.  
In other words, can you partition `nums` into two non-empty sets where Sum(A) / len(A) == Sum(B) / len(B)? Return `True` if possible, otherwise `False`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5,6,7,8]`  
Output: `True`  
Explanation: One possible split is A = [1,4,5,8], B = [2,3,6,7]. Both have average 4.5.

**Example 2:**  
Input: `nums = [3,1]`  
Output: `False`  
Explanation: Only possible non-empty splits are [3] and [1], their averages (3, 1) are not equal.

**Example 3:**  
Input: `nums = [5,3,11,19,2]`  
Output: `True`  
Explanation: One possible split is A = [5,19], B = [3,11,2]. Both have average 12.

### Thought Process (as if you’re the interviewee)  
First, let's restate the requirements.  
- The two partitions must be non-empty.
- The average of both partitions must be the same.

Let the sum of the entire array be S and the array length be n.  
Suppose one part, call it A, has k elements and a sum of sA.  
For the averages to be the same:  
- sA / k = (S - sA) / (n - k)  
=> sA \* (n - k) = (S - sA) \* k  
=> sA \* n - sA \* k = S \* k - sA \* k  
=> sA \* n = S \* k  
=> sA = S\*k / n  

So, for any 1 ≤ k ≤ n // 2, if S\*k % n == 0, then sA = S\*k // n must be possible with some size-k subset.

**Brute-force:**  
Generate all subsets of possible sizes for size 1 to n//2 and check if their sum matches S\*k // n.  
But this approach is exponential and inefficient.

**Optimized:**  
We can try a DP approach:  
- For all possible subset sizes and sums, track what is achievable.
- For each subset size k, precompute all possible subset sums of size k and check if any equals S\*k // n.

**Key optimization:**  
- Only consider k where S\*k % n == 0.

For efficiency, use a list of sets, where dp[k] contains all subset sums of size k.

### Corner cases to consider  
- Array of length 1 (cannot split into two non-empty subsets)
- All elements equal → split into any two non-empty groups will work
- S\*k // n not integer for any k (impossible to split)
- Negative numbers possible? (From constraints, all values ≥ 1)
- Duplicates in array  
- Very large or very small numbers

### Solution

```python
def splitArraySameAverage(nums):
    n = len(nums)
    S = sum(nums)
    # Early return for size 1
    if n == 1:
        return False

    # For each possible subset size k, try to find a valid subset
    # dp[k] will contain all possible sums using k numbers
    dp = [set() for _ in range(n//2 + 1)]
    dp[0].add(0)

    for num in nums:
        # Go backwards to avoid using the same number twice in one update
        for k in range(n//2, 0, -1):
            for prev_sum in dp[k-1]:
                dp[k].add(prev_sum + num)

    # Try all k
    for k in range(1, n//2 + 1):
        # Total sum of k elements should be integer
        if S * k % n == 0:
            sA = S * k // n
            if sA in dp[k]:
                return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × S × n/2) in worst-case, but practically less because not all sums are possible; the space and time mainly depend on the possible sum values and sizes up to n//2.
- **Space Complexity:** O(n × S) for the dp arrays, where S is the sum of nums; practically much smaller because of set optimization and constraints (n ≤ 30).

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if negative numbers are allowed in nums?  
  *Hint: How would you adjust the DP or subset generation?*

- Can you return the actual subsets, not just True/False?  
  *Hint: How would you reconstruct the subset after finding a solution?*

- How would you parallelize this or optimize for massive arrays under more relaxed constraints?  
  *Hint: Can you combine meet-in-the-middle or bitmasking approaches?*

### Summary
This problem is a challenging variant of subset sum, with an added average constraint. The core is mathematical reduction (ensuring a valid k exists where sum can be exactly partitioned), and subset-sum DP.  
The pattern (subset sum/count DP, bitmasking, early pruning by divisibility) is common for partitioning, knapsack, and similar partition/equal-sum problems.  
Efficient handling arises from combining mathematical insights and dynamic programming. The pattern is reusable in other average or ratio-based array partitioning tasks.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Partition Array Into Two Arrays to Minimize Sum Difference(partition-array-into-two-arrays-to-minimize-sum-difference) (Hard)
- Minimum Average Difference(minimum-average-difference) (Medium)