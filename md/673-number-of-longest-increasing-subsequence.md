### Leetcode 673 (Medium): Number of Longest Increasing Subsequence [Practice](https://leetcode.com/problems/number-of-longest-increasing-subsequence)

### Description  
The problem involves finding the number of longest increasing subsequences in an integer array. A subsequence is a sequence that can be derived from another sequence by deleting some elements without changing the order of the remaining elements. The condition is that the subsequence must be strictly increasing, meaning each element must be greater than the preceding one.

### Examples  

**Example 1:**  
Input=`[1, 3, 5, 4, 7]`  
Output=`2`  
Explanation: The two longest increasing subsequences are `[1, 3, 4, 7]` and `[1, 3, 5, 7]`.

**Example 2:**  
Input=`[2, 2, 2, 2, 2]`  
Output=`5`  
Explanation: The length of the longest increasing subsequence is 1, and there are 5 such subsequences, each starting with a different `2`.

**Example 3:**  
Input=`[1, 2, 3, 4, 5]`  
Output=`1`  
Explanation: The longest increasing subsequence is `[1, 2, 3, 4, 5]`, and there is only 1 such sequence.

### Thought Process  
1. **Brute Force Approach**: Iterate through all possible subsequences and check if they are strictly increasing. This approach is inefficient because it checks every possible subsequence, leading to exponential time complexity.

2. **Optimization**: Use dynamic programming to track the length and number of the longest increasing subsequences ending at each position. For each element, consider all previous elements that are smaller. If a longer increasing subsequence is found, update its length and count. If a subsequence of the same maximum length is found, increment its count.

3. **Final Approach**: Implement dynamic programming with two arrays, one for tracking the length of the longest increasing subsequences ending at each position (`dp`) and another for the count of such subsequences (`cnt`). Keep track of the maximum length and total count of the longest increasing subsequences found so far.

### Corner Cases to Consider  
- **Empty Array**: There are no increasing subsequences.
- **Single Element**: The longest increasing subsequence length is 1, and there is exactly 1 such subsequence.
- **Equal Elements**: Each equal element can be part of a separate increasing subsequence of length 1, but they cannot extend each other into longer increasing subsequences.

### Solution

```python
def findNumberOfLIS(nums):
    # Handle edge case where array is empty
    if not nums:
        return 0

    n = len(nums)
    
    # Initialize dp and cnt arrays
    dp = [1] * n  # Length of the longest increasing subsequence ending at i
    cnt = [1] * n  # Number of such subsequences
    
    # Initialize maxLen and ans
    maxLen = 1
    ans = 1
    
    for i in range(1, n):
        for j in range(i):
            # Check if nums[i] can extend the subsequence ending at j
            if nums[i] > nums[j]:
                # If a longer subsequence is found, update dp[i] and reset cnt[i]
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    cnt[i] = cnt[j]
                # If a subsequence of the same length is found, increment cnt[i]
                elif dp[j] + 1 == dp[i]:
                    cnt[i] += cnt[j]
        
        # Update maxLen and ans if needed
        if dp[i] > maxLen:
            maxLen = dp[i]
            ans = cnt[i]
        elif dp[i] == maxLen:
            ans += cnt[i]
    
    return ans
```

### Time and Space Complexity Analysis  
- **Time Complexity**: O(n²), where n is the length of the input array. This is because we use nested loops to compare each element with all previous elements.
  
- **Space Complexity**: O(n), for the dp and cnt arrays used to track the length and count of the longest increasing subsequences ending at each position.

### Potential Follow-up Questions  

1. **Optimization for Large Inputs**:  
   *Hint: Consider using a more efficient data structure to reduce the time complexity of comparisons.*

2. **Most Frequent Subsequence**:  
   *Hint: If each subsequence has a frequency or weight, how would you modify the algorithm to find the most frequent longest increasing subsequence?*

3. **Variations in Definitions**:  
   *Hint: What if the subsequence does not have to be strictly increasing? How would you modify the algorithm to handle such cases?*

### Summary
This problem is a classic example of dynamic programming, where we track and update the length and count of the longest increasing subsequences ending at each position in the array. The dynamic programming approach simplifies the problem from exponential to quadratic time complexity, making it efficient for arrays of moderate size. This pattern is commonly used in sequence-related problems.