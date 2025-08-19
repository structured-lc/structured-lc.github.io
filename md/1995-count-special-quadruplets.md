### Leetcode 1995 (Easy): Count Special Quadruplets [Practice](https://leetcode.com/problems/count-special-quadruplets)

### Description  
Given a 0-indexed array of integers, return the number of distinct quadruplets (a, b, c, d) such that:
- nums[a] + nums[b] + nums[c] == nums[d]
- a < b < c < d

You need to count all possible ordered quadruples of indices where the sum of the first three elements equals the fourth, and the indices are strictly increasing.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,6]`  
Output: `1`  
*Explanation: Only the quadruplet (0,1,2,3) works since 1 + 2 + 3 == 6.*

**Example 2:**  
Input: `nums = [3,3,6,4,5]`  
Output: `0`  
*Explanation: There are no quadruplets satisfying the conditions.*

**Example 3:**  
Input: `nums = [1,1,1,3,5]`  
Output: `4`  
*Explanation:  
  - (0,1,2,3): 1 + 1 + 1 == 3  
  - (0,1,3,4): 1 + 1 + 3 == 5  
  - (0,2,3,4): 1 + 1 + 3 == 5  
  - (1,2,3,4): 1 + 1 + 3 == 5*


### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to try every combination of four indices (a, b, c, d) with a < b < c < d and check if nums[a] + nums[b] + nums[c] == nums[d]. This would take O(n⁴) time, which is acceptable only for very small arrays.

To optimize:
- Since n ≤ 50, O(n³) is feasible.
- Fix d from position 3 to n-1, then consider all (a, b, c) with 0 ≤ a < b < c < d. For each d, count how many triples (a, b, c) sum to nums[d].
- Can use three nested loops for (a, b, c), but for larger n, could use prefix sums or hash maps for related variants. Here, brute-force is okay due to small constraints.

I'll choose the basic O(n³) solution for clarity and guaranteed acceptance.

### Corner cases to consider  
- nums contains all the same elements.
- nums contains large values (make sure no integer overflow).
- No quadruplet exists.
- Array of minimal length: n = 4.
- Negative numbers (though constraints are positive, but worth remembering for similar problems).

### Solution

```python
def countQuadruplets(nums):
    # n is the length of nums
    n = len(nums)
    count = 0

    # Use three nested loops for a, b, c
    for a in range(n - 3):
        for b in range(a + 1, n - 2):
            for c in range(b + 1, n - 1):
                target = nums[a] + nums[b] + nums[c]
                # Only need to check d > c
                for d in range(c + 1, n):
                    if nums[d] == target:
                        count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), since for each combination of (a, b, c), you check all possible d. n is at most 50, so this is acceptable.
- **Space Complexity:** O(1), aside from input storage. Only counters and loop variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the array length was much larger, e.g., up to 10⁴?  
  *Hint: Consider ways to optimize triple sum lookups, maybe with hash maps.*

- Can you find all such quadruplets, not just their count?  
  *Hint: Store index tuples instead of just incrementing count.*

- If allowed to use extra space, how can you speed this up?  
  *Hint: Pre-calculate sum pairs or use hash maps for three-sum problems.*

### Summary
This solution uses a straightforward brute-force triple nested loop pattern, which is justified due to array size limits. The problem is a variant of the multi-pointer and k-sum family (here, 3+1 sum), common in interview scenarios. This counting pattern extends to problems like counting triplets, quadruplets, and can be optimized with hash maps in harder variants.

### Tags
Array(#array), Hash Table(#hash-table), Enumeration(#enumeration)

### Similar Problems
- 4Sum(4sum) (Medium)
- Increasing Triplet Subsequence(increasing-triplet-subsequence) (Medium)
- Count Good Triplets(count-good-triplets) (Easy)
- Count Increasing Quadruplets(count-increasing-quadruplets) (Hard)