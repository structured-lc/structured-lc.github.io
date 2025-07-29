### Leetcode 3432 (Easy): Count Partitions with Even Sum Difference [Practice](https://leetcode.com/problems/count-partitions-with-even-sum-difference)

### Description  
Given an integer array, count how many ways you can partition it (split at some index) into two non-empty subarrays such that the difference of their sums is even. A partition is defined by an index `i` where the left subarray is nums[0..i] and the right is nums[i+1..n-1]. Return the number of valid partitions.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4]`  
Output: `3`  
Explanation:  
Possible partitions:  
- i=0: [1], [2,3,4] ⇒ abs(1 - 9) = 8 (even)  
- i=1: [1,2], [3,4] ⇒ abs(3 - 7) = 4 (even)  
- i=2: [1,2,3], [4] ⇒ abs(6 - 4) = 2 (even)  
All 3 partitions yield even differences.

**Example 2:**  
Input: `nums = [2,2,2]`  
Output: `2`  
Explanation:  
- i=0: [2], [2,2] ⇒ abs(2-4)=2 (even)  
- i=1: [2,2],[2] ⇒ abs(4-2)=2 (even)  
Both are valid.

**Example 3:**  
Input: `nums = [1, 3, 5, 7]`  
Output: `3`  
Explanation:  
- i=0: [1], [3,5,7] ⇒ abs(1-15)=14 (even)  
- i=1: [1,3],[5,7] ⇒ abs(4-12)=8 (even)  
- i=2: [1,3,5], ⇒ abs(9-7)=2 (even)  
All produce even differences.

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each possible partition (index 0 to n-2), sum left and right, and check if their difference is even. This takes O(n²), as it needs prefix sums for each position.
- Optimize: Instead, notice that abs(sum(left) - sum(right)) is even ⇨ (sum(left) - sum(right)) is even ⇨ sum(left) and sum(right) have the same parity.
- Further, since sum(left) + sum(right) = totalSum, (sum(left) - sum(right)) = 2 \* sum(left) - totalSum.
- So, (2 \* sum(left) - totalSum) is even, which is always the case if totalSum is even (since 2 \* sum(left) is always even, totalSum even ⇒ difference even).
- Thus, if the total sum is odd, there are 0 valid partitions. If even, every possible partition (at every i from 0 to n-2) is valid ⇒ answer is n-1.

### Corner cases to consider  
- Empty array (not allowed as per constraints; n ≥ 2 usually)
- Array with only two elements
- Array with all elements equal
- Array with very large or very small numbers (overflow not an issue in Python)
- Array sum is odd (no valid partitions)
- Negative numbers in array

### Solution

```python
def countPartitions(nums):
    # Calculate total sum
    total_sum = sum(nums)

    # If total sum is odd, can't partition into two parts with even difference
    if total_sum % 2 != 0:
        return 0
    # Else, every partition between 0 and n-2 is valid
    return len(nums) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for computing the total sum; rest is O(1) calculation.
- **Space Complexity:** O(1). No extra space other than some variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed the list of those partitions, not just the count?  
  *Hint: Track prefix sums and list out cut points.*

- How would your approach change if negative numbers could cause different even/odd distributions?  
  *Hint: The parity logic still applies; negative numbers do not change even/odd-ness.*

- Can you generalize this to count partitions where the difference is divisible by k (instead of 2)?  
  *Hint: Parity logic can be extended to mod k using prefix sums mod k.*

### Summary
This is a classic prefix sum and parity problem: the even/odd property of the total sum determines the answer in O(n) time, and relates to partition problems where the core insight is a global property (not dynamic programming). This parity-checking trick often appears in subarray, partition, and bitmask problems.