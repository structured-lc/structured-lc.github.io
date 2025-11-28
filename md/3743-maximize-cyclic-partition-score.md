# [Practice](https://leetcode.com/problems/maximize-cyclic-partition-score)

### Description
You are given a cyclic array `nums` and an integer `k`. You need to partition the array into **at most k subarrays** such that the total score is maximized. The score of a partition is the sum of ranges of all subarrays, where the range of a subarray is the difference between its maximum and minimum element. Since the array is cyclic, partitions can wrap around from the end back to the beginning.

### Examples

**Example 1:**  
Input: `nums = [1,2,3,4], k = 2`  
Output: `5`  
*Explanation: Partition into [1,2,3] and [4]. Range of [1,2,3] = 3 - 1 = 2, range of [4] = 4 - 4 = 0. Total = 2. Actually, better partition: [1], [2,3,4] gives ranges 0 + (4-2) = 2. Or [4,1], [2,3] (cyclic) gives (4-1) + (3-2) = 1 + 1 = 2. Optimal is [1], [2], [3], [4] with one partition yielding 0, but with k=2: [4,1], [2,3] = 3 + 1 = 4. Best: partition at indices to get ranges summing to 5.*

**Example 2:**  
Input: `nums = [1,4,3,2,5,2], k = 3`  
Output: `4`  
*Explanation: Partition into [2,3], [3,1] (cyclic wrap), selecting segments where max - min contributions maximize the score.*

**Example 3:**  
Input: `nums = , k = 1`  
Output: `0`  
*Explanation: Single element has max = min, so range = 0.*

### Thought Process (as if you're the interviewee)

The brute force approach would be to try all possible ways to partition the cyclic array into at most k parts and compute the score for each, but this would be exponential.

The key insight is that we don't need to enumerate all partitions. Instead, we observe that for each element, it can contribute to the score in one of two ways: as a **maximum** (positive contribution) or as a **minimum** (negative contribution). We can use dynamic programming where we track:
- The maximum score using at most i partitions up to some point
- Whether we're treating the current element as a max or min

We can iterate through possible partition endpoints and track contributions. For a cyclic array, we can try all rotations or use a greedy approach to identify optimal split points based on max-min contributions.

The approach: Use DP where `dp[i][j]` represents the maximum score using at most j partitions considering elements up to index i. For each position, we decide where to place the next partition boundary and track whether elements serve as max or min in their respective subarrays.

### Corner cases to consider

- Single element array: Score is always 0 (max = min)
- k = 1: Must keep array as single partition, score = max(nums) - min(nums)
- k ≥ n: Each element can be its own partition, score approaches sum of positive contributions
- All elements identical: Score is always 0
- Negative numbers: Differences are still computed correctly
- Cyclic wrap-around: Ensure partition logic correctly handles indices wrapping from end to start

### Solution

```python
def maximizeCyclicPartitionScore(nums, k):
    n = len(nums)
    if k >= n:
        # Each element is its own partition with range 0
        return 0
    
    max_score = float('-inf')
    
    # Try each possible starting rotation/partition strategy
    # Use DP: dp[i] = max score using at most i partitions
    # We also track b[i] and c[i] for score when treating element i as min/max
    
    for start_offset in range(n):
        # Adjust array for this rotation
        rotated = nums[start_offset:] + nums[:start_offset]
        
        # DP arrays
        # dp[i] = max score using at most i partitions in rotated array
        dp = [float('-inf')] * (k + 1)
        dp[0] = 0
        
        # For each partition count
        for partitions in range(1, k + 1):
            # b[i] = max score with partitions-1 partitions, element i as minimum
            # c[i] = max score with partitions-1 partitions, element i as maximum
            b = [float('-inf')] * n
            c = [float('-inf')] * n
            
            min_val = rotated[0]
            max_val = rotated[0]
            
            for i in range(n):
                min_val = min(min_val, rotated[i])
                max_val = max(max_val, rotated[i])
                
                # If rotated[i] is treated as minimum of current subarray
                if i > 0:
                    b[i] = max(b[i-1], dp[partitions - 1] - rotated[i])
                else:
                    b[i] = dp[partitions - 1] - rotated[i]
                
                # If rotated[i] is treated as maximum of current subarray
                if i > 0:
                    c[i] = max(c[i-1], dp[partitions - 1] + rotated[i])
                else:
                    c[i] = dp[partitions - 1] + rotated[i]
            
            # Update dp[partitions] with best contribution from b and c
            for i in range(n):
                dp[partitions] = max(dp[partitions], b[i], c[i])
        
        max_score = max(max_score, dp[k])
    
    return max_score
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n² × k) where n is the length of the array and k is the partition limit. We iterate through n rotations, and for each rotation we compute DP with k partitions, each requiring O(n) operations to track b and c arrays.

- **Space Complexity:** O(n × k) for the DP arrays and auxiliary storage for each rotation's b and c arrays.

### Potential follow-up questions

- (Follow-up question 1)  
  *Can you optimize this to avoid trying all rotations? What if you directly handle cyclic nature in the DP?*  
  *Hint: Think about which elements must be boundaries. Consider that we're looking for optimal "cuts" in a cyclic sequence.*

- (Follow-up question 2)  
  *What if k is very large (close to n)? Can you derive a closed-form or greedy solution?*  
  *Hint: When each element can potentially be its own partition, think about which elements should be grouped together to maximize gain.*

- (Follow-up question 3)  
  *Can you solve this with a different DP formulation that's more intuitive? Perhaps one where state explicitly tracks last partition boundary?*  
  *Hint: Define dp[i][j] as the maximum score when the i-th partition ends at position j. What recurrence would you use?*

### Summary
This problem combines **cyclic array handling** with **DP-based partition optimization**. The key insight is recognizing that each element's contribution depends on whether it's a max or min in its subarray, allowing us to decompose the problem into DP states tracking max contributions. The pattern is common in optimization problems where you partition sequences and score based on aggregate properties. Similar patterns appear in "Partition Array for Maximum Sum" and "Max Sum of Rectangle in Matrix" problems. The main challenge is efficiently handling the cyclic nature without exponential enumeration of partition configurations.


### Flashcard
Each element contributes as either maximum (+value) or minimum (−value); use DP to track partitions and maximize total score.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
