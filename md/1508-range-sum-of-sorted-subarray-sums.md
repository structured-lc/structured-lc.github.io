### Leetcode 1508 (Medium): Range Sum of Sorted Subarray Sums [Practice](https://leetcode.com/problems/range-sum-of-sorted-subarray-sums)

### Description  
Given an array of integers `nums` and two integers left and right, compute the sum of all subarray sums of nums that fall within the ranks left to right (1-indexed) when all subarray sums are listed and sorted. Since the answer may be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4], left = 1, right = 5`  
Output: `13`  
*Explanation: All subarray sums = [1,2,3,4,3,5,7,6,9,10]. Sorted: [1,2,3,3,4,4,5,6,7,10]. Sums from 1st to 5th = 1+2+3+3+4=13.*

**Example 2:**  
Input: `nums = [1,2], left = 1, right = 3`  
Output: `6`  
*Explanation: Subarray sums: [1,2,3]. Sorted: [1,2,3]. Sum = 1+2+3=6.*

**Example 3:**  
Input: `nums = , left = 1, right = 1`  
Output: `100`  
*Explanation: Only one subarray, sum is 100.*

### Thought Process (as if you’re the interviewee)  
- Compute all possible subarray sums: for each start index, sum possible end indices.
- Store all sums, sort, and sum from `left` to `right` index (1-based).
- Optimizations possible if constraints are tight (e.g., prefix sums), but brute force with sorting is often acceptable for moderate n.

### Corner cases to consider  
- nums of length 1
- left = right = 1 (just 1 sum)
- left, right exceed the number of possible subarrays

### Solution

```python
MOD = 10 ** 9 + 7

def rangeSum(nums, n, left, right):
    # Generate all subarray sums
    sub_sums = []
    for i in range(n):
        curr = 0
        for j in range(i, n):
            curr += nums[j]
            sub_sums.append(curr)
    sub_sums.sort()
    # Sum elements ranked left..right (1-based)
    return sum(sub_sums[left-1:right]) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) for generating all subarray sums (as there are n(n+1)/2 of them), plus O(n² log n²) for sorting.
- **Space Complexity:** O(n²), for storing all subarray sums.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you reduce space usage if n is large?  
  *Hint: Use min-heaps or partial sums so you never store the whole list.*

- Could you do this without sorting all subarray sums?  
  *Hint: Use selection algorithms or digit-by-digit counting.*

- How would your approach change if the array were streamed?  
  *Hint: Need to use online algorithms or maintain a rolling window.*

### Summary
The problem is a classic example of the **prefix sum and brute force with sorting** pattern. Many competition problems use this structure. Optimizations may be needed for larger constraints, such as using priority queues for k-th ranks.